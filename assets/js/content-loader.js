/*
  Pages CMS content loader.
  Editable content lives in /content/portfolio-en.json and /content/portfolio-zh.json.
*/
(async function loadPortfolioContent() {
  const version = "25";
  try {
    const [enResponse, zhResponse] = await Promise.all([
      fetch(`content/portfolio-en.json?v=${version}`, { cache: "no-store" }),
      fetch(`content/portfolio-zh.json?v=${version}`, { cache: "no-store" })
    ]);

    if (!enResponse.ok || !zhResponse.ok) {
      throw new Error(`Content request failed (${enResponse.status}/${zhResponse.status})`);
    }

    window.PORTFOLIO_EN = await enResponse.json();
    window.PORTFOLIO_ZH = await zhResponse.json();

    const script = document.createElement("script");
    script.src = `assets/js/website-functions.js?v=${version}`;
    script.defer = true;
    document.head.appendChild(script);
  } catch (error) {
    console.error("Portfolio content could not be loaded:", error);
    const main = document.querySelector("main") || document.body;
    const notice = document.createElement("section");
    notice.className = "container";
    notice.style.padding = "120px 0";
    notice.innerHTML = `<h1>Content failed to load</h1><p>Please refresh the page after GitHub Pages finishes deploying.</p>`;
    main.prepend(notice);
  }
})();
