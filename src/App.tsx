import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";

type IconName =
  | "arrow"
  | "call"
  | "check"
  | "chevron"
  | "clock"
  | "close"
  | "mail"
  | "map"
  | "menu"
  | "shield"
  | "whatsapp";

const phone = "0547350489";
const whatsappUrl =
  "https://wa.me/233547350489?text=Hello%20AK%20SCAFFOLDING%2C%20I%27d%20like%20to%20make%20an%20enquiry.";

type PhotoType = "hero" | "h-frame" | "rental" | "tubes" | "cuplock" | "jacks" | "site";

const photoSources: Record<PhotoType, { src: string; description: string }> = {
  hero: {
    src: "/images/scaffold-assembly.jpg",
    description: "Workers assembling a steel scaffold against a clear sky.",
  },
  "h-frame": {
    src: "/images/scaffold-worker.jpg",
    description: "A large steel scaffold structure with workers on site.",
  },
  rental: {
    src: "/images/scaffold-site.jpg",
    description: "A worker installing a scaffold platform.",
  },
  tubes: {
    src: "/images/scaffold-frames.jpg",
    description: "Close-up of galvanized scaffold tubes and fittings.",
  },
  cuplock: {
    src: "/images/scaffold-parts.jpg",
    description: "Steel scaffolding arranged along a concrete building.",
  },
  jacks: {
    src: "/images/scaffold-frames.jpg",
    description: "Close-up of connected steel scaffold tubes and fittings.",
  },
  site: {
    src: "/images/scaffold-site.jpg",
    description: "A worker installing a scaffold platform at a construction site.",
  },
};

const routes = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Gallery", path: "/gallery" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const equipment: { title: string; description: string; tag?: string; type: PhotoType }[] = [
  {
    title: "H-Frame Scaffolding",
    description:
      "Our core system for safe, efficient access on building, plastering and finishing projects.",
    tag: "Featured equipment",
    type: "h-frame",
  },
  {
    title: "Scaffolding Rental & Sales",
    description:
      "Flexible rental periods and equipment sales for projects of every practical size.",
    type: "rental",
  },
  {
    title: "Tubes & Boards",
    description: "Strong steel tubes and dependable working boards for adaptable access platforms.",
    type: "tubes",
  },
  {
    title: "Cuplock Systems",
    description:
      "A fast, versatile modular system suited to complex commercial and structural work.",
    type: "cuplock",
  },
  {
    title: "Jacks & Bases",
    description:
      "Adjustable foundations and support components for a stable, level scaffold setup.",
    type: "jacks",
  },
];

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    call: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z" />
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="m18 6-12 12" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    map: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-5" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M21 11.5a8.6 8.6 0 0 1-9 8.5 9.8 9.8 0 0 1-3.8-.9L3 21l1.8-5A8.6 8.6 0 1 1 21 11.5z" />
        <path d="M8.4 8.2c.3 3.3 2.4 5.3 5.6 6.1" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function navigate(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function LinkButton({
  children,
  to,
  variant = "primary",
  icon,
  onClick,
}: {
  children: ReactNode;
  to: string;
  variant?: "primary" | "secondary" | "white" | "outline";
  icon?: IconName;
  onClick?: () => void;
}) {
  const external = to.startsWith("http") || to.startsWith("tel:") || to.startsWith("mailto:");
  return (
    <a
      className={`button button--${variant}`}
      href={to}
      onClick={(event) => {
        onClick?.();
        if (!external) {
          event.preventDefault();
          navigate(to);
        }
      }}
      target={to.startsWith("http") ? "_blank" : undefined}
      rel={to.startsWith("http") ? "noreferrer" : undefined}
    >
      {icon && <Icon name={icon} size={19} />}
      {children}
    </a>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      href="/"
      className={`logo ${light ? "logo--light" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        navigate("/");
      }}
      aria-label="AK Scaffolding home"
    >
      <span className="logo-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>
        <strong>AK</strong> SCAFFOLDING<small>Rental & Sales</small>
      </span>
    </a>
  );
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {routes.map((route) => (
            <a
              key={route.path}
              href={route.path}
              className={current === route.path ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                navigate(route.path);
              }}
            >
              {route.label}
            </a>
          ))}
        </nav>
        <div className="header-action">
          <LinkButton to="/quote">Request a Quote</LinkButton>
        </div>
        <button
          className="menu-button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} size={25} />
        </button>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {routes.map((route) => (
            <a
              key={route.path}
              href={route.path}
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                navigate(route.path);
              }}
            >
              {route.label}
              <Icon name="chevron" size={18} />
            </a>
          ))}
          <LinkButton to="/quote" onClick={() => setOpen(false)}>
            Request a Quote
          </LinkButton>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo light />
          <p>Complete scaffolding solutions for safer, stronger builds across Accra.</p>
          <div className="payment-chips">
            <span>MoMo</span>
            <span>Cash</span>
            <span>Bank transfer</span>
          </div>
        </div>
        <div>
          <h4>Quick links</h4>
          {routes.slice(1).map((r) => (
            <a
              key={r.path}
              href={r.path}
              onClick={(e) => {
                e.preventDefault();
                navigate(r.path);
              }}
            >
              {r.label}
            </a>
          ))}
        </div>
        <div>
          <h4>Get in touch</h4>
          <a href={`tel:${phone}`}>{phone}</a>
          <a href="mailto:michaelakuffo7@gmail.com">michaelakuffo7@gmail.com</a>
          <p>
            2nd Tatabo St, Amamorle,
            <br />
            Pokuase, Accra
          </p>
        </div>
        <div>
          <h4>Opening hours</h4>
          <p>
            9am — 5pm
            <br />
            Every day
          </p>
          <LinkButton to="/quote" variant="outline">
            Get a free quote
          </LinkButton>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} AK SCAFFOLDING</span>
        <span>Built on safety. Driven by service.</span>
      </div>
    </footer>
  );
}

function Layout({ children, current }: { children: ReactNode; current: string }) {
  return (
    <>
      <Header current={current} />
      <main>{children}</main>
      <Footer />
      <a
        className="floating-whatsapp"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <Icon name="whatsapp" size={27} />
      </a>
      <div className="mobile-contact-bar">
        <a href={`tel:${phone}`}>
          <Icon name="call" size={20} />
          Call Now
        </a>
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          <Icon name="whatsapp" size={20} />
          WhatsApp
        </a>
      </div>
    </>
  );
}

function ProjectPhoto({
  label,
  type = "h-frame",
  tall = false,
}: {
  label: string;
  type?: PhotoType;
  tall?: boolean;
}) {
  return (
    <div className={`photo-frame ${tall ? "photo-frame--tall" : ""}`}>
      <img
        src={photoSources[type].src}
        alt={`${label}: ${photoSources[type].description}`}
        loading={type === "hero" ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={type === "hero" ? "high" : undefined}
      />
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="page-hero">
      <div className="page-hero-pattern" />
      <div className="container">
        <span className="eyebrow eyebrow--light">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}

const scaffoldStages = [
  {
    title: "Set a solid base",
    description: "Level the ground and set the base plates and jacks.",
  },
  {
    title: "Erect the first H-frames",
    description: "Position the first H-frames upright on the prepared bases.",
  },
  {
    title: "Add the cross braces",
    description: "Lock the frames together with secure cross braces.",
  },
  {
    title: "Stack the next level",
    description: "Stack the next level of frames securely above the first.",
  },
  {
    title: "Install the platforms",
    description: "Fix the boards or platforms to create a firm working level.",
  },
  {
    title: "Secure and inspect",
    description: "Add guard rails and check the structure.",
  },
];

function ScaffoldIllustration({ stage }: { stage: number }) {
  return (
    <svg
      className="scaffold-illustration"
      viewBox="0 0 420 270"
      role="img"
      aria-label={`Isometric scaffold construction stage ${stage + 1}`}
    >
      <defs>
        <linearGradient id={`platform-${stage}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dff3ff" />
          <stop offset="1" stopColor="#8ecbed" />
        </linearGradient>
      </defs>
      <path className="scaffold-ground" d="m48 214 142-77 181 48-145 78z" />

      <g className="scaffold-base">
        <path d="m105 220 22-12 22 6-22 12zM276 223l22-12 22 6-22 12z" />
        <path d="M127 216v-28M298 217v-28" />
        <circle cx="127" cy="188" r="5" />
        <circle cx="298" cy="189" r="5" />
      </g>

      {stage >= 1 && (
        <g className="scaffold-frame">
          <path d="M127 190V86M205 169V67M127 86l78-19M298 191V88M376 169V67M298 88l78-21" />
          <path
            className="frame-rungs"
            d="m127 119 78-19M127 153l78-19M298 121l78-19M298 154l78-19"
          />
        </g>
      )}

      {stage >= 2 && (
        <g className="scaffold-braces">
          <path d="m127 190 78-123M205 169 127 86M298 191l78-124M376 169l-78-81" />
          <circle cx="166" cy="128" r="7" />
          <circle cx="337" cy="129" r="7" />
        </g>
      )}

      {stage >= 3 && (
        <g className="scaffold-frame scaffold-frame--upper">
          <path d="M127 86V22M205 67V3M127 22l78-19M298 88V24M376 67V3M298 24l78-21" />
          <path className="frame-rungs" d="m127 53 78-19M298 55l78-19" />
          <path
            className="scaffold-braces"
            d="M127 86 205 3M205 67l-78-45M298 88l78-85M376 67l-78-43"
          />
        </g>
      )}

      {stage >= 4 && (
        <g className="scaffold-platform">
          <path fill={`url(#platform-${stage})`} d="m112 80 185-43 94 25-186 45z" />
          <path d="m112 80 93 27 186-45M143 89l185-44M173 98l185-45" />
        </g>
      )}

      {stage >= 5 && (
        <g className="scaffold-rails">
          <path d="M127 73V25M205 92V44M298 50V2M376 69V21" />
          <path d="m127 25 78 19 171-43M127 50l78 19 171-43M205 44l171-43" />
        </g>
      )}
    </svg>
  );
}

function StageCard({ stage, index }: { stage: (typeof scaffoldStages)[number]; index: number }) {
  return (
    <>
      <div className="stage-visual">
        <ScaffoldIllustration stage={index} />
        <span className="stage-number">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="stage-copy">
        <span>Build stage {index + 1}</span>
        <h3>{stage.title}</h3>
        <p>{stage.description}</p>
      </div>
    </>
  );
}

function ScaffoldCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pointerStart = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % scaffoldStages.length),
      5000,
    );
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  const changeStage = (next: number) => {
    setActive((next + scaffoldStages.length) % scaffoldStages.length);
  };

  const cardPosition = (index: number) => {
    let distance = index - active;
    if (distance > scaffoldStages.length / 2) distance -= scaffoldStages.length;
    if (distance < -scaffoldStages.length / 2) distance += scaffoldStages.length;
    if (distance < -2 || distance > 2) return "stage-card--hidden";
    return distance === 0
      ? "stage-card--active"
      : `stage-card--${distance < 0 ? "left" : "right"}-${Math.abs(distance)}`;
  };

  return (
    <section className="section scaffold-section">
      <div className="container">
        <SectionHeading
          eyebrow="Build the scaffold"
          title="How a Scaffold Goes Up"
          text="From base to platform: safe, strong and simple."
          align="center"
        />

        {reducedMotion ? (
          <div
            className="reduced-stage-list"
            role="region"
            aria-label="Scaffold construction stages"
            onScroll={(event) => {
              const cards = event.currentTarget.querySelectorAll<HTMLElement>(".stage-card");
              const center =
                event.currentTarget.getBoundingClientRect().left + event.currentTarget.clientWidth / 2;
              let closestIndex = 0;
              let closestDistance = Number.POSITIVE_INFINITY;

              cards.forEach((card, index) => {
                const cardCenter = card.getBoundingClientRect().left + card.clientWidth / 2;
                const distance = Math.abs(cardCenter - center);
                if (distance < closestDistance) {
                  closestIndex = index;
                  closestDistance = distance;
                }
              });

              setActive(closestIndex);
            }}
          >
            {scaffoldStages.map((stage, index) => (
              <article className="stage-card" key={stage.title}>
                <StageCard stage={stage} index={index} />
              </article>
            ))}
          </div>
        ) : (
          <div
            className="scaffold-carousel"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onPointerDown={(event) => {
              if (event.pointerType === "mouse") return;
              pointerStart.current = event.clientX;
              setPaused(true);
            }}
            onPointerUp={(event) => {
              if (event.pointerType === "mouse") return;
              if (pointerStart.current !== null) {
                const distance = event.clientX - pointerStart.current;
                if (Math.abs(distance) > 42) {
                  changeStage(active + (distance < 0 ? 1 : -1));
                }
              }
              pointerStart.current = null;
              setPaused(false);
            }}
            onPointerCancel={(event) => {
              if (event.pointerType === "mouse") return;
              pointerStart.current = null;
              setPaused(false);
            }}
            aria-roledescription="carousel"
            aria-label="Scaffold construction stages"
          >
            <div className="stage-deck">
              {scaffoldStages.map((stage, index) => (
                <article
                  className={`stage-card ${cardPosition(index)}`}
                  key={stage.title}
                  aria-hidden={index !== active}
                >
                  <StageCard stage={stage} index={index} />
                </article>
              ))}
            </div>
            <div className="carousel-controls">
              <button
                className="carousel-arrow carousel-arrow--previous"
                onClick={() => changeStage(active - 1)}
                aria-label="Show previous stage"
              >
                <Icon name="arrow" size={20} />
              </button>
              <div className="carousel-dots" aria-label="Choose a construction stage">
                {scaffoldStages.map((stage, index) => (
                  <button
                    className={index === active ? "active" : ""}
                    key={stage.title}
                    onClick={() => changeStage(index)}
                    aria-label={`Show step ${index + 1}: ${stage.title}`}
                    aria-current={index === active ? "step" : undefined}
                  />
                ))}
              </div>
              <button
                className="carousel-arrow"
                onClick={() => changeStage(active + 1)}
                aria-label="Show next stage"
              >
                <Icon name="arrow" size={20} />
              </button>
            </div>
          </div>
        )}

        <div className="carousel-progress" aria-live="polite">
          <span>
            Step <strong>{active + 1}</strong> of {scaffoldStages.length}
          </span>
          <div>
            <i style={{ width: `${((active + 1) / scaffoldStages.length) * 100}%` }} />
          </div>
        </div>
        <div className="carousel-cta">
          <LinkButton to="/quote">
            Need scaffolding for your project? Request a Quote <Icon name="arrow" size={18} />
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const serviceCards: [string, string, PhotoType][] = [
    [
      "Rental & Sales",
      "Flexible access to the right equipment, whether you need it for a short job or to own.",
      "rental",
    ],
    [
      "H-Frame Scaffolding",
      "Reliable, quick-to-assemble steel frames for everyday building work.",
      "h-frame",
    ],
    [
      "Tubes & Boards",
      "Versatile components for secure working platforms and tailored setups.",
      "tubes",
    ],
    [
      "Cuplock, Jacks & Bases",
      "Modular systems and stable support components for complex projects.",
      "cuplock",
    ],
  ];
  return (
    <Layout current="/">
      <section className="home-hero">
        <ProjectPhoto label="Scaffolding project" type="hero" tall />
        <div className="home-hero-overlay" />
        <div className="container hero-content">
          <span className="eyebrow eyebrow--light">Scaffolding rental & sales · Accra</span>
          <h1>Complete Scaffolding Solutions for Every Project.</h1>
          <p>
            Quality scaffolding rental and sales in Accra—dependable equipment, flexible terms and
            support you can count on.
          </p>
          <div className="button-row">
            <LinkButton to="/quote" variant="white">
              Request a Quote <Icon name="arrow" />
            </LinkButton>
            <LinkButton to={whatsappUrl} variant="secondary" icon="whatsapp">
              Chat on WhatsApp
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Why customers trust AK Scaffolding">
        <div className="container trust-grid">
          {[
            ["02", "Years Experience"],
            ["↔", "Rental & Sales"],
            ["AC", "Delivery Within Accra"],
            ["9–5", "Open Every Day"],
          ].map(([mark, label]) => (
            <div key={label}>
              <strong>{mark}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="What we supply"
            title="Built for the work ahead."
            text="From a small residential build to a major site, get solid equipment in the quantity your project needs."
          />
          <div className="service-grid">
            {serviceCards.map(([title, text, type]) => (
              <article className="service-card" key={title}>
                <ProjectPhoto label={title} type={type} />
                <div className="card-content">
                  <span className="card-number">
                    0{serviceCards.findIndex((c) => c[0] === title) + 1}
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <a
                    href="/services"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/services");
                    }}
                  >
                    Explore service <Icon name="arrow" size={17} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--grey">
        <div className="container split">
          <div>
            <SectionHeading
              eyebrow="Why choose AK"
              title="The stronger alternative to wooden scaffolding."
              text="We make safe steel access practical and affordable for builders across Accra."
            />
            <div className="check-list">
              {[
                "Affordable, transparent pricing",
                "Quality equipment you can rely on",
                "Any practical quantity you need",
                "Flexible payment options",
                "Safer than traditional wooden scaffolding",
              ].map((item) => (
                <div key={item}>
                  <span>
                    <Icon name="check" size={17} />
                  </span>
                  {item}
                </div>
              ))}
            </div>
            <LinkButton to="/about" variant="outline">
              Discover our story
            </LinkButton>
          </div>
          <ProjectPhoto label="Steel scaffolding in use" type="site" tall />
        </div>
      </section>

      <ScaffoldCarousel />

      <section className="section payment-section">
        <div className="container">
          <SectionHeading
            eyebrow="Payment that works with your project"
            title="Flexible ways to get started."
            align="center"
          />
          <div className="payment-grid">
            {[
              ["01", "Pay on pickup", "Settle your amount when you collect the equipment."],
              [
                "70%",
                "Deposit & balance",
                "Pay a 70% deposit, then complete the balance after the work.",
              ],
              ["✓", "Pay after work", "Available by prior agreement based on your project."],
            ].map(([mark, title, text]) => (
              <div className="payment-card" key={title}>
                <strong>{mark}</strong>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <p className="payment-note">Terms are agreed clearly before equipment leaves our yard.</p>
        </div>
      </section>

      <section className="section section--navy who-section">
        <div className="container split">
          <SectionHeading
            eyebrow="Who we serve"
            title="Equipment for every kind of builder."
            text="Professional support, whether you manage multiple sites or are building your first home."
          />
          <div className="audience-grid">
            {[
              "Contractors",
              "Construction companies",
              "Engineers",
              "Property developers",
              "Individual builders",
              "Homeowners",
            ].map((item, i) => (
              <div key={item}>
                <span>0{i + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner />
    </Layout>
  );
}

function CtaBanner() {
  return (
    <section className="cta-wrap">
      <div className="container">
        <div className="cta-banner">
          <div>
            <span className="eyebrow">Ready when you are</span>
            <h2>Let’s build something stronger.</h2>
            <p>Tell us what you need. We’ll help you choose the right equipment.</p>
          </div>
          <div className="button-row">
            <LinkButton to="/quote" variant="white">
              Request a Quote
            </LinkButton>
            <LinkButton to={`tel:${phone}`} variant="outline" icon="call">
              Call {phone}
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesPage() {
  return (
    <Layout current="/services">
      <PageHero
        eyebrow="Services & equipment"
        title="Steel access. Solid support."
        text="Rent or buy quality scaffolding equipment for building work across Accra."
      />
      <section className="section">
        <div className="container equipment-list">
          {equipment.map((item, i) => (
            <article
              className={`equipment-card ${i === 0 ? "equipment-card--featured" : ""}`}
              key={item.title}
            >
              <ProjectPhoto label={item.title} type={item.type} />
              <div className="equipment-content">
                <span className="eyebrow">{item.tag || `Equipment · 0${i + 1}`}</span>
                <h2>{item.title}</h2>
                <p>
                  {item.description} Contact us to confirm the right quantity and arrangement for
                  your site.
                </p>
                <LinkButton to="/quote">
                  Request a Quote <Icon name="arrow" size={18} />
                </LinkButton>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section section--grey">
        <div className="container terms-grid">
          <div>
            <SectionHeading
              eyebrow="Clear from the start"
              title="Rental terms in plain wording."
              text="No confusing language. We agree the details with you before the rental begins."
            />
          </div>
          <div className="terms-list">
            <div>
              <span>01</span>
              <h3>Refundable deposit</h3>
              <p>
                Your deposit is refundable when the equipment is returned in the agreed condition.
              </p>
            </div>
            <div>
              <span>02</span>
              <h3>Late returns</h3>
              <p>Keeping equipment beyond the agreed date adds to the amount payable.</p>
            </div>
            <div>
              <span>03</span>
              <h3>Equipment care</h3>
              <p>
                The customer is responsible for equipment that is lost or damaged during the rental.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section accepted-payment">
        <div className="container">
          <SectionHeading
            eyebrow="Accepted payments"
            title="Pay the way that suits you."
            align="center"
          />
          <div className="accepted-grid">
            <div>
              MoMo<small>Mobile Money</small>
            </div>
            <div>
              Cash<small>At pickup</small>
            </div>
            <div>
              Bank<small>Bank transfer</small>
            </div>
          </div>
        </div>
      </section>
      <CtaBanner />
    </Layout>
  );
}

function GalleryPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");
  const photos: [string, string, PhotoType][] = [
    ["H-Frame system", "Equipment", "h-frame"],
    ["Tubes and boards", "Equipment", "tubes"],
    ["Scaffold team at work", "On-site examples", "site"],
    ["Cuplock components", "Equipment", "cuplock"],
    ["Scaffold assembly", "On-site examples", "hero"],
    ["Jacks and bases", "Equipment", "jacks"],
    ["Platform installation", "On-site examples", "site"],
    ["Scaffolding in use", "On-site examples", "rental"],
  ];
  const visible = photos
    .map((p, index) => ({ p, index }))
    .filter(({ p }) => filter === "All" || p[1] === filter);
  return (
    <Layout current="/gallery">
      <PageHero
        eyebrow="Project gallery"
        title="See what solid support looks like."
        text="Illustrative scaffold and site photography. Contact us to confirm the exact equipment and availability."
      />
      <section className="section">
        <div className="container">
          <div className="gallery-filter" role="group" aria-label="Filter gallery">
            {["All", "Equipment", "On-site examples"].map((item) => (
              <button
                key={item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="gallery-grid">
            {visible.map(({ p, index }, i) => (
              <button
                className={i === 0 || i === 5 ? "gallery-large" : ""}
                key={p[0]}
                onClick={() => setSelected(index)}
                aria-label={`Open ${p[0]} image`}
              >
                <ProjectPhoto label={p[0]} type={p[2]} />
                <span>
                  {p[1]}
                  <strong>{p[0]}</strong>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
      {selected !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={photos[selected][0]}
          onClick={() => setSelected(null)}
        >
          <button aria-label="Close image">
            <Icon name="close" size={26} />
          </button>
          <div onClick={(e) => e.stopPropagation()}>
            <ProjectPhoto label={photos[selected][0]} type={photos[selected][2]} tall />
            <p>
              {photos[selected][1]} <strong>{photos[selected][0]}</strong>
            </p>
          </div>
        </div>
      )}
      <CtaBanner />
    </Layout>
  );
}

function AboutPage() {
  return (
    <Layout current="/about">
      <PageHero
        eyebrow="About AK Scaffolding"
        title="A family business built around safer work."
        text="Founded by siblings Mike and Maxwell to make dependable steel scaffolding more accessible in Accra."
      />
      <section className="section">
        <div className="container story-grid">
          <div className="founders">
            <ProjectPhoto label="Scaffold crew assembling a steel structure" type="hero" tall />
            <ProjectPhoto label="Scaffolding worker installing a platform" type="site" tall />
          </div>
          <div>
            <SectionHeading eyebrow="Our story" title="Two brothers. One safer way forward." />
            <div className="story-copy">
              <p>
                Mike and Maxwell saw builders relying on traditional wooden scaffolding and the
                risks that came with it. They knew there was a stronger, safer and more dependable
                way to work at height.
              </p>
              <p>
                They started AK SCAFFOLDING to give contractors, tradespeople and homeowners
                practical access to quality steel scaffolding—without making the process
                complicated.
              </p>
              <p>
                After two years in the industry, the same belief still guides every rental, sale and
                delivery: better equipment helps people build with greater confidence.
              </p>
            </div>
            <div className="founder-signoff">
              <strong>Mike & Maxwell</strong>
              <span>Founders, AK SCAFFOLDING</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--grey">
        <div className="container values-grid">
          <article>
            <span>01</span>
            <h3>Our mission</h3>
            <p>
              To make quality steel scaffolding straightforward, flexible and accessible for
              projects across Accra.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Our experience</h3>
            <p>
              Two years of hands-on industry experience serving real building needs with practical
              solutions.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Our commitment</h3>
            <p>
              To promote safer work at height through dependable equipment and clear, responsible
              service.
            </p>
          </article>
        </div>
      </section>
      <section className="safety-banner">
        <div className="container">
          <Icon name="shield" size={42} />
          <div>
            <span>Safety commitment</span>
            <h2>Every stronger build starts with a safer platform.</h2>
          </div>
        </div>
      </section>
      <CtaBanner />
    </Layout>
  );
}

function QuotePage() {
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setStatus("error");
      form.reportValidity();
      return;
    }
    setStatus("success");
    form.reset();
  };
  return (
    <Layout current="/quote">
      <PageHero
        eyebrow="Request a quote"
        title="Tell us what your project needs."
        text="Share a few details and we’ll get back to you with the right equipment options."
      />
      <section className="section quote-section">
        <div className="container quote-grid">
          <form className="quote-form" onSubmit={submit} noValidate>
            <div className="form-intro">
              <span>01</span>
              <div>
                <h2>Your project details</h2>
                <p>Fields marked * are required.</p>
              </div>
            </div>
            {status === "error" && (
              <div className="form-alert form-alert--error" role="alert">
                <strong>Please check the form.</strong>
                <span>Complete all required fields before sending.</span>
              </div>
            )}
            {status === "success" && (
              <div className="form-alert form-alert--success" role="status">
                <Icon name="check" />
                <span>
                  <strong>Thanks—your request is ready.</strong> We’ll contact you shortly to
                  discuss your project.
                </span>
              </div>
            )}
            <div className="form-grid">
              <Field label="Full name *">
                <input name="name" required placeholder="e.g. Kofi Mensah" />
              </Field>
              <Field label="Phone number *">
                <input name="phone" required type="tel" placeholder="e.g. 024 000 0000" />
              </Field>
              <Field label="Email (optional)">
                <input name="email" type="email" placeholder="you@example.com" />
              </Field>
              <Field label="Equipment needed *">
                <select name="equipment" required defaultValue="">
                  <option value="" disabled>
                    Select equipment
                  </option>
                  {equipment.map((e) => (
                    <option key={e.title}>{e.title}</option>
                  ))}
                </select>
              </Field>
              <Field label="Quantity *">
                <input
                  name="quantity"
                  required
                  min="1"
                  type="number"
                  placeholder="Enter quantity"
                />
              </Field>
              <Field label="Rent or buy? *">
                <select name="type" required defaultValue="">
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option>Rent</option>
                  <option>Buy</option>
                  <option>Not sure yet</option>
                </select>
              </Field>
              <Field label="Delivery location in Accra *" wide>
                <input name="location" required placeholder="Area, landmark or site address" />
              </Field>
              <Field label="Preferred start date *">
                <input name="start" required type="date" />
              </Field>
              <Field label="Rental duration">
                <input name="duration" placeholder="e.g. 3 weeks" />
              </Field>
              <Field label="Extra notes" wide>
                <textarea
                  name="notes"
                  rows={5}
                  placeholder="Tell us about your project, access needs or delivery instructions."
                />
              </Field>
            </div>
            <button className="button button--primary form-submit" type="submit">
              Send Quote Request <Icon name="arrow" />
            </button>
            <p className="privacy-note">Your details are only used to respond to this request.</p>
          </form>
          <aside className="quote-aside">
            <div className="aside-card">
              <span className="eyebrow">Flexible payments</span>
              <h3>Choose what works.</h3>
              <ul>
                <li>
                  <Icon name="check" size={16} />
                  Pay on pickup
                </li>
                <li>
                  <Icon name="check" size={16} />
                  70% deposit, balance after work
                </li>
                <li>
                  <Icon name="check" size={16} />
                  Pay after work by agreement
                </li>
              </ul>
              <div className="payment-chips payment-chips--light">
                <span>MoMo</span>
                <span>Cash</span>
                <span>Transfer</span>
              </div>
            </div>
            <div className="whatsapp-card">
              <Icon name="whatsapp" size={32} />
              <span>Prefer to chat?</span>
              <h3>WhatsApp us directly.</h3>
              <p>Send us your equipment list or project details and we’ll take it from there.</p>
              <LinkButton to={whatsappUrl} variant="white">
                Start a chat
              </LinkButton>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}

function Field({
  label,
  children,
  wide = false,
}: {
  label: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <label className={wide ? "field field--wide" : "field"}>
      <span>{label}</span>
      {children}
    </label>
  );
}

function ContactPage() {
  return (
    <Layout current="/contact">
      <PageHero
        eyebrow="Contact us"
        title="Let’s talk about your project."
        text="Call, message or visit our Pokuase location. We’re open every day from 9am to 5pm."
      />
      <section className="section">
        <div className="container contact-grid">
          <div>
            <SectionHeading
              eyebrow="Get in touch"
              title="We’re ready to help."
              text="For the quickest response, call or send us a WhatsApp message with what you need."
            />
            <div className="contact-list">
              <a href={`tel:${phone}`}>
                <span>
                  <Icon name="call" />
                </span>
                <div>
                  <small>Phone & WhatsApp</small>
                  <strong>{phone}</strong>
                </div>
                <Icon name="arrow" />
              </a>
              <a href="mailto:michaelakuffo7@gmail.com">
                <span>
                  <Icon name="mail" />
                </span>
                <div>
                  <small>Email address</small>
                  <strong>michaelakuffo7@gmail.com</strong>
                </div>
                <Icon name="arrow" />
              </a>
              <div>
                <span>
                  <Icon name="map" />
                </span>
                <div>
                  <small>Our location</small>
                  <strong>
                    2nd Tatabo St, near Faithful God House,
                    <br />
                    Amamorle, Pokuase, Accra
                  </strong>
                </div>
              </div>
              <div>
                <span>
                  <Icon name="clock" />
                </span>
                <div>
                  <small>Opening hours</small>
                  <strong>9am to 5pm, every day</strong>
                </div>
              </div>
            </div>
            <div className="button-row">
              <LinkButton to={`tel:${phone}`} icon="call">
                Call Now
              </LinkButton>
              <LinkButton to={whatsappUrl} variant="secondary" icon="whatsapp">
                WhatsApp
              </LinkButton>
            </div>
          </div>
          <div className="map-placeholder">
            <div className="map-grid" />
            <div className="map-pin">
              <Icon name="map" size={30} />
            </div>
            <div className="map-label">
              <small>MAP PLACEHOLDER</small>
              <strong>AK SCAFFOLDING</strong>
              <span>Pokuase, Accra</span>
            </div>
          </div>
        </div>
      </section>
      <CtaBanner />
    </Layout>
  );
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);
  const pages: Record<string, ReactNode> = {
    "/": <HomePage />,
    "/services": <ServicesPage />,
    "/gallery": <GalleryPage />,
    "/about": <AboutPage />,
    "/quote": <QuotePage />,
    "/contact": <ContactPage />,
  };
  return pages[path] || <HomePage />;
}
