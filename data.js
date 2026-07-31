window.SIGNAL_DATA = {
  signals: [
    {
      id:"lights", room:"Living room", number:"01", name:"The lights change",
      icon:"✦", x:61, y:23, size:"185%", position:"63% 66%", effect:"dim",
      direction:"The air conditioner starts. Watch the room.",
      title:"The room dips for a moment.",
      intro:"A brief, slight change can happen when a large motor starts. Repeated or pronounced dimming across several rooms deserves attention.",
      question:"What are you noticing at home?",
      options:[
        ["One lamp or bulb acts differently","appliance"],
        ["Several lights dim or flicker together","electrician"],
        ["A switch buzzes, shocks or feels warm","priority"],
        ["Nothing unusual—I’m learning","routine"]
      ]
    },
    {
      id:"kitchen-outlet", room:"Kitchen", number:"02", name:"The outlet feels different",
      icon:"▥", x:29, y:57, size:"185%", position:"35% 66%", effect:"warm",
      direction:"The kitchen is quiet. One receptacle stands out.",
      title:"Warmth is a signal—not a test.",
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
      id:"panel", room:"Entry & electrical", number:"03", name:"The breaker keeps returning",
      icon:"▤", x:21, y:48, size:"190%", position:"4% 66%", effect:"pulse",
      direction:"A breaker has interrupted power more than once.",
      title:"A trip is the panel doing its job.",
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
      id:"ev", room:"Garage", number:"04", name:"The home takes on a new load",
      icon:"⚡", x:54, y:46, size:"185%", position:"96% 65%", effect:"charge",
      direction:"An EV arrives. The home’s daily demand changes.",
      title:"New equipment changes the conversation.",
      intro:"EV charging is a sustained major load. Planning should use actual equipment ratings, demand factors and the home’s existing loads.",
      question:"What stage are you in?",
      options:[
        ["Learning before choosing a charger","load"],
        ["Planning an installation","load"],
        ["An existing charger trips or becomes warm","priority"],
        ["Smoke, arcing or immediate danger","emergency"]
      ]
    },
    {
      id:"pool", room:"Backyard", number:"05", name:"Electricity meets water",
      icon:"≈", x:34, y:61, size:"118%", position:"50% 100%", effect:"water",
      direction:"Outside, water and electrical equipment share the same space.",
      title:"Distance is the safe first move.",
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
      id:"meter", room:"Outside service", number:"06", name:"The problem is bigger than one room",
      icon:"◉", x:77, y:40, size:"132%", position:"14% 72%", effect:"grid",
      direction:"Several rooms lose power. Nearby homes may be affected.",
      title:"Some signals belong to the utility.",
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
    routine:{label:"AWARENESS",title:"Keep noticing changes.",copy:"Nothing in that selection points to a specific problem. Continue normal use and pay attention if the pattern changes or repeats.",tone:"good"},
    appliance:{label:"CHECK THE APPLIANCE",title:"The equipment may be the first clue.",copy:"Stop using it if its cord, plug or receptacle becomes damaged, warm, smoky or produces a burning odor. Follow the manufacturer’s guidance or contact appliance service.",tone:"neutral"},
    electrician:{label:"SCHEDULE AN ELECTRICIAN",title:"A professional evaluation makes sense.",copy:"Write down what happened, when it happened and which equipment was running. Do not remove covers, touch wiring or perform energized testing.",tone:"attention"},
    priority:{label:"STOP & ARRANGE SERVICE",title:"Avoid using the affected equipment.",copy:"Repeated trips, heat, buzzing, corrosion, damage or electrical odors deserve prompt professional attention. Do not open or disassemble anything.",tone:"warning"},
    utility:{label:"CONTACT THE UTILITY",title:"Keep clear of service equipment.",copy:"Report partial or widespread loss of power, damaged meters, service-line concerns or tree contact to the utility. Stay away from downed conductors.",tone:"attention"},
    load:{label:"PLAN THE LOAD",title:"Request a professional load calculation.",copy:"Major equipment should be planned from actual ratings, demand factors and applicable code. This experience does not size an electrical service.",tone:"neutral"},
    emergency:{label:"IMMEDIATE DANGER",title:"Leave the area and call 911.",copy:"For active smoke, fire, arcing, shock near water, downed lines or immediate danger, move everyone to safety and call 911. This guide does not replace emergency services.",tone:"danger"}
  }
};
