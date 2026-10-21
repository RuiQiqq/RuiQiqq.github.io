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
    root.append(node('p', `${project.status} · Simulation / RGB-D / Decision Learning`, 'eyebrow'));
    root.append(node('h1', project.title));
    root.append(node('p', project.summary, 'robotics-lead'));
    const actions = node('div', '', 'robotics-links');
    const watch = node('a', zh ? '观看机器人演示 ↓' : 'Watch the robot demo ↓', 'button primary'); watch.href = '#robot-demo';
    const games = node('a', zh ? '查看我的游戏项目 →' : 'View My Game Projects →', 'button secondary'); games.href = `index.html?lang=${lang}#featured`;
    actions.append(watch, games); root.append(actions);
    const demo = node('figure', '', 'robotics-demo'); demo.id = 'robot-demo';
    const video = node('video'); video.controls = true; video.playsInline = true; video.preload = 'metadata'; video.poster = project.coverImage; video.src = project.videoFile;
    video.setAttribute('aria-label', zh ? '稳定 V2 推障碍、抓目标与投放的连续演示' : 'Stable V2 continuous obstacle-push, grasp and placement demonstration');
    demo.append(video, node('figcaption', project.detail.workflowNotes)); root.append(demo);
    root.append(node('p', zh ? '12.08 秒 · 1280 × 720 · 25 fps · 本次补录不新增计入验证样本' : '12.08 seconds · 1280 × 720 · 25 fps · This recording adds no validation sample', 'scope-note'));
    for (const [index, item] of project.detail.breakdown.entries()) {
      const section = node('section', '', 'robotics-section');
      section.append(node('h2', item.label), node('p', item.text));
      if (index === 1) {
        const wrap = node('div', '', 'robotics-table-wrap'); const table = node('table');
        const head = node('thead'); const headRow = node('tr');
        for (const text of (zh ? ['策略', '完成 / 回合', '平均仿真任务秒'] : ['Policy', 'Completed / episodes', 'Mean simulated task seconds'])) { const th = node('th', text); th.scope = 'col'; headRow.append(th); }
        head.append(headRow); table.append(head); const body = node('tbody');
        for (const row of [[zh ? '规则基线' : 'Rule baseline', '6 / 6', '9.35'],[zh ? '旧模型（同新版执行器）' : 'Previous model (same executor)', '6 / 6', '11.94'],[zh ? '稳定 V2' : 'Stable V2', '6 / 6', '10.57']]) { const tr = node('tr'); for (const text of row) tr.append(node('td', text)); body.append(tr); }
        table.append(body); wrap.append(table); section.append(wrap);
      }
      for (const m of item.media || []) {
        if (m.type !== 'image' || !m.src) continue;
        const figure = node('figure'); const img = node('img'); img.src = m.src; img.alt = m.alt || item.label; img.loading = 'lazy';
        figure.append(img); if (m.note) figure.append(node('figcaption', m.note)); section.append(figure);
      }
      root.append(section);
    }
    const scope = node('section', '', 'robotics-section'); scope.append(node('h2', zh ? '局限与评估边界' : 'Limitations and evaluation boundaries')); for (const text of project.detail.challenges) scope.append(node('p', text)); root.append(scope);
    const history = node('details', '', 'robotics-section robotics-history'); history.append(node('summary', zh ? '展开早期分拣与感知实验记录' : 'Expand earlier sorting and perception records'));
    history.append(node('p', zh ? '以下为旧任务的独立记录，不属于稳定 V2 的当前移障结果。旧架构图与演示仅用于历史说明。' : 'These are independent records of earlier tasks, not current Stable V2 obstacle results. Earlier architecture and demonstrations are historical only.'));
    for (const item of project.history || []) { const block = node('section', '', 'robotics-section'); block.append(node('h3', item.label), node('p', item.text)); history.append(block); }
    const old = node('a', zh ? '打开旧 V0.16 分拣演示（GIF，20 MB）' : 'Open historical V0.16 sorting demo (GIF, 20 MB)', 'button secondary'); old.href = '/assets/images/robotics/wrong-color-demo.gif'; history.append(old); root.append(history);
    const links = node('div', '', 'robotics-links');
    for (const item of project.externalLinks.filter(item => !item.url.startsWith('robotics.html'))) { const a = node('a', item.label, 'button secondary'); const url = new URL(item.url, location.href); if (!['http:', 'https:'].includes(url.protocol)) continue; a.href = url.href; links.append(a); }
    root.append(links);
  } catch (error) {
    root.replaceChildren(node('h1', zh ? '内容暂时无法读取' : 'Content could not be loaded'), node('p', zh ? '请通过本地预览服务器或 GitHub Pages 打开，而不是直接双击 HTML。' : 'Open through the local preview server or GitHub Pages, not a file:// URL.'));
    console.error(error);
  }
})();
