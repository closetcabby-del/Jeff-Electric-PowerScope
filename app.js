(() => {
  "use strict";
  const D = window.SIGNAL_DATA;
  const $ = selector => document.querySelector(selector);
  let index = 0;
  let answers = [];
  let activeSignal = null;
  let concern = "learn";
  let tourSignals = [...D.signals];
  let profile = {era:"", role:"homeowner", area:"Southeast Houston"};

  function setView(view) {
    ["#welcome", "#intake", "#walkthrough", "#report"].forEach(id => {
      $(id).hidden = id !== view;
    });
    document.body.dataset.view = view.slice(1);
    window.scrollTo({top:0, behavior:"smooth"});
  }

  function chooseConcern(button) {
    concern = button.dataset.concern;
    document.querySelectorAll("#concern-options button").forEach(option => {
      option.setAttribute("aria-pressed", String(option === button));
    });
    $("#home-context").hidden = false;
    $("#home-context").scrollIntoView({behavior:"smooth", block:"nearest"});
  }

  function buildTour() {
    const chosen = D.signals.find(signal => signal.id === concern);
    tourSignals = chosen ? [chosen, ...D.signals.filter(signal => signal.id !== concern)] : [...D.signals];
  }

  function loadSignal(nextIndex) {
    index = nextIndex;
    activeSignal = tourSignals[index];
    const scene = $("#signal-scene");
    $("#step-label").textContent = `MOMENT ${String(index + 1).padStart(2, "0")} / ${String(tourSignals.length).padStart(2, "0")}`;
    $("#signal-name").textContent = activeSignal.name;
    $("#story-progress-bar").style.width = `${((index + 1) / tourSignals.length) * 100}%`;
    $("#hotspot-icon").textContent = activeSignal.icon;
    $("#hotspot-label").textContent = activeSignal.room;
    $("#scene-direction-text").textContent = activeSignal.direction;
    scene.style.setProperty("--scene-size", activeSignal.size);
    scene.style.setProperty("--scene-position", activeSignal.position);
    scene.style.setProperty("--hotspot-x", `${activeSignal.x}%`);
    scene.style.setProperty("--hotspot-y", `${activeSignal.y}%`);
    scene.dataset.effect = activeSignal.effect;
    $("#signal-card").hidden = true;
    $("#signal-guidance").hidden = true;
    $(".signal-answer").hidden = false;
    $("#signal-hotspot").focus({preventScroll:true});
  }

  function openSignal() {
    $("#card-kicker").textContent = `${activeSignal.room.toUpperCase()} · ${profile.area.toUpperCase()}`;
    $("#card-title").textContent = activeSignal.title;
    $("#card-intro").textContent = activeSignal.intro;
    $("#card-question").textContent = activeSignal.question;
    $("#card-options").innerHTML = activeSignal.options.map(([label, outcome]) =>
      `<button type="button" data-outcome="${outcome}"><span>${label}</span><span aria-hidden="true">→</span></button>`
    ).join("");
    $("#card-options").querySelectorAll("button").forEach(button => {
      button.addEventListener("click", () => chooseAnswer(button.dataset.outcome, button.firstElementChild.textContent));
    });
    $("#signal-card").hidden = false;
    $("#card-close").focus();
  }

  function chooseAnswer(outcomeId, answer) {
    const outcome = D.outcomes[outcomeId];
    answers[index] = {signal:activeSignal.name, room:activeSignal.room, answer, outcome:outcomeId};
    $("#guidance-label").textContent = outcome.label;
    $("#guidance-label").className = outcome.tone;
    $("#guidance-title").textContent = outcome.title;
    $("#guidance-copy").textContent = outcome.copy;
    $(".signal-answer").hidden = true;
    $("#signal-guidance").hidden = false;
    $("#continue-tour").innerHTML = index === tourSignals.length - 1
      ? `Show me what to do next <span aria-hidden="true">→</span>`
      : `Keep walking <span aria-hidden="true">→</span>`;
    $("#continue-tour").focus();
  }

  function contextSentence() {
    const eraLabels = {
      "before-1980":"a home built before 1980",
      "1980-1999":"a home built between 1980 and 1999",
      "2000-2015":"a home built between 2000 and 2015",
      "after-2015":"a home built after 2015"
    };
    const roleLabels = {
      homeowner:"homeowner",
      renter:"renter",
      landlord:"property manager"
    };
    const home = eraLabels[profile.era] || "a home with an unknown construction era";
    return `A personalized educational summary for a ${roleLabels[profile.role]} in ${profile.area}, based on selections for ${home}.`;
  }

  function renderOutcomeGroups(entries) {
    const buckets = [
      {title:"Things you can keep watching", ids:["routine","appliance"]},
      {title:profile.role === "renter" ? "Things to document for your landlord" : "Things to discuss with an electrician", ids:["electrician","priority"]},
      {title:"Planning and utility next steps", ids:["load","utility"]},
      {title:"Immediate danger guidance", ids:["emergency"]}
    ];
    $("#report-groups").innerHTML = buckets.map(bucket => {
      const count = entries.filter(entry => bucket.ids.includes(entry.outcome)).length;
      return `<div class="${count ? "has-items" : ""}"><strong>${count}</strong><span>${bucket.title}</span></div>`;
    }).join("");
  }

  function showReport() {
    const entries = answers.filter(Boolean);
    setView("#report");
    $("#report-count").textContent = entries.length;
    $("#report-context").textContent = contextSentence();
    $("#report-ring").style.setProperty("--report-progress", `${(entries.length / tourSignals.length) * 360}deg`);
    renderOutcomeGroups(entries);
    $("#report-list").innerHTML = entries.map(entry => {
      const outcome = D.outcomes[entry.outcome];
      const title = profile.role === "renter" && ["electrician","priority"].includes(entry.outcome)
        ? "DOCUMENT & CONTACT YOUR LANDLORD"
        : outcome.label;
      return `<article class="${outcome.tone}">
        <div><small>${entry.room}</small><h2>${entry.signal}</h2><p>${entry.answer}</p></div>
        <span>${title}</span>
      </article>`;
    }).join("");
  }

  function startTour(reset = false) {
    if (reset) answers = [];
    profile = {
      era:$("#home-era").value,
      role:$("#home-role").value,
      area:$("#home-area").value
    };
    buildTour();
    setView("#walkthrough");
    loadSignal(0);
  }

  function closeCard() {
    $("#signal-card").hidden = true;
    $("#signal-hotspot").focus();
  }

  function wireDialog() {
    const dialog = $("#safety-dialog");
    $("#safety-open").addEventListener("click", () => dialog.showModal());
    $("#safety-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", event => {
      if (event.target === dialog) dialog.close();
    });
  }

  function init() {
    $("#enter-home").addEventListener("click", () => setView("#intake"));
    $("#intake-back").addEventListener("click", () => setView("#welcome"));
    document.querySelectorAll("#concern-options button").forEach(button => {
      button.addEventListener("click", () => chooseConcern(button));
    });
    $("#begin-walkthrough").addEventListener("click", () => startTour(true));
    $("#signal-hotspot").addEventListener("click", openSignal);
    $("#card-close").addEventListener("click", closeCard);
    $("#continue-tour").addEventListener("click", () => {
      if (index < tourSignals.length - 1) loadSignal(index + 1);
      else showReport();
    });
    $("#exit-tour").addEventListener("click", () => setView("#intake"));
    $("#restart-tour").addEventListener("click", () => setView("#intake"));
    $("#print-report").addEventListener("click", () => window.print());
    wireDialog();
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
