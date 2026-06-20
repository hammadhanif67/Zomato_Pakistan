import { useEffect, useState } from "react";
import { useZomatoEffects } from "./useZomatoEffects";

const HOME_ROUTE = "/";
const LOGIN_ROUTE = "/login";
const SIGNUP_ROUTE = "/signup";

const marqueeItems = [
  { icon: "fa-solid fa-motorcycle", text: "Free delivery on Gold" },
  { icon: "fa-solid fa-tags", text: "Up to 30% off partner restaurants" },
  { icon: "fa-solid fa-bolt", text: "Lightning fast delivery" },
  { icon: "fa-solid fa-star", text: "Pakistan's #1 food app" },
  { icon: "fa-solid fa-store", text: "300k+ partner restaurants" },
  { icon: "fa-solid fa-location-dot", text: "Serving 800+ cities" },
  { icon: "fa-solid fa-gift", text: "Exclusive member offers weekly" },
  { icon: "fa-solid fa-shield-halved", text: "100% safe & secure" }
];

const stats = [
  {
    icon: "fa-solid fa-store",
    target: 300000,
    suffix: "+",
    label: "Partner Restaurants"
  },
  {
    icon: "fa-solid fa-location-dot",
    target: 800,
    suffix: "+",
    label: "Cities Served"
  },
  {
    icon: "fa-solid fa-bag-shopping",
    target: 3,
    suffix: " billion+",
    label: "Orders Delivered"
  }
];

const benefits = [
  {
    icon: "fa-solid fa-motorcycle",
    title: "Free Delivery",
    description: "At all restaurants within 7 km range"
  },
  {
    icon: "fa-solid fa-tags",
    title: "Up to 30% Extra Off",
    description: "At 20,000+ partner restaurants"
  },
  {
    icon: "fa-solid fa-bolt",
    title: "Priority Delivery",
    description: "Skip the queue, get served first every time"
  },
  {
    icon: "fa-solid fa-gift",
    title: "Exclusive Offers",
    description: "Members-only deals every single week"
  }
];

const hubCards = [
  {
    name: "zomato",
    brandColor: "#E23744",
    image:
      "https://b.zmtcdn.com/data/o2_assets/d1eee2be61cf47e2332cb7c49475c0981739777714.png",
    description:
      "Get the app now to start ordering your favorite dishes - fast, fresh, and delivered to your door."
  },
  {
    name: "blinkit",
    brandColor: "#F7D046",
    image:
      "https://b.zmtcdn.com/data/o2_assets/071cb96db84f20eea3a39804e113bdee1739777655.png",
    description:
      "Choose from 30,000+ products across groceries, electronics, and daily essentials - delivered in minutes."
  },
  {
    name: "district",
    brandColor: "#9B6FE0",
    image:
      "https://b.zmtcdn.com/data/o2_assets/b750e7c0113f10cc6b3cec658c7229d71770799109.png",
    description:
      "The best of events, movies, experiences, and everything you love about city life in one place."
  },
  {
    name: "hyperpure",
    brandColor: "#5ab462",
    image:
      "https://b.zmtcdn.com/data/o2_assets/9207cd0fc68c4ac55cfd3bfa00c02a351739777699.png",
    description:
      "Offering complete, farm-to-kitchen supply chain solutions for restaurants that demand quality."
  }
];

const footerSocials = [
  { label: "LinkedIn", short: "IN" },
  { label: "Instagram", short: "IG" },
  { label: "YouTube", short: "YT" },
  { label: "Facebook", short: "FB" },
  { label: "X (Twitter)", short: "X" }
];

const footerColumns = [
  {
    title: "Eternal",
    links: [
      "Zomato",
      "Blinkit",
      "District",
      "Hyperpure",
      "Feeding India",
      "Investor Relations"
    ]
  },
  {
    title: "For Restaurants",
    links: [
      "Partner With Us",
      "Apps For You",
      "Restaurant Consulting",
      "Hyperpure Supply"
    ]
  },
  {
    title: "For Partners",
    links: ["Delivery Partners", "Partner App", "Earnings & Incentives"]
  },
  {
    title: "Learn More",
    links: [
      "Privacy Policy",
      "Security",
      "Terms of Service",
      "Help & Support",
      "Report a Fraud",
      "Blog"
    ]
  }
];

const authHighlights = [
  {
    icon: "fa-solid fa-bag-shopping",
    title: "Fast ordering",
    description: "Save addresses, reorder favorites, and track every delivery in real time."
  },
  {
    icon: "fa-solid fa-crown",
    title: "Gold benefits",
    description: "Unlock free delivery, exclusive offers, and priority support with one account."
  },
  {
    icon: "fa-solid fa-shield-halved",
    title: "Secure account",
    description: "Your activity, saved cards, and personal data stay protected with secure flows."
  },
  {
    icon: "fa-solid fa-mobile-screen",
    title: "One experience",
    description: "Continue across web and app with one clean, connected Zomato account."
  }
];

const knownRoutes = new Set([HOME_ROUTE, LOGIN_ROUTE, SIGNUP_ROUTE]);

function getCurrentRoute() {
  if (typeof window === "undefined") {
    return HOME_ROUTE;
  }

  return knownRoutes.has(window.location.pathname) ? window.location.pathname : HOME_ROUTE;
}

export default function App() {
  const [route, setRoute] = useState(() => getCurrentRoute());

  useEffect(() => {
    const normalizedRoute = getCurrentRoute();

    if (window.location.pathname !== normalizedRoute) {
      window.history.replaceState({}, "", normalizedRoute);
      setRoute(normalizedRoute);
    }

    const handlePopState = () => {
      setRoute(getCurrentRoute());
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useZomatoEffects(route);

  const navigate = (nextRoute) => {
    const normalizedRoute = knownRoutes.has(nextRoute) ? nextRoute : HOME_ROUTE;

    if (window.location.pathname !== normalizedRoute) {
      window.history.pushState({}, "", normalizedRoute);
    }

    setRoute(normalizedRoute);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isHomeRoute = route === HOME_ROUTE;

  return (
    <>
      <PageIntro />
      <div id="scroll-progress" aria-hidden="true" />
      <div id="cursor" aria-hidden="true" />
      <div id="cursor-ring" aria-hidden="true" />
      <canvas id="particles" aria-hidden="true" />
      <Navigation route={route} onNavigate={navigate} />
      {isHomeRoute ? <HomePage /> : <AuthPage route={route} onNavigate={navigate} />}
      {isHomeRoute ? <BackToTopButton /> : null}
    </>
  );
}

function PageIntro() {
  return (
    <div id="page-intro" aria-hidden="true">
      <span className="intro-logo">zomato</span>
    </div>
  );
}

function Navigation({ route, onNavigate }) {
  const isHomeRoute = route === HOME_ROUTE;

  return (
    <nav className="navbar fixed left-0 top-0 w-full" role="navigation" aria-label="Main navigation">
      <div className="nav-inner mx-auto flex items-center justify-between gap-4">
        <button
          type="button"
          className="nav-logo"
          aria-label="Zomato home"
          onClick={() => onNavigate(HOME_ROUTE)}
        >
          zomato
        </button>

        {isHomeRoute ? (
          <div className="nav-links flex flex-wrap items-center justify-end" role="list">
            <a href="#download" className="nav-link nav-cta" role="listitem">
              <i className="fa-solid fa-mobile-screen" aria-hidden="true" />
              Get the App
            </a>
            <a href="#stats" className="nav-link nav-desktop-only" role="listitem">
              Investor Relations
            </a>
            <a href="#hub" className="nav-link nav-desktop-only" role="listitem">
              Add Restaurant
            </a>
            <button type="button" className="nav-link" onClick={() => onNavigate(LOGIN_ROUTE)}>
              Log in
            </button>
            <button type="button" className="nav-link" onClick={() => onNavigate(SIGNUP_ROUTE)}>
              Sign up
            </button>
          </div>
        ) : (
          <div className="nav-links flex flex-wrap items-center justify-end" role="list">
            <button type="button" className="nav-link" onClick={() => onNavigate(HOME_ROUTE)}>
              Home
            </button>
            <button type="button" className="nav-link" onClick={() => onNavigate(LOGIN_ROUTE)}>
              Log in
            </button>
            <button type="button" className="nav-link nav-cta" onClick={() => onNavigate(SIGNUP_ROUTE)}>
              Create account
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <AppBanner />
      <StatsSection />
      <GoldSection />
      <HubSection />
      <DownloadSection />
      <FooterSection />
    </>
  );
}

function HeroSection() {
  return (
    <section className="hero relative min-h-screen" id="hero" aria-label="Hero section">
      <div className="hero-video-wrap absolute inset-0" aria-hidden="true">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source
            src="https://b.zmtcdn.com/data/file_assets/2627bbed9d6c068e50d2aadcca11ddbb1743095925.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero-overlay" />
      </div>

      <div className="hero-accent" aria-hidden="true" />

      <div className="hero-content relative z-10">
        <p className="hero-eyebrow" aria-label="Currently serving Faisalabad">
          Now serving Faisalabad
        </p>

        <h1 className="hero-logo">zomato</h1>

        <p className="hero-tagline">
          Discover the best food & drinks in <span className="city">Faisalabad</span>
        </p>

        <div className="search-bar mx-auto" role="search">
          <div className="search-loc">
            <i className="fa-solid fa-location-dot" aria-hidden="true" />
            <input
              type="text"
              placeholder="Faisalabad"
              id="location-input"
              aria-label="Your location"
              autoComplete="off"
            />
          </div>
          <div className="search-query">
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search for restaurant, cuisine or a dish"
              id="search-input"
              aria-label="Search restaurants or dishes"
              autoComplete="off"
            />
          </div>
          <button type="button" className="search-btn" aria-label="Search">
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
            <span>Search</span>
          </button>
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
      </div>
    </section>
  );
}

function MarqueeStrip() {
  return (
    <div className="marquee-strip overflow-hidden" aria-hidden="true">
      <div className="marquee-track">
        {marqueeItems.map((item, index) => (
          <FragmentWithDot
            key={item.text}
            showDot={index < marqueeItems.length - 1}
            content={
              <span className="marquee-item">
                <i className={item.icon} aria-hidden="true" />
                {item.text}
              </span>
            }
          />
        ))}
      </div>
    </div>
  );
}

function AppBanner() {
  return (
    <section className="app-banner grid items-stretch" id="app" aria-label="App download banner">
      <div className="banner-visual" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1400&auto=format&fit=crop"
          alt=""
          className="banner-img"
          loading="lazy"
        />
        <div className="banner-visual-overlay" />
      </div>

      <div className="banner-copy">
        <div className="banner-badge">
          <i className="fa-solid fa-award" aria-hidden="true" />
          Pakistan's #1 App
        </div>

        <h2 className="banner-title">
          The <em>fastest</em>
          <br />
          way to order
          <br />
          food online
        </h2>

        <p className="banner-desc">
          Millions of dishes, thousands of restaurants.
          <br />
          Experience seamless ordering with real-time tracking,
          <br />
          exclusive deals, and Gold member benefits.
        </p>

        <div className="app-store-row flex flex-wrap items-center gap-4">
          <a href="#download" className="store-btn" aria-label="Download on Google Play">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
            />
          </a>
          <a href="#download" className="store-btn" aria-label="Download on App Store">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
              alt="Download on the App Store"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="stats-section" id="stats" aria-label="Our impact stats">
      <img
        src="https://pngimg.com/d/burger_sandwich_PNG4135.png"
        className="food-float f1"
        alt=""
        aria-hidden="true"
      />
      <img
        src="https://pngimg.com/d/pizza_PNG44090.png"
        className="food-float f2"
        alt=""
        aria-hidden="true"
      />
      <img
        src="https://pngimg.com/d/dumplings_PNG32.png"
        className="food-float f3"
        alt=""
        aria-hidden="true"
      />

      <div className="stats-inner">
        <div className="section-header">
          <div className="section-left">
            <p className="section-label">Our Impact</p>
            <h2 className="section-title">
              Better food for
              <br />
              <span className="italic accent">more people</span>
            </h2>
          </div>
          <p className="section-desc">
            For over a decade, we&apos;ve connected millions of customers with the restaurants they
            love, delivering not just food, but moments of joy, right to their doorstep.
          </p>
        </div>

        <div className="stats-grid grid gap-6" role="list">
          {stats.map((stat) => (
            <div className="stat-card" role="listitem" key={stat.label}>
              <div className="stat-icon-wrap">
                <i className={stat.icon} aria-hidden="true" />
              </div>
              <div className="stat-number">
                <span className="count" data-target={stat.target}>
                  0
                </span>
                <span className="suffix">{stat.suffix}</span>
              </div>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GoldSection() {
  return (
    <section className="gold-section" id="gold" aria-label="Zomato Gold membership">
      <div className="gold-curve" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0 Q720 80 1440 0 L1440 0 L0 0 Z" fill="#0d0d0d" />
        </svg>
      </div>

      <div className="gold-mesh" aria-hidden="true" />
      <div className="gold-grid-overlay" aria-hidden="true" />

      <GoldCoin className="g-coin-1" variant="crown" />
      <GoldCoin className="g-coin-2" variant="crownAlt" />
      <GoldCoin className="g-coin-3" variant="rs" />
      <GoldCoin className="g-coin-4" variant="star" />

      <div className="gold-inner">
        <p className="gold-brand-label">zomato</p>

        <h2 className="gold-headline">
          G
          <span className="gold-o">
            O
            <span className="gold-crown" aria-hidden="true">
              {"\u265B"}
            </span>
          </span>
          LD
        </h2>

        <p className="gold-subtitle">
          Pakistan&apos;s Top Savings Program for Food Lovers.
          <br />
          Unlock exclusive benefits with every order.
        </p>

        <div className="benefits-divider" aria-hidden="true">
          <span className="d-line" />
          <span className="d-star">{"\u2605"}</span>
          <h3>GOLD BENEFITS</h3>
          <span className="d-star">{"\u2605"}</span>
          <span className="d-line" />
        </div>

        <div className="benefits-grid grid gap-6" role="list">
          {benefits.map((benefit) => (
            <div className="benefit-card" role="listitem" key={benefit.title}>
              <div className="benefit-icon" aria-hidden="true">
                <i className={benefit.icon} />
              </div>
              <div className="benefit-text">
                <h4>{benefit.title}</h4>
                <p>{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="gold-cta-wrap">
          <a href="#download" className="gold-cta" role="button">
            <span className="cta-pulse" aria-hidden="true" />
            <i className="fa-solid fa-crown" aria-hidden="true" />
            Get Zomato Gold
          </a>
          <p className="gold-cta-note">
            Cancel anytime {"\u00B7"} No hidden fees
          </p>
        </div>
      </div>

      <div className="gold-shimmer" aria-hidden="true" />
    </section>
  );
}

function HubSection() {
  return (
    <section className="hub-section" id="hub" aria-label="Eternal - our family of apps">
      <div className="hub-blob hub-blob-1" aria-hidden="true" />
      <div className="hub-blob hub-blob-2" aria-hidden="true" />

      <div className="hub-inner">
        <header className="hub-header">
          <h2 className="hub-title">eternal</h2>
          <div className="hub-sep" aria-hidden="true">
            <span className="h-line" />
            <p>Powering Pakistan&apos;s Changing Lifestyles</p>
            <span className="h-line" />
          </div>
        </header>

        <div className="hub-grid grid gap-6" role="list">
          {hubCards.map((card) => (
            <article
              className="hub-card"
              style={{ "--brand-clr": card.brandColor }}
              role="listitem"
              key={card.name}
            >
              <div className="hub-card-body">
                <div className="hub-logo-box">
                  <img src={card.image} alt={card.name} loading="lazy" />
                </div>
                <h3 className="hub-card-name" style={{ color: card.brandColor }}>
                  {card.name}
                </h3>
                <p className="hub-card-desc">{card.description}</p>
                <a href="#download" className="hub-card-link" aria-label={`Check out ${card.name}`}>
                  Check it out <span className="arrow">{"\u2192"}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DownloadSection() {
  return (
    <section className="download-section" id="download" aria-label="Download the Zomato app">
      <div className="download-inner">
        <div className="dl-left">
          <h2>
            Download the
            <br />
            <span>app now!</span>
          </h2>
          <p>
            Experience the smoothest online food ordering on the Zomato app. Track your order
            live, chat with restaurants, and unlock Gold benefits - all in one place.
          </p>
          <div className="dl-store-row flex flex-wrap items-center gap-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
            />
          </div>
        </div>

        <div className="phone-mockup">
          <div className="phone-shell">
            <div className="phone-screen-inner">
              <p>
                Scan the QR code
                <br />
                to download the app
              </p>
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://zomato.com"
                alt="QR code to download Zomato app"
                loading="lazy"
              />
            </div>
          </div>
          <div className="phone-glow" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="footer" id="footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <p className="f-logo">zomato</p>
            <p>
              Connecting millions of food lovers with the restaurants they love since 2008. Fast,
              fresh, and always on time.
            </p>

            <div className="f-socials" role="list" aria-label="Social media links">
              {footerSocials.map((item) => (
                <a href="#" className="f-social-btn" role="listitem" aria-label={item.label} key={item.label}>
                  {item.short}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-cols grid gap-10 md:grid-cols-2 xl:grid-cols-4">
            {footerColumns.map((column) => (
              <div className="footer-col" key={column.title}>
                <h4>{column.title}</h4>
                <ul role="list">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            By continuing past this page, you agree to our Terms of Service, Cookie Policy, and
            Privacy Policy. {"\u00A9"} 2008-2026 Zomato{"\u2122"} Ltd. All rights reserved.
          </p>
          <div className="footer-store-row">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

function AuthPage({ route, onNavigate }) {
  const isLogin = route === LOGIN_ROUTE;
  const [message, setMessage] = useState("");
  const previewItems = authHighlights.slice(0, 3);

  useEffect(() => {
    setMessage("");
  }, [route]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") || "");

    if (!isLogin) {
      const confirmPassword = String(formData.get("confirmPassword") || "");

      if (password !== confirmPassword) {
        setMessage("Please make sure both passwords match before creating your account.");
        return;
      }
    }

    setMessage(
      isLogin
        ? "Login page is ready. Connect your backend auth API to sign users in."
        : "Sign up page is ready. Connect your backend auth API to create new accounts."
    );
  };

  return (
    <main className="auth-page">
      <div className="auth-background" aria-hidden="true">
        <div className="auth-orb auth-orb-primary" />
        <div className="auth-orb auth-orb-secondary" />
      </div>

      <div className="auth-stage">
        <section className="auth-aside" aria-label="Why use Zomato account">
          <div className="auth-aside-inner">
            <p className="auth-pill">
              <i className="fa-solid fa-bolt" aria-hidden="true" />
              Zomato Account
            </p>
            <h1 className="auth-title">
              {isLogin ? "Welcome back to faster food ordering." : "Create your account and start ordering faster."}
            </h1>
            <p className="auth-copy">
              {isLogin
                ? "Access saved addresses, live tracking, Gold perks, and your favorite restaurants from one clean login."
                : "Join Zomato to save your details, discover offers, and keep every order synced across web and mobile."}
            </p>

            <div className="auth-preview-card">
              <p className="auth-preview-label">Included with your account</p>
              <div className="auth-preview-list">
                {previewItems.map((item) => (
                  <div className="auth-preview-item" key={item.title}>
                    <span className="auth-preview-icon">
                      <i className={item.icon} aria-hidden="true" />
                    </span>
                    <div>
                      <h2>{item.title}</h2>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="auth-card" aria-label={isLogin ? "Login form" : "Sign up form"}>
          <div className="auth-card-top">
            <button type="button" className="auth-home-link" onClick={() => onNavigate(HOME_ROUTE)}>
              <i className="fa-solid fa-arrow-left" aria-hidden="true" />
              Back to home
            </button>
            <p className="auth-brand">zomato</p>
          </div>

          <div className="auth-tabs" role="tablist" aria-label="Authentication pages">
            <button
              type="button"
              className={`auth-tab ${isLogin ? "is-active" : ""}`}
              onClick={() => onNavigate(LOGIN_ROUTE)}
            >
              Log in
            </button>
            <button
              type="button"
              className={`auth-tab ${!isLogin ? "is-active" : ""}`}
              onClick={() => onNavigate(SIGNUP_ROUTE)}
            >
              Sign up
            </button>
          </div>

          <div className="auth-mobile-summary">
            <p>{isLogin ? "Track orders, save favorites, and access Gold." : "Create your account in a few quick steps."}</p>
          </div>

          <p className="auth-form-eyebrow">{isLogin ? "Log in" : "Sign up"}</p>
          <h2 className="auth-form-title">
            {isLogin ? "Access your Zomato profile" : "Create your Zomato profile"}
          </h2>
          <p className="auth-form-copy">
            {isLogin
              ? "Use your registered details to continue to orders, Gold, and saved addresses."
              : "Fill in your details below to create a new account and unlock the full experience."}
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin ? (
              <FormField
                icon="fa-solid fa-user"
                label="Full Name"
                name="fullName"
                type="text"
                placeholder="Muhammad Ali"
              />
            ) : null}

            <FormField
              icon="fa-solid fa-envelope"
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
            />

            {!isLogin ? (
              <div className="auth-field-grid">
                <FormField
                  icon="fa-solid fa-phone"
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="+92 300 1234567"
                />
                <FormField
                  icon="fa-solid fa-location-dot"
                  label="City"
                  name="city"
                  type="text"
                  placeholder="Faisalabad"
                />
              </div>
            ) : null}

            <FormField
              icon="fa-solid fa-lock"
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />

            {!isLogin ? (
              <FormField
                icon="fa-solid fa-shield-halved"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Repeat your password"
              />
            ) : null}

            <div className="auth-meta">
              <label className="auth-check">
                <input
                  type="checkbox"
                  className="auth-checkbox"
                  defaultChecked={isLogin}
                  required={!isLogin}
                />
                {isLogin ? "Keep me signed in" : "I agree to the terms and privacy policy"}
              </label>

              {isLogin ? (
                <button
                  type="button"
                  className="auth-utility-link"
                  onClick={() =>
                    setMessage("Forgot password flow can be connected once your auth backend is ready.")
                  }
                >
                  Forgot password?
                </button>
              ) : null}
            </div>

            {message ? (
              <div
                className={`auth-message ${
                  message.startsWith("Please")
                    ? "auth-message-error"
                    : "auth-message-success"
                }`}
              >
                {message}
              </div>
            ) : null}

            <button
              type="submit"
              className="auth-submit"
            >
              <i className={`fa-solid ${isLogin ? "fa-arrow-right-to-bracket" : "fa-user-check"}`} aria-hidden="true" />
              {isLogin ? "Log in to your account" : "Create account"}
            </button>
          </form>

          <div className="auth-divider">
            <span />
            or continue with
            <span />
          </div>

          <div className="auth-provider-grid">
            <button
              type="button"
              className="auth-provider-btn"
            >
              <i className="fa-brands fa-google" aria-hidden="true" />
              Google
            </button>
            <button
              type="button"
              className="auth-provider-btn"
            >
              <i className="fa-brands fa-apple" aria-hidden="true" />
              Apple
            </button>
          </div>

          <p className="auth-footer-copy">
            {isLogin ? "Don't have an account yet?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="auth-inline-link"
              onClick={() => onNavigate(isLogin ? SIGNUP_ROUTE : LOGIN_ROUTE)}
            >
              {isLogin ? "Create one now" : "Log in here"}
            </button>
          </p>
        </section>
      </div>
    </main>
  );
}

function FormField({ icon, label, name, type, placeholder }) {
  return (
    <label className="auth-field">
      <span className="auth-field-label">{label}</span>
      <span className="auth-input-wrap">
        <i className={icon} aria-hidden="true" />
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required
        />
      </span>
    </label>
  );
}

function BackToTopButton() {
  return (
    <button id="back-to-top" type="button" aria-label="Back to top">
      <i className="fa-solid fa-chevron-up" aria-hidden="true" />
    </button>
  );
}

function FragmentWithDot({ content, showDot }) {
  return (
    <>
      {content}
      {showDot ? <span className="marquee-dot" /> : null}
    </>
  );
}

function GoldCoin({ className, variant }) {
  return (
    <div className={`g-coin ${className}`} aria-hidden="true">
      {variant === "crown" ? (
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="gc1" cx="35%" cy="35%">
              <stop offset="0%" stopColor="#ffe066" />
              <stop offset="50%" stopColor="#c9a84c" />
              <stop offset="100%" stopColor="#6b4f10" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="56" fill="url(#gc1)" stroke="#8b6914" strokeWidth="2" />
          <g transform="translate(60,60)">
            <path d="M-22 12 L-22 -8 L-8 4 L0 -18 L8 4 L22 -8 L22 12 Z" fill="#1a0f00" opacity="0.85" />
            <circle cx="-22" cy="-8" r="4" fill="#1a0f00" opacity="0.85" />
            <circle cx="0" cy="-18" r="4" fill="#1a0f00" opacity="0.85" />
            <circle cx="22" cy="-8" r="4" fill="#1a0f00" opacity="0.85" />
          </g>
        </svg>
      ) : null}

      {variant === "crownAlt" ? (
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="gc2" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#fff0a0" />
              <stop offset="45%" stopColor="#d4a847" />
              <stop offset="100%" stopColor="#5a3e08" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="56" fill="url(#gc2)" stroke="#8b6914" strokeWidth="2" />
          <g transform="translate(60,60)">
            <path d="M-22 12 L-22 -8 L-8 4 L0 -18 L8 4 L22 -8 L22 12 Z" fill="#1a0f00" opacity="0.85" />
            <circle cx="-22" cy="-8" r="4" fill="#1a0f00" opacity="0.85" />
            <circle cx="0" cy="-18" r="4" fill="#1a0f00" opacity="0.85" />
            <circle cx="22" cy="-8" r="4" fill="#1a0f00" opacity="0.85" />
          </g>
        </svg>
      ) : null}

      {variant === "rs" ? (
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="gc3" cx="40%" cy="40%">
              <stop offset="0%" stopColor="#ffe580" />
              <stop offset="60%" stopColor="#b8922a" />
              <stop offset="100%" stopColor="#4a3008" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="56" fill="url(#gc3)" stroke="#8b6914" strokeWidth="2" />
          <text
            x="50%"
            y="58%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="36"
            fill="#1a0f00"
            opacity="0.8"
            fontWeight="bold"
          >
            Rs
          </text>
        </svg>
      ) : null}

      {variant === "star" ? (
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="gc4" cx="45%" cy="35%">
              <stop offset="0%" stopColor="#ffd966" />
              <stop offset="55%" stopColor="#c09030" />
              <stop offset="100%" stopColor="#3a2405" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="56" fill="url(#gc4)" stroke="#8b6914" strokeWidth="2" />
          <text
            x="50%"
            y="58%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="32"
            fill="#1a0f00"
            opacity="0.8"
          >
            {"\u2605"}
          </text>
        </svg>
      ) : null}
    </div>
  );
}
