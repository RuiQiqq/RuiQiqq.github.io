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
    document.getElementById('footer-scope').textContent = 'Isaac Sim / Isaac Lab · 2026';
    root.append(node('p', project.status, 'eyebrow'));
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
    for (const [index, item] of project.detail.breakdown.entries()) {
      const section = node(index === 3 ? 'details' : 'section', '', 'robotics-section');
      section.append(node(index === 3 ? 'summary' : 'h2', item.label), node('p', item.text));
      if (index === 1) {
        const wrap = node('div', '', 'robotics-table-wrap'); const table = node('table');
        const head = node('thead'); const headRow = node('tr');
        for (const text of (zh ? ['方法', '完成任务', '平均用时（仿真秒）'] : ['Method', 'Tasks completed', 'Mean time (simulation seconds)'])) { const th = node('th', text); th.scope = 'col'; headRow.append(th); }
        head.append(headRow); table.append(head); const body = node('tbody');
        for (const row of [[zh ? '固定规则' : 'Fixed rules', '6 / 6', '9.35'],[zh ? '第一版模型' : 'First model', '6 / 6', '11.94'],[zh ? 'V2 模型' : 'V2 model', '6 / 6', '10.57']]) { const tr = node('tr'); for (const text of row) tr.append(node('td', text)); body.append(tr); }
        table.append(body); wrap.append(table); section.append(wrap);
      }
      for (const m of item.media || []) {
        if (m.type !== 'image' || !m.src) continue;
        const figure = node('figure'); const img = node('img'); img.src = m.src; img.alt = m.alt || item.label; img.loading = 'lazy';
        figure.append(img); if (m.note) figure.append(node('figcaption', m.note)); section.append(figure);
      }
      root.append(section);
    }
    const scope = node('section', '', 'robotics-section'); scope.append(node('h2', zh ? '目前还做不到什么？' : 'What are the limits so far?')); for (const text of project.detail.challenges) scope.append(node('p', text)); root.append(scope);
    const history = node('details', '', 'robotics-section robotics-history'); history.append(node('summary', zh ? '看看之前做过的实验' : 'Earlier experiments'));
    history.append(node('p', zh ? '在尝试移开障碍之前，项目先做了分拣和抓取检查。下面保留了几个阶段的记录。' : 'Before the obstacle task, the project focused on sorting and checking grasps. A few earlier stages are recorded below.'));
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
