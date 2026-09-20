const page = document.body.dataset.page || "about";

const navigationItems = [
  { id: "about", href: "index.html", zh: "简介", en: "About" },
  { id: "publications", href: "publications.html", zh: "论文", en: "Publications" },
  { id: "teaching", href: "teaching.html", zh: "教学", en: "Teaching" },
  { id: "service", href: "service.html", zh: "服务与荣誉", en: "Service &amp; Honors" },
];

const headerRoot = document.getElementById("site-header-root");
const sidebarRoot = document.getElementById("sidebar-root");

headerRoot.innerHTML = `
  <header class="site-header">
    <div class="nav-shell">
      <a class="brand" href="index.html" aria-label="返回首页">
        <span data-lang="zh">蔡树勋 / 金融学</span>
        <span data-lang="en" hidden>Shuxun Cai / Finance</span>
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
        <span data-lang="zh">菜单</span><span data-lang="en" hidden>Menu</span>
      </button>
      <nav id="site-nav" class="site-nav" aria-label="主要导航">
        ${navigationItems.map((item) => `<a href="${item.href}"${item.id === page ? ' aria-current="page"' : ""}><span data-lang="zh">${item.zh}</span><span data-lang="en" hidden>${item.en}</span></a>`).join("")}
      </nav>
      <div class="language-switch" role="group" aria-label="语言切换">
        <button type="button" data-set-language="zh" class="is-active" aria-pressed="true">中文</button>
        <span aria-hidden="true">/</span>
        <button type="button" data-set-language="en" aria-pressed="false">EN</button>
      </div>
    </div>
  </header>`;

sidebarRoot.innerHTML = `
  <div class="portrait-placeholder">
    <img class="profile-photo" src="images/profile.jpg" alt="蔡树勋 / Shuxun Cai" />
  </div>
  <div class="profile-summary">
    <h1><span data-lang="zh">蔡树勋</span><span data-lang="en" hidden>Shuxun Cai</span></h1>
    <p class="profile-title"><span data-lang="zh">金融学博士研究生</span><span data-lang="en" hidden>Ph.D. Candidate in Finance</span></p>
    <p class="profile-affiliation"><span data-lang="zh">厦门大学经济学院</span><span data-lang="en" hidden>School of Economics<br />Xiamen University</span></p>
  </div>
  <div class="profile-links" aria-label="个人与学术信息">
    <div class="profile-link-item">
      <svg class="profile-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle></svg>
      <span data-lang="zh">中国厦门</span><span data-lang="en" hidden>Xiamen, China</span>
    </div>
    <div class="profile-link-item">
      <svg class="profile-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21h18M5 21V9l7-4 7 4v12M9 21v-7h6v7M8 11h.01M12 11h.01M16 11h.01"></path></svg>
      <span data-lang="zh">厦门大学</span><span data-lang="en" hidden>Xiamen University</span>
    </div>
    <a href="mailto:caishuxun@stu.xmu.edu.cn">
      <svg class="profile-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg>
      <span>Email</span>
    </a>
    <a href="https://scholar.google.com/citations?user=DY9lUZEAAAAJ" target="_blank" rel="noreferrer">
      <svg class="profile-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m2 9 10-5 10 5-10 5L2 9Z"></path><path d="M6 11.5V16c2.8 2.7 9.2 2.7 12 0v-4.5M22 9v6"></path></svg>
      <span>Google Scholar</span>
    </a>
    <a href="https://orcid.org/0000-0003-3974-8836" target="_blank" rel="noreferrer">
      <span class="profile-icon orcid-icon" aria-hidden="true">iD</span><span>ORCID</span>
    </a>
    <a href="https://www.researchgate.net/profile/Shuxun-Cai-2" target="_blank" rel="noopener noreferrer">
      <span class="profile-icon icon-badge researchgate-icon" aria-hidden="true">R<sup>G</sup></span><span>ResearchGate</span>
    </a>
  </div>`;

const languageButtons = document.querySelectorAll("[data-set-language]");
const languageNodes = document.querySelectorAll("[data-lang]");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

function setLanguage(language) {
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.title = language === "zh" ? document.body.dataset.titleZh : document.body.dataset.titleEn;

  languageNodes.forEach((node) => {
    node.hidden = node.dataset.lang !== language;
  });

  languageButtons.forEach((button) => {
    const active = button.dataset.setLanguage === language;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  localStorage.setItem("shuxun-cai-language", language);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.setLanguage));
});

menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-current-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const storedLanguage = localStorage.getItem("shuxun-cai-language");
setLanguage(storedLanguage === "en" ? "en" : "zh");
