/*
  EDIT-ME-English.js
  Edit this file for the ENGLISH version of the website.
  Keep each project id the same in EDIT-ME-Chinese.js.
*/

window.PORTFOLIO_EN = {
  site: {
    name: "Rui Qi",
    eyebrow: "Portfolio",
    title: "Blueprint Systems, Technical Design & Technical Art",
    subtitle: "Blueprint development, combat systems, modular architecture, numerical and level design, plus foundational VFX.",
    intro: "I build and iterate playable game systems with Unreal Engine, Godot, and Unity. My core strengths are Unreal Blueprint scripting, modular system architecture, and debugging, supported by combat design, numerical and level design, and foundational VFX and technical art experience.",
    email: "3150868896@qq.com",
    github: "https://github.com/RuiQiqq",
    linkedin: "#",
    resumeUrl: "assets/resume/Rui_Qi_Resume_EN.pdf",
    demoReelEmbed: "",
    demoReelLink: "#",
    demoReelCoverImage: "",
    demoReelPlatform: "YouTube"
  },

  snapshot: [
    { label: "Focus", value: "Blueprint Systems · Technical Design · Level & Numerical Design · VFX" },
    { label: "Tools", value: "Unreal Engine · Godot · Unity" },
    { label: "Target", value: "Technical Designer / Blueprint Developer roles" }
  ],

  focusAreas: [
    {
      title: "Blueprint Scripting, Basic Programming & Architecture",
      text: "Using Unreal Blueprint and foundational gameplay programming to implement logic, debug system behavior, organize modular structures, and reduce hard-coded dependencies."
    },
    {
      title: "Combat & Gameplay Design",
      text: "Attack flow, hit detection, enemy reactions, dodge timing, boss telegraphs, player readability, and iterative system design."
    },
    {
      title: "Numerical & Level Design",
      text: "Tuning damage, cooldowns, reaction windows, encounter pacing, and level flow through repeated in-engine testing."
    },
    {
      title: "Foundational Technical Art & VFX",
      text: "Creating and integrating gameplay VFX, improving visual communication, and supporting readable feedback between systems and players."
    }
  ],

  resumeSkills: [
    { label: "Engines", value: "Unreal Engine, Godot, Unity" },
    { label: "Technical Implementation", value: "Unreal Blueprint scripting, foundational gameplay programming, modular logic, debugging, decoupled system structure" },
    { label: "Design", value: "Combat systems, numerical tuning, level design, boss telegraphs, mechanic iteration" },
    { label: "Technical Art", value: "Foundational VFX implementation, gameplay readability, visual feedback integration" }
  ],

  tags: {
    unreal: "Unreal Engine",
    godot: "Godot",
    unity: "Unity",
    blueprint: "Blueprint",
    combat: "Combat",
    soulslike: "Soulslike",
    hitDetection: "Hit Detection",
    enemyReaction: "Enemy Reaction",
    projectile: "Projectile",
    numericalDesign: "Numerical Design",
    gameplaySystem: "Gameplay System",
    prototype: "Prototype",
    team: "Team Project",
    solo: "Solo Project",
    iteration: "Iteration",
    capstone: "Capstone",
    technicalDesign: "Technical Design",
    levelDesign: "Level Design",
    vfx: "VFX",
    bossDesign: "Boss Design",
    telegraph: "Attack Telegraph",
    decoupling: "Decoupled Architecture"
  },

  projects: [
    {
      id: "punk-plush-panic",
      order: 1,
      featured: true,
      library: true,
      title: "Punk Plush Panic",
      category: "Capstone · 2.5D Platformer · Team Project",
      role: "Technical Designer / Level Designer / VFX / Systems Design",
      summary: "A chaotic 2.5D platformer where players swap between three characters and combine their abilities to fight waves of enemies. I contributed technical design, level design, VFX, gameplay systems, and boss readability improvements.",
      tools: "Unreal Engine, Blueprint, Level Design, Gameplay Systems, VFX, Cross-discipline Collaboration",
      tags: ["unreal", "blueprint", "capstone", "technicalDesign", "levelDesign", "vfx", "gameplaySystem", "bossDesign", "telegraph", "team"],
      coverImage: "assets/images/punk-plush-panic-steam.png",
      videoEmbed: "",
      videoLink: "#",
      videoFile: "",
      videoPlatform: "YouTube",
      externalLinks: [
        { label: "View on Steam", url: "https://store.steampowered.com/app/4343350/Punk_Plush_Panic/" }
      ],
      downloadLinks: [],
      detail: {
        overview: "Punk Plush Panic is my capstone project: a chaotic 2.5D platformer built by a multidisciplinary team. Players swap between three characters and use combinations of their abilities to fight waves of enemies. My work covered technical design, level design, VFX, gameplay systems, and communication between design and programming.",
        whatIBuilt: [
          "Worked as a technical designer across gameplay systems and implementation planning.",
          "Designed and iterated level spaces, encounter flow, and player readability.",
          "Created and integrated VFX to strengthen gameplay feedback.",
          "Adjusted the timing of boss abilities so attacks gave players a fair reaction window.",
          "Communicated the readability problem to programmers and coordinated the addition of ground indicators before boss attacks.",
          "Documented design intent and supported cross-discipline iteration during the capstone production cycle."
        ],
        breakdown: [
          { label: "Technical Design", text: "Translated gameplay goals into implementable system requirements and worked with programmers to refine behavior in-engine." },
          { label: "Level Design", text: "Iterated spaces and encounter pacing so movement, character swapping, and enemy pressure remained readable." },
          { label: "VFX & Feedback", text: "Used effects as gameplay communication, helping players understand attacks, impacts, danger, and successful actions." },
          { label: "Boss Telegraphing", text: "Retuned boss skill timing and coordinated ground indicators so players had enough information and time to react." }
        ],
        challenges: [
          "Boss attacks initially did not provide enough warning, making failure feel difficult to read rather than fair to learn.",
          "The solution required both numerical timing changes and a visual ground telegraph, so design and programming had to coordinate closely.",
          "As a capstone project, individual design decisions also had to fit shared production constraints and the work of other disciplines."
        ],
        workflowNotes: "My contribution combined design, technical implementation planning, level work, VFX, testing, and communication. The boss telegraph change is one example of identifying a player-experience problem, defining a design solution, and coordinating implementation with programmers."
      },
      blueprintSections: [
        {
          title: "Boss Skill Timing and Ground Telegraph",
          text: "Use this section to show the boss ability logic, the adjusted release timing, and the ground indicator added before the attack. Explain the original readability problem, the reaction-time goal, and how the final implementation improved fairness.",
          image: "",
          imageLabel: "Add image: assets/images/punk-boss-telegraph-blueprint.png",
          bullets: ["Original boss timing problem", "Adjusted warning and release windows", "Ground indicator communication", "Result after playtesting"]
        },
        {
          title: "Gameplay System Contribution",
          text: "Use this section for a system you personally designed or helped define. Show the relevant Blueprint or flow diagram and clearly separate your contribution from the programmer's implementation work.",
          image: "",
          imageLabel: "Add image: assets/images/punk-gameplay-system-blueprint.png",
          bullets: ["Design goal", "System rules", "Your technical-design contribution", "Team collaboration"]
        },
        {
          title: "VFX as Gameplay Feedback",
          text: "Use this section to compare the gameplay before and after your VFX pass. Explain how the effect communicates danger, impact, character ability, or successful player action.",
          image: "",
          imageLabel: "Add image: assets/images/punk-vfx-breakdown.png",
          bullets: ["Visual communication goal", "Effect timing", "Integration with gameplay events", "Readability result"]
        },
        {
          title: "Level and Encounter Flow",
          text: "Use this section for a level layout, encounter diagram, or in-engine screenshot. Explain movement routes, enemy pressure, character-swap opportunities, and iteration based on testing.",
          image: "",
          imageLabel: "Add image: assets/images/punk-level-design-breakdown.png",
          bullets: ["Player route", "Encounter pacing", "Enemy placement", "Iteration notes"]
        }
      ]
    },
    {
      id: "third-person-soulslike",
      order: 2,
      featured: true,
      library: true,
      title: "Third-Person Soulslike Combat Prototype",
      category: "Unreal Engine · 100% Blueprint · Combat Systems",
      role: "Technical Designer / Blueprint Systems Developer",
      summary: "A third-person action prototype built entirely in Unreal Blueprint. It focuses on attack flow, dodge timing, hit detection, enemy reactions, projectile behavior, numerical tuning, and modular system communication without relying on rigid hard-coded references.",
      tools: "Unreal Engine 5, Blueprint, Animation Montage, Modular Combat Logic, Decoupled Communication, Numerical Tuning",
      tags: ["unreal", "blueprint", "combat", "soulslike", "hitDetection", "enemyReaction", "projectile", "numericalDesign", "decoupling", "solo"],
      coverImage: "",
      videoEmbed: "https://www.youtube.com/embed/IDIwe-tPvXk",
      videoLink: "https://youtu.be/IDIwe-tPvXk",
      videoFile: "",
      videoPlatform: "YouTube",
      externalLinks: [],
      downloadLinks: [],
      detail: {
        overview: "This third-person soulslike-inspired combat prototype was implemented entirely with Unreal Blueprint. The project studies combat rhythm, attack and dodge timing, hit detection, enemy responses, projectile behavior, and readable feedback. The Blueprint structure emphasizes modularity and decoupled communication rather than large chains of direct hard-coded references.",
        whatIBuilt: [
          "Implemented the complete prototype in Unreal Blueprint without C++.",
          "Built player attack, dodge, combat-state, hit-detection, damage, and enemy-reaction logic.",
          "Created projectile collision, overlap, impact, and destruction behavior.",
          "Connected gameplay events to animation, sound, VFX, and UI feedback.",
          "Adjusted damage, cooldowns, timing windows, and other gameplay values through repeated testing.",
          "Separated responsibilities across modular Blueprint logic and reduced hard-coded dependencies between systems."
        ],
        breakdown: [
          { label: "Input & State Flow", text: "Combat actions check the current state before attacks, dodges, or other actions can begin, keeping transitions predictable and preventing conflicting behavior." },
          { label: "Hit & Damage Pipeline", text: "Attack windows, collision checks, damage processing, enemy reactions, and feedback are organized as a readable sequence." },
          { label: "Projectile Lifecycle", text: "Projectile spawning, overlap checks, impacts, wall interaction, and cleanup are handled as a complete lifecycle rather than isolated events." },
          { label: "Modular Structure", text: "The Blueprint architecture separates responsibilities and uses decoupled communication so systems are easier to test, replace, and extend." }
        ],
        challenges: [
          "Small changes to animation timing or state conditions can significantly affect responsiveness, requiring repeated in-engine testing.",
          "Collision and projectile behavior needed careful debugging to avoid repeated hits, missed overlaps, or inconsistent destruction.",
          "The architecture had to remain understandable as new combat behavior was added, so modularity and decoupling were treated as design requirements."
        ],
        workflowNotes: "The prototype is 100% Blueprint. AI tools may support research or debugging, but the final system structure, Blueprint implementation, testing, decoupling decisions, and numerical tuning are completed and verified in Unreal Engine."
      },
      blueprintSections: [
        {
          title: "Combat Input and State Flow",
          text: "Place a Blueprint screenshot showing how attack and dodge inputs enter the combat system and how current-state checks prevent conflicting actions. Explain the state conditions and why this flow is easier to extend.",
          image: "",
          imageLabel: "Add image: assets/images/soulslike-input-state-blueprint.png",
          bullets: ["Input entry", "State validation", "Attack or dodge branch", "State reset"]
        },
        {
          title: "Attack, Hit Detection, and Damage",
          text: "Show the Blueprint path from an active attack window to hit detection, damage processing, enemy reaction, and player feedback. Use annotations to identify the responsibility of each part.",
          image: "",
          imageLabel: "Add image: assets/images/soulslike-hit-damage-blueprint.png",
          bullets: ["Attack window", "Collision or trace", "Damage application", "Enemy response and feedback"]
        },
        {
          title: "Projectile Collision and Cleanup",
          text: "Show how projectiles are spawned, detect valid overlaps, interact with enemies and walls, and remove themselves correctly. This is also a good place to explain the Generate Overlap Events debugging issue and final fix.",
          image: "",
          imageLabel: "Add image: assets/images/soulslike-projectile-blueprint.png",
          bullets: ["Spawn and initialization", "Overlap validation", "Impact result", "Destruction and cleanup"]
        },
        {
          title: "Decoupled Blueprint Architecture",
          text: "Use this section to explain how gameplay systems communicate without rigid hard-coded actor references. Add screenshots of the actual communication pattern you used and describe how responsibilities are separated.",
          image: "",
          imageLabel: "Add image: assets/images/soulslike-decoupled-architecture.png",
          bullets: ["System responsibilities", "Communication path", "Reduced direct dependencies", "Extension and testing benefits"]
        },
        {
          title: "Numerical Tuning and Combat Feel",
          text: "Show the exposed values or data used to tune damage, cooldowns, attack timing, dodge timing, and other combat parameters. Explain what changed after testing and why.",
          image: "",
          imageLabel: "Add image: assets/images/soulslike-numerical-tuning.png",
          bullets: ["Editable values", "Testing goal", "Before and after", "Final combat-feel decision"]
        }
      ]
    }
  ]
};
