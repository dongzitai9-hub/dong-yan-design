const heroSlides = [
  "https://dongyan-design.oss-cn-shanghai.aliyuncs.com/dong-yan-design/website/assets/optimized/hero-mobile/hero-01-mobile.webp",
  "https://dongyan-design.oss-cn-shanghai.aliyuncs.com/dong-yan-design/website/assets/optimized/hero-mobile/hero-02-mobile.webp",
  "https://dongyan-design.oss-cn-shanghai.aliyuncs.com/dong-yan-design/website/assets/optimized/detail-mobile/16/1636DC5C-0296-464B-96E1-C6780D9DB4FE.webp",
  "https://dongyan-design.oss-cn-shanghai.aliyuncs.com/dong-yan-design/website/assets/optimized/detail-mobile/09/001.webp",
  "https://dongyan-design.oss-cn-shanghai.aliyuncs.com/dong-yan-design/website/assets/optimized/detail-mobile/10/001.webp",
  "https://dongyan-design.oss-cn-shanghai.aliyuncs.com/dong-yan-design/website/assets/optimized/detail-mobile/44/001.webp"
];

const heroSlider = document.querySelector('[data-hero-slider]');
const isCompactMedia = () =>
  window.matchMedia("(max-width: 720px), (hover: none) and (pointer: coarse)").matches;

function renderHeroSlider() {
  if (!heroSlider) return;
  if (!heroSlider.querySelector(".hero-slide")) {
    heroSlider.innerHTML = `
      <img class="hero-slide is-active" src="${heroSlides[0]}" alt="空间轮播图 1" fetchpriority="high" decoding="async" />
    `;
  }

  const startSlideshow = () => {
    if (heroSlider.dataset.slideshowReady === "true") return;
    if (heroSlider.querySelectorAll(".hero-slide").length < 2) {
      heroSlider.insertAdjacentHTML(
        "beforeend",
        `<img class="hero-slide" src="${heroSlides[1]}" alt="空间轮播图 2" loading="eager" fetchpriority="low" decoding="async" />`,
      );
    }

    if (heroSlider.querySelectorAll(".hero-slide").length < 2) return;
    heroSlider.dataset.slideshowReady = "true";
    let currentSlide = 0;
    const appendRestSlides = () => {
      if (heroSlider.dataset.restSlidesReady === "true") return;
      const existingSlides = heroSlider.querySelectorAll(".hero-slide").length;
      heroSlides.slice(existingSlides).forEach((image, index) => {
        heroSlider.insertAdjacentHTML(
          "beforeend",
          `<img class="hero-slide" src="${image}" alt="空间轮播图 ${index + existingSlides + 1}" loading="lazy" decoding="async" />`,
        );
      });
      heroSlider.dataset.restSlidesReady = "true";
    };
    const scheduleRestSlides = () => {
      if (heroSlider.dataset.restSlidesScheduled === "true") return;
      heroSlider.dataset.restSlidesScheduled = "true";
      const delay = isCompactMedia() ? 8000 : 2200;
      window.setTimeout(() => {
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(appendRestSlides, { timeout: 2500 });
          return;
        }
        appendRestSlides();
      }, delay);
    };
    const showNextSlide = () => {
      const slides = [...heroSlider.querySelectorAll(".hero-slide")];
      if (slides.length < 2) return;
      slides[currentSlide].classList.remove("is-active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("is-active");
      if (currentSlide === 1) scheduleRestSlides();
    };
    window.setTimeout(showNextSlide, 1800);
    setInterval(showNextSlide, 5200);
  };

  const scheduleSlideshow = () => {
    const firstSlide = heroSlider.querySelector(".hero-slide");
    let hasStarted = false;
    const start = () => {
      if (hasStarted) return;
      hasStarted = true;
      window.setTimeout(startSlideshow, isCompactMedia() ? 500 : 300);
    };

    if (!firstSlide || firstSlide.complete) {
      start();
      return;
    }

    firstSlide.addEventListener("load", start, { once: true });
    firstSlide.addEventListener("error", start, { once: true });
    window.setTimeout(start, 1800);
  };

  scheduleSlideshow();
}

function normalizeFilePreviewLinks() {
  if (window.location.protocol !== "file:") return;
  const scriptElement = document.currentScript || document.querySelector('script[src*="script.js"]');
  const scriptUrl = scriptElement ? new URL(scriptElement.src) : null;
  const siteRootPath = scriptUrl
    ? scriptUrl.pathname.replace(/\/script\.js$/, "")
    : window.location.pathname.replace(/\/(?:index\.html)?$/, "");

  document.querySelectorAll('a[href^="/"]').forEach((link) => {
    const originalHref = link.getAttribute("href");
    if (!originalHref || originalHref.startsWith("//")) return;

    const suffix = originalHref.match(/[?#].*$/)?.[0] || "";
    const pathPart = suffix ? originalHref.slice(0, -suffix.length) : originalHref;
    let localPath = `${siteRootPath}${pathPart}`;
    if (localPath.endsWith("/")) {
      localPath += "index.html";
    }

    link.setAttribute("href", new URL(`file://${localPath}`).href + suffix);
  });
}

function loadHomepageDeferred() {
  if (document.querySelector('script[src*="/assets/js/home-deferred.js"]')) return;
  const script = document.createElement("script");
  script.src = "/assets/js/home-deferred.js?v=20260621-responsive-final";
  script.defer = true;
  document.body.appendChild(script);
}

function scheduleHomepageDeferred() {
  const run = () => loadHomepageDeferred();
  window.setTimeout(() => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(run, { timeout: 1800 });
      return;
    }
    run();
  }, 700);
}

renderHeroSlider();
normalizeFilePreviewLinks();
scheduleHomepageDeferred();
