(() => {
  "use strict";
  const D = window.POWER_LAB_DATA;
  const $ = selector => document.querySelector(selector);
  let eraIndex = 3;
  let active = new Set();
  let observations = [];
  let selectedScenario = null;
  let currentEvent = null;
  let eventSource = "";
  const seenEvents = new Set();

  function setView(view) {
    ["#lab-intro","#lab-stage","#power-story"].forEach(id => $(id).hidden = id !== view);
    document.body.dataset.labView = view.slice(1);
    window.scrollTo({top:0,behavior:"smooth"});
  }

  function renderEquipment() {
    $("#equipment-buttons").innerHTML = D.equipment.map(item => `
      <button type="button" data-device="${item.id}" aria-pressed="${active.has(item.id)}">
        <span aria-hidden="true">${item.icon}</span><strong>${item.name}</strong><small>+${item.points}</small>
      </button>`).join("");
    $("#device-layer").innerHTML = D.equipment.map(item => `
      <button type="button" class="lab-device" data-device="${item.id}" aria-pressed="${active.has(item.id)}"
        style="--device-x:${item.x}%;--device-y:${item.y}%" aria-label="Toggle ${item.name}">
        <span aria-hidden="true">${item.icon}</span><strong>${item.name}</strong>
      </button>`).join("");
    bindDeviceButtons();
    updateAvailability();
    updateHouse();
  }

  function renderScenarios() {
    $("#scenario-buttons").innerHTML = D.scenarios.map(item => `
      <button type="button" data-scenario="${item.id}" aria-pressed="false"><span aria-hidden="true">${item.icon}</span>${item.name}</button>`).join("");
    $("#scenario-buttons").querySelectorAll("button").forEach(button => {
      button.addEventListener("click", () => applyScenario(button.dataset.scenario));
    });
  }

  function bindDeviceButtons() {
    document.querySelectorAll("[data-device]").forEach(button => {
      button.addEventListener("click", () => toggleDevice(button.dataset.device));
    });
  }

  function updateAvailability() {
    const allowed = new Set(D.eras[eraIndex].available);
    document.querySelectorAll("[data-device]").forEach(button => {
      const disabled = !allowed.has(button.dataset.device);
      button.disabled = disabled;
      button.setAttribute("aria-disabled", String(disabled));
    });
  }

  function activityScore() {
    return Math.min(100,D.equipment.filter(item => active.has(item.id)).reduce((sum,item) => sum + item.points,0));
  }

  function updateHouse() {
    const score = activityScore();
    $("#activity-value").textContent = score;
    $("#lab-house").style.setProperty("--activity",`${score}%`);
    document.querySelectorAll("[data-device]").forEach(button => {
      button.setAttribute("aria-pressed",String(active.has(button.dataset.device)));
    });
    document.querySelectorAll(".power-network [data-path]").forEach(path => {
      path.classList.toggle("is-live",active.has(path.dataset.path));
    });
    $("#lab-caption").textContent = active.size
      ? `${active.size} system${active.size === 1 ? "" : "s"} active. The glowing routes are simplified educational pathways.`
      : "Electricity enters through the service equipment and branches throughout the home.";
    if(score >= 55 && !seenEvents.has("activity")) triggerEvent("activity","Your equipment mix");
  }

  function toggleDevice(id) {
    const item = D.equipment.find(device => device.id === id);
    if(item.era > eraIndex) return;
    if(active.has(id)) active.delete(id); else active.add(id);
    selectedScenario = null;
    document.querySelectorAll("[data-scenario]").forEach(button => button.setAttribute("aria-pressed","false"));
    $("#lab-scenario-label").textContent = "YOUR EVENING";
    $("#lab-message").textContent = active.size ? "Your home changes as equipment overlaps." : "Tap equipment to build your evening.";
    updateHouse();
  }

  function applyScenario(id) {
    const scenario = D.scenarios.find(item => item.id === id);
    selectedScenario = scenario;
    const allowed = new Set(D.eras[eraIndex].available);
    active = new Set(scenario.active.filter(item => allowed.has(item)));
    document.querySelectorAll("[data-scenario]").forEach(button => button.setAttribute("aria-pressed",String(button.dataset.scenario === id)));
    $("#lab-scenario-label").textContent = scenario.name.toUpperCase();
    $("#lab-message").textContent = scenario.message;
    $("#lab-house").dataset.event = scenario.event;
    updateHouse();
    triggerEvent(scenario.event,scenario.name);
  }

  function setEra(nextIndex) {
    eraIndex = Number(nextIndex);
    const era = D.eras[eraIndex];
    const allowed = new Set(era.available);
    active = new Set([...active].filter(item => allowed.has(item)));
    $("#era-copy").textContent = era.copy;
    $("#lab-house").dataset.era = era.year.toLowerCase();
    $("#era-ghosts").textContent = eraIndex < 3 ? `${8 - era.available.length} modern systems have not entered this home yet.` : "Today’s home can support more kinds of electrical life than ever before.";
    updateAvailability();
    updateHouse();
  }

  function triggerEvent(eventId,source) {
    if(seenEvents.has(eventId)) return;
    seenEvents.add(eventId);
    currentEvent = eventId;
    eventSource = source;
    const event = D.events[eventId];
    $("#notice-title").textContent = event.title;
    $("#notice-copy").textContent = event.copy;
    $("#notice-options").hidden = false;
    $("#notice-guidance").hidden = true;
    $("#notice-card").hidden = false;
    $("#lab-house").dataset.event = eventId;
    $("#notice-close").focus();
  }

  function answerNotice(answer) {
    const event = D.events[currentEvent];
    const guidance = event[answer];
    observations.push({event:currentEvent,source:eventSource,answer,label:guidance.label,title:guidance.title,copy:guidance.copy});
    $("#notice-label").textContent = guidance.label;
    $("#notice-guidance-title").textContent = guidance.title;
    $("#notice-guidance-copy").textContent = guidance.copy;
    $("#notice-options").hidden = true;
    $("#notice-guidance").hidden = false;
    $("#notice-continue").focus();
  }

  function closeNotice() {
    $("#notice-card").hidden = true;
    $("#lab-house").dataset.event = "none";
  }

  function buildStory() {
    const score = activityScore();
    const era = D.eras[eraIndex];
    const items = D.equipment.filter(item => active.has(item.id));
    $("#story-activity").textContent = score;
    $("#story-summary").textContent = `${era.year} view · ${items.length} active system${items.length === 1 ? "" : "s"} · ${selectedScenario ? selectedScenario.name : "your custom evening"}. These are the conditions you explored—not findings about a property.`;
    $("#story-devices").innerHTML = items.length ? items.map(item => `<span><i>${item.icon}</i>${item.name}</span>`).join("") : "<p>No equipment was left active. Return to the lab to build an evening.</p>";
    $("#story-observations").innerHTML = observations.length ? observations.map(item => `
      <article>
        <div><small>${item.source}</small><h2>${D.events[item.event].title}</h2><p>${item.copy}</p></div>
        <span>${item.label}</span>
      </article>`).join("") : `<article><div><small>YOUR EXPLORATION</small><h2>No home moments were saved yet.</h2><p>Try a Houston scenario or activate several major systems, then answer “Does this happen in your home?”</p></div><span>KEEP EXPLORING</span></article>`;
    setView("#power-story");
  }

  function resetLab() {
    eraIndex = 3;
    active.clear();
    observations = [];
    selectedScenario = null;
    seenEvents.clear();
    $("#era-slider").value = "3";
    document.querySelectorAll("[data-scenario]").forEach(button => button.setAttribute("aria-pressed","false"));
    $("#lab-scenario-label").textContent = "YOUR EVENING";
    $("#lab-message").textContent = "Tap equipment to build your evening.";
    setEra(3);
    closeNotice();
  }

  function wireSafety() {
    const dialog = $("#safety-dialog");
    $("#safety-open").addEventListener("click",() => dialog.showModal());
    $("#safety-close").addEventListener("click",() => dialog.close());
    dialog.addEventListener("click",event => {if(event.target === dialog) dialog.close();});
  }

  function init() {
    renderScenarios();
    renderEquipment();
    setEra(3);
    $("#power-on").addEventListener("click",() => setView("#lab-stage"));
    $("#era-slider").addEventListener("input",event => setEra(event.target.value));
    $("#xray-toggle").addEventListener("click",() => {
      const next = $("#lab-house").dataset.xray !== "true";
      $("#lab-house").dataset.xray = String(next);
      $("#xray-toggle").setAttribute("aria-pressed",String(next));
      $("#xray-toggle").lastChild.textContent = next ? " Hide electrical X-ray" : " See behind the walls";
    });
    $("#notice-close").addEventListener("click",closeNotice);
    $("#notice-continue").addEventListener("click",closeNotice);
    $("#notice-options").querySelectorAll("button").forEach(button => button.addEventListener("click",() => answerNotice(button.dataset.answer)));
    $("#finish-lab").addEventListener("click",buildStory);
    $("#back-to-lab").addEventListener("click",() => setView("#lab-stage"));
    $("#restart-lab").addEventListener("click",() => {resetLab();setView("#lab-stage");});
    $("#reset-lab").addEventListener("click",resetLab);
    wireSafety();
  }

  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded",init) : init();
})();
