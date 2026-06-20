"use strict";

const REVEAL_SELECTORS = [
  ".hero-eyebrow",
  ".hero-logo",
  ".hero-tagline",
  ".search-bar",
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

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pointerIsFine = window.matchMedia("(pointer: fine)").matches;

  document.documentElement.classList.add("js-ready");

  setupIntro(prefersReducedMotion);
  setupCursor(pointerIsFine, prefersReducedMotion);
  setupParticles(prefersReducedMotion);
  setupScrollProgress();
  setupNavbar();
  setupBackToTop();
  setupSearchBar();
  setupCounters(prefersReducedMotion);
  setupReveals(prefersReducedMotion);
  preventDeadAnchors();
});

function setupIntro(prefersReducedMotion) {
  const intro = document.getElementById("page-intro");

  if (!intro) {
    return;
  }

  const delay = prefersReducedMotion ? 250 : 900;

  window.setTimeout(() => {
    intro.classList.add("is-hidden");
    window.setTimeout(() => intro.remove(), 900);
  }, delay);
}

function setupCursor(pointerIsFine, prefersReducedMotion) {
  const cursor = document.getElementById("cursor");
  const cursorRing = document.getElementById("cursor-ring");

  if (!cursor || !cursorRing || !pointerIsFine || prefersReducedMotion) {
    document.body.classList.add("no-custom-cursor");
    return;
  }

  document.body.classList.add("has-custom-cursor");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

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

    window.requestAnimationFrame(animateRing);
  };

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    moveCursor(mouseX, mouseY);
  });

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
    cursorRing.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
    cursorRing.style.opacity = "1";
  });

  document.querySelectorAll("a, button, input, .benefit-card, .hub-card, .stat-card, .store-btn").forEach((element) => {
    element.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    element.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });

  moveCursor(mouseX, mouseY);
  animateRing();
}

function setupParticles(prefersReducedMotion) {
  const canvas = document.getElementById("particles");

  if (!canvas) {
    return;
  }

  const context = canvas.getContext("2d");

  if (!context) {
    return;
  }

  const count = prefersReducedMotion ? 18 : 42;
  const particles = [];

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

    window.requestAnimationFrame(draw);
  };

  window.addEventListener("resize", resize);
  draw();
}

function setupScrollProgress() {
  const progressBar = document.getElementById("scroll-progress");

  if (!progressBar) {
    return;
  }

  let ticking = false;

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
    window.requestAnimationFrame(update);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  update();
}

function setupNavbar() {
  const navbar = document.querySelector(".navbar");

  if (!navbar) {
    return;
  }

  const update = () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
}

function setupBackToTop() {
  const button = document.getElementById("back-to-top");

  if (!button) {
    return;
  }

  const update = () => {
    button.classList.toggle("is-visible", window.scrollY > 560);
  };

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", update, { passive: true });
  update();
}

function setupSearchBar() {
  const searchBar = document.querySelector(".search-bar");

  if (!searchBar) {
    return;
  }

  const inputs = searchBar.querySelectorAll("input");
  const searchButton = searchBar.querySelector(".search-btn");

  inputs.forEach((input) => {
    input.addEventListener("focus", () => searchBar.classList.add("is-active"));
    input.addEventListener("blur", () => {
      const stillFocused = Array.from(inputs).some((item) => item === document.activeElement);

      if (!stillFocused) {
        searchBar.classList.remove("is-active");
      }
    });
  });

  if (!searchButton) {
    return;
  }

  searchButton.addEventListener("click", () => {
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
  });
}

function setupCounters(prefersReducedMotion) {
  const counters = document.querySelectorAll(".count");

  if (!counters.length) {
    return;
  }

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
        window.requestAnimationFrame(tick);
      }
    };

    window.requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.counted === "true") {
        return;
      }

      entry.target.dataset.counted = "true";
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.45 });

  counters.forEach((counter) => observer.observe(counter));
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
    return;
  }

  targets.forEach((target, index) => {
    target.classList.add("reveal");
    target.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
  });

  if (prefersReducedMotion) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px"
  });

  targets.forEach((target) => observer.observe(target));
}

function preventDeadAnchors() {
  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => event.preventDefault());
  });
}
