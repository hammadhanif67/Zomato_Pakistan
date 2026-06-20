import { useEffect } from "react";

const REVEAL_SELECTORS = [
  ".hero-eyebrow",
  ".hero-logo",
  ".hero-tagline",
  ".scroll-hint",
  ".banner-visual",
  ".banner-copy",
  ".section-header",
  ".stat-card",
  ".gold-brand-label",
  ".gold-headline",
  ".gold-subtitle",
  ".benefits-divider",
  ".benefit-card",
  ".gold-cta-wrap",
  ".hub-header",
  ".hub-card",
  ".dl-left",
  ".phone-mockup",
  ".footer-brand",
  ".footer-col",
  ".footer-bottom"
];

export function useZomatoEffects(routeKey) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointerIsFine = window.matchMedia("(pointer: fine)").matches;

    document.documentElement.classList.add("js-ready");

    const cleanups = [
      setupIntro(prefersReducedMotion),
      setupCursor(pointerIsFine, prefersReducedMotion),
      setupParticles(prefersReducedMotion),
      setupScrollProgress(),
      setupNavbar(),
      setupBackToTop(),
      setupSearchBar(),
      setupCounters(prefersReducedMotion),
      setupReveals(prefersReducedMotion),
      preventDeadAnchors()
    ].filter((cleanup) => typeof cleanup === "function");

    return () => {
      document.documentElement.classList.remove("js-ready");
      document.body.classList.remove("no-custom-cursor", "has-custom-cursor", "cursor-hover");
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [routeKey]);
}

function setupIntro(prefersReducedMotion) {
  const intro = document.getElementById("page-intro");

  if (!intro) {
    return undefined;
  }

  const delay = prefersReducedMotion ? 250 : 900;
  const hideTimeout = window.setTimeout(() => {
    intro.classList.add("is-hidden");
  }, delay);

  return () => {
    window.clearTimeout(hideTimeout);
    intro.classList.add("is-hidden");
  };
}

function setupCursor(pointerIsFine, prefersReducedMotion) {
  const cursor = document.getElementById("cursor");
  const cursorRing = document.getElementById("cursor-ring");

  if (!cursor || !cursorRing || !pointerIsFine || prefersReducedMotion) {
    document.body.classList.add("no-custom-cursor");
    return () => {
      document.body.classList.remove("no-custom-cursor");
    };
  }

  document.body.classList.add("has-custom-cursor");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let animationFrameId = 0;

  const moveCursor = (x, y) => {
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    cursor.style.opacity = "1";
  };

  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    cursorRing.style.opacity = "1";

    animationFrameId = window.requestAnimationFrame(animateRing);
  };

  const handleMouseMove = (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    moveCursor(mouseX, mouseY);
  };

  const handleMouseLeave = () => {
    cursor.style.opacity = "0";
    cursorRing.style.opacity = "0";
  };

  const handleMouseEnter = () => {
    cursor.style.opacity = "1";
    cursorRing.style.opacity = "1";
  };

  const hoverTargets = document.querySelectorAll(
    "a, button, input, .benefit-card, .hub-card, .stat-card, .store-btn"
  );
  const hoverHandlers = [];

  hoverTargets.forEach((element) => {
    const onEnter = () => document.body.classList.add("cursor-hover");
    const onLeave = () => document.body.classList.remove("cursor-hover");

    element.addEventListener("mouseenter", onEnter);
    element.addEventListener("mouseleave", onLeave);
    hoverHandlers.push([element, onEnter, onLeave]);
  });

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseleave", handleMouseLeave);
  document.addEventListener("mouseenter", handleMouseEnter);

  moveCursor(mouseX, mouseY);
  animateRing();

  return () => {
    window.cancelAnimationFrame(animationFrameId);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseleave", handleMouseLeave);
    document.removeEventListener("mouseenter", handleMouseEnter);

    hoverHandlers.forEach(([element, onEnter, onLeave]) => {
      element.removeEventListener("mouseenter", onEnter);
      element.removeEventListener("mouseleave", onLeave);
    });

    document.body.classList.remove("has-custom-cursor", "cursor-hover");
  };
}

function setupParticles(prefersReducedMotion) {
  const canvas = document.getElementById("particles");

  if (!(canvas instanceof HTMLCanvasElement)) {
    return undefined;
  }

  const context = canvas.getContext("2d");

  if (!context) {
    return undefined;
  }

  const count = prefersReducedMotion ? 18 : 42;
  const particles = [];
  let animationFrameId = 0;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const makeParticle = () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.8 + 0.8,
    speedX: (Math.random() - 0.5) * 0.2,
    speedY: -(Math.random() * 0.35 + 0.08),
    alpha: Math.random() * 0.45 + 0.08,
    hue: Math.random() > 0.72 ? 42 : 352
  });

  resize();

  for (let index = 0; index < count; index += 1) {
    particles.push(makeParticle());
  }

  const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.y < -12 || particle.x < -12 || particle.x > canvas.width + 12) {
        Object.assign(particle, makeParticle(), { y: canvas.height + 12 });
      }

      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = `hsla(${particle.hue}, 90%, 68%, ${particle.alpha})`;
      context.fill();
    });

    animationFrameId = window.requestAnimationFrame(draw);
  };

  window.addEventListener("resize", resize);
  draw();

  return () => {
    window.cancelAnimationFrame(animationFrameId);
    window.removeEventListener("resize", resize);
  };
}

function setupScrollProgress() {
  const progressBar = document.getElementById("scroll-progress");

  if (!progressBar) {
    return undefined;
  }

  let ticking = false;
  let animationFrameId = 0;

  const update = () => {
    const scrollTop = window.scrollY;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;

    progressBar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    animationFrameId = window.requestAnimationFrame(update);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  update();

  return () => {
    window.cancelAnimationFrame(animationFrameId);
    window.removeEventListener("scroll", requestUpdate);
    window.removeEventListener("resize", requestUpdate);
  };
}

function setupNavbar() {
  const navbar = document.querySelector(".navbar");

  if (!navbar) {
    return undefined;
  }

  const update = () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  window.addEventListener("scroll", update, { passive: true });
  update();

  return () => {
    window.removeEventListener("scroll", update);
  };
}

function setupBackToTop() {
  const button = document.getElementById("back-to-top");

  if (!(button instanceof HTMLButtonElement)) {
    return undefined;
  }

  const update = () => {
    button.classList.toggle("is-visible", window.scrollY > 560);
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  button.addEventListener("click", handleClick);
  window.addEventListener("scroll", update, { passive: true });
  update();

  return () => {
    button.removeEventListener("click", handleClick);
    window.removeEventListener("scroll", update);
  };
}

function setupSearchBar() {
  const searchBar = document.querySelector(".search-bar");

  if (!searchBar) {
    return undefined;
  }

  const inputs = Array.from(searchBar.querySelectorAll("input"));
  const searchButton = searchBar.querySelector(".search-btn");

  const handleFocus = () => {
    searchBar.classList.add("is-active");
  };

  const handleBlur = () => {
    const stillFocused = inputs.some((input) => input === document.activeElement);

    if (!stillFocused) {
      searchBar.classList.remove("is-active");
    }
  };

  inputs.forEach((input) => {
    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);
  });

  if (!(searchButton instanceof HTMLButtonElement)) {
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      });
    };
  }

  const handleSearchClick = () => {
    const queryInput = searchBar.querySelector("#search-input");

    if (!(queryInput instanceof HTMLInputElement)) {
      return;
    }

    if (!queryInput.value.trim()) {
      queryInput.focus();
      searchBar.classList.add("is-shaking");
      window.setTimeout(() => searchBar.classList.remove("is-shaking"), 450);
      return;
    }

    searchButton.classList.add("is-working");
    window.setTimeout(() => searchButton.classList.remove("is-working"), 800);
  };

  searchButton.addEventListener("click", handleSearchClick);

  return () => {
    inputs.forEach((input) => {
      input.removeEventListener("focus", handleFocus);
      input.removeEventListener("blur", handleBlur);
    });

    searchButton.removeEventListener("click", handleSearchClick);
  };
}

function setupCounters(prefersReducedMotion) {
  const counters = document.querySelectorAll(".count");

  if (!counters.length) {
    return undefined;
  }

  const animationFrameIds = new Set();

  const animateCounter = (counter) => {
    const target = Number.parseInt(counter.dataset.target || "0", 10);

    if (!Number.isFinite(target)) {
      return;
    }

    if (prefersReducedMotion) {
      counter.textContent = formatCounter(target);
      return;
    }

    const startTime = performance.now();
    const duration = 1500;

    const tick = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);

      counter.textContent = formatCounter(current);

      if (progress < 1) {
        const rafId = window.requestAnimationFrame(tick);
        animationFrameIds.add(rafId);
      }
    };

    const initialFrameId = window.requestAnimationFrame(tick);
    animationFrameIds.add(initialFrameId);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.target.dataset.counted === "true") {
          return;
        }

        entry.target.dataset.counted = "true";
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.45 }
  );

  counters.forEach((counter) => observer.observe(counter));

  return () => {
    observer.disconnect();
    animationFrameIds.forEach((frameId) => window.cancelAnimationFrame(frameId));
  };
}

function formatCounter(value) {
  if (value >= 1000) {
    return `${Math.round(value / 1000)}k`;
  }

  return `${value}`;
}

function setupReveals(prefersReducedMotion) {
  const targets = document.querySelectorAll(REVEAL_SELECTORS.join(","));

  if (!targets.length) {
    return undefined;
  }

  targets.forEach((target, index) => {
    target.classList.add("reveal");
    target.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
  });

  if (prefersReducedMotion) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return undefined;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  targets.forEach((target) => observer.observe(target));

  return () => {
    observer.disconnect();
  };
}

function preventDeadAnchors() {
  const links = document.querySelectorAll('a[href="#"]');
  const handleClick = (event) => event.preventDefault();

  links.forEach((link) => link.addEventListener("click", handleClick));

  return () => {
    links.forEach((link) => link.removeEventListener("click", handleClick));
  };
}
