import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Zap, CheckCircle2, Download, FileText, Phone, Mail } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { categories, solutions, CATALOG_URL } from "@/data/mockData";
import heroBg from "@/assets/hero-bg.jpg";
import whyImg from "@/assets/about.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "House Électricité — ENTES distributor in Morocco" },
      {
        name: "description",
        content:
          "Casablanca-based official ENTES Elektronik distributor. Energy metering, power factor correction and protection relays for industrial sites in Morocco.",
      },
      { property: "og:title", content: "House Électricité — ENTES distributor in Morocco" },
      {
        property: "og:description",
        content: "Precision electrical equipment for industrial and commercial applications across Morocco.",
      },
    ],
  }),
  component: HomePage,
});

/* ─── HOOKS ─── */

function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

function useInView(threshold = 0.15) {
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

function useTypewriter(text: string, speed = 38, start = false) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!start) return;
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, start]);
  return displayed;
}

/* ─── SUB-COMPONENTS ─── */

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const { ref, inView } = useInView(0.3);
  const value = useCountUp(target, 1600, inView);
  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
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
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
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
  const { ref, inView } = useInView(0.1);
  const x = from === "left" ? "-40px" : "40px";
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : `translateX(${x})`,
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function ScaleIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1)" : "scale(0.92)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── ANIMATED LINE ─── */
function DrawLine() {
  const { ref, inView } = useInView(0.2);
  return (
    <div ref={ref} className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
      <div
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--electric), transparent)",
          transform: inView ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 1.2s ease 0.3s",
        }}
      />
    </div>
  );
}

/* ─── HERO TYPEWRITER ─── */
function HeroHeadline() {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 300);
    return () => clearTimeout(t);
  }, []);
  const line1 = useTypewriter("More than a supplier,", 42, started);
  const line2 = useTypewriter("we are the solution.", 42, line1.length >= 21);
  const showCursor = line2.length < 20;
  return (
    <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.92] tracking-tight sm:text-6xl lg:text-[5.5rem] bolt-left">
      <span className="text-white block min-h-[1em]">{line1 || "\u00A0"}</span>
      <span className="block min-h-[1em]">
        <span className="text-white/85">we are the </span>
        <span className="text-[var(--electric)]">{line2.replace("we are the ", "")}</span>
        {showCursor && (
          <span className="inline-block w-[3px] h-[0.85em] bg-[var(--electric)] ml-1 align-middle animate-pulse" />
        )}
      </span>
    </h1>
  );
}

/* ─── PAGE ─── */

const whyPoints = [
  "Official ENTES Moroccan distributor",
  "Technical expertise & after-sales support",
  "Full product catalog available",
  "Custom quotes for large projects",
];

function HomePage() {
  /* hero entrance */
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] overflow-hidden bg-[var(--navy)] text-white flex items-center">
        {/* bg image */}
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
          style={{ opacity: heroReady ? 0.28 : 0, transition: "opacity 1.4s ease" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy)] via-[var(--navy)]/88 to-[var(--navy)]/45" />
        <div className="grid-bg absolute inset-0 opacity-20" />

        {/* animated glow blobs */}
        <div
          className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[var(--electric)]/12 pointer-events-none"
          style={{
            filter: "blur(90px)",
            transform: heroReady ? "scale(1)" : "scale(0.4)",
            transition: "transform 1.6s ease",
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-[var(--electric)]/8 pointer-events-none"
          style={{
            filter: "blur(60px)",
            transform: heroReady ? "translateY(0)" : "translateY(60px)",
            transition: "transform 1.8s ease 0.3s",
          }}
        />

        <DrawLine />

        <div className="relative mx-auto w-full max-w-[1280px] px-6 py-24 sm:py-32">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:items-center">
            {/* LEFT */}
            <div>
              {/* eyebrow pill */}
              <div
                style={{
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "translateY(0)" : "translateY(-16px)",
                  transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
                }}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--electric)]/35 bg-[var(--electric)]/10 px-4 py-1.5 mb-6"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--electric)] animate-pulse" />
                <p className="label-eyebrow !text-[var(--electric)]">Official ENTES Distributor · Morocco</p>
              </div>

              {/* typewriter headline */}
              <HeroHeadline />

              {/* sub */}
              <p
                className="mt-7 max-w-xl pl-4 text-lg leading-relaxed text-white/65"
                style={{ opacity: heroReady ? 1 : 0, transition: "opacity 0.8s ease 1.8s" }}
              >
                Precision electrical equipment for industrial and commercial applications — energy metering, power
                quality, protection and control across Morocco.
              </p>

              {/* CTAs */}
              <div
                className="mt-10 flex flex-wrap gap-4 pl-4"
                style={{
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.7s ease 2s, transform 0.7s ease 2s",
                }}
              >
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-[var(--navy)] hover:border-white hover:scale-105"
                >
                  Explore Products <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-md bg-[var(--electric)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[var(--electric)]/25 transition-all duration-200 hover:bg-[var(--electric-dark)] hover:-translate-y-1 hover:shadow-[var(--electric)]/50 hover:scale-105"
                >
                  Request a Quote <ArrowRight size={16} />
                </Link>
              </div>

              {/* quick contact */}
              <div
                className="mt-8 flex flex-wrap items-center gap-6 pl-4"
                style={{ opacity: heroReady ? 1 : 0, transition: "opacity 0.7s ease 2.2s" }}
              >
                <a
                  href="tel:+212522602169"
                  className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-white transition-colors duration-200 group"
                >
                  <Phone size={14} className="text-[var(--electric)] group-hover:scale-110 transition-transform" />
                  +212 5226-02169
                </a>
                <a
                  href="mailto:info@houseelectricite.ma"
                  className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-white transition-colors duration-200 group"
                >
                  <Mail size={14} className="text-[var(--electric)] group-hover:scale-110 transition-transform" />
                  info@houseelectricite.ma
                </a>
              </div>
            </div>

            {/* RIGHT — stats panel */}
            <div
              style={{
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "translateX(0)" : "translateX(40px)",
                transition: "opacity 0.9s ease 0.6s, transform 0.9s ease 0.6s",
              }}
              className="hidden lg:block border border-white/10 bg-white/[0.04] backdrop-blur-sm rounded-xl p-6"
            >
              <p className="label-eyebrow !text-white/35 mb-4">At a glance</p>
              <div className="grid grid-cols-2 gap-4 mb-5">
                {[
                  { n: 15, suffix: "+", label: "Years of expertise" },
                  { n: 500, suffix: "+", label: "Products distributed" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/[0.05] border border-white/8 rounded-lg p-4">
                    <div className="font-display text-4xl font-bold text-white">
                      <AnimatedCounter target={s.n} suffix={s.suffix} />
                    </div>
                    <div className="text-xs uppercase tracking-wider text-white/40 mt-1">{s.label}</div>
                  </div>
                ))}
                <div className="bg-white/[0.05] border border-white/8 rounded-lg p-4">
                  <div className="font-display text-2xl font-bold text-white">ENTES</div>
                  <div className="text-xs uppercase tracking-wider text-white/40 mt-1">Certified distributor</div>
                </div>
                <div className="bg-white/[0.05] border border-white/8 rounded-lg p-4">
                  <div className="font-display text-2xl font-bold text-white">Casa</div>
                  <div className="text-xs uppercase tracking-wider text-white/40 mt-1">Morocco-based</div>
                </div>
              </div>
              <p className="label-eyebrow !text-white/30 mb-3">Product categories</p>
              <div className="flex flex-wrap gap-2">
                {["Power Quality", "Measurement", "PF Correction", "Energy Mgmt", "Protection", "Current CT"].map(
                  (c, i) => (
                    <span
                      key={c}
                      className="rounded border px-2.5 py-1 text-xs font-medium uppercase tracking-wide transition-all duration-200 hover:border-[var(--electric)]/60 hover:text-[var(--electric)] hover:bg-[var(--electric)]/8 cursor-default"
                      style={{
                        borderColor: i === 0 ? "rgba(212,43,43,0.5)" : "rgba(255,255,255,0.1)",
                        color: i === 0 ? "var(--electric)" : "rgba(255,255,255,0.45)",
                        background: i === 0 ? "rgba(212,43,43,0.08)" : "transparent",
                      }}
                    >
                      {c}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TRUST BAR
      ══════════════════════════════════════════ */}
      <section className="border-b border-[var(--line)] bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-8 sm:py-10">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {[
              { n: 15, suffix: "+", label: "Years of expertise" },
              { n: 500, suffix: "+", label: "Products distributed" },
              { text: "ENTES", label: "Certified distributor" },
              { text: "Casablanca", label: "Morocco-based" },
            ].map((s, i) => (
              <FadeUp key={s.label} delay={i * 80}>
                <div className="flex items-start gap-3">
                  <Zap size={18} className="mt-1 shrink-0 fill-[var(--electric)] text-[var(--electric)]" />
                  <div>
                    <div className="font-display text-2xl font-bold uppercase text-[var(--navy)] sm:text-3xl">
                      {"n" in s ? <AnimatedCounter target={s.n} suffix={s.suffix} /> : s.text}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-[var(--ink)]/60">{s.label}</div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRODUCT CATEGORIES
      ══════════════════════════════════════════ */}
      <section className="bg-[var(--offwhite)]">
        <div className="mx-auto max-w-[1280px] px-6 py-16 sm:py-20">
          <FadeUp className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-10">
            <SectionHeading
              eyebrow="Catalog"
              title="Our Product Range"
              description="Six categories of ENTES equipment, engineered for precision in industrial Morocco."
            />
            <Link
              to="/products"
              className="hidden sm:inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[var(--electric)] hover:underline underline-offset-4"
            >
              View all products <ArrowRight size={15} />
            </Link>
          </FadeUp>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => {
              const Icon = c.icon;
              return (
                <ScaleIn key={c.id} delay={i * 90}>
                  <Link
                    to="/products"
                    className="group relative flex flex-col overflow-hidden rounded-lg border border-[var(--line)] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(26,36,86,0.14)] hover:border-[var(--electric)]/25"
                  >
                    {/* animated left accent */}
                    <span
                      className="absolute left-0 top-0 z-10 w-[3px] bg-[var(--electric)] transition-all duration-300 rounded-sm"
                      style={{ top: 0, bottom: 0, opacity: 0 }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.opacity = "1";
                      }}
                    />
                    <span className="absolute left-0 top-0 z-10 h-0 w-[3px] bg-[var(--electric)] group-hover:h-full transition-all duration-300 ease-in-out" />

                    {/* image */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-[var(--offwhite)]">
                      <img
                        src={c.image}
                        alt={c.name}
                        loading="lazy"
                        width={640}
                        height={360}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-[var(--navy)]/0 group-hover:bg-[var(--navy)]/15 transition-colors duration-300" />
                      {/* icon badge — slides down on hover */}
                      <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-md bg-[var(--navy)] text-white shadow-lg transition-all duration-300 group-hover:bg-[var(--electric)] group-hover:scale-110 group-hover:rotate-3">
                        <Icon size={18} />
                      </div>
                    </div>

                    {/* content */}
                    <div className="flex flex-1 flex-col gap-2 p-5">
                      <h3 className="font-display text-lg font-bold uppercase text-[var(--navy)] sm:text-xl transition-colors duration-200 group-hover:text-[var(--electric)]">
                        {c.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-[var(--ink)]/70">{c.description}</p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-[var(--electric)] transition-all duration-200 group-hover:gap-3">
                        View products{" "}
                        <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </ScaleIn>
              );
            })}
          </div>

          <FadeUp delay={200} className="mt-8 flex justify-center sm:hidden">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--electric)] px-5 py-2.5 text-sm font-semibold text-[var(--electric)] hover:bg-[var(--electric)] hover:text-white transition-all duration-200"
            >
              View all products <ArrowRight size={15} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SOLUTIONS
      ══════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-16 sm:py-20">
          <FadeUp className="mb-10">
            <SectionHeading
              eyebrow="Solutions"
              title="Industry Solutions"
              description="Pre-engineered solution sets matching the most common industrial requirements."
            />
          </FadeUp>
          <div className="grid gap-6 md:grid-cols-3">
            {solutions.map((s, i) => {
              const Icon = s.icon;
              return (
                <SlideIn key={s.id} from={i % 2 === 0 ? "left" : "right"} delay={i * 120}>
                  <article className="group relative flex flex-col overflow-hidden rounded-lg bg-[var(--navy)] text-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_56px_rgba(26,36,86,0.30)]">
                    <span className="absolute left-0 top-0 h-full w-[3px] bg-[var(--electric)]" />

                    {/* image with overlay */}
                    {s.image && (
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={s.image}
                          alt={s.title}
                          loading="lazy"
                          className="h-full w-full object-cover opacity-40 transition-all duration-500 group-hover:opacity-60 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy)]/10 to-[var(--navy)]" />
                        {/* icon rises on hover */}
                        <div className="absolute bottom-4 left-7 transition-all duration-300 group-hover:-translate-y-1">
                          <Icon size={28} className="text-[var(--electric)]" />
                        </div>
                      </div>
                    )}

                    <div className="flex flex-1 flex-col gap-3 p-7 pt-5">
                      <h3 className="font-display text-xl font-bold uppercase">{s.title}</h3>
                      <p className="text-sm leading-relaxed text-white/65">{s.paragraphs[0]}</p>
                      <ul className="flex flex-col gap-1.5 mt-1">
                        {s.benefits.slice(0, 3).map((b, bi) => (
                          <li
                            key={b}
                            className="flex items-start gap-2 text-xs text-white/55"
                            style={{ transitionDelay: `${bi * 60}ms` }}
                          >
                            <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-[var(--electric)]" />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <Link
                        to="/solutions"
                        hash={s.id}
                        className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-[var(--electric)] hover:text-white transition-colors group/link"
                      >
                        Learn more
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-200 group-hover/link:translate-x-1"
                        />
                      </Link>
                    </div>
                  </article>
                </SlideIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY US
      ══════════════════════════════════════════ */}
      <section className="bg-[var(--offwhite)]">
        <div className="mx-auto max-w-[1280px] px-6 py-16 sm:py-20">
          <FadeUp className="mb-10">
            <SectionHeading eyebrow="Trust" title="Why House Électricité?" />
          </FadeUp>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
            {/* image */}
            <SlideIn from="left">
              <div className="relative overflow-hidden rounded-lg border border-[var(--line)] shadow-sm group">
                <span className="absolute left-0 top-0 z-10 h-full w-[3px] bg-[var(--electric)]" />
                <img
                  src={whyImg}
                  alt="House Électricité distribution warehouse in Casablanca"
                  loading="lazy"
                  width={1600}
                  height={1024}
                  className="h-full max-h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:max-h-none"
                />
                {/* overlay badge */}
                <div className="absolute bottom-5 left-8 rounded-md bg-[var(--navy)]/90 px-4 py-2.5 backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/55">Casablanca, Morocco</p>
                  <p className="font-display text-lg font-bold uppercase text-white">Official ENTES Partner</p>
                </div>
              </div>
            </SlideIn>

            {/* points */}
            <div className="grid gap-4 sm:grid-cols-2">
              {whyPoints.map((point, i) => (
                <FadeUp key={point} delay={i * 100}>
                  <div className="group flex items-start gap-3 rounded-lg border border-[var(--line)] bg-white p-5 transition-all duration-200 hover:border-[var(--electric)]/35 hover:shadow-[0_4px_20px_rgba(212,43,43,0.07)] hover:-translate-y-0.5">
                    <CheckCircle2
                      className="mt-0.5 shrink-0 text-[var(--electric)] transition-transform duration-200 group-hover:scale-110"
                      size={20}
                    />
                    <p className="text-sm font-medium leading-snug text-[var(--navy)]">{point}</p>
                  </div>
                </FadeUp>
              ))}

              <FadeUp delay={400} className="sm:col-span-2">
                <div className="flex items-center gap-4 rounded-lg border border-[var(--navy)]/15 bg-[var(--navy)] px-5 py-4 text-white transition-all duration-200 hover:shadow-[0_8px_24px_rgba(26,36,86,0.2)]">
                  <Zap size={20} className="shrink-0 fill-[var(--electric)] text-[var(--electric)]" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/45">Authorized by</p>
                    <p className="font-display text-base font-bold uppercase">ENTES Elektronik — Istanbul, Turkey</p>
                  </div>
                  <a
                    href="https://www.entes.eu"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-auto shrink-0 text-xs text-white/35 hover:text-white transition-colors underline underline-offset-2"
                  >
                    entes.eu ↗
                  </a>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SUPPORT
      ══════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-16 sm:py-20">
          <FadeUp className="mb-10">
            <SectionHeading
              eyebrow="Documents"
              title="Support & Documents"
              description="All technical documentation in one place."
            />
          </FadeUp>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: Download,
                iconBg: "bg-[var(--electric)]/10",
                iconColor: "text-[var(--electric)]",
                title: "Product Catalog",
                desc: "Download the complete ENTES product catalog — full specifications for all 500+ references.",
                btn: { label: "Download Catalog", icon: Download, href: CATALOG_URL, external: true, primary: true },
              },
              {
                icon: FileText,
                iconBg: "bg-[var(--navy)]/8",
                iconColor: "text-[var(--navy)]",
                title: "Brochures",
                desc: "Browse individual product and solution brochures by category — PDFs ready to share with your team.",
                btn: { label: "View Brochures", icon: ArrowRight, href: "/support", external: false, primary: false },
              },
            ].map((card, i) => {
              const Icon = card.icon;
              const BtnIcon = card.btn.icon;
              return (
                <SlideIn key={card.title} from={i === 0 ? "left" : "right"} delay={i * 100}>
                  <div className="group flex flex-col gap-4 rounded-lg border border-[var(--line)] bg-[var(--offwhite)] p-7 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(26,36,86,0.08)] hover:border-[var(--electric)]/20">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-md ${card.iconBg} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className={card.iconColor} size={24} />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold uppercase text-[var(--navy)]">{card.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink)]/70">{card.desc}</p>
                    </div>
                    {card.btn.external ? (
                      <a
                        href={card.btn.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-auto inline-flex w-fit items-center gap-2 rounded-md bg-[var(--electric)] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-200 hover:bg-[var(--electric-dark)] hover:-translate-y-0.5 hover:shadow-md group/btn"
                      >
                        {card.btn.label}
                        <BtnIcon
                          size={15}
                          className="transition-transform duration-200 group-hover/btn:translate-y-0.5"
                        />
                      </a>
                    ) : (
                      <Link
                        to={card.btn.href as any}
                        className="mt-auto inline-flex w-fit items-center gap-2 rounded-md border border-[var(--navy)] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-[var(--navy)] transition-all duration-200 hover:bg-[var(--navy)] hover:text-white hover:-translate-y-0.5 group/btn"
                      >
                        {card.btn.label}
                        <BtnIcon
                          size={15}
                          className="transition-transform duration-200 group-hover/btn:translate-x-1"
                        />
                      </Link>
                    )}
                  </div>
                </SlideIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[var(--navy)] text-white">
        <div className="grid-bg absolute inset-0 opacity-25" />

        {/* animated glow */}
        <div
          className="absolute -left-16 top-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-[var(--electric)]/18 pointer-events-none"
          style={{ filter: "blur(70px)", animation: "pulse 4s ease-in-out infinite" }}
        />

        {/* animated top line */}
        <DrawLine />

        <div className="relative mx-auto max-w-[1280px] px-6 py-16 sm:py-20">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <SlideIn from="left">
              <div className="bolt-left max-w-xl">
                <p className="label-eyebrow !text-[var(--electric)]">Get in touch</p>
                <h2 className="mt-2 font-display text-3xl font-bold uppercase leading-tight sm:text-4xl lg:text-5xl">
                  Have a project
                  <br />
                  in mind?
                </h2>
                <p className="mt-3 text-base text-white/60 max-w-sm">
                  Our technical team is ready to help — from a single relay to a complete energy management system.
                </p>
              </div>
            </SlideIn>

            <SlideIn from="right">
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--electric)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[var(--electric)]/30 transition-all duration-200 hover:bg-[var(--electric-dark)] hover:-translate-y-1 hover:shadow-[var(--electric)]/50 group"
                >
                  Get a Free Quote
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <a
                  href="tel:+212522602169"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/12 hover:-translate-y-1 group"
                >
                  <Phone size={15} className="transition-transform duration-200 group-hover:rotate-12" />
                  Call Us Now
                </a>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>
    </>
  );
}
