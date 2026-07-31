(() => {
  "use strict";
  const D = window.SIGNAL_DATA;
  const $ = selector => document.querySelector(selector);
  let index = 0;
  let answers = [];
  let activeSignal = null;

  function setView(view) {
    ["#welcome", "#walkthrough", "#report"].forEach(id => {
      $(id).hidden = id !== view;
    });
    document.body.dataset.view = view.slice(1);
    window.scrollTo({top:0, behavior:"smooth"});
  }

  function loadSignal(nextIndex) {
    index = nextIndex;
    activeSignal = D.signals[index];
    const scene = $("#signal-scene");
    $("#step-label").textContent = `SIGNAL ${activeSignal.number} / ${String(D.signals.length).padStart(2, "0")}`;
    $("#signal-name").textContent = activeSignal.name;
    $("#story-progress-bar").style.width = `${((index + 1) / D.signals.length) * 100}%`;
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
    $("#card-kicker").textContent = `${activeSignal.room.toUpperCase()} · HOME SIGNAL ${activeSignal.number}`;
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
    $("#continue-tour").innerHTML = index === D.signals.length - 1
      ? `See my Home Signals <span aria-hidden="true">→</span>`
      : `Continue through the house <span aria-hidden="true">→</span>`;
    $("#continue-tour").focus();
  }

  function showReport() {
    setView("#report");
    $("#report-count").textContent = answers.filter(Boolean).length;
    $("#report-ring").style.setProperty("--report-progress", `${(answers.filter(Boolean).length / D.signals.length) * 360}deg`);
    $("#report-list").innerHTML = answers.filter(Boolean).map(entry => {
      const outcome = D.outcomes[entry.outcome];
      return `<article class="${outcome.tone}">
        <div><small>${entry.room}</small><h2>${entry.signal}</h2><p>${entry.answer}</p></div>
        <span>${outcome.label}</span>
      </article>`;
    }).join("");
  }

  function startTour(reset = false) {
    if (reset) answers = [];
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
    $("#enter-home").addEventListener("click", () => startTour(true));
    $("#signal-hotspot").addEventListener("click", openSignal);
    $("#card-close").addEventListener("click", closeCard);
    $("#continue-tour").addEventListener("click", () => {
      if (index < D.signals.length - 1) loadSignal(index + 1);
      else showReport();
    });
    $("#exit-tour").addEventListener("click", () => setView("#welcome"));
    $("#restart-tour").addEventListener("click", () => startTour(true));
    $("#print-report").addEventListener("click", () => window.print());
    wireDialog();
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
