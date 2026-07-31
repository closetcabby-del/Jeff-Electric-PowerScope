(() => {
  "use strict";
  const D = window.POWER_DATA;
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let map, zipLayer, geoData, activeLayer = "age", pinnedZip = null;

  function styleFor(code, highlighted=false) {
    const view = D.layers[activeLayer];
    return {
      color:view.color,
      fillColor:view.fill,
      weight:highlighted || pinnedZip === code ? 3 : 1.5,
      opacity:highlighted || pinnedZip === code ? 1 : .8,
      fillOpacity:highlighted || pinnedZip === code ? .3 : .12,
      dashArray:activeLayer === "code" ? "7 7" : null,
      className:activeLayer === "code" ? "map-line" : ""
    };
  }

  function initMap() {
    if (!window.L) {
      $("#search-status").textContent = "Map tiles are unavailable. ZIP search still displays regional profiles.";
      return;
    }
    map = L.map("map", {
      zoomControl:false,
      scrollWheelZoom:true,
      minZoom:9,
      maxZoom:15,
      attributionControl:false
    }).setView([29.625, -95.20], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom:19,
      attribution:"© OpenStreetMap contributors"
    }).addTo(map);
    L.control.zoom({position:"bottomright"}).addTo(map);
    fetch("assets/southeast-houston-zips.geojson?v=map-only-1")
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        geoData = data;
        renderZips();
        map.fitBounds(zipLayer.getBounds(), {padding:[45,45]});
      })
      .catch(() => {
        $("#search-status").textContent = "ZIP boundaries could not load. Use search to open a regional profile.";
      });
  }

  function renderZips() {
    if (!map || !geoData) return;
    if (zipLayer) zipLayer.remove();
    zipLayer = L.geoJSON(geoData, {
      style:feature => styleFor(feature.properties.ZCTA5CE10),
      onEachFeature:(feature, layer) => {
        const code = feature.properties.ZCTA5CE10;
        const z = D.zips[code];
        if (!z) return;
        layer.bindTooltip(`${code} · ${z.name}`, {
          sticky:true,
          direction:"top",
          className:"zip-tooltip"
        });
        layer.on({
          mouseover:e => {
            e.target.setStyle(styleFor(code, true));
            showProfile(code, e.originalEvent, false);
          },
          mousemove:e => positionCard(e.originalEvent),
          mouseout:e => {
            if (pinnedZip !== code) e.target.setStyle(styleFor(code));
            if (!pinnedZip) closeProfile();
          },
          click:e => {
            pinnedZip = code;
            showProfile(code, e.originalEvent, true);
            renderZips();
          }
        });
      }
    }).addTo(map);
  }

  function buildLayers() {
    const root = $("#layer-controls");
    Object.entries(D.layers).forEach(([id, view]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "layer-button";
      button.dataset.layer = id;
      button.textContent = view.label;
      button.setAttribute("aria-pressed", id === activeLayer);
      button.onclick = () => {
        activeLayer = id;
        $$(".layer-button").forEach(b => b.setAttribute("aria-pressed", String(b === button)));
        renderZips();
      };
      root.append(button);
    });
  }

  function showProfile(code, event, pin) {
    const z = D.zips[code];
    if (!z) return;
    $("#card-kicker").textContent = `ZIP ${code} · REGIONAL PROFILE`;
    $("#card-title").textContent = z.name;
    $("#card-era").textContent = z.era;
    $("#card-housing").textContent = z.housing;
    $("#card-sample").textContent = z.sample;
    $("#card-panel").textContent = z.panel;
    $("#card-code").textContent = z.code;
    $("#card-hazards").innerHTML = z.hazards.map(item => `<li>${item}</li>`).join("");
    $("#card-copy").textContent = z.copy;
    $("#map-card").hidden = false;
    $("#map-card").classList.toggle("pinned", pin);
    if (event) positionCard(event);
  }

  function positionCard(event) {
    if (!event || innerWidth <= 820 || pinnedZip) return;
    const card = $("#map-card");
    const rect = $(".map-app").getBoundingClientRect();
    const width = card.offsetWidth || 390;
    const height = card.offsetHeight || 500;
    const x = Math.min(Math.max(18, event.clientX - rect.left + 20), rect.width - width - 18);
    const y = Math.min(Math.max(92, event.clientY - rect.top - height / 2), rect.height - height - 20);
    card.style.left = `${x}px`;
    card.style.top = `${y}px`;
    card.style.right = "auto";
    card.style.bottom = "auto";
  }

  function closeProfile() {
    pinnedZip = null;
    $("#map-card").hidden = true;
    $("#map-card").classList.remove("pinned");
    $("#map-card").removeAttribute("style");
    renderZips();
  }

  function initSearch() {
    $("#location-form").addEventListener("submit", event => {
      event.preventDefault();
      const code = $("#location-input").value.trim();
      const z = D.zips[code];
      if (!z) {
        $("#search-status").textContent = "That ZIP is not included in this Southeast Houston release.";
        return;
      }
      pinnedZip = code;
      $("#search-status").textContent = `Showing ${z.name} · ${code}`;
      showProfile(code, null, true);
      if (map) {
        map.flyTo([z.lat, z.lng], 12, {animate:!reduced, duration:reduced ? 0 : 1.1});
        renderZips();
      }
    });
    $("#card-close").onclick = closeProfile;
  }

  function initDialog() {
    const dialog = $("#method-dialog");
    $("#method-open").onclick = () => dialog.showModal();
    $("#method-close").onclick = () => dialog.close();
    dialog.addEventListener("click", event => {
      if (event.target === dialog) dialog.close();
    });
  }

  function init() {
    buildLayers();
    initMap();
    initSearch();
    initDialog();
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
