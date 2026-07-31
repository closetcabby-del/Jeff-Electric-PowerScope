/* PowerScope public-data notes
 * Retrieved/reviewed: 2026-07-30.
 * EIA Texas residential annual average retail price (nominal cents/kWh),
 * Form EIA-861 / Electric Sales, Revenue and Average Price:
 * https://www.eia.gov/electricity/sales_revenue_price/
 * Values below are annual statewide residential averages.
 * USFA 2024 residential building fire causes: electrical malfunction 7.7%:
 * https://www.usfa.fema.gov/statistics/
 * ERCOT selected yearly peak-demand records:
 * https://www.ercot.com/static-assets/data/news/content/a-peak-demand/all-time-records.htm
 * ZIP/ZCTA housing-era context: 2020–2024 ACS 5-year, table B25034
 * (Year Structure Built), retrieved 2026-07-30 through Census Reporter:
 * https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25034
 * Boundary geometry: U.S. Census 2010 ZCTA TIGER/Line-derived GeoJSON,
 * extracted to assets/southeast-houston-zips.geojson. ZCTAs approximate
 * postal service areas; they are not parcel, inspection or panel records.
 * Panel/service notes are era-linked screening possibilities, not ACS fields
 * and not claims that a particular panel exists at an address.
 * Current-code context: Texas TDLR 2023 NEC minimum standard; municipal
 * amendments and permitting rules may also apply:
 * https://www.tdlr.texas.gov/electricians/compliance-guide.htm
 */
window.POWER_DATA = {
  zips: {
    "77502": {
      name:"Pasadena", lat:29.679, lng:-95.198, era:"Mid-century housing concentration",
      housing:"33.7% of housing units were built in the 1950s; 88.1% were built before 1990.",
      sample:"11,595 housing units · ACS 2024 5-year B25034",
      panel:"Era-linked possibilities: legacy fuse or early breaker equipment, original 60–100A services, and later replacement panels.",
      code:"Texas uses the 2023 NEC minimum standard; Pasadena permits and local amendments govern new work.",
      hazards:["Unverified service alterations","Aging terminations or damaged insulation","Moisture and outdoor-equipment exposure"],
      copy:"Housing age can guide questions, but it cannot identify a panel brand, service size, wiring method or condition at a home."
    },
    "77058": {
      name:"Clear Lake", lat:29.559, lng:-95.099, era:"1970s–1980s planned growth",
      housing:"The 1970s are the largest single decade at 25.1%; 64.8% of units were built before 1990.",
      sample:"11,168 housing units · ACS 2024 5-year B25034",
      panel:"Era-linked possibilities: 100–150A breaker services, remodel-added circuits, and mixed generations of protective devices.",
      code:"Within Houston, new work follows Houston’s adopted 2023 NEC package and local amendments.",
      hazards:["Added loads on older designs","Corrosion near exterior equipment","Pool and outdoor GFCI protection"],
      copy:"The ZIP contains many building types and renovation histories. These are screening topics, not findings."
    },
    "77581": {
      name:"Pearland", lat:29.558, lng:-95.284, era:"1990s–2000s expansion",
      housing:"The 2000s are the largest decade at 26.0%; 49.6% of units were built from 1990–2009.",
      sample:"18,633 housing units · ACS 2024 5-year B25034",
      panel:"Era-linked possibilities: 150–200A breaker services and panels expanded later for pools, workshops, solar or backup equipment.",
      code:"Pearland lists the 2023 NEC among its adopted codes; local amendments and permits also apply.",
      hazards:["Major loads added after construction","Outdoor and pool-equipment protection","Generator transfer and interlock compatibility"],
      copy:"Newer construction does not establish present capacity. Added equipment and prior work still require field review."
    },
    "77546": {
      name:"Friendswood", lat:29.529, lng:-95.201, era:"1970s–2000s suburban mix",
      housing:"The 1980s are the largest single decade at 21.0%; 45.8% of units were built before 1990.",
      sample:"20,248 housing units · ACS 2024 5-year B25034",
      panel:"Era-linked possibilities: 100–200A breaker services across several generations, with remodel and pool-load additions.",
      code:"Texas’s 2023 NEC minimum applies; Friendswood permitting requirements and local amendments must be checked.",
      hazards:["Mixed-era additions and labeling","Pool or spa bonding and GFCI protection","Storm and moisture exposure"],
      copy:"A wide construction-year spread makes a ZIP-level panel prediction especially uncertain."
    },
    "77598": {
      name:"Webster", lat:29.537, lng:-95.119, era:"1980s mixed-use concentration",
      housing:"The 1980s are the largest single decade at 36.0%; 63.5% of units were built before 1990.",
      sample:"13,594 housing units · ACS 2024 5-year B25034",
      panel:"Era-linked possibilities: 100–150A residential breaker services plus multifamily or mixed-use distribution systems.",
      code:"Webster lists the 2023 NEC among its adopted codes; permits and local requirements still control.",
      hazards:["Shared-building responsibility","Aging exterior disconnects","HVAC and commercial-load interaction"],
      copy:"The ZCTA includes varied occupancy types. Building management may control equipment in multifamily properties."
    },
    "77002": {
      name:"Downtown Houston", lat:29.756, lng:-95.365, era:"2010s redevelopment concentration",
      housing:"48.1% of housing units were built in the 2010s, alongside a smaller stock of historic buildings.",
      sample:"9,439 housing units · ACS 2024 5-year B25034",
      panel:"Era-linked possibilities: modern unit panels, building switchgear and separately managed common-area electrical systems.",
      code:"New work follows Houston’s adopted 2023 NEC package and local amendments.",
      hazards:["Building-managed equipment boundaries","Older conversion work","Emergency and standby-system coordination"],
      copy:"Downtown systems often differ from detached homes. Contact building management before arranging work on shared systems."
    }
  },
  layers: {
    age:{ label:"Home Age", icon:"⌂", stat:"Houston was built in layers", copy:"Regional development ranges from historic urban blocks to postwar neighborhoods and fast-growing outer communities. Year built does not reveal a home's current wiring or service." },
    cost:{ label:"Power Cost", icon:"¢", stat:"14.94¢ per kWh in 2024", copy:"Texas's annual residential average revenue per kWh rose from 10.98¢ in 2015 to 14.94¢ in 2024. Your retail plan and usage determine your bill." },
    storm:{ label:"Storm History", icon:"≈", stat:"A region shaped by severe weather", copy:"Gulf Coast homes plan around wind, rain, flooding and outages. Map effects are regional storm context—not local outage records or predictions." },
    safety:{ label:"Electrical Safety", icon:"ϟ", stat:"7.7% national share", copy:"USFA attributes 7.7% of 2024 U.S. residential building fires to electrical malfunction. This national statistic cannot predict an individual home's risk." }
  },
  eras:[
    {id:"1970s",service:"100A",percent:42,kicker:"1970s / FOUNDATIONAL LOAD",title:"Comfort becomes electric.",copy:"Central air and major appliances became core household infrastructure, while entertainment remained comparatively simple.",loads:["Central A/C","Electric range","Electric dryer","Television"]},
    {id:"1990s",service:"150A",percent:62,kicker:"1990s / MORE OF EVERYTHING",title:"Homes fill with circuits.",copy:"Larger entertainment systems, computers, pools and more kitchen equipment expanded how—and when—homes used power.",loads:["Home computers","Pool equipment","Microwaves","Entertainment systems"]},
    {id:"2010s",service:"200A",percent:82,kicker:"2010s / ALWAYS CONNECTED",title:"The home becomes a platform.",copy:"Home offices, connected devices and larger appliance packages made electrical demand more continuous and varied.",loads:["Home office","Multiple screens","Modern kitchens","Workshop tools"]},
    {id:"Today",service:"200A+",percent:100,kicker:"TODAY / ELECTRIFIED LIFE",title:"Power moves beyond the house.",copy:"Transportation, resilience and storage can introduce large new loads—often long after the original electrical system was designed.",loads:["EV charging","Battery storage","Generators","Hot tubs"]}
  ],
  prices:[
    {year:2015,value:10.98},{year:2016,value:10.96},{year:2017,value:11.18},{year:2018,value:11.20},{year:2019,value:11.86},
    {year:2020,value:11.99},{year:2021,value:12.11},{year:2022,value:13.76},{year:2023,value:14.58},{year:2024,value:14.94}
  ],
  demand:[
    {year:2000,value:57606},{year:2005,value:60274},{year:2010,value:65776},{year:2015,value:69877},{year:2019,value:74820},{year:2022,value:80148},{year:2023,value:85508}
  ],
  loads:[
    {id:"ac",label:"Central air conditioning",icon:"❄",points:11},
    {id:"dryer",label:"Electric dryer",icon:"◉",points:8},
    {id:"range",label:"Electric range",icon:"▦",points:9},
    {id:"ev",label:"EV charger",icon:"↯",points:18},
    {id:"pool",label:"Pool equipment",icon:"≈",points:10},
    {id:"hot-tub",label:"Hot tub",icon:"♨",points:13},
    {id:"workshop",label:"Home workshop",icon:"◇",points:10},
    {id:"heat",label:"Electric heating",icon:"☼",points:17},
    {id:"backup",label:"Generator or battery equipment",icon:"▣",points:14}
  ]
};
