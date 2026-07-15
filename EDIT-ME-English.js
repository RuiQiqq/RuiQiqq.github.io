/*
  EDIT-ME-English.js
  Edit this file for the ENGLISH version of the website.
  Keep each project id the same in EDIT-ME-Chinese.js.
*/

window.PORTFOLIO_EN = {
  site: {
    name: "Rui Qi",
    eyebrow: "Portfolio",
    title: "Gameplay Systems & Technical Design",
    subtitle: "Combat systems, numerical design, playable prototypes, and iterative gameplay development.",
    intro: "I create playable game prototypes with Unreal Engine, Godot, and Unity, focusing on gameplay logic, combat feedback, numerical tuning, and rapid iteration.",
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
    { label: "Focus", value: "Combat · Gameplay Systems · Numerical Design · Prototyping" },
    { label: "Tools", value: "Unreal Engine · Godot · Unity" },
    { label: "Target", value: "Gameplay Designer / Technical Designer roles" }
  ],

  focusAreas: [
    {
      title: "Combat Systems",
      text: "Attack flow, hit detection, enemy reactions, dodge timing, projectiles, state changes, and readable combat feedback."
    },
    {
      title: "Numerical Design",
      text: "Gameplay values, damage relationships, cooldowns, timing windows, progression parameters, and repeated in-engine tuning."
    },
    {
      title: "Playable Prototypes",
      text: "Building and testing gameplay ideas in Unreal Engine, Godot, and Unity before investing in final presentation."
    },
    {
      title: "Iteration & Documentation",
      text: "Testing player experience, identifying problems, recording design decisions, and refining systems through repeated implementation."
    }
  ],

  resumeSkills: [
    { label: "Engines", value: "Unreal Engine, Godot, Unity" },
    { label: "Gameplay Work", value: "Combat systems, gameplay logic, player feedback, prototype implementation" },
    { label: "Design", value: "Numerical tuning, mechanic iteration, system documentation, gameplay analysis" },
    { label: "Workflow", value: "Rapid prototyping, debugging, playtesting, documentation, AI-assisted research" }
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
    iteration: "Iteration"
  },

  projects: [
    {
      id: "punk-plush-panic",
      order: 1,
      featured: true,
      library: true,
      title: "Punk Plush Panic",
      category: "Game Prototype · Gameplay Design · Team Project",
      role: "Gameplay Designer / Prototype Development",
      summary: "A playable game project focused on translating a clear theme into gameplay, testing the player experience, and refining the prototype through iteration.",
      tools: "Unreal Engine, Gameplay Prototyping, Playtesting, Design Documentation",
      tags: ["unreal", "gameplaySystem", "prototype", "team", "iteration"],
      coverImage: "",
      videoEmbed: "",
      videoLink: "#",
      videoFile: "",
      videoPlatform: "YouTube",
      externalLinks: [],
      downloadLinks: [],
      detail: {
        overview: "Punk Plush Panic is a playable game project developed through prototyping and iteration. This page is intended to present the final gameplay, my contribution to the project, and how the design changed during development.",
        whatIBuilt: [
          "Contributed to gameplay design and prototype development.",
          "Tested how the core idea communicated its intended player experience.",
          "Iterated on gameplay based on implementation results and playtesting.",
          "Organized project information for presentation and portfolio documentation."
        ],
        breakdown: [
          { label: "Concept", text: "The project began with a clear thematic direction and a playable experience goal." },
          { label: "Prototype", text: "Core ideas were implemented early so the team could evaluate the actual gameplay rather than relying only on written plans." },
          { label: "Testing", text: "Playtesting and implementation results were used to identify unclear or ineffective parts of the experience." },
          { label: "Iteration", text: "The design was revised to improve readability, pacing, and the connection between the theme and the gameplay." }
        ],
        challenges: [
          "The project page still needs final screenshots, video, and a precise contribution breakdown.",
          "Future portfolio updates should replace general descriptions with concrete examples from the finished build."
        ],
        workflowNotes: "The final portfolio page should clearly separate my personal contribution from the work completed by other team members."
      }
    },
    {
      id: "third-person-soulslike",
      order: 2,
      featured: true,
      library: true,
      title: "Third-Person Soulslike Combat Prototype",
      category: "Unreal Engine · Blueprint · Combat Systems",
      role: "Gameplay Designer / Blueprint Implementation",
      summary: "A third-person action prototype focused on attack flow, dodge timing, hit detection, enemy reactions, projectile behavior, and readable combat feedback.",
      tools: "Unreal Engine, Blueprint, Animation Montage, Combat State Logic, Numerical Tuning",
      tags: ["unreal", "blueprint", "combat", "soulslike", "hitDetection", "enemyReaction", "projectile", "numericalDesign", "solo"],
      coverImage: "",
      videoEmbed: "",
      videoLink: "#",
      videoFile: "",
      videoPlatform: "YouTube",
      externalLinks: [],
      downloadLinks: [],
      detail: {
        overview: "This is a third-person soulslike-inspired combat prototype built to study combat rhythm, attack and dodge timing, hit detection, enemy responses, projectile behavior, and the clarity of player feedback.",
        whatIBuilt: [
          "Implemented player attack and dodge behavior.",
          "Built hit detection, damage processing, and enemy reaction logic.",
          "Created projectile collision and destruction behavior.",
          "Adjusted combat timing, cooldowns, and gameplay values through testing.",
          "Connected gameplay events with visual, audio, and interface feedback."
        ],
        breakdown: [
          { label: "Input", text: "Player input triggers attacks, dodges, and other combat actions while the system checks the current state." },
          { label: "Combat Logic", text: "Attack windows, hit detection, damage, cooldowns, projectile collisions, and enemy states determine the combat result." },
          { label: "Feedback", text: "Animation, sound, hit reactions, effects, and UI communicate whether an action was successful." },
          { label: "Numerical Tuning", text: "Damage, timing windows, cooldowns, and other values are repeatedly adjusted to improve combat rhythm and readability." }
        ],
        challenges: [
          "Animation transitions and combat timing require repeated testing because small changes can strongly affect responsiveness.",
          "Placeholder assets limit final visual polish, so the current prototype emphasizes system behavior and feedback clarity."
        ],
        workflowNotes: "AI tools may support debugging and implementation research, while the final design decisions, Blueprint structure, testing, and numerical tuning are completed in-engine."
      }
    }
  ]
};
