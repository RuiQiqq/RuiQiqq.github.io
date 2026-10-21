(async function () {
  const requested = new URLSearchParams(location.search).get('lang');
  let saved = null;
  try { saved = localStorage.getItem('ruiqi-portfolio-language'); } catch (_) {}
  const lang = ['en', 'zh'].includes(requested) ? requested : ['en', 'zh'].includes(saved) ? saved : navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
  try { localStorage.setItem('ruiqi-portfolio-language', lang); } catch (_) {}
  const zh = lang === 'zh';
  document.documentElement.lang = lang;
  document.body.classList.toggle('lang-zh', zh);
  const root = document.getElementById('robotics-main');
  const node = (tag, text, className) => { const n = document.createElement(tag); if (text) n.textContent = text; if (className) n.className = className; return n; };
  try {
    const response = await fetch(`content/portfolio-${lang}.json`, { cache: 'no-store' });
    if (!response.ok) throw Error(`HTTP ${response.status}`);
    const content = await response.json();
    const project = content.projects.find(p => p.id === 'franka-visual-sorting');
    if (!project) throw Error('Robotics case is missing from CMS content.');
    root.replaceChildren();
    document.title = `${zh ? '机器人与仿真' : 'Robotics & Simulation'} | Rui Qi`;
    const back = document.getElementById('back-home'); back.textContent = zh ? '查看我的游戏项目' : 'View My Game Projects'; back.href = `index.html?lang=${lang}#featured`;
    document.getElementById('footer-scope').textContent = zh ? '仿真学习项目 · 非实体部署' : 'Simulation learning · no hardware deployment';
    root.append(node('p', zh ? '从交互系统到机器人仿真' : 'FROM INTERACTIVE SYSTEMS TO ROBOT SIMULATION', 'eyebrow'));
    root.append(node('h1', zh ? '看见目标，\n移开障碍，再完成抓取。' : 'See the target.\nClear the way. Complete the grasp.'));
    root.append(node('p', project.summary, 'robotics-lead'));
    const actions = node('div', '', 'robotics-links');
    const watch = node('a', zh ? '观看机器人演示 ↓' : 'Watch the robot demo ↓', 'button primary'); watch.href = '#robot-demo';
    const games = node('a', zh ? '查看我的游戏项目 →' : 'View My Game Projects →', 'button secondary'); games.href = `index.html?lang=${lang}#featured`;
    actions.append(watch, games); root.append(actions);
    root.append(node('p', zh ? 'AI 辅助开发与学习项目 · Isaac Sim / Isaac Lab · 更新于 2026-10-21' : 'AI-assisted development & learning · Isaac Sim / Isaac Lab · Updated October 21, 2026', 'scope-note'));
    const card = node('article', '', 'robotics-case');
    const visual = node('img'); visual.src = project.coverImage; visual.alt = zh ? '实际 Isaac Sim 分拣画面' : 'Actual Isaac Sim sorting frame'; visual.width = 640; visual.height = 480;
    const copy = node('div'); copy.append(node('p', project.status, 'eyebrow'), node('h2', project.title), node('p', project.summary));
    const link = node('a', zh ? '阅读完整案例与结果 →' : 'Read the case and evidence →', 'button primary'); link.href = `project-detail.html?id=${encodeURIComponent(project.id)}&lang=${lang}`;
    copy.append(link); card.append(visual, copy); root.append(card);
    for (const [index, item] of project.detail.breakdown.entries()) {
      const section = node('section', '', 'robotics-section');
      if (index === 0) section.id = 'robot-demo';
      section.append(node('h2', item.label), node('p', item.text));
      for (const m of item.media || []) {
        if (m.type !== 'image' || !m.src) continue;
        const figure = node('figure'); const img = node('img'); img.src = m.src; img.alt = m.alt || item.label; img.loading = 'lazy';
        figure.append(img); if (m.note) figure.append(node('figcaption', m.note)); section.append(figure);
      }
      root.append(section);
    }
    const contribution = node('section', '', 'robotics-section'); contribution.append(node('h2', zh ? '我的参与与下一步' : 'My participation & next steps'), node('p', project.role), node('p', zh ? '下一步：逐渐独立承担报告分析、抓取成功判定与失败案例设计，解释模型和规则之间的取舍。' : 'Next: take increasing ownership of report analysis, grasp-success checks and failure-case design, and explain the tradeoffs between learned and rule-based decisions.')); root.append(contribution);
    const links = node('div', '', 'robotics-links');
    for (const item of project.externalLinks.filter(item => !item.url.startsWith('robotics.html'))) { const a = node('a', item.label, 'button secondary'); const url = new URL(item.url, location.href); if (!['http:', 'https:'].includes(url.protocol)) continue; a.href = url.href; links.append(a); }
    root.append(links);
  } catch (error) {
    root.replaceChildren(node('h1', zh ? '内容暂时无法读取' : 'Content could not be loaded'), node('p', zh ? '请通过本地预览服务器或 GitHub Pages 打开，而不是直接双击 HTML。' : 'Open through the local preview server or GitHub Pages, not a file:// URL.'));
    console.error(error);
  }
})();
