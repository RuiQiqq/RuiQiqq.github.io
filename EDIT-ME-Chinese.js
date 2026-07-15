/*
  EDIT-ME-Chinese.js
  ------------------------------------------------------------
  这个文件只控制网站的中文版本。
  英文版本在 EDIT-ME-English.js。

  重要规则：
  - 中英文对应项目的 id 必须完全相同。
  - 中文视频请填写 Bilibili 嵌入链接和普通播放链接。
  - 中文简历默认路径为 assets/resume/Rui_Qi_Resume_ZH.pdf。
  - 图片可以与英文版共用，也可以分别设置。
  - 文字必须放在英文半角双引号 " " 中。
*/

window.PORTFOLIO_ZH = {
  site: {
    name: "祁睿",
    eyebrow: "作品集",
    title: "玩法系统与技术设计",
    subtitle: "玩法系统、战斗原型、UI／经济循环与交互实验。",
    intro: "我使用 Unreal Engine、GameMaker、Unity 和 UEFN 制作可玩的游戏原型，重点关注系统逻辑、玩家反馈和快速迭代。",
    email: "3150868896@qq.com",
    github: "https://github.com/RuiQiqq",
    linkedin: "#",
    resumeUrl: "assets/resume/Rui_Qi_Resume_ZH.pdf",

    // 中文演示视频设置
    // Bilibili 嵌入链接示例：
    // "https://player.bilibili.com/player.html?bvid=BVxxxxxxxxxx&page=1&high_quality=1&danmaku=0"
    // Bilibili 普通链接示例："https://www.bilibili.com/video/BVxxxxxxxxxx"
    demoReelEmbed: "",
    demoReelLink: "#",
    demoReelCoverImage: "",
    demoReelPlatform: "Bilibili"
  },

  snapshot: [
    { label: "方向", value: "玩法系统 · 战斗 · UI／经济 · 交互" },
    { label: "工具", value: "UE5 蓝图 · GameMaker · Unity · UEFN" },
    { label: "目标岗位", value: "玩法策划／技术策划" }
  ],

  focusAreas: [
    {
      title: "战斗与交互",
      text: "攻击状态、命中检测、敌人受击、输入时机、交互逻辑和战斗反馈。"
    },
    {
      title: "UI 与经济系统",
      text: "交易界面、库存流程、价格事件、每日循环，以及清晰可读的决策压力。"
    },
    {
      title: "原型实现",
      text: "使用 Unreal 蓝图、GameMaker GML、Unity 和 UEFN Verse 快速制作并测试可玩原型。"
    },
    {
      title: "现代工作流程",
      text: "使用 AI 辅助排查问题、研究实现方法和整理文档，但最终设计决策与数值调试由我在引擎内完成。"
    }
  ],

  resumeSkills: [
    { label: "游戏引擎", value: "Unreal Engine 5、Unity、GameMaker、UEFN" },
    { label: "实现能力", value: "Blueprint、GML、C# 基础、Verse 基础" },
    { label: "技术设计", value: "玩法系统、战斗逻辑、UI 流程、经济循环、交互设计" },
    { label: "工作流程", value: "快速原型、调试、文档整理、AI 辅助工作流" }
  ],

  tags: {
    ue5: "UE5",
    blueprint: "蓝图",
    combat: "战斗系统",
    hitDetection: "命中检测",
    enemyReaction: "敌人反馈",
    gamemaker: "GameMaker",
    gml: "GML",
    ui: "UI 系统",
    economy: "经济系统",
    interaction: "交互设计",
    hardware: "硬件",
    unity: "Unity",
    uefn: "UEFN",
    verse: "Verse",
    prototype: "原型",
    team: "团队项目",
    solo: "个人项目",
    aiWorkflow: "AI 辅助工作流"
  },

  projects: [
    {
      id: "combat-system",
      order: 1,
      featured: true,
      library: true,
      title: "第三人称战斗系统原型",
      category: "Unreal Engine · 蓝图 · 战斗",
      role: "技术策划／蓝图实现",
      summary: "一个围绕攻击状态流程、命中检测、敌人受击、伤害逻辑、冷却和战斗反馈制作的战斗原型。",
      tools: "Unreal Engine 5、Blueprint、Animation Montage、玩法状态逻辑",
      tags: ["ue5", "blueprint", "combat", "hitDetection", "enemyReaction", "prototype"],
      coverImage: "",

      // 中文项目视频请使用 Bilibili，不要复制英文版 YouTube 链接。
      videoEmbed: "",
      videoLink: "#",
      videoFile: "",
      videoPlatform: "Bilibili",
      externalLinks: [],
      downloadLinks: [],
      detail: {
        overview: "这是一个第三人称战斗原型，主要展示攻击状态、命中检测、敌人受击、伤害逻辑、冷却和战斗反馈。项目使用了占位资源，重点是玩法系统行为与迭代过程。",
        whatIBuilt: [
          "实现攻击输入与战斗状态逻辑。",
          "搭建命中检测和伤害处理。",
          "加入敌人生命值、受击反应和死亡行为。",
          "调整冷却时间和攻击判定窗口。",
          "将战斗事件连接到清晰的玩家反馈。"
        ],
        breakdown: [
          { label: "输入", text: "玩家通过输入事件触发攻击行为。" },
          { label: "逻辑", text: "系统检查战斗状态、冷却、有效命中窗口和敌人重叠。" },
          { label: "反馈", text: "敌人通过生命值变化、受击反应、时机反馈和状态切换回应攻击。" },
          { label: "迭代", text: "通过调整攻击时机与反馈数值，提高原型的可读性。" }
        ],
        challenges: [
          "占位动画限制了最终视觉完成度，因此该项目重点展示系统时机和反馈清晰度。",
          "后续可进一步改进移动与攻击状态之间的动画混合。"
        ],
        workflowNotes: "AI 工具可用于辅助排查问题、研究实现方式和整理文档；最终的设计判断、引擎内测试和系统调试由我完成。"
      }
    },
    {
      id: "market-simulation",
      order: 2,
      featured: true,
      library: true,
      title: "市场模拟 UI 原型",
      category: "GameMaker · UI · 经济系统",
      role: "玩法／UI 系统设计",
      summary: "一个桌面式市场游戏原型，包含交易界面、库存追踪、每日事件驱动的价格变化和现金流失败条件。",
      tools: "GameMaker、GML、UI 状态管理、经济模拟",
      tags: ["gamemaker", "gml", "ui", "economy", "prototype"],
      coverImage: "",
      videoEmbed: "",
      videoLink: "#",
      videoFile: "",
      videoPlatform: "Bilibili",
      externalLinks: [],
      downloadLinks: [],
      detail: {
        overview: "该项目探索交易界面和事件驱动的经济循环。玩家买卖物品，每日事件会改变价格波动和决策压力。",
        whatIBuilt: [
          "制作物品买入／卖出弹窗的 UI 行为。",
          "实现库存与现金追踪。",
          "建立事件驱动的价格变化逻辑。",
          "加入天数推进和游戏失败检查。"
        ],
        breakdown: [
          { label: "输入", text: "玩家选择物品、打开弹窗，并输入买卖数量。" },
          { label: "逻辑", text: "系统根据物品数据和每日事件更新库存、现金与价格。" },
          { label: "反馈", text: "界面展示价格变化、持有数量、现金状态和每日事件影响。" },
          { label: "迭代", text: "调整界面布局和弹窗点击区域，减少误触并提高可读性。" }
        ],
        challenges: [
          "弹窗层级需要谨慎处理点击事件，避免弹窗下方按钮被意外触发。",
          "后续可加入更清晰的价格趋势与事件历史可视化。"
        ],
        workflowNotes: "AI 可辅助调试和整理文档，但最终 UI 行为与游戏循环调试均在 GameMaker 中完成。"
      }
    },
    {
      id: "interactive-forging",
      order: 3,
      featured: true,
      library: true,
      title: "互动锻造游戏概念",
      category: "交互设计 · 硬件原型",
      role: "交互设计／玩法概念设计",
      summary: "一个第一人称锻造概念，通过实体锤击输入连接数字玩法反馈、撞击检测和视觉特效。",
      tools: "传感器规划、实体输入、游戏反馈设计、原型文档",
      tags: ["interaction", "hardware", "prototype"],
      coverImage: "",
      videoEmbed: "",
      videoLink: "#",
      videoFile: "",
      videoPlatform: "Bilibili",
      externalLinks: [],
      downloadLinks: [],
      detail: {
        overview: "该概念通过第一人称锻造交互，将实体输入与数字游戏反馈连接起来。玩家进行真实锤击，游戏根据撞击位置与时机产生视觉响应。",
        whatIBuilt: [
          "设计实体输入与游戏反馈之间的交互流程。",
          "规划传感器位置和撞击检测逻辑。",
          "定义第一人称反馈和视觉响应目标。",
          "整理分阶段原型目标，便于后续开发。"
        ],
        breakdown: [
          { label: "输入", text: "玩家使用实体锤子敲击硬件表面。" },
          { label: "逻辑", text: "传感器检测敲击位置和力度，并将数据发送到游戏。" },
          { label: "反馈", text: "游戏展示锻造火花、撞击反馈和武器状态变化。" },
          { label: "迭代", text: "后续版本可扩展动作识别和双人互动。" }
        ],
        challenges: [
          "该概念需要解决硬件稳定性、传感器校准，以及实体动作与屏幕反馈之间的清晰映射。",
          "后续可测试多种压力传感器并制定可重复的校准流程。"
        ],
        workflowNotes: "文档与实现研究可以使用 AI 辅助，但硬件选型和交互测试必须通过实体原型完成。"
      }
    },
    {
      id: "uefn-shooting-prototype",
      order: 4,
      featured: false,
      library: true,
      title: "UEFN 射击装置原型",
      category: "UEFN · Verse · 玩法装置",
      role: "玩法原型设计",
      summary: "一个较小型的 UEFN 原型，用于探索装置逻辑、玩家计分和射击玩法流程。",
      tools: "UEFN、Verse、Creative Devices",
      tags: ["uefn", "verse", "prototype"],
      coverImage: "",
      videoEmbed: "",
      videoLink: "#",
      videoFile: "",
      videoPlatform: "Bilibili",
      externalLinks: [],
      downloadLinks: [],
      detail: {
        overview: "一个围绕装置玩法逻辑与计分交互制作的小型 UEFN 原型。",
        whatIBuilt: [
          "连接用于玩家交互的装置。",
          "探索基于 Verse 的玩法逻辑。",
          "测试基础计分行为。"
        ],
        breakdown: [
          { label: "输入", text: "玩家与目标或射击装置进行交互。" },
          { label: "逻辑", text: "Verse 和装置处理交互并更新分数。" },
          { label: "反馈", text: "玩家获得计分和装置反馈。" },
          { label: "迭代", text: "后续可完善回合流程和反馈时机。" }
        ],
        challenges: [
          "Verse 语法和装置事件流程需要反复排查。"
        ],
        workflowNotes: "AI 可辅助对照语法与排查问题，但所有功能仍需在 UEFN 内测试。"
      }
    }
  ]
};
