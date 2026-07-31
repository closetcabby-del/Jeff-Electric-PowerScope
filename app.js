(() => {
  "use strict";
  const D = window.POWER_RUN_DATA;
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const $ = selector => document.querySelector(selector);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const groundY = 340;
  const player = {x:130,y:groundY - 64,w:112,h:64,vy:0,onGround:true};
  let obstacles = [];
  let collectibles = [];
  let particles = [];
  let unlocked = new Set();
  let score = 0;
  let boltCount = 0;
  let speed = reducedMotion ? 5 : 6.2;
  let state = "ready";
  let lastTime = 0;
  let nextObstacle = 1350;
  let nextBolt = 720;
  let sceneryOffset = 0;
  let neighborhoodIndex = 0;
  let best = readBest();

  function readBest() {
    try { return Number(localStorage.getItem("jeff-power-run-best")) || 0; }
    catch (_) { return 0; }
  }

  function writeBest() {
    try { localStorage.setItem("jeff-power-run-best",String(best)); }
    catch (_) {}
  }

  function formatScore(value) {
    return String(Math.floor(value)).padStart(4,"0");
  }

  function resetRun() {
    obstacles = [];
    collectibles = [];
    particles = [];
    score = 0;
    boltCount = 0;
    speed = reducedMotion ? 5 : 6.2;
    nextObstacle = 900;
    nextBolt = 520;
    player.y = groundY - player.h;
    player.vy = 0;
    player.onGround = true;
    updateHud();
  }

  function startRun() {
    resetRun();
    state = "running";
    $("#start-screen").hidden = true;
    $("#lesson-screen").hidden = true;
    $("#pause-screen").hidden = true;
    $("#pause-button").disabled = false;
    $("#game-status").textContent = "Route started. Jump the electrical bad ideas.";
    canvas.focus?.();
  }

  function resumeAfterLesson() {
    resetRun();
    state = "running";
    $("#lesson-screen").hidden = true;
    $("#game-status").textContent = "Back on the route.";
  }

  function jump() {
    if(state === "ready") { startRun(); return; }
    if(state !== "running" || !player.onGround) return;
    player.vy = -15.5;
    player.onGround = false;
    burst(player.x + 25,player.y + player.h,"#f4c84a",5);
    $("#game-status").textContent = "Jump!";
  }

  function togglePause() {
    if(state === "running") {
      state = "paused";
      $("#pause-screen").hidden = false;
      $("#pause-button").setAttribute("aria-pressed","true");
      $("#pause-button").textContent = "Resume";
    } else if(state === "paused") {
      state = "running";
      $("#pause-screen").hidden = true;
      $("#pause-button").setAttribute("aria-pressed","false");
      $("#pause-button").textContent = "Pause";
    }
  }

  function spawnObstacle() {
    const hazard = D.hazards[Math.floor(Math.random() * D.hazards.length)];
    obstacles.push({
      ...hazard,
      x:canvas.width + 40,
      y:groundY - hazard.height,
      w:hazard.width,
      h:hazard.height
    });
  }

  function spawnBolt() {
    collectibles.push({
      x:canvas.width + 40,
      y:groundY - 96 - Math.random() * 72,
      w:28,h:36,phase:Math.random() * Math.PI * 2
    });
  }

  function intersects(a,b,padding = 0) {
    return a.x + padding < b.x + b.w &&
      a.x + a.w - padding > b.x &&
      a.y + padding < b.y + b.h &&
      a.y + a.h - padding > b.y;
  }

  function showLesson(hazard) {
    state = "lesson";
    unlocked.add(hazard.id);
    best = Math.max(best,Math.floor(score));
    writeBest();
    $("#lesson-icon").textContent = hazard.icon;
    $("#lesson-icon").style.setProperty("--lesson-color",hazard.color);
    $("#lesson-title").textContent = hazard.title;
    $("#lesson-copy").textContent = hazard.copy;
    $("#lesson-rule").textContent = hazard.rule;
    $("#lesson-screen").hidden = false;
    $("#game-status").textContent = `Signal Card unlocked: ${hazard.label}.`;
    renderCards();
    updateHud();
    $("#continue-button").focus();
  }

  function burst(x,y,color,count = 8) {
    if(reducedMotion) return;
    for(let i=0;i<count;i++) {
      particles.push({
        x,y,vx:(Math.random() - .5) * 5,vy:-Math.random() * 5 - 1,
        life:1,color,size:2 + Math.random() * 3
      });
    }
  }

  function update(dt) {
    canvas.dataset.gameState = state;
    if(state !== "running") return;
    const step = Math.min(dt / 16.667,2);
    score += speed * .052 * step;
    speed = Math.min(reducedMotion ? 8 : 11.5,speed + .00055 * dt);
    sceneryOffset = (sceneryOffset + speed * .16 * step) % 260;

    player.vy += .82 * step;
    player.y += player.vy * step;
    if(player.y >= groundY - player.h) {
      player.y = groundY - player.h;
      player.vy = 0;
      player.onGround = true;
    }

    nextObstacle -= dt;
    if(nextObstacle <= 0) {
      spawnObstacle();
      nextObstacle = Math.max(860,1550 - speed * 55) + Math.random() * 720;
    }
    nextBolt -= dt;
    if(nextBolt <= 0) {
      spawnBolt();
      nextBolt = 760 + Math.random() * 760;
    }

    for(let i=obstacles.length - 1;i>=0;i--) {
      const obstacle = obstacles[i];
      obstacle.x -= speed * step;
      if(intersects(player,obstacle,10)) {
        showLesson(obstacle);
        return;
      }
      if(obstacle.x + obstacle.w < -20) obstacles.splice(i,1);
    }

    for(let i=collectibles.length - 1;i>=0;i--) {
      const bolt = collectibles[i];
      bolt.x -= speed * step;
      bolt.phase += .08 * step;
      if(intersects(player,bolt,8)) {
        boltCount++;
        score += 12;
        burst(bolt.x,bolt.y,"#f4c84a",10);
        collectibles.splice(i,1);
        $("#game-status").textContent = `Gold bolt collected. ${boltCount} total.`;
      } else if(bolt.x + bolt.w < -20) {
        collectibles.splice(i,1);
      }
    }

    particles.forEach(particle => {
      particle.x += particle.vx * step;
      particle.y += particle.vy * step;
      particle.vy += .18 * step;
      particle.life -= .025 * step;
    });
    particles = particles.filter(particle => particle.life > 0);
    canvas.dataset.obstacles = String(obstacles.length);
    canvas.dataset.firstObstacleX = obstacles[0] ? String(Math.round(obstacles[0].x)) : "none";
    canvas.dataset.playerY = String(Math.round(player.y));

    const nextNeighborhood = Math.floor(score / 250) % D.neighborhoods.length;
    if(nextNeighborhood !== neighborhoodIndex) {
      neighborhoodIndex = nextNeighborhood;
      $("#neighborhood").textContent = D.neighborhoods[neighborhoodIndex];
    }
    updateHud();
  }

  function updateHud() {
    $("#score").textContent = formatScore(score);
    $("#bolts").textContent = boltCount;
    $("#best").textContent = formatScore(best);
  }

  function roundedRect(x,y,w,h,r) {
    ctx.beginPath();
    ctx.roundRect(x,y,w,h,r);
  }

  function drawBackground() {
    const sky = ctx.createLinearGradient(0,0,0,groundY);
    sky.addColorStop(0,"#07131d");
    sky.addColorStop(.55,"#102b3b");
    sky.addColorStop(1,"#d18746");
    ctx.fillStyle = sky;
    ctx.fillRect(0,0,canvas.width,groundY);

    ctx.fillStyle = "rgba(255,255,255,.55)";
    for(let i=0;i<28;i++) {
      const x=(i*97 + 43) % canvas.width;
      const y=25 + (i*47)%130;
      ctx.fillRect(x,y,1.5,1.5);
    }

    ctx.fillStyle = "rgba(244,200,74,.82)";
    ctx.beginPath();
    ctx.arc(990,90,34,0,Math.PI*2);
    ctx.fill();
    ctx.fillStyle = "rgba(7,19,29,.32)";
    ctx.beginPath();
    ctx.arc(976,78,34,0,Math.PI*2);
    ctx.fill();

    const farOffset = sceneryOffset * .35;
    ctx.fillStyle = "#0b1720";
    for(let i=-1;i<7;i++) {
      const x=i*240 - farOffset;
      ctx.fillRect(x,225,180,115);
      ctx.beginPath();
      ctx.moveTo(x-12,225);ctx.lineTo(x+90,165);ctx.lineTo(x+192,225);ctx.fill();
      ctx.fillStyle = "rgba(244,200,74,.33)";
      ctx.fillRect(x+25,255,28,36);ctx.fillRect(x+120,255,28,36);
      ctx.fillStyle = "#0b1720";
    }

    ctx.fillStyle = "#091117";
    ctx.fillRect(515,150,8,190);
    ctx.fillRect(480,175,80,6);
    ctx.strokeStyle = "rgba(91,214,255,.2)";
    ctx.lineWidth = 2;
    ctx.beginPath();ctx.moveTo(0,190);ctx.quadraticCurveTo(300,215,520,178);ctx.quadraticCurveTo(850,140,1200,180);ctx.stroke();

    ctx.fillStyle = "#13191d";
    ctx.fillRect(0,groundY,canvas.width,80);
    ctx.fillStyle = "#f4c84a";
    for(let x=-80 - sceneryOffset*3;x<canvas.width;x+=170) ctx.fillRect(x,376,74,4);
    ctx.fillStyle = "#374047";
    ctx.fillRect(0,groundY,canvas.width,4);
  }

  function drawVan() {
    const x=player.x,y=player.y;
    ctx.save();
    if(!player.onGround && !reducedMotion) ctx.rotate(-.035);
    ctx.shadowColor = "rgba(0,0,0,.35)";
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 8;
    ctx.fillStyle = "#f4c84a";
    roundedRect(x,y+14,player.w,42,8);ctx.fill();
    ctx.fillStyle = "#f7f7f4";
    roundedRect(x+18,y,70,32,7);ctx.fill();
    ctx.fillStyle = "#10202a";
    roundedRect(x+29,y+6,25,19,3);ctx.fill();
    roundedRect(x+60,y+6,21,19,3);ctx.fill();
    ctx.fillStyle = "#0a0c0e";
    ctx.beginPath();ctx.arc(x+27,y+57,12,0,Math.PI*2);ctx.arc(x+86,y+57,12,0,Math.PI*2);ctx.fill();
    ctx.fillStyle = "#aeb7bd";
    ctx.beginPath();ctx.arc(x+27,y+57,5,0,Math.PI*2);ctx.arc(x+86,y+57,5,0,Math.PI*2);ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#111";
    ctx.font = "800 11px Manrope, sans-serif";
    ctx.fillText("JEFF",x+50,y+43);
    ctx.font = "800 18px Manrope, sans-serif";
    ctx.fillText("ϟ",x+7,y+44);
    ctx.restore();
  }

  function drawObstacle(obstacle) {
    ctx.save();
    ctx.shadowColor = obstacle.color;
    ctx.shadowBlur = 14;
    ctx.fillStyle = "#14181c";
    roundedRect(obstacle.x,obstacle.y,obstacle.w,obstacle.h,6);ctx.fill();
    ctx.strokeStyle = obstacle.color;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = obstacle.color;
    ctx.font = `700 ${Math.min(24,obstacle.height*.48)}px Manrope, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(obstacle.icon,obstacle.x + obstacle.w/2,obstacle.y + obstacle.h*.63);
    ctx.font = "700 9px Manrope, sans-serif";
    ctx.fillStyle = "#f6f6f3";
    ctx.fillText(obstacle.label,obstacle.x + obstacle.w/2,obstacle.y - 9);
    ctx.restore();
  }

  function drawBolt(bolt) {
    ctx.save();
    ctx.translate(bolt.x + bolt.w/2,bolt.y + bolt.h/2 + Math.sin(bolt.phase)*5);
    ctx.shadowColor = "#f4c84a";ctx.shadowBlur = 18;
    ctx.fillStyle = "#f4c84a";
    ctx.beginPath();
    ctx.moveTo(5,-18);ctx.lineTo(-10,2);ctx.lineTo(-1,2);ctx.lineTo(-7,18);ctx.lineTo(12,-5);ctx.lineTo(3,-5);ctx.closePath();ctx.fill();
    ctx.restore();
  }

  function drawParticles() {
    particles.forEach(particle => {
      ctx.globalAlpha = particle.life;
      ctx.fillStyle = particle.color;
      ctx.fillRect(particle.x,particle.y,particle.size,particle.size);
    });
    ctx.globalAlpha = 1;
  }

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBackground();
    obstacles.forEach(drawObstacle);
    collectibles.forEach(drawBolt);
    drawVan();
    drawParticles();
    ctx.fillStyle = "rgba(255,255,255,.55)";
    ctx.font = "700 11px Manrope, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("SOUTHEAST HOUSTON · HOMEOWNER ROUTE",22,28);
  }

  function loop(time) {
    const dt = lastTime ? time - lastTime : 16.667;
    lastTime = time;
    update(dt);
    draw();
    requestAnimationFrame(loop);
  }

  function renderCards() {
    $("#signal-cards").innerHTML = D.hazards.map(hazard => {
      const isUnlocked = unlocked.has(hazard.id);
      return `<article class="${isUnlocked ? "unlocked" : "locked"}">
        <span aria-hidden="true">${isUnlocked ? hazard.icon : "?"}</span>
        <div><small>${isUnlocked ? "UNLOCKED" : "KEEP PLAYING"}</small><strong>${isUnlocked ? hazard.label : "Signal Card"}</strong></div>
      </article>`;
    }).join("");
  }

  function wireDialog() {
    const dialog = $("#how-dialog");
    $("#how-open").addEventListener("click",() => dialog.showModal());
    $("#how-close").addEventListener("click",() => dialog.close());
    dialog.addEventListener("click",event => {if(event.target === dialog) dialog.close();});
  }

  function init() {
    $("#best").textContent = formatScore(best);
    $("#pause-button").disabled = true;
    $("#start-button").addEventListener("click",startRun);
    $("#continue-button").addEventListener("click",resumeAfterLesson);
    $("#jump-button").addEventListener("click",jump);
    $("#resume-button").addEventListener("click",togglePause);
    $("#pause-button").addEventListener("click",togglePause);
    canvas.addEventListener("pointerdown",jump);
    window.addEventListener("keydown",event => {
      if(["Space","ArrowUp"].includes(event.code)) {
        event.preventDefault();
        jump();
      }
      if(event.code === "KeyP" || event.code === "Escape") togglePause();
    });
    document.addEventListener("visibilitychange",() => {
      if(document.hidden && state === "running") togglePause();
    });
    wireDialog();
    renderCards();
    updateHud();
    requestAnimationFrame(loop);
  }

  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded",init) : init();
})();
