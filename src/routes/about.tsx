import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Building2, Handshake, Wrench, ExternalLink, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — House Électricité" },
      { name: "description", content: "Casablanca-based official ENTES Elektronik distributor for Moroccan industry." },
      { property: "og:title", content: "About — House Électricité" },
      { property: "og:description", content: "Who we are and how we serve Moroccan industrial clients." },
    ],
  }),
  component: AboutPage,
});

/* ── hooks ── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCountUp(target: number, duration = 1600, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setValue(Math.floor((1 - Math.pow(1 - progress, 3)) * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView(0.05);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function SlideIn({
  children,
  from = "left",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  from?: "left" | "right";
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView(0.08);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : `translateX(${from === "left" ? "-44px" : "44px"})`,
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function AnimatedCounter({ target, suffix = "", start = false }: { target: number; suffix?: string; start?: boolean }) {
  const value = useCountUp(target, 1600, start);
  return (
    <>
      {value}
      {suffix}
    </>
  );
}

const highlights = [
  {
    icon: Building2,
    title: "Casablanca HQ",
    body: "Centrally located to serve clients across all regions of Morocco.",
  },
  {
    icon: Handshake,
    title: "ENTES Certified Partner",
    body: "Official distributor with direct factory support and full warranty coverage.",
  },
  {
    icon: Wrench,
    title: "Technical Support Team",
    body: "Field-tested expertise for product sizing, commissioning, and after-sales.",
  },
];

function AboutPage() {
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* counter trigger */
  const { ref: statsRef, inView: statsInView } = useInView(0.3);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[var(--navy)] text-white">
        <div className="grid-bg absolute inset-0 opacity-20" />
        <div
          className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[var(--electric)]/12 pointer-events-none"
          style={{ filter: "blur(100px)" }}
        />
        <div
          className="absolute left-1/4 bottom-0 h-48 w-48 rounded-full bg-[var(--electric)]/8 pointer-events-none"
          style={{ filter: "blur(70px)" }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, var(--electric), transparent)",
              transform: heroReady ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: "transform 1.1s ease 0.2s",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-6 py-20 sm:py-28">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-center">
            {/* left */}
            <div
              style={{
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "translateY(0)" : "translateY(18px)",
                transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
              }}
            >
              <nav className="text-xs uppercase tracking-wider text-white/45 mb-5">
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span className="mx-2 text-white/20">/</span>
                <span className="text-white/70">About</span>
              </nav>
              <p className="label-eyebrow !text-[var(--electric)] mb-3">About Us</p>
              <h1 className="font-display text-6xl font-bold uppercase bolt-left leading-none sm:text-7xl">
                Who We Are
              </h1>
              <p className="mt-5 pl-4 text-base text-white/60 leading-relaxed max-w-lg">
                House Électricité S.A.R.L. is the official ENTES Elektronik distributor in Morocco — bringing precision
                electrical equipment to industrial and commercial clients across the kingdom since our founding.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 pl-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-md bg-[var(--electric)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[var(--electric)]/25 transition-all duration-200 hover:bg-[var(--electric-dark)] hover:-translate-y-0.5 group"
                >
                  Our Products <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/12 hover:-translate-y-0.5"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* right — animated stats panel */}
            <div
              ref={statsRef}
              style={{
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "translateX(0)" : "translateX(40px)",
                transition: "opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s",
              }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              {[
                { n: 15, suffix: "+", label: "Years of expertise", accent: true },
                { n: 500, suffix: "+", label: "Products distributed", accent: false },
                { text: "ENTES", label: "Certified partner", accent: false },
                { text: "Casa", label: "Morocco-based", accent: true },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="flex flex-col gap-1 rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-200 hover:bg-white/8 hover:border-white/15"
                >
                  <div className="font-display text-3xl font-bold text-white">
                    {"n" in s ? <AnimatedCounter target={s.n} suffix={s.suffix} start={statsInView} /> : s.text}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-white/40">{s.label}</div>
                  {s.accent && <div className="mt-2 h-0.5 w-8 rounded bg-[var(--electric)]" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* image */}
            <SlideIn from="left">
              <div className="group relative overflow-hidden rounded-lg border border-[var(--line)] shadow-[0_8px_32px_rgba(26,36,86,0.10)]">
                <span className="absolute left-0 top-0 z-10 h-full w-[3px] bg-[var(--electric)]" />
                <img
                  src={aboutImg}
                  alt="House Électricité team in the Casablanca distribution warehouse"
                  loading="lazy"
                  width={1600}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* overlay badge */}
                <div className="absolute bottom-5 left-8 rounded-md bg-[var(--navy)]/90 px-4 py-2.5 backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/45">Est. 15+ years ago</p>
                  <p className="font-display text-lg font-bold uppercase text-white">Casablanca, Morocco</p>
                </div>
              </div>
            </SlideIn>

            {/* text */}
            <div className="flex flex-col gap-6">
              <SlideIn from="right" delay={60}>
                <div>
                  <p className="label-eyebrow !text-[var(--electric)] mb-3">Our Story</p>
                  <h2 className="font-display text-4xl font-bold uppercase text-[var(--navy)] bolt-left leading-tight">
                    Precision Equipment
                    <br />
                    for Moroccan Industry
                  </h2>
                </div>
              </SlideIn>

              <SlideIn from="right" delay={120}>
                <div className="space-y-4 text-base leading-relaxed text-[var(--ink)]/80">
                  <p>
                    House Électricité S.A.R.L. is a Casablanca-based company specialized in the distribution of
                    high-quality electrical measurement and protection equipment. As the official distributor of ENTES
                    Elektronik in Morocco, we provide industrial clients with proven solutions for energy management,
                    power quality, and electrical protection.
                  </p>
                  <p>
                    Founded with a commitment to technical excellence and customer support, we serve electrical
                    contractors, industrial facilities, energy managers, and engineering firms across Morocco — from
                    large manufacturing plants to commercial real estate portfolios.
                  </p>
                </div>
              </SlideIn>

              {/* at a glance */}
              <SlideIn from="right" delay={180}>
                <div className="rounded-lg border border-[var(--line)] bg-[var(--offwhite)] p-6">
                  <p className="label-eyebrow !text-[var(--navy)] mb-4">At a glance</p>
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                    {[
                      { dt: "Headquarters", dd: "Casablanca, Morocco" },
                      { dt: "Founded", dd: "15+ years ago" },
                      { dt: "Partnership", dd: "ENTES Elektronik" },
                      { dt: "Products", dd: "500+ references" },
                    ].map((row) => (
                      <div key={row.dt}>
                        <dt className="text-[var(--ink)]/55 uppercase tracking-wide text-xs mb-0.5">{row.dt}</dt>
                        <dd className="font-semibold text-[var(--navy)]">{row.dd}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </SlideIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHT CARDS ── */}
      <section className="bg-[var(--offwhite)]">
        <div className="mx-auto max-w-[1280px] px-6 py-16">
          <FadeUp className="mb-10">
            <p className="label-eyebrow !text-[var(--electric)] mb-2">Why choose us</p>
            <h2 className="font-display text-4xl font-bold uppercase text-[var(--navy)] bolt-left">Our Strengths</h2>
          </FadeUp>
          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((c, i) => {
              const Icon = c.icon;
              return (
                <FadeUp key={c.title} delay={i * 100}>
                  <div className="group relative flex flex-col gap-4 rounded-lg border border-[var(--line)] bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(26,36,86,0.10)] hover:border-[var(--electric)]/20">
                    <span className="absolute left-0 top-0 h-0 w-[3px] bg-[var(--electric)] group-hover:h-full transition-all duration-300 rounded-sm" />
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[var(--navy)] text-white shadow-md transition-all duration-300 group-hover:bg-[var(--electric)] group-hover:scale-110 group-hover:rotate-3">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-display text-xl font-bold uppercase text-[var(--navy)] transition-colors duration-200 group-hover:text-[var(--electric)]">
                      {c.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--ink)]/75">{c.body}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ENTES PARTNERSHIP ── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-16">
          <SlideIn from="left">
            <div className="group relative overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--navy)] p-10 text-white transition-all duration-300 hover:shadow-[0_16px_48px_rgba(26,36,86,0.20)]">
              <div className="grid-bg absolute inset-0 opacity-15 pointer-events-none" />
              <div
                className="absolute -right-16 top-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-[var(--electric)]/12 pointer-events-none"
                style={{ filter: "blur(60px)" }}
              />
              <span className="absolute left-0 top-0 h-full w-[3px] bg-[var(--electric)]" />

              <div className="relative grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
                <div>
                  <p className="label-eyebrow !text-[var(--electric)] mb-3">Manufacturer</p>
                  <h2 className="font-display text-4xl font-bold uppercase bolt-left leading-tight">Our Products</h2>
                  {/* bullet list */}
                  <ul className="mt-6 flex flex-col gap-2.5">
                    {[
                      "60+ countries worldwide",
                      "International standards",
                      "Full factory warranty",
                      "Direct technical support",
                    ].map((b) => (
                      <li key={b} className="flex items-center gap-2.5 text-sm text-white/70">
                        <CheckCircle2 size={14} className="text-[var(--electric)] shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4 text-white/75">
                  <p className="text-base leading-relaxed">
                    ENTES Elektronik is a leading Turkish manufacturer of electrical measurement and protection
                    equipment, with worldwide distribution across more than 60 countries. Their portfolio covers power
                    quality analyzers, energy meters, reactive power controllers, protection relays and current
                    transformers — all engineered to international standards.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href="https://entes.eu"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-[var(--electric)]/30 bg-[var(--electric)]/10 px-4 py-2 text-sm font-semibold text-[var(--electric)] transition-all duration-200 hover:bg-[var(--electric)] hover:text-white group/ext"
                    >
                      Visit entes.eu{" "}
                      <ExternalLink
                        size={13}
                        className="transition-transform duration-200 group-hover/ext:translate-x-0.5 group-hover/ext:-translate-y-0.5"
                      />
                    </a>
                    <Link
                      to="/products"
                      className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white group/prod"
                    >
                      Browse Catalog{" "}
                      <ArrowRight size={13} className="group-hover/prod:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SlideIn>

          {/* bottom CTA */}
          <FadeUp delay={100} className="mt-10 text-center">
            <p className="text-sm text-[var(--ink)]/55 mb-4">Ready to work with us?</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--electric)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[var(--electric)]/25 transition-all duration-200 hover:bg-[var(--electric-dark)] hover:-translate-y-0.5 group"
            >
              Talk to Our Team <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
