/*
  Rui Qi Portfolio Data
  =====================
  你以后主要改这个文件。
  不需要改 HTML / CSS / JS 结构。

  常用改法：
  1. 改首页标题：改 SITE.heroTitle / subtitle / description
  2. 改项目顺序：改 PROJECTS 里的 order 数字
  3. 改项目标签：改 tags: ["ue5", "blueprint"]
  4. 改首页精选：featured: true / false
  5. 改视频：videoEmbed 和 videoLink
  6. 新增项目：复制一个 PROJECTS 里的项目对象，改 id/title/order 等
*/

const SITE = {
  name: "Rui Qi",
  brand: "Rui Qi Systems Lab",
  role: "Technical Designer Portfolio",
  heroTitle: "Gameplay systems, combat prototypes, UI/economy loops, and interaction experiments.",
  description:
    "I build playable prototypes in Unreal Engine, GameMaker, Unity, and UEFN, using modern tools and AI-assisted workflows to speed up debugging, documentation, and iteration.",
  email: "3150868896@qq.com",
  github: "https://github.com/RuiQiqq",
  linkedin: "#",
  resume: "assets/resume/Rui_Qi_Resume.pdf",
  demoReelEmbed: "",
  demoReelLink: "#",
  location: "Salt Lake City, UT",
  footerNote: "Technical Designer Portfolio · Built with GitHub Pages"
};

const TAGS = {
  // Engines / Tools
  ue5: { label: "UE5", group: "Engine / Tool" },
  blueprint: { label: "Blueprint", group: "Engine / Tool" },
  unity: { label: "Unity", group: "Engine / Tool" },
  csharp: { label: "C#", group: "Engine / Tool" },
  gamemaker: { label: "GameMaker", group: "Engine / Tool" },
  gml: { label: "GML", group: "Engine / Tool" },
  uefn: { label: "UEFN", group: "Engine / Tool" },
  verse: { label: "Verse", group: "Engine / Tool" },

  // Systems
  combat: { label: "Combat System", group: "System" },
  hitDetection: { label: "Hit Detection", group: "System" },
  enemyReaction: { label: "Enemy Reaction", group: "System" },
  ui: { label: "UI System", group: "System" },
  economy: { label: "Economy", group: "System" },
  inventory: { label: "Inventory", group: "System" },
  interaction: { label: "Interaction", group: "System" },
  hardware: { label: "Hardware Prototype", group: "System" },
  input: { label: "Input System", group: "System" },
  feedback: { label: "Player Feedback", group: "System" },

  // Workflow / Role
  technicalDesign: { label: "Technical Design", group: "Role / Workflow" },
  gameplayDesign: { label: "Gameplay Design", group: "Role / Workflow" },
  rapidPrototype: { label: "Rapid Prototyping", group: "Role / Workflow" },
  prototype: { label: "Prototype", group: "Role / Workflow" },
  teamProject: { label: "Team Project", group: "Role / Workflow" },
  soloProject: { label: "Solo Project", group: "Role / Workflow" },
  aiWorkflow: { label: "AI-Assisted Workflow", group: "Role / Workflow" }
};

const TECHNICAL_FOCUS = [
  {
    title: "Combat & Interaction",
    text: "Attack states, hit detection, enemy reactions, input timing, interaction logic, and combat feedback."
  },
  {
    title: "UI & Economy Systems",
    text: "Trading UI, inventory flow, price events, daily loops, and readable player decision pressure."
  },
  {
    title: "Prototyping & Implementation",
    text: "Unreal Blueprint, GameMaker GML, Unity basics, UEFN Verse, rapid playable tests, and iteration notes."
  },
  {
    title: "Modern Workflow",
    text: "AI-assisted debugging, implementation research, documentation support, and faster iteration while keeping final design decisions in-engine."
  }
];

const LAB_NOTES = [
  {
    title: "Design Lens",
    text: "I often break systems into player input, system logic, feedback, and iteration points."
  },
  {
    title: "Systems I Study",
    text: "Combat feel, UI state flow, economy pressure, physical interaction, enemy response, and player-readable feedback."
  },
  {
    title: "Current Learning",
    text: "Improving Blueprint architecture, cleaner prototype presentation, interaction design, and technical design documentation."
  }
];

const PROJECTS = [
  {
    id: "combat-system",
    order: 1,
    featured: true,
    title: "Third-Person Combat System Prototype",
    subtitle: "Attack flow, hit detection, enemy reaction, and combat feedback in UE5 Blueprint.",
    category: "Unreal Engine · Blueprint · Combat",
    role: "Technical Designer / Blueprint Implementation",
    status: "Prototype",
    duration: "Class / Portfolio Prototype",
    team: "Solo / Small Team Placeholder",
    tools: "Unreal Engine 5, Blueprint, Animation Montage, Gameplay State Logic",
    summary:
      "A third-person combat prototype focused on attack states, hit detection, enemy reactions, damage logic, cooldowns, and combat feedback. The project uses placeholder assets, with the main focus on technical implementation and iteration.",
    tags: ["ue5", "blueprint", "combat", "hitDetection", "enemyReaction", "prototype"],
    coverImage: "",
    videoEmbed: "",
    videoLink: "#",
    detailLink: "project-detail.html?id=combat-system",
    overview:
      "This project is a third-person combat system prototype built to test attack input, active hit windows, enemy reactions, damage handling, cooldown timing, and feedback clarity. The visual assets are placeholders, so the main portfolio focus is the gameplay logic and technical design structure rather than final animation polish.",
    contributions: [
      "Implemented attack input and combat state logic.",
      "Built hit detection and damage handling.",
      "Added enemy health, hit reaction, and death behavior.",
      "Tuned cooldown timing and attack windows.",
      "Connected combat state changes with readable feedback moments."
    ],
    breakdown: {
      input: "Player presses attack / heavy attack and moves into attack range.",
      logic: "The system checks current combat state, cooldown status, active hit windows, target range, and whether damage should be applied.",
      feedback: "The enemy reacts through health loss, hit reaction, knockback/death behavior, and visible combat feedback.",
      iteration: "Timing, cooldowns, and feedback windows can be adjusted to make the system feel clearer and more responsive."
    },
    challenges: [
      {
        title: "Placeholder animation limitations",
        text: "The prototype used limited animation assets, so the strongest focus was placed on combat logic, enemy reaction, and feedback timing instead of final animation quality."
      },
      {
        title: "Readable combat state flow",
        text: "The attack needed clear state boundaries so input, damage windows, and feedback did not feel random or disconnected."
      }
    ],
    improvements: [
      "Improve animation blending between locomotion and attack states.",
      "Add clearer anticipation and recovery frames.",
      "Expose more attack parameters for data-driven tuning.",
      "Add more enemy behavior variety."
    ],
    workflowNotes:
      "AI-assisted workflows can be used for debugging support, implementation research, and documentation organization. Final system design, in-engine testing, and tuning should remain under the designer's control."
  },
  {
    id: "market-simulation",
    order: 2,
    featured: true,
    title: "Market Simulation UI Prototype",
    subtitle: "Trading UI, inventory flow, price events, and daily economy simulation in GameMaker.",
    category: "GameMaker · GML · UI / Economy",
    role: "Gameplay / UI Systems Designer",
    status: "Prototype",
    duration: "Class Project",
    team: "Solo / Small Team Placeholder",
    tools: "GameMaker, GML, UI State Management, Economy Simulation",
    summary:
      "A desktop-style market game prototype with item trading, modal popup UI, inventory tracking, event-based price volatility, daily progression, and game-over logic based on cash flow.",
    tags: ["gamemaker", "gml", "ui", "economy", "inventory", "prototype"],
    coverImage: "",
    videoEmbed: "",
    videoLink: "#",
    detailLink: "project-detail.html?id=market-simulation",
    overview:
      "This prototype explores a market simulation loop where players buy and sell items while random events affect next-day price movement. The system focuses on readable UI state, item data, inventory changes, and event-driven economy behavior.",
    contributions: [
      "Designed item trading UI and popup interaction flow.",
      "Implemented buy/sell logic with inventory and cash updates.",
      "Built event-based price change logic using item tags.",
      "Handled modal UI states to prevent click-through bugs.",
      "Implemented day progression and game-over conditions."
    ],
    breakdown: {
      input: "Player selects an item, enters quantity, and chooses buy or sell.",
      logic: "The system checks cash, inventory, item price, current events, and day progression before applying changes.",
      feedback: "The UI updates cash, inventory count, item prices, daily events, and game-over state.",
      iteration: "UI hitboxes, popup placement, event frequency, and price volatility can be tuned to improve readability and pressure."
    },
    challenges: [
      {
        title: "Modal UI click-through",
        text: "The popup needed to block clicks from activating UI behind it, so the modal state had to control interaction priority."
      },
      {
        title: "Readable economy events",
        text: "Events needed to affect prices clearly without overwhelming the player with too much text or unclear cause/effect."
      }
    ],
    improvements: [
      "Add better visual hierarchy for event impact.",
      "Improve tutorialization for new players.",
      "Add graph/history display for price changes.",
      "Add stronger balancing for risk and reward."
    ],
    workflowNotes:
      "AI tools can support debugging and refactoring notes, but economy balance and UI readability require in-game testing and iteration."
  },
  {
    id: "interactive-forging",
    order: 3,
    featured: true,
    title: "Interactive Forging Game Concept",
    subtitle: "Physical input, impact detection, and responsive game feedback for a forging interaction prototype.",
    category: "Interaction Design · Hardware Prototype",
    role: "Interaction Designer / Gameplay Concept Designer",
    status: "Concept / Prototype Planning",
    duration: "Project Concept",
    team: "Team Project Placeholder",
    tools: "Physical Input, Sensor Planning, Game Feedback Design, Prototype Documentation",
    summary:
      "A first-person interactive forging concept that connects physical hammer input with digital game feedback. The design explores impact detection, player action recognition, and responsive visual feedback.",
    tags: ["interaction", "hardware", "input", "feedback", "technicalDesign", "prototype"],
    coverImage: "",
    videoEmbed: "",
    videoLink: "#",
    detailLink: "project-detail.html?id=interactive-forging",
    overview:
      "This project explores a physical-digital forging experience where player hammer strikes are detected through hardware input and translated into first-person game feedback. The goal is to connect real impact, on-screen response, and game progression into one interaction loop.",
    contributions: [
      "Defined the core interaction loop between physical hammer input and game feedback.",
      "Planned sensor-based impact detection for strike location and force.",
      "Outlined first-person visual feedback for blade damage and forging response.",
      "Explored future multiplayer extension ideas.",
      "Organized project direction into staged prototype goals."
    ],
    breakdown: {
      input: "Player physically strikes the hardware surface with a hammer.",
      logic: "Sensors estimate strike location and force, then map the physical action to in-game effects.",
      feedback: "The game displays blade reaction, damage effects, sound response, and progress changes based on the strike.",
      iteration: "Sensor placement, input thresholds, and feedback strength can be tuned to make the interaction feel reliable and satisfying."
    },
    challenges: [
      {
        title: "Physical input reliability",
        text: "The game experience depends on stable sensor readings, so hardware placement and calibration are central to the design."
      },
      {
        title: "Clear feedback mapping",
        text: "Players need to understand how their physical action changes the digital result without reading complex instructions."
      }
    ],
    improvements: [
      "Build a first sensor test rig.",
      "Test different pressure sensor sizes and placements.",
      "Add visual calibration feedback.",
      "Develop a playable first-person prototype."
    ],
    workflowNotes:
      "AI-assisted research can help compare sensor options and organize documentation, but the final interaction quality depends on physical testing."
  },
  {
    id: "uefn-shooting",
    order: 4,
    featured: false,
    title: "UEFN Shooting Device Prototype",
    subtitle: "Verse and device logic experiment for shooting-game style interactions.",
    category: "UEFN · Verse · Device Logic",
    role: "Gameplay Scripting / Prototype Implementation",
    status: "Small Prototype",
    duration: "Experiment",
    team: "Solo",
    tools: "UEFN, Verse, Creative Devices",
    summary:
      "A small UEFN / Verse prototype exploring creative_device logic, item devices, elimination events, and basic shooting game flow.",
    tags: ["uefn", "verse", "gameplayDesign", "rapidPrototype", "prototype"],
    coverImage: "",
    videoEmbed: "",
    videoLink: "#",
    detailLink: "project-detail.html?id=uefn-shooting",
    overview:
      "A small UEFN experiment focused on using Verse and creative devices to test gameplay scripting patterns and event-based device behavior.",
    contributions: ["Set up basic device references.", "Tested event-driven gameplay logic.", "Explored item and elimination manager interactions."],
    breakdown: {
      input: "Player interacts with UEFN gameplay devices.",
      logic: "Verse scripts and devices respond to game events.",
      feedback: "The prototype uses device output and gameplay state changes as feedback.",
      iteration: "Future work would clean up structure and expand gameplay rules."
    },
    challenges: [],
    improvements: ["Improve Verse architecture.", "Add clearer scoring and round flow.", "Document device setup."],
    workflowNotes: ""
  },
  {
    id: "terrain-token",
    order: 5,
    featured: false,
    title: "Board Game Terrain Token Design",
    subtitle: "Physical token and board groove concept for modular tabletop terrain.",
    category: "Product / Board Game Design",
    role: "Product Interaction Designer",
    status: "Design Concept",
    duration: "Concept",
    team: "Solo",
    tools: "Product Sketching, Material / Form Planning, Board Game System Design",
    summary:
      "A modular board game terrain token concept using low-poly terrain forms, hexagonal base insertion, and board groove interaction design.",
    tags: ["interaction", "gameplayDesign", "prototype"],
    coverImage: "",
    videoEmbed: "",
    videoLink: "#",
    detailLink: "project-detail.html?id=terrain-token",
    overview:
      "A physical design concept for modular terrain tokens that can be inserted into board grooves while still supporting game pieces on top.",
    contributions: ["Defined token-board interaction.", "Explored form and material constraints.", "Designed the token as one integrated base and terrain piece."],
    breakdown: {
      input: "Player places terrain tokens into the board.",
      logic: "The token base fits into the board groove and stabilizes terrain placement.",
      feedback: "The terrain visually communicates board state and provides a physical place for pieces.",
      iteration: "Future work would test tolerances, material durability, and manufacturing cost."
    },
    challenges: [],
    improvements: ["Prototype with 3D printing.", "Test fit tolerances.", "Explore modular terrain categories."],
    workflowNotes: ""
  }
];
