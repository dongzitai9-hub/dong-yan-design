(() => {
  if (window.__dongyanGlobalNavReady) return;
  window.__dongyanGlobalNavReady = true;

  const logoUrl =
    "https://dongyan-design.oss-cn-shanghai.aliyuncs.com/dong-yan-design/website/assets/logo/dong-design-wordmark-light.png?v=20260614";

  const spaces = [
    ["/cases/space-015/", "静蓝之家"],
    ["/cases/space-014/", "柔序之家"],
    ["/cases/space-012/", "温润之家"],
    ["/cases/anli-09/", "深序客厅"],
    ["/cases/anli-10/", "弧光艺宅"],
    ["/cases/anli-11/", "白屿之家"],
    ["/cases/anli-12/", "云岸之家"],
    ["/cases/anli-14/", "城市书厅"],
    ["/cases/anli-15/", "墨石雅居"],
    ["/cases/anli-16/", "温润之家"],
    ["/cases/anli-22/", "暖木小筑"],
    ["/cases/anli-23/", "红椅之境"],
    ["/cases/anli-24/", "挑空府邸"],
    ["/cases/anli-28/", "绯椅公馆"],
    ["/cases/anli-30/", "艺术平层"],
    ["/cases/anli-31/", "柔木晴居"],
    ["/cases/anli-32/", "弧序雅宅"],
    ["/cases/anli-33/", "清和之家"],
    ["/cases/anli-37/", "穹光会所"],
    ["/cases/anli-39/", "庭院栖居"],
    ["/cases/anli-41/", "书墙之家"],
    ["/cases/anli-42/", "白阶之家"],
    ["/cases/anli-43/", "云顶私宅"],
    ["/cases/anli-44/", "海湾墅居"],
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
    @media (max-width: 720px), (hover: none) and (pointer: coarse) {
      html,
      body {
        width: 100%;
        max-width: 100%;
        overflow-x: hidden;
        -webkit-text-size-adjust: 100%;
      }

      body {
        -webkit-user-select: none;
        user-select: none;
      }

      input,
      textarea {
        -webkit-user-select: text;
        user-select: text;
      }

      *,
      *::before,
      *::after {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
    }

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
      background: transparent;
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
      padding: 22px 18px 42px;
      margin: -22px -18px -42px;
    }

    .global-site-header .nav-dropdown::after {
      position: absolute;
      top: calc(100% - 42px);
      left: 0;
      right: 0;
      height: 42px;
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
      top: calc(100% - 18px);
      left: 50%;
      z-index: 30;
      display: grid;
      max-height: none;
      min-width: 148px;
      padding: 10px;
      border: 0;
      background: transparent;
      box-shadow: none;
      opacity: 0;
      overflow: visible;
      pointer-events: none;
      transform: translate(-50%, 0);
      transition: none;
      visibility: hidden;
      backdrop-filter: none;
    }

    .global-site-header .nav-dropdown-panel::before {
      position: absolute;
      top: -24px;
      left: 0;
      right: 0;
      height: 24px;
      content: "";
    }

    .global-site-header .nav-dropdown:hover .nav-dropdown-panel,
    .global-site-header .nav-dropdown:focus-within .nav-dropdown-panel,
    .global-site-header .nav-dropdown.is-open .nav-dropdown-panel {
      opacity: 1;
      pointer-events: auto;
      transform: translate(-50%, 0);
      visibility: visible;
    }

    .global-site-header .nav-dropdown-panel a {
      display: block;
      min-width: 0;
      min-height: 34px;
      padding: 8px 12px;
      color: rgba(64, 60, 55, 0.92);
      font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", Arial, sans-serif;
      font-size: 13px;
      letter-spacing: 0.08em;
      line-height: 1.4;
      text-align: left;
      text-decoration: none;
      text-shadow: 0 1px 14px rgba(255, 255, 255, 0.38);
      white-space: nowrap;
    }

    .global-site-header .nav-dropdown-panel a:hover,
    .global-site-header .nav-dropdown-panel a:focus-visible {
      color: #1f211f;
      background: transparent;
      outline: none;
    }

    .global-site-header .nav-dropdown-panel[aria-label="空间案例索引"] {
      max-height: none !important;
      overflow: visible !important;
      scrollbar-width: none;
    }

    .global-site-header .nav-dropdown-panel[aria-label="空间案例索引"]::-webkit-scrollbar {
      display: none;
    }

    .global-site-header .nav-dropdown-panel[aria-label="空间案例索引"] a,
    .global-site-header .nav-dropdown-panel[aria-label="空间案例索引"] .nav-more-button {
      border-radius: 2px;
      transition: background 0.2s ease, color 0.2s ease;
    }

    .global-site-header .nav-dropdown-panel[aria-label="空间案例索引"] a[hidden] {
      display: none !important;
    }

    .global-site-header .nav-dropdown-panel[aria-label="空间案例索引"] a:hover,
    .global-site-header .nav-dropdown-panel[aria-label="空间案例索引"] a:focus-visible,
    .global-site-header .nav-dropdown-panel[aria-label="空间案例索引"] .nav-more-button:hover,
    .global-site-header .nav-dropdown-panel[aria-label="空间案例索引"] .nav-more-button:focus-visible {
      background: rgba(255, 255, 255, 0.14) !important;
    }

    .global-site-header .nav-dropdown-panel .nav-more-button {
      display: block;
      width: 100%;
      min-height: 34px;
      padding: 8px 12px;
      border: 0;
      background: transparent;
      color: rgba(64, 60, 55, 0.92);
      cursor: pointer;
      font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", Arial, sans-serif;
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 0.08em;
      line-height: 1.4;
      text-align: left;
      text-shadow: inherit;
      white-space: nowrap;
    }

    .global-site-header .nav-dropdown-panel .nav-more-button:focus-visible {
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
      position: fixed;
      top: var(--nav-reveal-top, 30px);
      left: var(--nav-reveal-left, auto);
      display: inline-grid;
      grid-template-columns: 1fr;
      justify-content: center;
      align-items: center;
      gap: 5px;
      width: 20px;
      height: 17px;
      margin: 0;
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
      width: 18px;
      height: 5px;
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
        align-items: center;
        min-height: 76px;
        padding: 18px 20px;
      }

      .global-site-header .brand-logo {
        width: 118px;
        height: auto;
      }

      .site-header .site-nav,
      .case-view-nav .site-nav,
      .global-site-header .site-nav {
        display: flex !important;
        gap: 10px;
        justify-content: flex-end;
        max-width: calc(100vw - 160px);
        margin-right: 0;
        overflow: hidden;
      }

      .site-header .nav-dropdown,
      .case-view-nav .nav-dropdown,
      .global-site-header .nav-dropdown {
        padding: 10px 0;
        margin: -10px 0;
        pointer-events: none;
      }

      .site-header .nav-trigger,
      .site-header .editorial-nav-item,
      .case-view-nav .nav-trigger,
      .case-view-nav .editorial-nav-item,
      .global-site-header .nav-trigger,
      .global-site-header .editorial-nav-item {
        min-width: 0;
        color: rgba(245, 241, 232, 0.92);
        font-size: 11px;
        letter-spacing: 0.06em;
        text-shadow: 0 1px 12px rgba(0, 0, 0, 0.36);
        white-space: nowrap;
        pointer-events: auto;
      }

      .site-header .editorial-nav-item small,
      .case-view-nav .editorial-nav-item small,
      .global-site-header .editorial-nav-item small {
        display: none;
      }

      .site-header .nav-dropdown-panel,
      .case-view-nav .nav-dropdown-panel,
      .global-site-header .nav-dropdown-panel {
        display: none !important;
        opacity: 0 !important;
        pointer-events: none !important;
        visibility: hidden !important;
      }

      .nav-reveal-control {
        top: 26px !important;
        right: 18px !important;
        left: auto !important;
        color: rgba(245, 241, 232, 0.92);
        text-shadow: 0 1px 12px rgba(0, 0, 0, 0.36);
      }

      .has-reveal-nav:not(.nav-is-hidden) .nav-reveal-control {
        opacity: 0;
        pointer-events: none;
      }

      .nav-reveal-control::before,
      .nav-reveal-control::after {
        width: 21px;
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

  const isCompactNav = () => window.matchMedia("(max-width: 720px), (hover: none) and (pointer: coarse)").matches;

  const limitSpaceMenus = () => {
    document.querySelectorAll('.nav-dropdown-panel[aria-label="空间案例索引"]').forEach((panel) => {
      if (panel.dataset.spaceMenuReady === "true") return;

      const links = [...panel.querySelectorAll("a")];
      if (links.length <= 10) return;

      const extraLinks = links.slice(10);
      const moreButton = document.createElement("button");
      moreButton.className = "nav-more-button";
      moreButton.type = "button";
      moreButton.textContent = "完整案例索引";
      moreButton.setAttribute("aria-expanded", "false");

      const setExpanded = (expanded) => {
        panel.classList.toggle("is-expanded", expanded);
        extraLinks.forEach((link) => {
          link.hidden = !expanded;
        });
        moreButton.textContent = expanded ? "收起" : "完整案例索引";
        moreButton.setAttribute("aria-expanded", String(expanded));
      };

      moreButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        setExpanded(!panel.classList.contains("is-expanded"));
      });

      panel.appendChild(moreButton);
      panel.dataset.spaceMenuReady = "true";
      setExpanded(false);
    });
  };

  limitSpaceMenus();

  const bindDropdownState = () => {
    const dropdowns = [
      ...document.querySelectorAll(".site-header .nav-dropdown, .case-view-nav .nav-dropdown"),
    ];
    const closeAll = (except) => {
      dropdowns.forEach((dropdown) => {
        if (dropdown !== except) dropdown.classList.remove("is-open");
      });
    };

    dropdowns.forEach((dropdown) => {
      const open = () => {
        if (isCompactNav()) return;
        closeAll(dropdown);
        dropdown.classList.add("is-open");
      };
      const close = () => {
        dropdown.classList.remove("is-open");
      };

      dropdown.addEventListener("pointerenter", open);
      dropdown.addEventListener("pointerleave", close);
      dropdown.addEventListener("focusin", open);
      dropdown.addEventListener("focusout", () => {
        window.requestAnimationFrame(() => {
          if (!dropdown.contains(document.activeElement)) close();
        });
      });
    });

    document.addEventListener("pointerdown", (event) => {
      if (!header.contains(event.target)) closeAll();
    });
  };

  bindDropdownState();

  document.body.classList.add("has-reveal-nav");

  if (!header.querySelector(".nav-reveal-control")) {
    const button = document.createElement("button");
    button.className = "nav-reveal-control";
    button.type = "button";
    button.setAttribute("aria-label", "显示导航");
    header.appendChild(button);
  }

  const revealButton = header.querySelector(".nav-reveal-control");
  const positionRevealButton = () => {
    if (!revealButton) return;
    if (isCompactNav()) {
      revealButton.style.removeProperty("--nav-reveal-top");
      revealButton.style.removeProperty("--nav-reveal-left");
      return;
    }
    const nav = header.querySelector(".site-nav");
    const navRect = nav?.getBoundingClientRect();
    const buttonRect = revealButton.getBoundingClientRect();
    const fallbackTop = 30;
    const fallbackLeft = window.innerWidth - 42;
    const nextTop = navRect
      ? navRect.top + (navRect.height - buttonRect.height) / 2
      : fallbackTop;
    const nextLeft = navRect
      ? Math.min(navRect.right + 40, window.innerWidth - buttonRect.width - 18)
      : fallbackLeft;
    revealButton.style.setProperty("--nav-reveal-top", `${Math.max(14, nextTop)}px`);
    revealButton.style.setProperty("--nav-reveal-left", `${Math.max(12, nextLeft)}px`);
  };

  positionRevealButton();
  window.addEventListener("resize", positionRevealButton);
  window.addEventListener("load", positionRevealButton);

  const showNav = (sticky = false) => {
    document.body.classList.remove("nav-is-hidden");
    positionRevealButton();
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
