/*
  EDIT-ME-content.js
  ------------------------------------------------------------
  This is the main file you edit.
  You usually do NOT need to edit the HTML, CSS, or JS files.

  Quick edits:
  - Change site text in site: { ... }
  - Change demo reel video in site.demoReelEmbed
  - Change resume PDF path in site.resumeUrl
  - Change project order by editing each project's order number
  - Change tags by editing the tags array
  - Add cover images to assets/images/ and write the path in coverImage
*/

window.PORTFOLIO_DATA = {
  site: {
    name: "Rui Qi",
    eyebrow: "Portfolio",
    title: "Gameplay Systems & Technical Design",
    subtitle: "Gameplay systems, combat prototypes, UI/economy loops, and interaction experiments.",
    intro: "I build playable prototypes in Unreal Engine, GameMaker, Unity, and UEFN, focusing on system logic, player feedback, and fast iteration.",
    email: "3150868896@qq.com",
    github: "https://github.com/RuiQiqq",
    linkedin: "#",
    resumeUrl: "assets/resume/Rui_Qi_Resume.pdf",

    // Put your 30–60 second montage embed here later.
    // YouTube example: "https://www.youtube.com/embed/VIDEO_ID"
    demoReelEmbed: "",
    demoReelLink: "#",
    demoReelCoverImage: ""
  },

  snapshot: [
    { label: "Focus", value: "Gameplay systems · Combat · UI/Economy · Interaction" },
    { label: "Tools", value: "UE5 Blueprint · GameMaker · Unity · UEFN" },
    { label: "Target", value: "Gameplay Designer / Technical Designer roles" }
  ],

  focusAreas: [
    {
      title: "Combat & Interaction",
      text: "Attack states, hit detection, enemy reactions, input timing, interaction logic, and combat feedback."
    },
    {
      title: "UI & Economy Systems",
      text: "Trading UI, inventory flow, price events, daily loops, and readable player decision pressure."
    },
    {
      title: "Prototype Implementation",
      text: "Unreal Blueprint, GameMaker GML, Unity basics, UEFN Verse, rapid playable tests, and iteration notes."
    },
    {
      title: "Modern Workflow",
      text: "AI-assisted debugging, implementation research, documentation support, and faster iteration with final decisions tested in-engine."
    }
  ],

  tags: {
    ue5: "UE5",
    blueprint: "Blueprint",
    combat: "Combat",
    hitDetection: "Hit Detection",
    enemyReaction: "Enemy Reaction",
    gamemaker: "GameMaker",
    gml: "GML",
    ui: "UI System",
    economy: "Economy",
    interaction: "Interaction",
    hardware: "Hardware",
    unity: "Unity",
    uefn: "UEFN",
    verse: "Verse",
    prototype: "Prototype",
    team: "Team Project",
    solo: "Solo Project",
    aiWorkflow: "AI-Assisted Workflow"
  },

  projects: [
    {
      id: "combat-system",
      order: 1,
      featured: true,
      library: true,
      title: "Third-Person Combat System Prototype",
      category: "Unreal Engine · Blueprint · Combat",
      role: "Technical Designer / Blueprint Implementation",
      summary: "A combat prototype focused on attack state flow, hit detection, enemy reactions, damage logic, cooldowns, and combat feedback.",
      tools: "Unreal Engine 5, Blueprint, Animation Montage, Gameplay State Logic",
      tags: ["ue5", "blueprint", "combat", "hitDetection", "enemyReaction", "prototype"],
      coverImage: "",
      videoEmbed: "",
      videoLink: "#",
      detail: {
        overview: "This is a third-person combat prototype focused on attack states, hit detection, enemy reactions, damage logic, cooldowns, and combat feedback. The project uses placeholder assets, while the main focus is gameplay system behavior and iteration.",
        whatIBuilt: [
          "Implemented attack input and combat state logic.",
          "Built hit detection and damage handling.",
          "Added enemy health, hit reaction, and death behavior.",
          "Tuned cooldown timing and attack windows.",
          "Connected combat events with readable player feedback."
        ],
        breakdown: [
          { label: "Input", text: "Player triggers attack actions through input events." },
          { label: "Logic", text: "The system checks combat state, cooldown, active hit window, and enemy overlap." },
          { label: "Feedback", text: "Enemies react through health loss, hit response, timing feedback, and combat state changes." },
          { label: "Iteration", text: "Attack timing and feedback values were adjusted to make the prototype easier to read." }
        ],
        challenges: [
          "Placeholder animations limited final visual polish, so the project focuses on system timing and feedback clarity.",
          "Future improvement: cleaner animation blending between locomotion and attack states."
        ],
        workflowNotes: "AI tools can be used for debugging support, implementation research, and documentation organization. Final design decisions, in-engine testing, and system tuning should remain under my own control."
      }
    },
    {
      id: "market-simulation",
      order: 2,
      featured: true,
      library: true,
      title: "Market Simulation UI Prototype",
      category: "GameMaker · UI · Economy",
      role: "Gameplay / UI Systems Designer",
      summary: "A desktop-style market game prototype with trading UI, inventory tracking, daily event-based price changes, and cash-flow game-over logic.",
      tools: "GameMaker, GML, UI State Management, Economy Simulation",
      tags: ["gamemaker", "gml", "ui", "economy", "prototype"],
      coverImage: "",
      videoEmbed: "",
      videoLink: "#",
      detail: {
        overview: "This project explores a trading interface and event-driven economy loop. Players buy and sell items while daily events affect price volatility and decision pressure.",
        whatIBuilt: [
          "Built popup UI behavior for item buy/sell interactions.",
          "Implemented inventory and cash tracking.",
          "Created event-based price change logic.",
          "Added day progression and game-over checks."
        ],
        breakdown: [
          { label: "Input", text: "Player selects an item, opens a modal, and enters buy/sell quantity." },
          { label: "Logic", text: "The system updates inventory, cash, and prices based on item data and daily events." },
          { label: "Feedback", text: "The UI displays price shifts, item ownership, cash state, and daily event impact." },
          { label: "Iteration", text: "Interface layout and modal hitboxes were adjusted to avoid accidental clicks and improve readability." }
        ],
        challenges: [
          "Modal UI layering required careful click handling so buttons under the popup would not accidentally trigger.",
          "Future improvement: clearer data visualization for price trends and event history."
        ],
        workflowNotes: "AI-assisted workflow can support debugging and documentation, but final UI behavior and game-loop tuning are tested directly in GameMaker."
      }
    },
    {
      id: "interactive-forging",
      order: 3,
      featured: true,
      library: true,
      title: "Interactive Forging Game Concept",
      category: "Interaction Design · Hardware Prototype",
      role: "Interaction Designer / Gameplay Concept Designer",
      summary: "A first-person forging concept connecting physical hammer input with digital gameplay feedback, impact detection, and responsive visual effects.",
      tools: "Sensor Planning, Physical Input, Game Feedback Design, Prototype Documentation",
      tags: ["interaction", "hardware", "prototype"],
      coverImage: "",
      videoEmbed: "",
      videoLink: "#",
      detail: {
        overview: "This concept connects physical input and digital game feedback through a first-person forging interaction. The player uses physical hammer actions while the game responds visually to impact timing and location.",
        whatIBuilt: [
          "Designed the interaction flow between physical input and game feedback.",
          "Planned sensor placement and impact-detection logic.",
          "Defined first-person feedback and visual response goals.",
          "Documented staged prototype goals for future development."
        ],
        breakdown: [
          { label: "Input", text: "The player physically strikes the hardware surface." },
          { label: "Logic", text: "Sensors detect strike position and strength, then send values to the game." },
          { label: "Feedback", text: "The game shows forging effects, impact response, and blade-state changes." },
          { label: "Iteration", text: "Future versions can expand into motion recognition and two-player interaction." }
        ],
        challenges: [
          "The concept requires hardware reliability, sensor calibration, and clear mapping between physical action and screen feedback.",
          "Future improvement: test multiple pressure sensors and define repeatable calibration steps."
        ],
        workflowNotes: "Documentation and implementation research can be AI-assisted, while hardware selection and interaction testing require physical prototyping."
      }
    },
    {
      id: "uefn-shooting-prototype",
      order: 4,
      featured: false,
      library: true,
      title: "UEFN Shooting Device Prototype",
      category: "UEFN · Verse · Gameplay Device",
      role: "Gameplay Prototype Designer",
      summary: "A smaller UEFN prototype exploring device logic, player scoring, and shooting-game interaction flow.",
      tools: "UEFN, Verse, Creative Devices",
      tags: ["uefn", "verse", "prototype"],
      coverImage: "",
      videoEmbed: "",
      videoLink: "#",
      detail: {
        overview: "A small UEFN prototype focused on device-based gameplay logic and score-driven interaction.",
        whatIBuilt: ["Connected devices for player interaction.", "Explored Verse-based gameplay logic.", "Tested simple scoring behavior."],
        breakdown: [
          { label: "Input", text: "Player interacts with targets or shooting devices." },
          { label: "Logic", text: "Verse and devices process interactions and update score." },
          { label: "Feedback", text: "The player receives score and device feedback." },
          { label: "Iteration", text: "Future improvement: clearer round flow and feedback timing." }
        ],
        challenges: ["Verse syntax and device event flow required careful debugging."],
        workflowNotes: "AI-assisted debugging can help compare syntax patterns, but testing must happen inside UEFN."
      }
    }
  ]
};
