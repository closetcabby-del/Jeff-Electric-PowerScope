window.POWER_LAB_DATA = {
  eras:[
    {year:"1975",copy:"Central air, an electric range, a dryer and basic entertainment become the evening’s major electrical story.",available:["ac","range","dryer"]},
    {year:"1995",copy:"More televisions, computers, pool equipment and countertop appliances join the home.",available:["ac","range","dryer","pool","workshop"]},
    {year:"2015",copy:"Home offices, larger kitchens, more electronics and specialty equipment become normal parts of daily life.",available:["ac","range","dryer","pool","workshop","heater"]},
    {year:"Today",copy:"EV charging, batteries, generators and increasingly electrified equipment can all share the same home.",available:["ac","range","dryer","pool","ev","workshop","heater","battery"]}
  ],
  equipment:[
    {id:"ac",name:"Central AC",icon:"❄",points:18,x:84,y:20,era:0},
    {id:"range",name:"Electric range",icon:"▦",points:15,x:43,y:68,era:0},
    {id:"dryer",name:"Electric dryer",icon:"◉",points:14,x:75,y:72,era:0},
    {id:"pool",name:"Pool equipment",icon:"≈",points:10,x:67,y:90,era:1},
    {id:"ev",name:"EV charger",icon:"⚡",points:24,x:86,y:69,era:3},
    {id:"workshop",name:"Workshop",icon:"◇",points:12,x:93,y:82,era:1},
    {id:"heater",name:"Electric heat",icon:"♨",points:22,x:52,y:37,era:2},
    {id:"battery",name:"Backup equipment",icon:"▣",points:16,x:94,y:54,era:3}
  ],
  scenarios:[
    {id:"summer",name:"100°F afternoon",icon:"☀",active:["ac","pool"],message:"The AC and pool equipment are carrying the Houston afternoon.",event:"dim"},
    {id:"dinner",name:"Family dinner",icon:"▦",active:["ac","range"],message:"Cooling and cooking overlap during the busiest part of the evening.",event:"dim"},
    {id:"laundry",name:"Laundry day",icon:"◉",active:["ac","dryer"],message:"The dryer joins an already-running cooling system.",event:"dim"},
    {id:"storm",name:"Thunderstorm",icon:"ϟ",active:["ac"],message:"A Gulf Coast thunderstorm moves across the neighborhood.",event:"storm"},
    {id:"hurricane",name:"Hurricane prep",icon:"◎",active:["ac","battery"],message:"Backup-power planning becomes part of the home’s electrical story.",event:"utility"},
    {id:"ev-night",name:"New EV night",icon:"⚡",active:["ac","ev"],message:"An EV begins a long charging session while the home stays active.",event:"dim"}
  ],
  events:{
    dim:{
      title:"The lights dipped when equipment started.",
      copy:"A slight, brief change can occur when a large motor starts. Repeated or pronounced changes across several rooms are worth documenting.",
      yes:{label:"SCHEDULE AN ELECTRICIAN",title:"A professional evaluation makes sense.",copy:"Write down which lights change, what equipment starts and how often it happens. Do not remove covers or perform live testing."},
      unsure:{label:"MONITOR",title:"Watch for a repeatable pattern.",copy:"Notice whether it affects one light or several rooms and what equipment is starting. You do not need to test anything."},
      no:{label:"EDUCATIONAL MOMENT",title:"Now you know what to recognize.",copy:"A simulated event cannot predict what will happen in your home. Keep normal changes and repeated whole-home patterns distinct."}
    },
    storm:{
      title:"The storm caused a brief flicker.",
      copy:"Storm-related voltage events and local utility interruptions are different from a problem isolated to one appliance or circuit.",
      yes:{label:"DOCUMENT THE PATTERN",title:"Separate neighborhood events from home-only symptoms.",copy:"If nearby homes are affected, check your utility’s outage information. Stay away from damaged service equipment and downed lines."},
      unsure:{label:"MONITOR",title:"Notice whether neighbors are affected.",copy:"That context can help distinguish a utility interruption from something limited to your home."},
      no:{label:"EDUCATIONAL MOMENT",title:"Storm conditions can change the next step.",copy:"The utility handles grid and service-line interruptions. An electrician handles concerns within the home after utility issues are ruled out."}
    },
    utility:{
      title:"The neighborhood power disappeared.",
      copy:"Backup equipment should use approved transfer equipment. A generator must never be improvised or used to backfeed a home.",
      yes:{label:"PLAN PROFESSIONALLY",title:"Request backup-power planning.",copy:"Use actual equipment ratings and approved transfer equipment. Never improvise a connection or energize a home through an outlet."},
      unsure:{label:"LEARN BEFORE BUYING",title:"Start with the equipment you want to support.",copy:"A professional can help define priorities, equipment ratings and an appropriate connection method."},
      no:{label:"EDUCATIONAL MOMENT",title:"Backup power begins with safe transfer equipment.",copy:"This simulation does not design a generator or battery system."}
    },
    activity:{
      title:"Several major loads are running together.",
      copy:"The animation is showing overlapping electrical activity—not available capacity and not a service-size calculation.",
      yes:{label:"REQUEST A LOAD CALCULATION",title:"Plan major additions from real equipment data.",copy:"An electrician can use equipment ratings, demand factors and the existing installation to perform a professional load calculation."},
      unsure:{label:"PLAN BEFORE INSTALLING",title:"Make a list of major existing equipment.",copy:"Bring model numbers or ratings for planned equipment to a professional. Do not rely on this illustrative score for sizing."},
      no:{label:"EDUCATIONAL MOMENT",title:"Modern life can overlap in unexpected ways.",copy:"The number of active devices alone does not determine electrical service requirements."}
    }
  }
};
