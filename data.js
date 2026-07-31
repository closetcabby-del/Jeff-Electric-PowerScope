/*
 * PowerScope map data. Reviewed 2026-07-30.
 * Housing era: ACS 2020–2024 5-year, table B25034 (Year Structure Built).
 * Boundary geometry: Census 2010 ZCTA TIGER/Line-derived GeoJSON.
 * Code baseline: Texas TDLR 2023 NEC; local amendments may also apply.
 * Panel notes are era-linked possibilities, not observed property equipment.
 */
window.POWER_DATA = {
  zips: {
    "77502": {
      name:"Pasadena", lat:29.679, lng:-95.198, era:"Mid-century housing concentration",
      housing:"33.7% of housing units were built in the 1950s; 88.1% were built before 1990.",
      sample:"11,595 housing units · ACS 2024 5-year B25034",
      panel:"Era-linked possibilities include legacy fuse or early breaker equipment, original 60–100A services and later replacement panels.",
      code:"Texas uses the 2023 NEC minimum standard; Pasadena permits and local amendments govern new work.",
      hazards:["Unverified service alterations","Aging terminations or insulation","Moisture at outdoor equipment"],
      copy:"Housing age cannot identify a panel brand, service size, wiring method or condition at a specific home."
    },
    "77058": {
      name:"Clear Lake", lat:29.559, lng:-95.099, era:"1970s–1980s planned growth",
      housing:"The 1970s are the largest single decade at 25.1%; 64.8% of units were built before 1990.",
      sample:"11,168 housing units · ACS 2024 5-year B25034",
      panel:"Era-linked possibilities include 100–150A breaker services, remodel-added circuits and mixed generations of protective devices.",
      code:"Within Houston, new work follows Houston’s adopted 2023 NEC package and local amendments.",
      hazards:["Added loads on older designs","Exterior-equipment corrosion","Pool and outdoor GFCI protection"],
      copy:"The ZIP contains varied building types and renovation histories. These are screening topics, not findings."
    },
    "77581": {
      name:"Pearland", lat:29.558, lng:-95.284, era:"1990s–2000s expansion",
      housing:"The 2000s are the largest decade at 26.0%; 49.6% of units were built from 1990–2009.",
      sample:"18,633 housing units · ACS 2024 5-year B25034",
      panel:"Era-linked possibilities include 150–200A breaker services and panels expanded later for pools, workshops, solar or backup equipment.",
      code:"Pearland lists the 2023 NEC among its adopted codes; local amendments and permits also apply.",
      hazards:["Major loads added later","Pool-equipment protection","Generator transfer compatibility"],
      copy:"Newer construction does not establish present capacity. Added equipment and prior work still require field review."
    },
    "77546": {
      name:"Friendswood", lat:29.529, lng:-95.201, era:"1970s–2000s suburban mix",
      housing:"The 1980s are the largest single decade at 21.0%; 45.8% of units were built before 1990.",
      sample:"20,248 housing units · ACS 2024 5-year B25034",
      panel:"Era-linked possibilities include 100–200A breaker services across several generations, with remodel and pool-load additions.",
      code:"Texas’s 2023 NEC minimum applies; Friendswood permitting requirements and local amendments must be checked.",
      hazards:["Mixed-era additions and labeling","Pool or spa bonding","Storm and moisture exposure"],
      copy:"A wide construction-year spread makes a ZIP-level panel prediction especially uncertain."
    },
    "77598": {
      name:"Webster", lat:29.537, lng:-95.119, era:"1980s mixed-use concentration",
      housing:"The 1980s are the largest single decade at 36.0%; 63.5% of units were built before 1990.",
      sample:"13,594 housing units · ACS 2024 5-year B25034",
      panel:"Era-linked possibilities include 100–150A residential breaker services plus multifamily or mixed-use distribution systems.",
      code:"Webster lists the 2023 NEC among its adopted codes; permits and local requirements still control.",
      hazards:["Shared-building responsibility","Aging exterior disconnects","HVAC and commercial-load interaction"],
      copy:"Building management may control electrical equipment in multifamily properties."
    },
    "77002": {
      name:"Downtown Houston", lat:29.756, lng:-95.365, era:"2010s redevelopment concentration",
      housing:"48.1% of housing units were built in the 2010s, alongside a smaller stock of historic buildings.",
      sample:"9,439 housing units · ACS 2024 5-year B25034",
      panel:"Era-linked possibilities include modern unit panels, building switchgear and separately managed common-area systems.",
      code:"New work follows Houston’s adopted 2023 NEC package and local amendments.",
      hazards:["Building-managed equipment boundaries","Older conversion work","Standby-system coordination"],
      copy:"Downtown systems often differ from detached homes. Contact building management about shared systems."
    }
  },
  layers: {
    age:{label:"Housing Era",color:"#f4c84a",fill:"#f4c84a"},
    service:{label:"Service Patterns",color:"#5bd6ff",fill:"#296b86"},
    code:{label:"Code Context",color:"#79a6ff",fill:"#355cae"},
    screen:{label:"Screening Topics",color:"#ffad66",fill:"#9a4d28"}
  }
};
