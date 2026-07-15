/*
  EDIT-ME-Chinese.js
  这个文件控制网站的中文版本。
  中英文对应项目的 id 必须完全相同。
*/

window.PORTFOLIO_ZH = {
  site: {
    name: "祁睿",
    eyebrow: "作品集",
    title: "玩法系统与技术设计",
    subtitle: "战斗系统、数值设计、可玩原型与迭代式玩法开发。",
    intro: "我使用 Unreal Engine、Godot 和 Unity 制作可玩的游戏原型，重点关注玩法逻辑、战斗反馈、数值调试和快速迭代。",
    email: "3150868896@qq.com",
    github: "https://github.com/RuiQiqq",
    linkedin: "#",
    resumeUrl: "assets/resume/Rui_Qi_Resume_ZH.pdf",
    demoReelEmbed: "",
    demoReelLink: "#",
    demoReelCoverImage: "",
    demoReelPlatform: "Bilibili"
  },

  snapshot: [
    { label: "方向", value: "战斗 · 玩法系统 · 数值设计 · 原型开发" },
    { label: "工具", value: "Unreal Engine · Godot · Unity" },
    { label: "目标岗位", value: "玩法策划／技术策划" }
  ],

  focusAreas: [
    {
      title: "战斗系统",
      text: "攻击流程、命中检测、敌人受击、闪避时机、射弹、状态切换和清晰的战斗反馈。"
    },
    {
      title: "数值设计",
      text: "玩法数值、伤害关系、冷却时间、判定窗口、成长参数，以及在引擎内反复测试和调整。"
    },
    {
      title: "可玩原型",
      text: "使用 Unreal Engine、Godot 和 Unity 快速实现玩法想法，在投入最终表现前先验证实际体验。"
    },
    {
      title: "迭代与文档",
      text: "测试玩家体验、定位问题、记录设计决策，并通过多轮实现持续完善系统。"
    }
  ],

  resumeSkills: [
    { label: "游戏引擎", value: "Unreal Engine、Godot、Unity" },
    { label: "玩法实现", value: "战斗系统、玩法逻辑、玩家反馈、原型实现" },
    { label: "设计能力", value: "数值调试、机制迭代、系统文档、玩法分析" },
    { label: "工作流程", value: "快速原型、调试、试玩测试、文档整理、AI 辅助研究" }
  ],

  tags: {
    unreal: "Unreal Engine",
    godot: "Godot",
    unity: "Unity",
    blueprint: "蓝图",
    combat: "战斗系统",
    soulslike: "类魂",
    hitDetection: "命中检测",
    enemyReaction: "敌人反馈",
    projectile: "射弹系统",
    numericalDesign: "数值设计",
    gameplaySystem: "玩法系统",
    prototype: "原型",
    team: "团队项目",
    solo: "个人项目",
    iteration: "迭代"
  },

  projects: [
    {
      id: "punk-plush-panic",
      order: 1,
      featured: true,
      library: true,
      title: "Punk Plush Panic",
      category: "游戏原型 · 玩法设计 · 团队项目",
      role: "玩法设计／原型开发",
      summary: "一个围绕明确主题制作的可玩游戏项目，重点展示玩法体验验证、开发过程中的迭代，以及最终原型呈现。",
      tools: "Unreal Engine、玩法原型、试玩测试、设计文档",
      tags: ["unreal", "gameplaySystem", "prototype", "team", "iteration"],
      coverImage: "",
      videoEmbed: "",
      videoLink: "#",
      videoFile: "",
      videoPlatform: "Bilibili",
      externalLinks: [],
      downloadLinks: [],
      detail: {
        overview: "Punk Plush Panic 是一个通过原型开发与持续迭代完成的可玩游戏项目。该页面将用于展示最终玩法、我的个人贡献，以及设计在开发过程中的变化。",
        whatIBuilt: [
          "参与玩法设计与原型开发。",
          "测试核心概念是否能够传达预期的玩家体验。",
          "根据实际实现和试玩结果调整玩法。",
          "整理项目资料，用于最终展示和作品集说明。"
        ],
        breakdown: [
          { label: "概念", text: "项目从明确的主题方向和体验目标出发。" },
          { label: "原型", text: "尽早将核心想法实现为可玩的内容，以实际体验而不是只依靠文字方案进行判断。" },
          { label: "测试", text: "通过试玩和实际实现结果，发现体验中不清晰或效果不足的部分。" },
          { label: "迭代", text: "持续调整设计，提高玩法可读性、节奏，以及主题与玩法之间的联系。" }
        ],
        challenges: [
          "当前项目页面仍需要补充最终截图、视频和更准确的个人贡献说明。",
          "后续应使用完成版本中的具体案例替换目前较概括的描述。"
        ],
        workflowNotes: "最终作品集页面需要明确区分我的个人贡献与其他团队成员完成的内容。"
      }
    },
    {
      id: "third-person-soulslike",
      order: 2,
      featured: true,
      library: true,
      title: "第三人称类魂战斗原型",
      category: "Unreal Engine · 蓝图 · 战斗系统",
      role: "玩法设计／蓝图实现",
      summary: "一个第三人称动作原型，重点研究攻击流程、闪避时机、命中检测、敌人受击、射弹行为和清晰的战斗反馈。",
      tools: "Unreal Engine、Blueprint、Animation Montage、战斗状态逻辑、数值调试",
      tags: ["unreal", "blueprint", "combat", "soulslike", "hitDetection", "enemyReaction", "projectile", "numericalDesign", "solo"],
      coverImage: "",
      videoEmbed: "",
      videoLink: "#",
      videoFile: "",
      videoPlatform: "Bilibili",
      externalLinks: [],
      downloadLinks: [],
      detail: {
        overview: "这是一个受到类魂战斗启发的第三人称战斗原型，用于研究战斗节奏、攻击与闪避时机、命中检测、敌人反馈、射弹行为，以及玩家反馈是否足够清晰。",
        whatIBuilt: [
          "实现玩家攻击和闪避行为。",
          "搭建命中检测、伤害处理和敌人受击逻辑。",
          "实现射弹碰撞与销毁行为。",
          "通过测试调整战斗时机、冷却和玩法数值。",
          "将玩法事件连接到动画、音效、特效和界面反馈。"
        ],
        breakdown: [
          { label: "输入", text: "玩家输入触发攻击、闪避和其他战斗行为，同时系统检查当前状态。" },
          { label: "战斗逻辑", text: "攻击判定窗口、命中检测、伤害、冷却、射弹碰撞和敌人状态共同决定战斗结果。" },
          { label: "反馈", text: "动画、音效、受击反应、特效和 UI 用于说明玩家行为是否成功。" },
          { label: "数值调试", text: "反复调整伤害、判定时间、冷却和其他数值，以改善战斗节奏和可读性。" }
        ],
        challenges: [
          "动画衔接和战斗时机需要反复测试，因为很小的改动也会明显影响操作响应。",
          "占位资源限制了最终视觉完成度，因此当前原型更强调系统行为和反馈清晰度。"
        ],
        workflowNotes: "AI 工具可以辅助排查问题和研究实现方式；最终设计判断、蓝图结构、引擎内测试和数值调试由我完成。"
      }
    }
  ]
};
