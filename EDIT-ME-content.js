/*
  EDIT-ME-content.js
  ==================
  你以后主要改这个文件。其他 HTML / CSS / JS 文件尽量别动。

  常用修改：
  1. 改首页名字/定位：改 SITE
  2. 改按钮和联系方式：改 SITE.email / SITE.resume / SITE.github / SITE.linkedin
  3. 改标签：改 TAGS
  4. 改项目顺序：改 PROJECTS 里的 order 数字
  5. 改首页精选项目：featured: true / false
  6. 改项目视频：videoEmbed / videoLink
  7. 新增项目：复制 PROJECTS 里面任意一个项目对象，改 id/title/order 等

  注意：
  - id 只能用英文、小写、短横线，比如 combat-system，不要用中文。
  - tags 里面写的是 TAGS 的 key，比如 "ue5"，不是显示名字。
  - videoEmbed 可以先留空。以后有 YouTube/Bilibili embed 链接再填。
*/

window.PORTFOLIO_CONTENT = {
  SITE: {
    name: "Rui Qi",
    shortName: "RQ",
    role: "Gameplay Designer / Technical Designer",
    heroTitle: "Gameplay systems, combat prototypes, UI/economy loops, and interaction experiments.",
    description:
      "I build playable prototypes in Unreal Engine, GameMaker, Unity, and UEFN, focusing on system logic, player feedback, and fast iteration.",
    email: "3150868896@qq.com",
    github: "https://github.com/RuiQiqq",
    linkedin: "#",
    resume: "assets/resume/Rui_Qi_Resume.pdf",
    demoReelEmbed: "",
    demoReelLink: "#",
    location: "Salt Lake City, UT",
    footerNote: "Gameplay Systems · Technical Design · Playable Prototypes"
  },

  TAGS: {
    // Engine / Tool
    ue5: { label: "UE5", group: "Engine / Tool" },
    blueprint: { label: "Blueprint", group: "Engine / Tool" },
    unity: { label: "Unity", group: "Engine / Tool" },
    csharp: { label: "C#", group: "Engine / Tool" },
    gamemaker: { label: "GameMaker", group: "Engine / Tool" },
    gml: { label: "GML", group: "Engine / Tool" },
    uefn: { label: "UEFN", group: "Engine / Tool" },
    verse: { label: "Verse", group: "Engine / Tool" },

    // System
    combat: { label: "Combat", group: "System" },
    hitDetection: { label: "Hit Detection", group: "System" },
    enemyReaction: { label: "Enemy Reaction", group: "System" },
    ui: { label: "UI System", group: "System" },
    economy: { label: "Economy", group: "System" },
    inventory: { label: "Inventory", group: "System" },
    interaction: { label: "Interaction", group: "System" },
    hardware: { label: "Hardware", group: "System" },
    input: { label: "Input", group: "System" },
    feedback: { label: "Player Feedback", group: "System" },

    // Workflow / Role
    technicalDesign: { label: "Technical Design", group: "Role / Workflow" },
    gameplayDesign: { label: "Gameplay Design", group: "Role / Workflow" },
    rapidPrototype: { label: "Rapid Prototyping", group: "Role / Workflow" },
    prototype: { label: "Prototype", group: "Role / Workflow" },
    teamProject: { label: "Team Project", group: "Role / Workflow" },
    soloProject: { label: "Solo Project", group: "Role / Workflow" },
    aiWorkflow: { label: "AI-Assisted Workflow", group: "Role / Workflow" }
  },

  TECHNICAL_FOCUS: [
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
      text: "AI-assisted debugging, implementation research, and documentation support while keeping final design decisions in engine."
    }
  ],

  SKILLS: [
    {
      title: "Engines & Tools",
      items: ["Unreal Engine 5", "GameMaker", "Unity", "UEFN", "GitHub Pages"]
    },
    {
      title: "Implementation",
      items: ["Blueprint", "GML", "C# basics", "Verse basics", "UI state logic"]
    },
    {
      title: "Design Focus",
      items: ["Gameplay systems", "Combat logic", "Interaction design", "Economy loops", "Rapid prototyping"]
    },
    {
      title: "Workflow",
      items: ["Playtesting notes", "Debugging", "Documentation", "AI-assisted research", "Iteration"]
    }
  ],

  PROJECTS: [
    {
      id: "combat-system",
      order: 1,
      featured: true,
      title: "Third-Person Combat System Prototype",
      subtitle: "Attack flow, hit detection, enemy reaction, and combat feedback in UE5 Blueprint.",
      category: "Unreal Engine · Blueprint · Combat",
      role: "Technical Designer / Blueprint Implementation",
      status: "Prototype",
      duration: "Portfolio Prototype",
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
        "AI-assisted workflows can support debugging, implementation research, and documentation organization. Final system design, in-engine testing, and tuning should remain under the designer's control."
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
          text: "The system needs reliable sensing so player strikes feel responsive instead of random or delayed."
        }
      ],
      improvements: [
        "Build a basic sensor prototype for strike force and location.",
        "Create a clearer feedback scale for weak/strong strikes.",
        "Test whether players understand the connection between physical impact and digital result."
      ],
      workflowNotes:
        "AI-assisted research can help compare sensor options and organize documentation, but hardware feel must be validated through physical testing."
    },

    {
      id: "uefn-shooting-prototype",
      order: 4,
      featured: false,
      title: "UEFN Shooting Prototype",
      subtitle: "Small gameplay prototype using UEFN / Verse devices and target practice logic.",
      category: "UEFN · Verse · Gameplay Experiment",
      role: "Gameplay Prototype Designer",
      status: "Experiment",
      duration: "Small Prototype",
      team: "Solo",
      tools: "UEFN, Verse, Creative Devices",
      summary:
        "A small prototype exploring shooting target logic, device interaction, and score/gameplay response using UEFN and Verse.",
      tags: ["uefn", "verse", "gameplayDesign", "rapidPrototype", "prototype"],
      coverImage: "",
      videoEmbed: "",
      videoLink: "#",
      detailLink: "project-detail.html?id=uefn-shooting-prototype",
      overview:
        "This is a small UEFN gameplay experiment focused on target practice logic and device-driven gameplay response.",
      contributions: [
        "Explored UEFN device logic.",
        "Tested Verse-based gameplay response.",
        "Built a small target practice interaction loop."
      ],
      breakdown: {
        input: "Player shoots or interacts with a target.",
        logic: "Verse/device logic detects the interaction and updates gameplay state.",
        feedback: "Score, target state, or device feedback changes based on player action.",
        iteration: "Target behavior and score feedback can be tuned for clearer practice flow."
      },
      challenges: [],
      improvements: ["Add clearer scoring UI.", "Expand enemy/target variety."],
      workflowNotes: "Small experiments like this are useful for learning fast implementation patterns."
    }
  ]
};
