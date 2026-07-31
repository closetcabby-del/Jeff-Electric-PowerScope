window.SIGNAL_DATA = {
  signals: [
    {
      id:"lights", room:"Living room", number:"01", name:"Why do my lights dim when the AC starts?",
      icon:"✦", x:61, y:23, size:"185%", position:"63% 66%", effect:"dim",
      direction:"It’s a 100°F Houston afternoon. The air conditioner starts.",
      title:"The AC starts—and the room dips.",
      intro:"A brief, slight change can happen when a large motor starts. That does not automatically mean something is wrong. If several lights repeatedly or noticeably change together, write down the pattern and arrange an evaluation.",
      question:"What are you noticing at home?",
      options:[
        ["One lamp or bulb acts differently","appliance"],
        ["Several lights dim or flicker together","electrician"],
        ["A switch buzzes, shocks or feels warm","priority"],
        ["Nothing unusual—I’m learning","routine"]
      ]
    },
    {
      id:"kitchen-outlet", room:"Kitchen", number:"02", name:"This outlet seems warm. Is that normal?",
      icon:"▥", x:29, y:57, size:"185%", position:"35% 66%", effect:"warm",
      direction:"Dinner is cooking. One kitchen receptacle seems different.",
      title:"Something about this outlet changed.",
      intro:"Never touch an outlet to check for heat. If warmth was noticed during normal use, or there is buzzing, discoloration or odor, stop using the affected equipment.",
      question:"Which observation is closest?",
      options:[
        ["A GFCI will not reset or trips repeatedly","electrician"],
        ["Warmth, buzzing or discoloration was noticed","priority"],
        ["Smoke, sparks or a burning odor","emergency"],
        ["Nothing unusual—I’m learning","routine"]
      ]
    },
    {
      id:"panel", room:"Entry & electrical", number:"03", name:"Why does this breaker keep tripping?",
      icon:"▤", x:21, y:48, size:"190%", position:"4% 66%", effect:"pulse",
      direction:"The microwave and another appliance are running. The power stops again.",
      title:"The same breaker interrupted power again.",
      intro:"Repeated trips are a reason to understand the circuit and connected equipment. Do not hold a breaker on, remove the cover or perform live testing.",
      question:"What can you observe from the closed panel?",
      options:[
        ["One trip tied to one malfunctioning appliance","appliance"],
        ["The same breaker trips repeatedly","electrician"],
        ["Buzzing, rust, warmth or discoloration","priority"],
        ["Smoke, arcing or a burning odor","emergency"]
      ]
    },
    {
      id:"ev", room:"Garage", number:"04", name:"Can my home handle an EV charger?",
      icon:"⚡", x:54, y:46, size:"185%", position:"96% 65%", effect:"charge",
      direction:"A new EV arrives beside the dryer and workshop equipment.",
      title:"Your daily routine is adding a major load.",
      intro:"EV charging, generators, electric ranges and other major equipment can change how a home uses power. Planning should use actual equipment ratings, demand factors and existing loads—not a quick online score.",
      question:"What stage are you in?",
      options:[
        ["Learning before choosing a charger","load"],
        ["Planning an installation","load"],
        ["An existing charger trips or becomes warm","priority"],
        ["Smoke, arcing or immediate danger","emergency"]
      ]
    },
    {
      id:"pool", room:"Backyard", number:"05", name:"What should I watch for around my pool?",
      icon:"≈", x:34, y:61, size:"118%", position:"50% 100%", effect:"water",
      direction:"After Houston heat and heavy rain, the pool equipment starts.",
      title:"Water changes what “checking it” safely means.",
      intro:"Pool and hot-tub systems depend on appropriate GFCI protection, bonding and professional installation. Never enter water to investigate an electrical symptom.",
      question:"What was noticed?",
      options:[
        ["Planning a pool, hot tub or equipment change","load"],
        ["Protection trips or equipment looks corroded","priority"],
        ["Any shock or tingling sensation near water","emergency"],
        ["Nothing unusual—I’m learning","routine"]
      ]
    },
    {
      id:"meter", room:"Outside service", number:"06", name:"Half my house lost power. Who do I call?",
      icon:"◉", x:77, y:40, size:"132%", position:"14% 72%", effect:"grid",
      direction:"A thunderstorm passes. Several rooms lose power at once.",
      title:"This may be bigger than one circuit.",
      intro:"Partial or widespread power loss, damaged service equipment and downed conductors may involve the electric utility rather than a circuit inside the home.",
      question:"What best describes the situation?",
      options:[
        ["Neighbors also appear to have lost power","utility"],
        ["Only part of my home has power","utility"],
        ["A downed line or damaged meter is visible","emergency"],
        ["Nothing unusual—I’m learning","routine"]
      ]
    }
  ],
  outcomes: {
    routine:{label:"MONITOR",title:"Keep it on your awareness list.",copy:"Nothing in that selection points to a specific electrical problem. Continue normal use and pay attention if the pattern becomes stronger, happens more often or spreads to other equipment.",tone:"good"},
    appliance:{label:"CHECK THE APPLIANCE",title:"The equipment may be the first clue.",copy:"Stop using it if its cord, plug or receptacle becomes damaged, warm, smoky or produces a burning odor. Follow the manufacturer’s guidance or contact appliance service.",tone:"neutral"},
    electrician:{label:"SCHEDULE AN ELECTRICIAN",title:"This is where an electrician should take over.",copy:"Write down what happened, when it happened and which equipment was running. That information is useful. Do not remove covers, touch wiring or perform energized testing.",tone:"attention"},
    priority:{label:"STOP & ARRANGE SERVICE",title:"Avoid using the affected equipment.",copy:"Repeated trips, heat, buzzing, corrosion, damage or electrical odors deserve prompt professional attention. Do not open or disassemble anything.",tone:"warning"},
    utility:{label:"CONTACT THE UTILITY",title:"Keep clear of service equipment.",copy:"Report partial or widespread loss of power, damaged meters, service-line concerns or tree contact to the utility. Stay away from downed conductors.",tone:"attention"},
    load:{label:"PLAN THE LOAD",title:"Request a professional load calculation.",copy:"Major equipment should be planned from actual ratings, demand factors and applicable code. This experience does not size an electrical service.",tone:"neutral"},
    emergency:{label:"IMMEDIATE DANGER",title:"Leave the area and call 911.",copy:"For active smoke, fire, arcing, shock near water, downed lines or immediate danger, move everyone to safety and call 911. This guide does not replace emergency services.",tone:"danger"}
  }
};
