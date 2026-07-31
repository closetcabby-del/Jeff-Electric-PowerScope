window.HOME_DATA = {
  rooms: [
    {
      id:"electrical", name:"Electrical & entry", icon:"ϟ", tone:"gold",
      intro:"Start with equipment you can observe without opening, touching or testing anything live.",
      items:[
        {id:"panel",name:"Electrical panel",icon:"▤",x:22,y:43,normal:"A closed, accessible panel with clear labeling and no unusual sound, odor, heat or visible damage.",look:["Repeated breaker trips","Buzzing or crackling","Rust, water marks or discoloration","A warm exterior or burning odor"],question:"What can you safely observe from outside the closed panel?",options:[["Nothing unusual","learn"],["Labels are unclear or breakers trip repeatedly","electrician"],["Buzzing, warmth, rust or discoloration","priority"],["Smoke, sparks or burning odor","emergency"]]},
        {id:"meter",name:"Electric meter",icon:"◉",x:73,y:35,normal:"A secured meter and exterior service equipment with no leaning parts, damaged covers or visible arcing.",look:["Loose or damaged enclosure","Tree contact near service lines","Buzzing or visible arcing","Downed service conductors"],question:"What do you notice without approaching damaged equipment?",options:[["Nothing unusual","learn"],["Loose cover, leaning equipment or tree contact","utility"],["Arcing, downed line or immediate danger","emergency"]]},
        {id:"surge",name:"Surge protection",icon:"↯",x:50,y:68,normal:"Whole-home surge protection is optional equipment intended to help manage transient voltage events.",look:["Whether protection is installed","Visible status indicator, if provided","Storm-related equipment concerns"],question:"What would you like help with?",options:[["Just learning","learn"],["I want whole-home surge protection","electrician"],["Equipment changed after a storm","priority"]]}
      ]
    },
    {
      id:"kitchen", name:"Kitchen", icon:"◫", tone:"blue",
      intro:"Water, heat and several major appliances make the kitchen an important place for safe observations.",
      items:[
        {id:"gfci",name:"GFCI receptacle",icon:"▥",x:22,y:55,normal:"GFCI protection is commonly used where electricity may be near water. Use only visible test/reset controls according to the label.",look:["Will not reset","Repeatedly trips","Cracks or discoloration","Warmth, buzzing or burning odor"],question:"What did you notice?",options:[["Nothing unusual","learn"],["One appliance causes it to trip","appliance"],["It will not reset or repeatedly trips","electrician"],["Warmth, buzzing, smoke or burning odor","emergency"]]},
        {id:"range",name:"Electric range",icon:"▦",x:52,y:48,normal:"An electric range is a major load that should have a dedicated, correctly installed connection.",look:["Breaker trips while cooking","Loose or damaged receptacle","Heat or discoloration near connection","Planned replacement with higher-rated equipment"],question:"What best matches your situation?",options:[["Everything works normally","learn"],["Only the appliance behaves strangely","appliance"],["Breaker trips or connection looks damaged","priority"],["I am upgrading the range","load"]]},
        {id:"fridge",name:"Refrigerator",icon:"▯",x:80,y:38,normal:"A refrigerator should operate without repeatedly tripping protection, producing electrical odors or heating its receptacle.",look:["Repeated trips","Damaged cord or plug","Warm receptacle","Buzzing from the outlet rather than appliance"],question:"What did you notice?",options:[["Nothing unusual","learn"],["The appliance alone is noisy or malfunctioning","appliance"],["Outlet is warm, damaged or repeatedly loses power","electrician"],["Smoke, sparks or burning odor","emergency"]]}
      ]
    },
    {
      id:"living", name:"Living room", icon:"▱", tone:"violet",
      intro:"Entertainment equipment, extension cords and portable heaters can concentrate demand in one area.",
      items:[
        {id:"power-strip",name:"Power strip",icon:"•••",x:28,y:68,normal:"A listed power strip should plug directly into a wall receptacle and remain cool and undamaged.",look:["Multiple strips connected together","Heat or discoloration","Damaged cord","High-wattage appliance connected"],question:"What do you see?",options:[["One undamaged strip used normally","learn"],["Several strips or extension cords connected together","priority"],["Warmth, melting, sparks or burning odor","emergency"]]},
        {id:"lights",name:"Lights",icon:"✦",x:50,y:25,normal:"Lights may change slightly with normal voltage variation, but persistent flickering or pronounced dimming deserves attention.",look:["One loose or failing bulb","Several lights flicker together","Dimming when equipment starts","Buzzing at a switch"],question:"Which observation is closest?",options:[["No issue","learn"],["One lamp or bulb acts up","appliance"],["Several lights flicker or dim repeatedly","electrician"],["Switch buzzes, shocks or feels warm","priority"]]},
        {id:"heater",name:"Space heater",icon:"♨",x:76,y:62,normal:"Portable heaters draw substantial power and should plug directly into an appropriate wall receptacle—not an extension cord or power strip.",look:["Extension cord or power-strip use","Warm plug or receptacle","Discoloration","Repeated breaker trips"],question:"What did you notice?",options:[["Direct wall connection and no issues","learn"],["Extension cord or power strip is being used","priority"],["Warmth, melting, smoke or burning odor","emergency"]]}
      ]
    },
    {
      id:"bath", name:"Bathroom", icon:"◒", tone:"cyan",
      intro:"Keep observations simple around water: never open covers or handle electrical equipment while wet.",
      items:[
        {id:"bath-gfci",name:"Bathroom GFCI",icon:"▥",x:28,y:47,normal:"Bathroom receptacles generally use GFCI protection to reduce shock risk.",look:["Will not reset","Trips repeatedly","Loose face or cracks","Warmth or discoloration"],question:"What did you notice?",options:[["Nothing unusual","learn"],["Will not reset or repeatedly trips","electrician"],["Warmth, buzzing or discoloration","priority"],["Smoke, sparks or burning odor","emergency"]]},
        {id:"fan",name:"Exhaust fan",icon:"✣",x:68,y:26,normal:"A fan should run without electrical odor, sparking or pronounced grinding at the switch or fan housing.",look:["Stopped airflow","Loud mechanical noise","Switch warmth or buzzing","Burning odor"],question:"What best matches?",options:[["Runs normally","learn"],["Only airflow or mechanical noise changed","appliance"],["Switch or wiring symptoms are present","electrician"],["Smoke or burning odor","emergency"]]}
      ]
    },
    {
      id:"bedroom", name:"Bedroom", icon:"▰", tone:"rose",
      intro:"Bedrooms often reveal overloaded extension-cord use, loose outlets and recurring lighting symptoms.",
      items:[
        {id:"bed-outlet",name:"Wall receptacle",icon:"▥",x:27,y:60,normal:"A receptacle should hold plugs securely and show no cracks, discoloration, warmth, buzzing or sparking.",look:["Plug falls out easily","Face is cracked","Warmth or buzzing","Visible sparks"],question:"What did you notice?",options:[["Nothing unusual","learn"],["Plug feels loose or face is cracked","electrician"],["Warmth, buzzing or repeated power loss","priority"],["Smoke, sparks or burning odor","emergency"]]},
        {id:"ceiling-fan",name:"Ceiling fan",icon:"✣",x:54,y:25,normal:"A fan should operate without electrical odor, switch buzzing or pronounced flicker.",look:["Mechanical wobble","Light flickers","Switch is warm","Burning odor"],question:"What best matches?",options:[["Works normally","learn"],["Only mechanical wobble or noise","appliance"],["Switch warmth, buzzing or repeated flicker","electrician"],["Smoke or burning odor","emergency"]]},
        {id:"cord",name:"Extension cord",icon:"⌁",x:78,y:67,normal:"Extension cords are temporary wiring and should remain visible, undamaged and appropriately used.",look:["Under rugs or furniture","Pinched or damaged insulation","Permanent everyday use","Warm plug or connector"],question:"What do you see?",options:[["Temporary, visible and undamaged","learn"],["Under a rug, pinched or used permanently","priority"],["Warmth, melting, sparks or burning odor","emergency"]]}
      ]
    },
    {
      id:"garage", name:"Garage & laundry", icon:"▣", tone:"orange",
      intro:"Large appliances, tools and EV charging can significantly change a home’s electrical demands.",
      items:[
        {id:"dryer",name:"Electric dryer",icon:"◉",x:22,y:48,normal:"An electric dryer is a major load with a dedicated connection. Electrical symptoms and lint-related maintenance are separate concerns.",look:["Breaker trips","Warm or damaged plug","Loose receptacle","Planned appliance change"],question:"What best matches?",options:[["Works normally","learn"],["Only the appliance has a mechanical issue","appliance"],["Trips or connection looks damaged","priority"],["I am changing or adding equipment","load"]]},
        {id:"ev",name:"EV charger",icon:"⚡",x:53,y:42,normal:"EV charging is a sustained major load that should be planned from equipment ratings and a professional load calculation.",look:["Use of adapters or extension cords","Warm plug or receptacle","Repeated trips","Planned installation"],question:"What are you doing?",options:[["Learning before buying","load"],["Planning an installation","load"],["Existing charger trips or becomes warm","priority"],["Smoke, arcing or immediate danger","emergency"]]},
        {id:"tools",name:"Workshop tools",icon:"◇",x:80,y:62,normal:"Larger tools may need dedicated circuits and appropriate protection for the garage environment.",look:["Lights dim strongly at startup","Repeated trips","Damaged cords","Multiple high-load tools on one circuit"],question:"What did you notice?",options:[["Occasional use with no issue","learn"],["Repeated dimming or breaker trips","electrician"],["Damaged cord, heat or burning odor","priority"]]}
      ]
    },
    {
      id:"outside", name:"Backyard", icon:"≈", tone:"aqua",
      intro:"Outdoor equipment needs protection from water, weather and physical damage.",
      items:[
        {id:"pool",name:"Pool equipment",icon:"≈",x:26,y:55,normal:"Pool electrical systems depend on proper GFCI protection, bonding and equipment installation.",look:["GFCI trips","Corrosion or damaged covers","Shocks or tingling sensation","Planned pump or heater change"],question:"What did you notice?",options:[["No visible issue","learn"],["Planning new pool or equipment","load"],["Trips, corrosion or damaged equipment","priority"],["Shock or tingling near water","emergency"]]},
        {id:"outdoor",name:"Outdoor receptacle",icon:"▥",x:57,y:38,normal:"Outdoor receptacles should have suitable covers and protection for wet or damp conditions.",look:["Broken or missing cover","Water inside enclosure","Will not reset","Warmth or discoloration"],question:"What do you see?",options:[["Covered and undamaged","learn"],["Cover is broken or GFCI will not reset","electrician"],["Water, heat, buzzing or discoloration","priority"]]},
        {id:"hot-tub",name:"Hot tub",icon:"♨",x:78,y:65,normal:"Hot tubs combine water and a major electrical load and require professional installation and protective measures.",look:["Planned installation","Repeated trips","Corrosion","Tingling or shock"],question:"What is happening?",options:[["Planning an installation","load"],["Trips or visible corrosion","priority"],["Any tingling or shock sensation","emergency"]]}
      ]
    },
    {
      id:"attic", name:"Attic & exterior", icon:"⌂", tone:"lime",
      intro:"Do not enter unsafe attic spaces or approach service conductors. Observe only from a safe location.",
      items:[
        {id:"hvac",name:"HVAC equipment",icon:"❄",x:26,y:52,normal:"Heating and cooling equipment is a major load with dedicated disconnecting and protective equipment.",look:["Breaker trips","Disconnect looks damaged","Electrical odor","Planned replacement"],question:"What best matches?",options:[["Runs normally","learn"],["Only cooling performance changed","appliance"],["Trips or disconnect looks damaged","priority"],["Replacing or adding equipment","load"]]},
        {id:"attic-wire",name:"Visible attic wiring",icon:"⌁",x:55,y:34,normal:"Only observe from a safe, accessible location. Wiring should not appear damaged, scorched or exposed.",look:["Rodent or physical damage","Open boxes or exposed conductors","Scorch marks","Unsafe access conditions"],question:"What can you safely see without approaching?",options:[["Nothing concerning","learn"],["Damage or open electrical boxes","priority"],["Smoke, glowing or active arcing","emergency"]]},
        {id:"generator",name:"Generator connection",icon:"▣",x:79,y:61,normal:"A generator connection requires approved transfer equipment that prevents unsafe backfeeding.",look:["No transfer equipment visible","Improvised cords","Planned installation","Damaged inlet or enclosure"],question:"What is your situation?",options:[["Considering backup power","load"],["Existing inlet looks damaged","priority"],["Improvised connection or backfeeding concern","emergency"]]}
      ]
    }
  ],
  outcomes:{
    learn:{label:"LOOKS ROUTINE",title:"Keep it on your awareness list.",copy:"Nothing in that observation suggests a specific electrical problem. Continue normal use and watch for changes.",tone:"good"},
    appliance:{label:"CHECK THE APPLIANCE",title:"The equipment may be the first place to look.",copy:"Stop using it if the cord, plug or receptacle becomes hot, damaged, smoky or produces a burning odor. Follow the manufacturer’s guidance or contact appliance service.",tone:"neutral"},
    electrician:{label:"SCHEDULE AN ELECTRICIAN",title:"A professional evaluation makes sense.",copy:"Document what you noticed and when it happens. Do not remove covers, touch wiring or perform energized testing.",tone:"attention"},
    priority:{label:"STOP & ARRANGE SERVICE",title:"Avoid using the affected equipment.",copy:"Heat, repeated trips, damage, corrosion, buzzing or electrical odors deserve prompt professional attention. Do not open or disassemble anything.",tone:"warning"},
    utility:{label:"CONTACT THE UTILITY",title:"Keep clear of exterior service equipment.",copy:"Report loose service equipment, damaged meter enclosures, tree contact or service-line concerns to the utility. Stay away from downed conductors.",tone:"attention"},
    load:{label:"PLAN THE LOAD",title:"Request a professional load calculation.",copy:"Major equipment should be planned from actual ratings, demand factors and applicable code. This guide does not size a service.",tone:"neutral"},
    emergency:{label:"IMMEDIATE DANGER",title:"Leave the area and call 911.",copy:"For active smoke, fire, arcing, shock near water, downed lines or immediate danger, move everyone to safety and call 911. This guide does not replace emergency services.",tone:"danger"}
  }
};
