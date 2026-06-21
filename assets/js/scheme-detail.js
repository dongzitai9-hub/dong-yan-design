(() => {
  const deferredImages = new WeakSet();
  let imageObserver = null;

  const isCompactMedia = () =>
    window.matchMedia("(max-width: 860px), (hover: none) and (pointer: coarse)").matches;

  const getSchemeImageSrc = (image) =>
    isCompactMedia()
      ? image?.dataset.schemeMobileSrc || image?.dataset.schemeSrc
      : image?.dataset.schemeDesktopSrc || image?.dataset.schemeSrc;

  const loadDeferredImage = (image) => {
    const nextSrc = getSchemeImageSrc(image);
    if (!image || !nextSrc) return;
    image.src = nextSrc;
    image.removeAttribute("data-scheme-src");
    image.removeAttribute("data-scheme-mobile-src");
    image.removeAttribute("data-scheme-desktop-src");
  };

  const observeDeferredImage = (image) => {
    if (!getSchemeImageSrc(image) || deferredImages.has(image)) return;
    deferredImages.add(image);

    if (!("IntersectionObserver" in window)) {
      loadDeferredImage(image);
      return;
    }

    imageObserver ||= new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          imageObserver.unobserve(entry.target);
          loadDeferredImage(entry.target);
        });
      },
      { rootMargin: "180px 0px" }
    );
    imageObserver.observe(image);
  };

  const preloadCompactSchemeImages = () => {
    if (!isCompactMedia()) return;
    const images = [...document.querySelectorAll("img[data-scheme-mobile-src]")];
    const run = () => images.forEach(loadDeferredImage);
    window.setTimeout(() => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(run, { timeout: 1200 });
        return;
      }
      run();
    }, 450);
  };

  const bindSwipeNavigation = (surface, onPrevious, onNext) => {
    if (!surface) return;

    let startX = 0;
    let startY = 0;
    let isTracking = false;

    const finish = (event) => {
      if (!isTracking) return;
      isTracking = false;
      surface.classList.remove("is-dragging");

      const point = event.changedTouches?.[0] || event;
      const deltaX = point.clientX - startX;
      const deltaY = point.clientY - startY;
      if (Math.abs(deltaX) < 46 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return;

      if (deltaX < 0) {
        onNext();
      } else {
        onPrevious();
      }
    };

    surface.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      startX = event.clientX;
      startY = event.clientY;
      isTracking = true;
      surface.classList.add("is-dragging");
    });

    surface.addEventListener("pointerup", finish);
    surface.addEventListener("pointercancel", () => {
      isTracking = false;
      surface.classList.remove("is-dragging");
    });
    surface.addEventListener(
      "touchstart",
      (event) => {
        const point = event.touches[0];
        startX = point.clientX;
        startY = point.clientY;
        isTracking = true;
        surface.classList.add("is-dragging");
      },
      { passive: true }
    );
    surface.addEventListener("touchend", finish);
  };

  const createCircularFilm = (viewport, images, counter) => {
    if (!viewport || images.length < 1) return null;

    const originals = [...images];
    const track = document.createElement("div");
    const duration = 660;
    let activeIndex = 0;
    let position = 1;
    let isAnimating = false;

    const prepareImage = (image) => {
      image.classList.remove("is-active", "is-leaving");
      image.removeAttribute("style");
      image.removeAttribute("data-film-clone");
      return image;
    };

    const cloneSlide = (image) => {
      const clone = image.cloneNode(false);
      clone.className = "";
      clone.removeAttribute("style");
      clone.setAttribute("aria-hidden", "true");
      clone.setAttribute("data-film-clone", "true");
      clone.loading = "lazy";
      clone.fetchPriority = "low";
      observeDeferredImage(clone);
      return clone;
    };

    const updateCounter = () => {
      if (!counter) return;
      counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(originals.length).padStart(2, "0")}`;
    };

    const updateActiveClass = () => {
      originals.forEach((image, index) => {
        image.classList.toggle("is-active", index === activeIndex);
      });
    };

    const setPosition = (animate) => {
      track.style.transition = animate ? `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)` : "none";
      track.style.transform = `translate3d(${-position * 100}%, 0, 0)`;
    };

    track.className = "film-strip-track";
    track.append(cloneSlide(originals[originals.length - 1]));
    originals.forEach((image) => {
      track.append(prepareImage(image));
      observeDeferredImage(image);
    });
    track.append(cloneSlide(originals[0]));
    viewport.append(track);

    updateActiveClass();
    updateCounter();
    setPosition(false);

    const move = (direction) => {
      if (isAnimating || originals.length < 2) return;
      isAnimating = true;

      if (direction === "left") {
        position += 1;
        activeIndex = (activeIndex + 1) % originals.length;
      } else {
        position -= 1;
        activeIndex = (activeIndex - 1 + originals.length) % originals.length;
      }

      updateCounter();
      setPosition(true);

      window.setTimeout(() => {
        if (position === 0) {
          position = originals.length;
          setPosition(false);
        } else if (position === originals.length + 1) {
          position = 1;
          setPosition(false);
        }
        updateActiveClass();
        isAnimating = false;
      }, duration + 40);
    };

    return {
      moveLeft: () => move("left"),
      moveRight: () => move("right")
    };
  };

  document
    .querySelectorAll("img[data-scheme-src], img[data-scheme-mobile-src][data-scheme-desktop-src]")
    .forEach(observeDeferredImage);
  preloadCompactSchemeImages();

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const images = [...carousel.querySelectorAll(".carousel-track img")];
    const track = carousel.querySelector(".carousel-track");
    const previous = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    const counter = carousel.querySelector("[data-carousel-count]");
    const film = createCircularFilm(track, images, counter);

    previous?.addEventListener("click", () => film?.moveLeft());
    next?.addEventListener("click", () => film?.moveRight());
    bindSwipeNavigation(
      track,
      () => film?.moveRight(),
      () => film?.moveLeft()
    );
  });

  document.querySelectorAll("[data-sticky-story]").forEach((story) => {
    const strip = story.querySelector(".case-story-strip");
    const viewport = story.querySelector(".case-story-viewport");
    const canvas = story.querySelector(".case-canvas");
    if (!strip || !viewport || !canvas) return;

    let ticking = false;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const update = () => {
      ticking = false;
      if (window.matchMedia("(max-width: 860px)").matches) {
        story.style.setProperty("--meta-opacity", "1");
        story.style.setProperty("--story-shift", "0");
        return;
      }

      const rect = story.getBoundingClientRect();
      const totalScroll = Math.max(1, rect.height - window.innerHeight);
      const canvasStyle = window.getComputedStyle(canvas);
      const storyStyle = window.getComputedStyle(story);
      const frameTopSpace = parseFloat(storyStyle.paddingTop) || 0;
      const canvasTopPadding = parseFloat(canvasStyle.paddingTop) || 0;
      const canvasBottomPadding = parseFloat(canvasStyle.paddingBottom) || 0;
      const pinDelay = frameTopSpace + canvasTopPadding;
      const activeScroll = Math.max(1, totalScroll - pinDelay);
      const progress = clamp((-rect.top - pinDelay) / activeScroll, 0, 1);
      const maxShift = Math.max(0, strip.scrollHeight - viewport.clientHeight + canvasBottomPadding);
      const softenedProgress = 1 - Math.pow(1 - progress, 1.35);
      const shift = maxShift * softenedProgress;
      const metaOpacity = clamp((progress - 0.74) / 0.18, 0, 1);

      story.style.setProperty("--story-shift", shift.toFixed(2));
      story.style.setProperty("--meta-opacity", metaOpacity.toFixed(3));
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("load", requestUpdate);
    requestUpdate();
  });
})();
