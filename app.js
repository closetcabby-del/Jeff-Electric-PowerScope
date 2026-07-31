(() => {
  "use strict";
  const D = window.HOME_DATA;
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  let roomIndex = 0;
  let activeItem = null;
  const review = new Map();

  function buildRoomNav() {
    $("#room-nav").innerHTML = D.rooms.map((room, index) => `
      <button type="button" data-room="${room.id}" aria-pressed="${index === 0}">
        <span aria-hidden="true">${room.icon}</span>
        <small>${String(index + 1).padStart(2, "0")}</small>
        <strong>${room.name}</strong>
      </button>`).join("");
    $$("#room-nav button").forEach((button, index) => {
      button.onclick = () => selectRoom(index);
    });
  }

  function selectRoom(index) {
    roomIndex = (index + D.rooms.length) % D.rooms.length;
    const room = D.rooms[roomIndex];
    activeItem = null;
    closePanel();
    $("#room-step").textContent = `ROOM ${roomIndex + 1} OF ${D.rooms.length}`;
    $("#room-title").textContent = room.name;
    $("#room-intro").textContent = room.intro;
    $("#room-scene").dataset.tone = room.tone;
    $("#walk-progress").style.width = `${((roomIndex + 1) / D.rooms.length) * 100}%`;
    $$("#room-nav button").forEach((button, i) => button.setAttribute("aria-pressed", String(i === roomIndex)));
    $("#object-layer").innerHTML = room.items.map(item => `
      <button class="home-object ${review.has(item.id) ? "reviewed" : ""}" type="button"
        data-item="${item.id}" style="--x:${item.x}%;--y:${item.y}%"
        aria-label="Explore ${item.name}">
        <span class="object-ring"></span>
        <span class="object-icon" aria-hidden="true">${item.icon}</span>
        <strong>${item.name}</strong>
      </button>`).join("");
    $$(".home-object").forEach(button => {
      button.onclick = () => openItem(room.items.find(item => item.id === button.dataset.item));
    });
  }

  function openItem(item) {
    activeItem = item;
    $("#learn-kicker").textContent = `ROOM ${roomIndex + 1} · ${D.rooms[roomIndex].name.toUpperCase()}`;
    $("#learn-icon").textContent = item.icon;
    $("#learn-title").textContent = item.name;
    $("#learn-normal").textContent = item.normal;
    $("#learn-look").innerHTML = item.look.map(point => `<li>${point}</li>`).join("");
    $("#learn-question").textContent = item.question;
    $("#answer-list").innerHTML = item.options.map(([label, outcome]) => `
      <button type="button" data-outcome="${outcome}"><span>${label}</span><span aria-hidden="true">→</span></button>`).join("");
    $$("#answer-list button").forEach(button => {
      button.onclick = () => recordAnswer(button.dataset.outcome, button.firstElementChild.textContent);
    });
    $("#guidance").hidden = true;
    $("#observation").hidden = false;
    $("#learn-panel").hidden = false;
    $("#learn-panel").focus();
  }

  function recordAnswer(outcomeId, answer) {
    const outcome = D.outcomes[outcomeId];
    review.set(activeItem.id, {
      room:D.rooms[roomIndex].name,
      item:activeItem.name,
      answer,
      outcome:outcomeId,
      label:outcome.label
    });
    $("#result-label").textContent = outcome.label;
    $("#result-label").className = outcome.tone;
    $("#result-title").textContent = outcome.title;
    $("#result-copy").textContent = outcome.copy;
    $("#observation").hidden = true;
    $("#guidance").hidden = false;
    $("#reviewed-count").textContent = review.size;
    const selected = $(`.home-object[data-item="${activeItem.id}"]`);
    if (selected) selected.classList.add("reviewed");
  }

  function closePanel() {
    $("#learn-panel").hidden = true;
  }

  function renderSummary() {
    $("#summary-total").textContent = review.size;
    $("#summary-empty").hidden = review.size > 0;
    $("#summary-list").innerHTML = [...review.values()].map(entry => `
      <article class="summary-entry ${D.outcomes[entry.outcome].tone}">
        <div><small>${entry.room}</small><strong>${entry.item}</strong><p>${entry.answer}</p></div>
        <span>${entry.label}</span>
      </article>`).join("");
  }

  function wireDialogs() {
    const safety = $("#safety-dialog");
    const summary = $("#summary-dialog");
    $("#safety-open").onclick = () => safety.showModal();
    $("#safety-close").onclick = () => safety.close();
    $("#summary-open").onclick = () => { renderSummary(); summary.showModal(); };
    $("#summary-close").onclick = () => summary.close();
    [safety, summary].forEach(dialog => {
      dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
    });
    $("#summary-reset").onclick = () => {
      review.clear();
      $("#reviewed-count").textContent = "0";
      renderSummary();
      selectRoom(0);
    };
  }

  function init() {
    buildRoomNav();
    selectRoom(0);
    $("#previous-room").onclick = () => selectRoom(roomIndex - 1);
    $("#next-room").onclick = () => selectRoom(roomIndex + 1);
    $("#learn-close").onclick = closePanel;
    $("#answer-again").onclick = () => {
      $("#guidance").hidden = true;
      $("#observation").hidden = false;
    };
    wireDialogs();
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
