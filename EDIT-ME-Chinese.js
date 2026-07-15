/*
  EDIT-ME-Chinese.js
  这个文件控制网站的中文版本。
  中英文对应项目的 id 必须完全相同。
*/

window.PORTFOLIO_ZH = {
  site: {
    name: "祁睿",
    eyebrow: "作品集",
    title: "蓝图系统、技术设计与基础技术美术",
    subtitle: "蓝图开发、战斗系统、模块化架构、数值与关卡设计，以及基础 VFX。",
    intro: "我使用 Unreal Engine、Godot 和 Unity 制作并迭代可玩的游戏系统。我的核心能力是 Unreal Blueprint 脚本、模块化系统结构与调试，同时具备战斗设计、数值与关卡设计，以及基础 VFX 和技术美术经验。",
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
    { label: "方向", value: "蓝图系统 · 技术设计 · 数值与关卡设计 · VFX" },
    { label: "工具", value: "Unreal Engine · Godot · Unity" },
    { label: "目标岗位", value: "技术策划／技术设计／蓝图开发" }
  ],

  focusAreas: [
    {
      title: "蓝图脚本、基础编程与系统架构",
      text: "使用 Unreal Blueprint 和基础玩法代码实现逻辑、排查系统问题、组织模块化结构，并减少系统之间的硬编码依赖。"
    },
    {
      title: "战斗与玩法设计",
      text: "攻击流程、命中检测、敌人反馈、闪避时机、Boss 攻击预警、玩法可读性和系统迭代。"
    },
    {
      title: "数值与关卡设计",
      text: "通过引擎内反复测试，调整伤害、冷却、反应窗口、遭遇节奏和关卡流程。"
    },
    {
      title: "基础技术美术与 VFX",
      text: "制作并接入玩法特效，改善视觉沟通，并通过视觉反馈帮助玩家理解系统状态和危险信息。"
    }
  ],

  resumeSkills: [
    { label: "游戏引擎", value: "Unreal Engine、Godot、Unity" },
    { label: "技术实现", value: "Unreal 蓝图脚本、基础玩法编程、模块化逻辑、调试、解耦式系统结构" },
    { label: "设计能力", value: "战斗系统、数值调试、关卡设计、Boss 预警、机制迭代" },
    { label: "技术美术", value: "基础 VFX 实现、玩法可读性、视觉反馈接入" }
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
    iteration: "迭代",
    capstone: "毕业项目",
    technicalDesign: "技术设计",
    levelDesign: "关卡设计",
    vfx: "VFX",
    bossDesign: "Boss 设计",
    telegraph: "攻击预警",
    decoupling: "解耦架构"
  },

  projects: [
    {
      id: "punk-plush-panic",
      order: 2,
      featured: true,
      library: true,
      title: "Punk Plush Panic",
      category: "毕业项目 · 2.5D 平台动作 · 团队项目",
      role: "技术设计／关卡设计／VFX／系统设计",
      summary: "一款混乱而快节奏的 2.5D 平台动作游戏。玩家在三名角色之间切换，并组合各自能力对抗敌人波次。我负责技术设计、关卡设计、VFX、玩法系统，以及 Boss 攻击可读性优化。",
      tools: "Unreal Engine、Blueprint、关卡设计、玩法系统、VFX、跨职能协作",
      tags: ["unreal", "blueprint", "capstone", "technicalDesign", "levelDesign", "vfx", "gameplaySystem", "bossDesign", "telegraph", "team"],
      coverImage: "assets/images/punk-plush-panic-steam.png",
      videoEmbed: "",
      videoLink: "#",
      videoFile: "",
      videoPlatform: "Bilibili",
      externalLinks: [
        { label: "打开 Steam 商店页面", url: "https://store.steampowered.com/app/4343350/Punk_Plush_Panic/" }
      ],
      downloadLinks: [],
      detail: {
        overview: "Punk Plush Panic 是我的 Capstone 毕业项目，由跨专业团队共同完成。游戏是一款混乱而快节奏的 2.5D 平台动作游戏，玩家需要在三名角色之间切换，并组合各自能力对抗敌人波次。我的工作覆盖技术设计、关卡设计、VFX、玩法系统，以及设计与程序之间的沟通。",
        whatIBuilt: [
          "以技术设计身份参与玩法系统和实现方案的制定。",
          "设计并迭代关卡空间、遭遇流程和玩法可读性。",
          "制作并接入 VFX，用于强化玩法反馈。",
          "调整 Boss 技能的释放时机，为玩家提供更合理的反应窗口。",
          "向程序说明攻击可读性问题，并沟通加入 Boss 攻击前的地面指示器。",
          "记录设计意图，并在毕业项目开发周期中支持跨职能迭代。"
        ],
        breakdown: [
          { label: "技术设计", text: "将玩法目标整理为可实现的系统需求，并与程序合作在引擎中调整实际行为。" },
          { label: "关卡设计", text: "迭代空间和遭遇节奏，使移动、角色切换和敌人压力保持清晰。" },
          { label: "VFX 与反馈", text: "将特效作为玩法沟通手段，帮助玩家理解攻击、命中、危险和行为结果。" },
          { label: "Boss 攻击预警", text: "重新调整 Boss 技能时机，并推动加入地面指示器，让玩家获得足够信息和反应时间。" }
        ],
        challenges: [
          "Boss 攻击最初缺乏足够预警，玩家失败时难以理解原因，也难以通过观察学习。",
          "解决方案既需要修改数值时机，也需要增加地面视觉预警，因此设计与程序必须紧密配合。",
          "作为团队毕业项目，个人设计决策还需要符合整体制作限制和其他岗位的工作安排。"
        ],
        workflowNotes: "我的贡献结合了设计、技术实现规划、关卡工作、VFX、测试和沟通。Boss 攻击预警是一个完整案例：先定位玩家体验问题，再提出设计解决方案，最后与程序沟通并完成实现。"
      },
      blueprintSections: [
        {
          title: "Boss 技能时机与地面预警",
          text: "在这里放置 Boss 技能逻辑、释放时机调整和地面指示器相关截图。说明原本的可读性问题、目标反应时间，以及修改后为什么更加公平。",
          image: "",
          imageLabel: "添加图片：assets/images/punk-boss-telegraph-blueprint.png",
          bullets: ["原始 Boss 技能时机问题", "调整后的预警与释放窗口", "地面指示器的沟通过程", "试玩后的结果"]
        },
        {
          title: "玩法系统贡献",
          text: "在这里展示你亲自设计或参与定义的玩法系统。可以放蓝图或流程图，并明确说明你的贡献与程序实现工作的区别。",
          image: "",
          imageLabel: "添加图片：assets/images/punk-gameplay-system-blueprint.png",
          bullets: ["设计目标", "系统规则", "你的技术设计贡献", "团队协作方式"]
        },
        {
          title: "VFX 作为玩法反馈",
          text: "在这里对比加入 VFX 前后的表现，说明特效如何传达危险、命中、角色能力或成功行为。",
          image: "",
          imageLabel: "添加图片：assets/images/punk-vfx-breakdown.png",
          bullets: ["视觉沟通目标", "特效时机", "与玩法事件的接入", "可读性结果"]
        },
        {
          title: "关卡与遭遇流程",
          text: "在这里放置关卡布局、遭遇流程图或引擎截图，说明玩家路线、敌人压力、角色切换机会，以及测试后的迭代。",
          image: "",
          imageLabel: "添加图片：assets/images/punk-level-design-breakdown.png",
          bullets: ["玩家路线", "遭遇节奏", "敌人布置", "迭代记录"]
        }
      ]
    },
    {
      id: "third-person-soulslike",
      order: 1,
      featured: true,
      library: true,
      title: "第三人称类魂战斗原型",
      category: "Unreal Engine · 纯蓝图 · 战斗系统",
      role: "技术设计／蓝图系统开发",
      summary: "一个完全使用 Unreal Blueprint 搭建的第三人称动作原型，重点研究攻击流程、闪避时机、命中检测、敌人反馈、射弹行为、数值调试，以及不依赖僵硬硬编码引用的模块化系统通信。",
      tools: "Unreal Engine 5、Blueprint、Animation Montage、模块化战斗逻辑、解耦通信、数值调试",
      tags: ["unreal", "blueprint", "combat", "soulslike", "hitDetection", "enemyReaction", "projectile", "numericalDesign", "decoupling", "solo"],
      coverImage: "",
      videoEmbed: "https://player.bilibili.com/player.html?bvid=BV18sNQ61EdW&page=1&high_quality=1&danmaku=0&autoplay=0",
      videoLink: "https://www.bilibili.com/video/BV18sNQ61EdW/",
      videoFile: "",
      videoPlatform: "Bilibili",
      externalLinks: [],
      downloadLinks: [],
      detail: {
        overview: "这是一个受到类魂战斗启发的第三人称战斗原型，全部使用 Unreal Blueprint 实现，没有使用 C++。项目用于研究战斗节奏、攻击与闪避时机、命中检测、敌人反馈、射弹行为和玩家反馈。蓝图结构强调模块化和解耦通信，而不是堆叠大量直接硬编码引用。",
        whatIBuilt: [
          "完全使用 Unreal Blueprint 实现整个原型，没有使用 C++。",
          "搭建玩家攻击、闪避、战斗状态、命中检测、伤害和敌人受击逻辑。",
          "实现射弹碰撞、重叠检测、命中和销毁流程。",
          "将玩法事件连接到动画、音效、VFX 和 UI 反馈。",
          "通过反复测试调整伤害、冷却、判定窗口和其他玩法数值。",
          "将职责拆分到模块化蓝图逻辑中，并减少系统之间的硬编码依赖。"
        ],
        breakdown: [
          { label: "输入与状态流程", text: "战斗行为开始前会检查当前状态，再决定是否允许攻击、闪避或其他动作，使状态切换更加可控。" },
          { label: "命中与伤害流程", text: "攻击判定窗口、碰撞检测、伤害处理、敌人受击和反馈被组织成清晰的执行顺序。" },
          { label: "射弹生命周期", text: "射弹生成、重叠检测、命中敌人、碰撞墙体和最终清理构成完整生命周期，而不是彼此孤立的事件。" },
          { label: "模块化结构", text: "蓝图架构拆分不同职责，并通过解耦通信降低系统依赖，使后续测试、替换和扩展更容易。" }
        ],
        challenges: [
          "动画时机或状态条件的微小变化都会明显影响操作响应，因此需要反复在引擎中测试。",
          "碰撞和射弹逻辑需要仔细排查，避免重复命中、重叠事件不触发或销毁结果不一致。",
          "随着战斗功能增加，蓝图仍需要保持可读，因此模块化与解耦被作为系统设计要求。"
        ],
        workflowNotes: "该原型为 100% Blueprint 实现。AI 工具可以辅助研究和排查问题，但最终系统结构、蓝图实现、测试、解耦决策和数值调试均由我在 Unreal Engine 中完成并验证。"
      },
      blueprintSections: [
        {
          title: "战斗输入与状态流程",
          text: "放置攻击和闪避输入进入战斗系统的蓝图截图，并说明当前状态检查如何避免动作冲突。可以标注状态条件以及该结构为什么便于后续扩展。",
          image: "",
          imageLabel: "添加图片：assets/images/soulslike-input-state-blueprint.png",
          bullets: ["输入入口", "状态验证", "攻击或闪避分支", "状态重置"]
        },
        {
          title: "攻击、命中检测与伤害",
          text: "展示从攻击判定窗口到命中检测、伤害处理、敌人反馈和玩家反馈的蓝图路径，并标出每一部分负责的内容。",
          image: "",
          imageLabel: "添加图片：assets/images/soulslike-hit-damage-blueprint.png",
          bullets: ["攻击判定窗口", "碰撞或检测", "伤害应用", "敌人反馈与表现"]
        },
        {
          title: "射弹碰撞与清理",
          text: "展示射弹如何生成、检测有效重叠、处理敌人和墙体碰撞，并正确销毁。这里也可以说明 Generate Overlap Events 未勾选导致的问题和最终修复。",
          image: "",
          imageLabel: "添加图片：assets/images/soulslike-projectile-blueprint.png",
          bullets: ["生成与初始化", "重叠验证", "命中结果", "销毁与清理"]
        },
        {
          title: "解耦式蓝图架构",
          text: "在这里解释不同玩法系统如何通信，同时避免僵硬的 Actor 直接引用。放入你实际使用的通信结构截图，并说明不同职责是怎样拆分的。",
          image: "",
          imageLabel: "添加图片：assets/images/soulslike-decoupled-architecture.png",
          bullets: ["系统职责", "通信路径", "减少直接依赖", "扩展与测试优势"]
        },
        {
          title: "数值调试与战斗手感",
          text: "展示用于调整伤害、冷却、攻击时机、闪避时机和其他战斗参数的可编辑数值，并说明测试后改了什么以及为什么。",
          image: "",
          imageLabel: "添加图片：assets/images/soulslike-numerical-tuning.png",
          bullets: ["可编辑数值", "测试目标", "修改前后", "最终手感判断"]
        }
      ]
    }
  ]
};
