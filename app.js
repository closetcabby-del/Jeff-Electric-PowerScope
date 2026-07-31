(() => {
  "use strict";
  const D = window.POWER_DATA;
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let map, overlayGroup, currentLayer = "age";

  function initMap(){
    if(!window.L) return;
    map = L.map("map",{zoomControl:false,scrollWheelZoom:false,minZoom:8,maxZoom:15}).setView([29.67,-95.20],10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap contributors"}).addTo(map);
    L.control.zoom({position:"bottomleft"}).addTo(map);
    overlayGroup = L.layerGroup().addTo(map);
    renderLayer("age");
    setTimeout(()=>map.invalidateSize(),200);
  }
  function renderLayer(id){
    currentLayer=id;
    $$(".layer-button").forEach(b=>b.classList.toggle("active",b.dataset.layer===id));
    if(!map) return;
    overlayGroup.clearLayers();
    const entries=Object.values(D.zips);
    const colors={age:"#f4c84a",cost:"#5bd6ff",storm:"#70a7ff",safety:"#ffbb5b"};
    entries.forEach((z,i)=>{
      const radius=id==="cost" ? 10000+i*1300 : id==="storm" ? 12500-i*700 : 6500+i*650;
      L.circle([z.lat,z.lng],{radius,color:colors[id],weight:1,fillColor:colors[id],fillOpacity:id==="safety"?.08:.11,dashArray:id==="storm"?"6 8":null,className:id==="storm"?"map-line":""}).addTo(overlayGroup);
      L.marker([z.lat,z.lng],{icon:L.divIcon({className:"power-marker",iconSize:[12,12]})}).on("click",()=>showZip(z)).addTo(overlayGroup);
    });
    if(id==="storm"){
      L.polyline(entries.map(z=>[z.lat,z.lng]),{color:colors[id],weight:1,dashArray:"5 10",className:"map-line"}).addTo(overlayGroup);
    }
  }
  function showLayer(id){
    const l=D.layers[id]; renderLayer(id);
    $("#map-card-kicker").textContent="DATA LAYER";
    $("#map-card-title").textContent=l.label;
    $("#map-card-stat").textContent=l.stat;
    $("#map-card-copy").textContent=l.copy;
  }
  function showZip(z){
    $("#map-card-kicker").textContent="REGIONAL CONTEXT";
    $("#map-card-title").textContent=z.name;
    $("#map-card-stat").textContent=z.era;
    $("#map-card-copy").textContent=z.copy;
  }
  function buildLayers(){
    const root=$("#layer-controls");
    Object.entries(D.layers).forEach(([id,l])=>{
      const b=document.createElement("button"); b.type="button"; b.className="layer-button"; b.dataset.layer=id;
      b.innerHTML=`<span aria-hidden="true">${l.icon}</span>${l.label}`;
      b.setAttribute("aria-pressed",id===currentLayer); b.onclick=()=>{showLayer(id); $$(".layer-button").forEach(x=>x.setAttribute("aria-pressed",x===b));};
      root.append(b);
    });
  }
  function initSearch(){
    $("#location-form").addEventListener("submit",e=>{
      e.preventDefault(); const code=$("#location-input").value.trim(); const z=D.zips[code];
      if(!z){$("#search-status").textContent="That ZIP is not in this first regional release."; return;}
      $("#search-status").textContent=`Flying to ${z.name} · ${code}`;
      showZip(z); if(map) map.flyTo([z.lat,z.lng],13,{animate:!reduced,duration:reduced?0:1.3});
    });
  }
  function initEras(){
    const tabs=$(".era-tabs");
    D.eras.forEach((era,i)=>{
      const b=document.createElement("button"); b.className="era-tab"; b.type="button"; b.role="tab"; b.textContent=era.id;
      b.setAttribute("aria-selected",i===0); b.onclick=()=>selectEra(i); tabs.append(b);
    }); selectEra(0);
  }
  function selectEra(i){
    const era=D.eras[i]; $$(".era-tab").forEach((b,j)=>{b.classList.toggle("active",j===i);b.setAttribute("aria-selected",j===i)});
    $("#era-service").textContent=era.service; $("#era-kicker").textContent=era.kicker; $("#era-title").textContent=era.title; $("#era-copy").textContent=era.copy;
    $("#era-loads").innerHTML=era.loads.map(x=>`<span>${x}</span>`).join("");
    $(".meter-value").style.strokeDashoffset=408-(408*era.percent/100);
  }
  function drawPriceChart(){
    const svg=$("#price-chart"), data=D.prices, w=520,h=210,p=25,min=10,max=16;
    const x=i=>p+i*(w-2*p)/(data.length-1), y=v=>h-p-(v-min)*(h-2*p)/(max-min);
    svg.innerHTML=`<defs><linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4c84a" stop-opacity=".28"/><stop offset="1" stop-color="#f4c84a" stop-opacity="0"/></linearGradient></defs>`;
    [11,13,15].forEach(v=>svg.insertAdjacentHTML("beforeend",`<line class="chart-grid" x1="${p}" x2="${w-p}" y1="${y(v)}" y2="${y(v)}"/>`));
    const line=data.map((d,i)=>`${i?"L":"M"}${x(i)},${y(d.value)}`).join(" ");
    svg.insertAdjacentHTML("beforeend",`<path class="chart-area" d="${line} L${x(data.length-1)},${h-p} L${x(0)},${h-p} Z"/><path class="chart-line" d="${line}"/>`);
    data.forEach((d,i)=>{if(i===0||i===data.length-1)svg.insertAdjacentHTML("beforeend",`<circle class="chart-point" cx="${x(i)}" cy="${y(d.value)}" r="5"/><text class="chart-label" x="${x(i)}" y="${y(d.value)-14}" text-anchor="${i?"end":"start"}">${d.value.toFixed(2)}¢</text>`)});
  }
  function drawDemand(){
    const max=Math.max(...D.demand.map(x=>x.value));
    $("#demand-bars").innerHTML=D.demand.map(d=>`<i class="mini-bar" style="height:${Math.round(d.value/max*100)}%"><span>${d.year}</span></i>`).join("");
  }
  function initLoads(){
    $("#load-grid").innerHTML=D.loads.map(l=>`<button class="load-button" type="button" data-load="${l.id}" aria-pressed="false"><span class="load-icon" aria-hidden="true">${l.icon}</span><strong>${l.label}</strong><small>+${l.points} illustrative points</small></button>`).join("");
    $$(".load-button").forEach(b=>b.onclick=()=>{b.setAttribute("aria-pressed",b.getAttribute("aria-pressed")!=="true");updateReadiness()});
    $("#reset-loads").onclick=()=>{$$(".load-button").forEach(b=>b.setAttribute("aria-pressed","false"));updateReadiness()};
  }
  function updateReadiness(){
    const selected=$$(".load-button[aria-pressed=true]"), raw=selected.reduce((s,b)=>s+D.loads.find(l=>l.id===b.dataset.load).points,0), score=Math.min(raw,100);
    $("#readiness-score").textContent=score; $("#selected-count").textContent=selected.length; $(".gauge-value").style.strokeDashoffset=267-(267*score/100);
    const major=selected.length>=4||score>=45;
    $("#readiness-title").textContent=major?"A professional calculation makes sense":selected.length?"Modern loads accumulate quickly":"Start with your home";
    $("#readiness-copy").textContent=major?"Several major systems are selected. Ask a licensed electrician for a professional load calculation before adding large loads.":selected.length?"This illustrates how each added system can change the conversation. It does not measure amps or available capacity.":"Add major equipment to see how modern electrical demands can accumulate.";
  }
  const flow={
    danger:{title:"Is there active smoke, fire, sparking, a burning smell or immediate danger?",hint:"Do not approach or touch the source.",answers:[["Yes — active or immediate","emergency"],["No","power"]]},
    power:{title:"Is power partially out across multiple rooms or nearby homes?",hint:"A broad outage may be on the utility side.",answers:[["Yes, and neighbors may be affected","utility"],["Yes, only in my home","tenure"],["No","symptom"]]},
    tenure:{title:"Do you rent this home?",hint:"Your lease or local rules may require the landlord to arrange repairs.",answers:[["Yes","landlord"],["No","schedule"]]},
    symptom:{title:"What best matches what you noticed?",hint:"Choose the closest safe observation.",answers:[["Warm outlet, repeated trips, buzzing or shocks","schedule"],["One dead outlet or appliance","gfci"],["Lights briefly dim when equipment starts","monitor"],["Planning an EV charger, pool, hot tub or major appliance","load"],["None of these / just exploring","monitor"]]}
  };
  const results={
    emergency:{label:"EMERGENCY",title:"Leave the area and call 911.",copy:"For active smoke, fire or immediate danger, move everyone to safety and call 911. Do not touch electrical equipment or attempt to investigate. This tool does not replace emergency services.",urgent:true},
    utility:{label:"CONTACT THE UTILITY",title:"Check the utility's outage channel.",copy:"If multiple homes or a wider area have lost power, use your utility's official outage map or phone number. Keep away from downed lines. Call 911 for immediate hazards."},
    landlord:{label:"CONTACT THE LANDLORD",title:"Report the issue promptly.",copy:"Tell your landlord or property manager what you safely observed and when. For active smoke, fire or immediate danger, leave and call 911."},
    schedule:{label:"SCHEDULE AN ELECTRICIAN",title:"A professional evaluation is appropriate.",copy:"Warmth, repeated breaker trips, buzzing, shocks or partial power isolated to your home deserve professional attention. Avoid the affected equipment and do not open covers or attempt energized work."},
    gfci:{label:"CHECK APPLIANCE OR GFCI SAFELY",title:"Start with simple, visible checks.",copy:"Unplug the affected appliance if it is safe to do so. You may use a visible GFCI test/reset button according to its label—without disassembly. If it will not reset, keeps tripping or shows damage, schedule an electrician."},
    monitor:{label:"MONITOR",title:"Record what you observe.",copy:"Note when it happens, which lights or appliances are involved and whether it repeats. Stop using anything that becomes hot, smells burnt, sparks or shocks. Persistent or worsening symptoms should be professionally evaluated."},
    load:{label:"PROFESSIONAL LOAD CALCULATION",title:"Plan the load before the installation.",copy:"Major new electrical equipment can change service and circuit requirements. Ask a licensed electrician for a professional load calculation and installation plan. This website's illustrative score is not a load calculation."}
  };
  let checkerHistory=[];
  function renderQuestion(id){
    const q=flow[id], step=Math.min(checkerHistory.length+1,3); $("#checker-step").textContent=`STEP ${step} OF 3`; $("#checker-progress").style.width=`${step/3*100}%`;
    $("#checker-content").innerHTML=`<div class="checker-question"><h3>${q.title}</h3><p>${q.hint}</p><div class="answer-grid">${q.answers.map((a,i)=>`<button class="answer-button" data-next="${a[1]}"><span>${a[0]}</span><span aria-hidden="true">→</span></button>`).join("")}</div></div>`;
    $$(".answer-button").forEach(b=>b.onclick=()=>{checkerHistory.push(id); flow[b.dataset.next]?renderQuestion(b.dataset.next):renderResult(b.dataset.next)});
    $("#checker-back").disabled=!checkerHistory.length; $("#checker-content").focus();
  }
  function renderResult(id){
    const r=results[id]; $("#checker-step").textContent="GUIDANCE"; $("#checker-progress").style.width="100%";
    $("#checker-content").innerHTML=`<div class="checker-result"><span class="result-badge ${r.urgent?"emergency":""}">${r.label}</span><h3>${r.title}</h3><p>${r.copy}</p>${id==="load"?'<a class="primary-button" href="#readiness">Explore readiness <span>↑</span></a>':""}</div>`;
    $("#checker-content").focus();
  }
  function initChecker(){
    renderQuestion("danger"); $("#checker-back").onclick=()=>{const prev=checkerHistory.pop()||"danger";renderQuestion(prev)}; $("#checker-restart").onclick=()=>{checkerHistory=[];renderQuestion("danger")};
  }
  function initDialog(){
    const d=$("#method-dialog"), close=$("#method-close");
    $$("[data-open-method]").forEach(b=>b.onclick=()=>d.showModal()); close.onclick=()=>d.close();
    d.addEventListener("click",e=>{if(e.target===d)d.close()});
  }
  function init(){
    buildLayers(); initMap(); initSearch(); initEras(); drawPriceChart(); drawDemand(); initLoads(); initChecker(); initDialog(); $("#year").textContent=new Date().getFullYear();
  }
  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",init):init();
})();
