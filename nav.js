(() => {
  if (window.__dongyanGlobalNavReady) return;
  window.__dongyanGlobalNavReady = true;

  const fallbackLogo =
    "https://dongyan-design.oss-cn-shanghai.aliyuncs.com/dong-yan-design/website/assets/logo/dong-design-wordmark-light.png?v=20260614";

  const fallbackData = {
    logoUrl: fallbackLogo,
    nav: {
      spaces: [
        { href: "/cases/space-015/", title: "静蓝之家" },
        { href: "/cases/space-014/", title: "柔序之家" },
        { href: "/cases/space-012/", title: "温润之家" },
      ],
      plans: [
        { href: "/cases/scheme-001/", title: "格局推演" },
        { href: "/cases/scheme-002/", title: "功能重组" },
        { href: "/cases/scheme-003/", title: "动线优化" },
      ],
      notes: [{ href: "/notes/", title: "全部札记" }],
      contacts: [
        { href: "/faq/", title: "常见问题" },
        { href: "/contact/", title: "联系咨询" },
      ],
    },
  };

  const data = window.DONGYAN_SITE_DATA || fallbackData;
  const nav = data.nav || fallbackData.nav;
  const cssHref = "/assets/css/navigation.css?v=20260623-footer-polish";

  const ensureStylesheet = (href) => {
    if ([...document.styleSheets].some((sheet) => sheet.href?.includes(href.split("?")[0]))) return;
    if (document.querySelector(`link[href^="${href.split("?")[0]}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  };

  const html = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  const links = (items, lastLink = "") =>
    `${items.map((item) => `<a href="${html(item.href)}">${html(item.title)}</a>`).join("")}${lastLink}`;

  const group = ({ href, cn, en, label, items, lastLink = "", extraClass = "" }) => `
    <div class="nav-dropdown">
      <a class="nav-trigger editorial-nav-item" href="${href}" aria-haspopup="true">
        <span>${cn}</span>
        <small>${en}</small>
      </a>
      <div class="nav-dropdown-panel ${extraClass}" aria-label="${label}">
        ${links(items, lastLink)}
      </div>
    </div>`;

  const navGroups = () => `
    <a class="nav-trigger editorial-nav-item" href="/" aria-label="返回主页">
      <span>主页</span>
      <small>HOME</small>
    </a>
    ${group({
      href: "/cases/",
      cn: "空间",
      en: "SPACES",
      label: "空间案例索引",
      items: nav.spaces || [],
      lastLink: '<a href="/cases/">更多辑选</a><a href="/cases/all/">完整案例索引</a>',
    })}
    ${group({
      href: "/plans/",
      cn: "方案",
      en: "PLANS",
      label: "方案案例索引",
      items: nav.plans || [],
      lastLink: '<a href="/plans/">更多辑选</a><a href="/cases/all/">完整案例索引</a>',
    })}
    ${group({
      href: "/notes/",
      cn: "设计札记",
      en: "JOURNAL",
      label: "设计札记索引",
      items: nav.notes || [],
      extraClass: "nav-notes-panel",
    })}
    ${group({
      href: "/contact/",
      cn: "咨询",
      en: "CONTACT",
      label: "咨询索引",
      items: nav.contacts || [],
    })}`;

  const brandMarkup = (extra = "") => `
    <a class="brand" href="/" aria-label="返回首页" ${extra}>
      <img class="brand-logo" src="${html(data.logoUrl || fallbackLogo)}" alt="董 DESIGN" />
    </a>`;

  const navMarkup = () => `
    ${brandMarkup()}
    <nav class="site-nav editorial-nav" aria-label="主导航">
      ${navGroups()}
    </nav>`;

  const legalFooterMarkup = () => `
    <div class="footer-legal global-footer-legal">
      <p>
        <span>© DONGYAN DESIGN</span>
        <span class="legal-separator" aria-hidden="true">｜</span>
        <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener">苏ICP备2026037309号-2</a>
      </p>
    </div>`;

  const ensureLegalFooter = () => {
    let footer = document.querySelector(".global-site-footer") || document.querySelector(".site-footer");
    if (!footer) {
      footer = document.createElement("footer");
      const main = document.querySelector("main");
      if (main) {
        main.insertAdjacentElement("afterend", footer);
      } else {
        document.body.appendChild(footer);
      }
    }
    footer.classList.add("site-footer", "global-site-footer");
    footer.setAttribute("aria-label", "站点备案与版权信息");
    footer.innerHTML = legalFooterMarkup();
  };

  ensureStylesheet(cssHref);
  ensureLegalFooter();

  let header = document.querySelector(".site-header");
  if (!header) {
    document.body.insertAdjacentHTML(
      "afterbegin",
      `<header class="site-header global-site-header" aria-label="站点导航">${navMarkup()}</header>`,
    );
    header = document.querySelector(".site-header");
    document.body.classList.add("nav-upgraded");
  } else {
    header.classList.add("global-site-header");
    header.setAttribute("aria-label", "站点导航");
    header.innerHTML = navMarkup();
  }

  if (!header) return;

  const isCompactNav = () =>
    window.matchMedia("(max-width: 720px), (hover: none) and (pointer: coarse)").matches;

  const limitSpaceMenus = () => {
    document.querySelectorAll('.nav-dropdown-panel[aria-label="空间案例索引"]').forEach((panel) => {
      if (panel.dataset.spaceMenuReady === "true") return;
      const allLinks = [...panel.querySelectorAll("a")];
      const footerLabels = new Set(["更多辑选", "完整案例索引"]);
      const footerLinks = allLinks.filter((link) => footerLabels.has(link.textContent.trim()));
      const caseLinks = allLinks.filter((link) => !footerLabels.has(link.textContent.trim()));
      caseLinks.slice(10).forEach((link) => {
        link.hidden = true;
      });
      footerLinks.forEach((link) => panel.appendChild(link));
      panel.dataset.spaceMenuReady = "true";
    });
  };

  const bindDropdownState = () => {
    const dropdowns = [...document.querySelectorAll(".site-header .nav-dropdown")];
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

  limitSpaceMenus();
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
    const navElement = header.querySelector(".site-nav");
    const navRect = navElement?.getBoundingClientRect();
    const buttonRect = revealButton.getBoundingClientRect();
    const nextTop = navRect ? navRect.top + (navRect.height - buttonRect.height) / 2 : 30;
    const nextLeft = navRect
      ? Math.min(navRect.right + 40, window.innerWidth - buttonRect.width - 18)
      : window.innerWidth - 42;
    revealButton.style.setProperty("--nav-reveal-top", `${Math.max(14, nextTop)}px`);
    revealButton.style.setProperty("--nav-reveal-left", `${Math.max(12, nextLeft)}px`);
  };

  const showNav = (sticky = false) => {
    document.body.classList.remove("nav-is-hidden");
    positionRevealButton();
    if (!sticky) return;
    document.body.classList.add("nav-force-visible");
    window.clearTimeout(showNav.timeoutId);
    showNav.timeoutId = window.setTimeout(() => {
      document.body.classList.remove("nav-force-visible");
    }, 3600);
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

  positionRevealButton();
  window.addEventListener("resize", positionRevealButton);
  window.addEventListener("load", positionRevealButton);
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
