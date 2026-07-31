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
 * ZIP coordinates are approximate centroids for map navigation only.
 */
window.POWER_DATA = {
  zips: {
    "77502": { name:"Pasadena", lat:29.679, lng:-95.198, era:"Postwar growth / mid-century housing", stat:"A community shaped by major postwar residential expansion.", copy:"Many Pasadena neighborhoods span several construction eras. Equipment, renovations and service changes vary home by home." },
    "77058": { name:"Clear Lake", lat:29.559, lng:-95.099, era:"1960s–1980s planned growth", stat:"Rapid growth followed the rise of the nearby space program.", copy:"Clear Lake combines mid-century neighborhoods, later subdivisions and newer infill—each with different electrical histories." },
    "77581": { name:"Pearland", lat:29.558, lng:-95.284, era:"1990s–2010s expansion", stat:"Large-scale suburban growth accelerated around the turn of the century.", copy:"Newer construction can still face changing demands as EV charging, pools, workshops and backup power are added." },
    "77546": { name:"Friendswood", lat:29.529, lng:-95.201, era:"1970s–2000s suburban growth", stat:"Housing spans established subdivisions and newer development.", copy:"Construction year is only a starting clue. Remodels and major equipment additions can reshape a home's electrical story." },
    "77598": { name:"Webster", lat:29.537, lng:-95.119, era:"Mixed-era urban corridor", stat:"A compact community with residential and commercial growth across decades.", copy:"Mixed building ages and uses make regional context useful—but only an on-site assessment can describe a specific property." },
    "77002": { name:"Downtown Houston", lat:29.756, lng:-95.365, era:"Historic core / continual redevelopment", stat:"Houston's urban core layers older structures with modern towers and conversions.", copy:"Dense urban systems differ greatly from detached homes. This view is broad construction-era context only." }
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
