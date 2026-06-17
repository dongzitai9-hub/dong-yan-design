(() => {
  if (window.__dongyanGlobalNavReady) return;
  window.__dongyanGlobalNavReady = true;

  const logoUrl =
    "https://dongyan-design.oss-cn-shanghai.aliyuncs.com/dong-yan-design/website/assets/logo/dong-design-wordmark-light.png?v=20260614";

  const spaces = [
    ["/cases/space-015/", "静蓝之家"],
    ["/cases/space-014/", "柔序之家"],
    ["/cases/space-012/", "温润之家"],
    ["/cases/space-013/", "澄境公寓"],
    ["/cases/space-001/", "自然序曲"],
    ["/cases/space-002/", "云境公馆"],
    ["/cases/space-003/", "松弛之家"],
    ["/cases/space-004/", "湖畔平层"],
    ["/cases/space-005/", "静谧套房"],
    ["/cases/space-006/", "城市公寓"],
    ["/cases/space-007/", "木色秩序"],
    ["/cases/space-008/", "光影客厅"],
    ["/cases/space-009/", "餐厨生活"],
    ["/cases/space-010/", "雅致私宅"],
    ["/cases/space-011/", "现代居所"],
  ];

  const plans = [
    ["/cases/scheme-001/", "格局推演"],
    ["/cases/scheme-002/", "功能重组"],
    ["/cases/scheme-003/", "动线优化"],
    ["/cases/scheme-004/", "套房规划"],
    ["/cases/scheme-005/", "家庭尺度"],
    ["/cases/scheme-006/", "大宅推敲"],
  ];

  const notes = [
    ["/notes/kitchen-open-layout-3/", "厨房要不要打开？先看餐厨怎么交流"],
    ["/notes/kitchen-cabinet-design-2/", "厨房怎么收纳？从我自己厨房的改动说起"],
    ["/notes/kitchen-cabinet-design-1/", "厨房好不好用，先看橱柜怎么设计"],
    ["/notes/", "全部札记"],
  ];

  const contacts = [
    ["/about/", "关于董揅"],
    ["/services/", "服务范围"],
    ["/faq/", "常见问题"],
    ["/contact/", "联系咨询"],
  ];

  const links = (items, lastLink) =>
    `${items.map(([href, text]) => `<a href="${href}">${text}</a>`).join("")}${lastLink}`;

  const navMarkup = `
    <header class="site-header global-site-header" aria-label="站点导航">
      <a class="brand" href="/" aria-label="返回首页">
        <img class="brand-logo" src="${logoUrl}" alt="董 DESIGN" />
      </a>
      <nav class="site-nav editorial-nav" aria-label="主导航">
        <div class="nav-dropdown">
          <a class="nav-trigger editorial-nav-item" href="/cases/" aria-haspopup="true">
            <span>空间</span>
            <small>SPACES</small>
          </a>
          <div class="nav-dropdown-panel" aria-label="空间案例索引">
            ${links(spaces, '<a href="/cases/">完整案例索引</a>')}
          </div>
        </div>
        <div class="nav-dropdown">
          <a class="nav-trigger editorial-nav-item" href="/cases/" aria-haspopup="true">
            <span>方案</span>
            <small>PLANS</small>
          </a>
          <div class="nav-dropdown-panel" aria-label="方案案例索引">
            ${links(plans, '<a href="/cases/">完整案例索引</a>')}
          </div>
        </div>
        <div class="nav-dropdown">
          <a class="nav-trigger editorial-nav-item" href="/notes/" aria-haspopup="true">
            <span>设计札记</span>
            <small>JOURNAL</small>
          </a>
          <div class="nav-dropdown-panel nav-notes-panel" aria-label="设计札记索引">
            ${links(notes, "")}
          </div>
        </div>
        <div class="nav-dropdown">
          <a class="nav-trigger editorial-nav-item" href="/contact/" aria-haspopup="true">
            <span>咨询</span>
            <small>CONTACT</small>
          </a>
          <div class="nav-dropdown-panel" aria-label="咨询索引">
            ${links(contacts, "")}
          </div>
        </div>
      </nav>
    </header>`;

  const style = document.createElement("style");
  style.textContent = `
    .global-site-header {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2000;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      width: 100%;
      min-height: 116px;
      padding: 28px clamp(22px, 4.2vw, 76px);
      color: rgba(91, 86, 78, 0.72);
      background: linear-gradient(180deg, rgba(242, 243, 244, 0.9), rgba(242, 243, 244, 0));
      pointer-events: auto;
    }

    .global-site-header .brand,
    .global-site-header .site-nav {
      display: flex;
      align-items: center;
    }

    .global-site-header .brand-logo {
      width: 168px;
      height: 38px;
      object-fit: contain;
      filter: invert(1) brightness(0.48) saturate(0.45);
      opacity: 0.72;
    }

    .global-site-header .site-nav {
      gap: clamp(18px, 3vw, 47px);
    }

    .global-site-header .nav-dropdown {
      position: relative;
      display: inline-flex;
      align-items: center;
      padding: 18px 0;
      margin: -18px 0;
    }

    .global-site-header .nav-dropdown::after {
      position: absolute;
      top: 100%;
      left: -28px;
      right: -28px;
      height: 18px;
      content: "";
    }

    .global-site-header .nav-trigger,
    .global-site-header .editorial-nav-item {
      display: grid;
      gap: 4px;
      min-width: clamp(54px, 5vw, 82px);
      padding: 0;
      border: 0;
      color: currentColor;
      background: transparent;
      font-family: Georgia, "Times New Roman", "Songti SC", serif;
      font-size: clamp(8px, 0.55vw, 10px);
      font-weight: 300;
      letter-spacing: 0.1em;
      line-height: 1;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      text-shadow: none;
    }

    .global-site-header .editorial-nav-item small {
      color: rgba(91, 86, 78, 0.58);
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(5px, 0.36vw, 7px);
      letter-spacing: 0.25em;
      line-height: 1;
    }

    .global-site-header .nav-dropdown-panel {
      position: absolute;
      top: calc(100% + 6px);
      left: 50%;
      z-index: 30;
      display: grid;
      min-width: 148px;
      padding: 10px;
      border: 1px solid rgba(31, 33, 31, 0.12);
      background: rgba(245, 242, 236, 0.94);
      box-shadow: 0 18px 42px rgba(0, 0, 0, 0.18);
      opacity: 0;
      pointer-events: none;
      transform: translate(-50%, -6px);
      transition: opacity 0.28s ease, transform 0.28s ease, visibility 0s linear 0.28s;
      visibility: hidden;
      backdrop-filter: blur(18px);
    }

    .global-site-header .nav-dropdown:hover .nav-dropdown-panel,
    .global-site-header .nav-dropdown:focus-within .nav-dropdown-panel,
    .global-site-header .nav-dropdown.is-open .nav-dropdown-panel {
      opacity: 1;
      pointer-events: auto;
      transform: translate(-50%, 0);
      transition-delay: 0s;
      visibility: visible;
    }

    .global-site-header .nav-dropdown-panel a {
      display: block;
      min-width: 0;
      min-height: 34px;
      padding: 8px 12px;
      color: rgba(64, 60, 55, 0.88);
      font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", Arial, sans-serif;
      font-size: 13px;
      letter-spacing: 0.08em;
      line-height: 1.4;
      text-align: left;
      text-decoration: none;
      text-shadow: none;
      white-space: nowrap;
    }

    .global-site-header .nav-dropdown-panel a:hover,
    .global-site-header .nav-dropdown-panel a:focus-visible {
      color: #1f211f;
      background: rgba(31, 33, 31, 0.06);
      outline: none;
    }

    .global-site-header .nav-notes-panel {
      width: min(340px, calc(100vw - 40px));
    }

    .global-site-header .nav-notes-panel a {
      white-space: normal;
    }

    .has-reveal-nav .site-header .brand,
    .has-reveal-nav .site-header .site-nav {
      transition: opacity 0.32s ease, transform 0.32s ease;
      will-change: opacity, transform;
    }

    .has-reveal-nav.nav-is-hidden:not(.nav-force-visible) .site-header:not(:hover):not(:focus-within) .brand,
    .has-reveal-nav.nav-is-hidden:not(.nav-force-visible) .site-header:not(:hover):not(:focus-within) .site-nav {
      opacity: 0;
      pointer-events: none;
      transform: translateY(-18px);
    }

    .nav-reveal-control {
      display: inline-grid;
      grid-template-columns: repeat(2, 5px);
      justify-content: center;
      align-items: center;
      gap: 8px;
      width: 34px;
      height: 24px;
      margin-left: 40px;
      padding: 0;
      border: 0;
      color: currentColor;
      background: transparent;
      cursor: pointer;
      opacity: 0.72;
      transition: opacity 0.24s ease, transform 0.24s ease;
      flex: 0 0 auto;
    }

    .nav-reveal-control::before,
    .nav-reveal-control::after {
      width: 5px;
      height: 16px;
      border-radius: 999px;
      background: currentColor;
      content: "";
      opacity: 0.72;
    }

    .nav-reveal-control:hover,
    .nav-reveal-control:focus-visible {
      opacity: 1;
      outline: none;
    }

    .nav-upgraded .case-directory-header,
    .nav-upgraded .top {
      display: none !important;
    }

    .nav-upgraded .case-directory-main,
    .nav-upgraded .page {
      padding-top: max(118px, 8vw);
    }

    @media (max-width: 720px) {
      .global-site-header {
        min-height: 92px;
        padding: 18px 18px;
      }

      .global-site-header .brand-logo {
        width: 118px;
        height: auto;
      }

      .global-site-header .site-nav {
        gap: 9px;
      }

      .global-site-header .editorial-nav-item {
        min-width: 0;
        font-size: 8px;
        letter-spacing: 0.06em;
      }

      .global-site-header .editorial-nav-item small {
        display: none;
      }

      .nav-reveal-control {
        margin-left: 16px;
      }
    }
  `;
  document.head.appendChild(style);

  let header = document.querySelector(".site-header");
  if (!header) {
    document.body.insertAdjacentHTML("afterbegin", navMarkup);
    header = document.querySelector(".site-header");
    document.body.classList.add("nav-upgraded");
  }

  if (!header) return;

  document.body.classList.add("has-reveal-nav");

  if (!header.querySelector(".nav-reveal-control")) {
    const button = document.createElement("button");
    button.className = "nav-reveal-control";
    button.type = "button";
    button.setAttribute("aria-label", "显示导航");
    header.appendChild(button);
  }

  const revealButton = header.querySelector(".nav-reveal-control");
  const showNav = (sticky = false) => {
    document.body.classList.remove("nav-is-hidden");
    if (sticky) {
      document.body.classList.add("nav-force-visible");
      window.clearTimeout(showNav.timeoutId);
      showNav.timeoutId = window.setTimeout(() => {
        document.body.classList.remove("nav-force-visible");
      }, 3600);
    }
  };

  const hideNav = () => {
    if (window.scrollY < 56) return;
    document.body.classList.remove("nav-force-visible");
    document.body.classList.add("nav-is-hidden");
  };

  const revealFromButton = (event) => {
    event.preventDefault();
    showNav(true);
  };

  revealButton?.addEventListener("pointerdown", revealFromButton);
  revealButton?.addEventListener("touchstart", revealFromButton, { passive: false });
  revealButton?.addEventListener("click", revealFromButton);

  header.addEventListener("mouseenter", () => showNav());
  header.addEventListener("focusin", () => showNav());
  window.addEventListener(
    "mousemove",
    (event) => {
      const revealZone = Math.max(header.offsetHeight || 0, 96);
      if (event.clientY <= revealZone) showNav();
    },
    { passive: true },
  );

  let lastY = window.scrollY;
  let ticking = false;

  const updateOnScroll = () => {
    ticking = false;
    const nextY = window.scrollY;
    const delta = nextY - lastY;
    if (nextY <= 24 || delta < -12) {
      showNav();
    } else if (delta > 8) {
      hideNav();
    }
    lastY = nextY;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateOnScroll);
    },
    { passive: true },
  );
})();
