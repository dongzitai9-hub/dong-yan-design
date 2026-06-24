(() => {
const serviceItems = [
  {
    title: "住宅空间设计",
    copy: "从居住气质、家庭成员、采光比例和生活节奏出发，建立整体空间方向，让风格不是表面装饰，而是日常使用后的自然结果。",
    note: "好的设计，是让生活回归本真。\n空间不喧哗，却能容纳日常的温度；\n光影流动，时间在其中变得柔软。\n家，从来不是完成时，\n而是与生活一起生长的过程。",
  },
  {
    title: "户型优化",
    copy: "把原始结构、动线、墙体、门洞和家具尺度放在一起推敲，找到更适合长期居住的平面关系。",
    note: "好的布局，\n不是把空间填满，\n而是让日常的动线更顺，\n让光线、收纳与停留的尺度，\n都慢慢回到生活本身。",
  },
  {
    title: "收纳系统设计",
    copy: "根据物品类型、拿取频率和家庭成员习惯规划柜体，让收纳成为空间秩序的一部分，而不是后期补救。",
    note: "好的收纳，\n不是把空间填满，\n而是让日常的取放更顺手，\n让秩序与生活自然共处。",
  },
  {
    title: "水电与设备规划",
    copy: "提前协调空调、新风、净水、照明、插座和厨卫设备位置，减少施工阶段的反复和遗憾。",
    note: "在看不见的地方，\n为每一种生活需求提前布局，\n让日常的每一次使用，\n都轻松、舒适、有序。",
  },
  {
    title: "灯光氛围设计",
    copy: "用基础照明、重点照明和低照度氛围灯组织夜晚的层次，让家在不同时间都有舒服的表情。",
    note: "光不只是照亮空间，\n也在调整一天的情绪。\n让明暗、层次与温度，\n慢慢成为家的表情。",
  },
  {
    title: "软装与陈设搭配",
    copy: "把家具、窗帘、灯具、艺术品和日常器物纳入整体气质，避免硬装完成后再临时拼凑。",
    note: "软装，不只是搭配，\n而是生活气质的延续。\n在细节里找到平衡，\n让家更完整，也更舒适。",
  },
  {
    title: "施工落地配合",
    copy: "在深化、交底、材料选择和现场节点中持续校准设计意图，让图纸、预算和施工条件尽量保持一致。",
    note: "好的落地，不是把设计交出去，\n而是在每一次交底、选材与现场沟通中，\n让想法被准确理解，\n让细节被认真实现。",
  },
];

const serviceTitle = document.querySelector('[data-service-title]');
const serviceCopy = document.querySelector('[data-service-copy]');
const serviceNote = document.querySelector('[data-service-note]');
const serviceRail = document.querySelector('[data-service-rail]');
const serviceTrack = document.querySelector('[data-service-track]');
const serviceCards = serviceTrack ? [...serviceTrack.querySelectorAll('[data-service-index]')] : [];
const isCompactMedia = () =>
  window.matchMedia("(max-width: 720px), (hover: none) and (pointer: coarse)").matches;

function loadDeferredImage(image) {
  if (!image || !image.dataset.deferSrc) return;
  image.src = image.dataset.deferSrc;
  image.removeAttribute("data-defer-src");
}

function bindDeferredImages() {
  const images = [...document.querySelectorAll("img[data-defer-src]")];
  if (!images.length) return;
  if (!("IntersectionObserver" in window)) {
    window.addEventListener("load", () => {
      images.forEach(loadDeferredImage);
    }, { once: true });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        loadDeferredImage(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "280px 0px" },
  );
  images.forEach((image) => observer.observe(image));
}

function getServiceMiddlePosition(index) {
  if (!serviceTrackOriginalCount) return 0;
  return serviceTrackOriginalCount + ((index + serviceTrackOriginalCount) % serviceTrackOriginalCount);
}

function getServiceTrackOffset(position) {
  if (!serviceTrack || !serviceTrackCards.length) return;
  if (serviceRail) serviceRail.scrollLeft = 0;
  const activeCard = serviceTrackCards[position];
  if (!activeCard) return;
  return activeCard.offsetLeft;
}

function syncServiceTrack(animate = true, duration = 0) {
  if (!serviceTrack || !serviceTrackCards.length) return;
  if (serviceRail) serviceRail.scrollLeft = 0;
  const offset = getServiceTrackOffset(serviceTrackPosition);
  if (typeof offset !== "number") return;
  serviceTrack.style.transition = animate
    ? `transform ${Math.round(duration)}ms cubic-bezier(0.25, 0.1, 0.25, 1)`
    : "none";
  serviceTrack.style.transform = `translate3d(${-offset}px, 0, 0)`;
  if (!animate) serviceTrack.getBoundingClientRect();
}

function clearServiceActivationTimer() {
  if (!serviceTrackActivationTimer) return;
  window.clearTimeout(serviceTrackActivationTimer);
  serviceTrackActivationTimer = null;
}

function getServiceActivationDelay(duration) {
  return Math.max(0, duration - serviceTrackMorphDuration);
}

function setActiveService(index, position = serviceTrackPosition) {
  if (!serviceTitle || !serviceCopy || !serviceCards.length) return;
  const nextIndex = (index + serviceItems.length) % serviceItems.length;
  const item = serviceItems[nextIndex];
  serviceTitle.textContent = item.title;
  serviceCopy.textContent = item.copy;
  if (serviceNote) serviceNote.textContent = item.note;
  serviceTrackCards.forEach((card) => {
    const cardPosition = Number(card.dataset.servicePosition);
    const isActive = cardPosition === position;
    card.classList.toggle("is-active", isActive);
    card.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

function bindServiceShowcase() {
  if (!serviceTrack || !serviceCards.length) return;
  serviceCards.forEach((card) => {
    const item = serviceItems[Number(card.dataset.serviceIndex)];
    if (item) card.dataset.serviceLabel = item.title;
  });

  const cloneServiceCard = (card, cloneType) => {
    const clone = card.cloneNode(true);
    clone.classList.remove("is-active");
    clone.dataset.serviceClone = cloneType;
    clone.setAttribute("aria-hidden", "true");
    clone.tabIndex = -1;
    return clone;
  };

  if (!serviceTrack.dataset.cloned) {
    const beforeClones = serviceCards.map((card) => cloneServiceCard(card, "before"));
    const afterClones = serviceCards.map((card) => cloneServiceCard(card, "after"));
    serviceTrack.prepend(...beforeClones);
    serviceTrack.append(...afterClones);
    serviceTrack.dataset.cloned = "true";
  }

  serviceTrackCards = [...serviceTrack.querySelectorAll("[data-service-index]")];
  serviceTrackCards.forEach((card, position) => {
    card.dataset.servicePosition = String(position);
    const item = serviceItems[Number(card.dataset.serviceIndex)];
    if (item) card.dataset.serviceLabel = item.title;
  });

  const activate = (index, position) => {
    if (serviceTrackAnimating) return;
    if (serviceRail) serviceRail.scrollLeft = 0;
    const nextIndex = (index + serviceItems.length) % serviceItems.length;
    if (position === serviceTrackPosition && nextIndex === serviceTrackActiveIndex) return;
    const currentOffset = getServiceTrackOffset(serviceTrackPosition);
    const nextOffset = getServiceTrackOffset(position);
    if (typeof currentOffset !== "number" || typeof nextOffset !== "number") return;
    const distance = Math.abs(nextOffset - currentOffset);
    const duration = Math.max(420, distance / serviceTrackPixelsPerMs);
    serviceTrackPendingIndex = nextIndex;
    serviceTrackAnimating = true;
    serviceTrackPosition = position;
    setActiveService(nextIndex, -1);
    clearServiceActivationTimer();
    serviceTrackActivationTimer = window.setTimeout(() => {
      serviceTrackActivationTimer = null;
      if (serviceTrackPendingIndex === nextIndex && serviceTrackPosition === position) {
        setActiveService(nextIndex, position);
      }
    }, getServiceActivationDelay(duration));
    syncServiceTrack(true, duration);
  };

  serviceTrackCards.forEach((card) => {
    card.addEventListener("click", () => {
      const clickedIndex = Number(card.dataset.serviceIndex);
      const clickedPosition = Number(card.dataset.servicePosition);
      activate(clickedIndex, clickedPosition);
    });
  });

  serviceTrack.addEventListener("transitionend", (event) => {
    if (event.target !== serviceTrack || event.propertyName !== "transform") return;
    const nextIndex = serviceTrackPendingIndex ?? serviceTrackActiveIndex;
    const normalizedPosition = getServiceMiddlePosition(nextIndex);
    clearServiceActivationTimer();
    if (serviceRail) serviceRail.scrollLeft = 0;
    if (serviceTrackPosition !== normalizedPosition) {
      serviceTrackPosition = normalizedPosition;
      syncServiceTrack(false);
    } else {
      serviceTrack.style.transition = "none";
    }
    serviceTrackActiveIndex = nextIndex;
    serviceTrackPendingIndex = null;
    serviceTrackAnimating = false;
    setActiveService(serviceTrackActiveIndex, serviceTrackPosition);
  });

  window.addEventListener("resize", () => {
    window.requestAnimationFrame(() => syncServiceTrack(false));
  });

  serviceRail?.addEventListener(
    "scroll",
    () => {
      if (serviceRail.scrollLeft !== 0) serviceRail.scrollLeft = 0;
    },
    { passive: true },
  );

  serviceTrackPosition = getServiceMiddlePosition(serviceTrackActiveIndex);
  setActiveService(serviceTrackActiveIndex, serviceTrackPosition);
  window.requestAnimationFrame(() => syncServiceTrack(false));
}

function prefetchResource(href, as) {
  if (!href || document.querySelector(`link[rel="prefetch"][href="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = href;
  if (as) link.as = as;
  link.fetchPriority = "low";
  document.head.appendChild(link);
}

function scheduleHomepageRoutePrefetch() {
  if (isCompactMedia()) return;
  const run = () => {
    prefetchResource("/cases/", "document");
    prefetchResource("/assets/css/portfolio.css?v=20260621-mobile-first-visible", "style");
    prefetchResource("/assets/optimized/portfolio-covers/space-015.webp", "image");
  };
  window.setTimeout(() => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(run, { timeout: 2600 });
      return;
    }
    run();
  }, 1800);
}

let serviceTrackCards = [];
let serviceTrackPosition = 0;
let serviceTrackActiveIndex = 0;
let serviceTrackPendingIndex = null;
let serviceTrackActivationTimer = null;
let serviceTrackAnimating = false;
const serviceTrackOriginalCount = serviceCards.length;
const serviceTrackPixelsPerMs = 0.38;
const serviceTrackMorphDuration = 620;

bindServiceShowcase();
bindDeferredImages();
scheduleHomepageRoutePrefetch();
})();
