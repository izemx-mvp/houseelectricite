import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Download, FileText, ArrowRight, BookOpen, Zap } from "lucide-react";
import { brochures, CATALOG_URL } from "@/data/mockData";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support & Documents — House Électricité" },
      {
        name: "description",
        content: "Download the ENTES catalog and product brochures distributed by House Électricité.",
      },
      { property: "og:title", content: "Support & Documents — House Électricité" },
      { property: "og:description", content: "Catalog and brochures for ENTES products available in Morocco." },
    ],
  }),
  component: SupportPage,
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
        transform: inView ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
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
  const { ref, inView } = useInView(0.05);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : `translateX(${from === "left" ? "-40px" : "40px"})`,
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function SupportPage() {
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[var(--navy)] pb-0 pt-14 text-white">
        <div className="grid-bg absolute inset-0 opacity-20" />
        <div
          className="absolute -right-24 -top-16 h-80 w-80 rounded-full bg-[var(--electric)]/10 pointer-events-none"
          style={{ filter: "blur(90px)" }}
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

        <div className="relative mx-auto max-w-[1280px] px-6">
          <nav
            className="text-xs uppercase tracking-wider text-white/50 mb-5"
            style={{ opacity: heroReady ? 1 : 0, transition: "opacity 0.5s ease 0.1s" }}
          >
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2 text-white/25">/</span>
            <span className="text-white/75">Support</span>
          </nav>

          <div
            className="grid lg:grid-cols-[1fr_auto] gap-8 items-end pb-12"
            style={{
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
            }}
          >
            <div>
              <p className="label-eyebrow !text-[var(--electric)] mb-2">Technical Documentation</p>
              <h1 className="font-display text-5xl font-bold uppercase bolt-left sm:text-6xl">
                Support &<br />
                Documents
              </h1>
              <p className="mt-4 max-w-xl pl-4 text-base text-white/60 leading-relaxed">
                Download the complete ENTES product catalog and individual brochures — full specifications, ordering
                codes, and technical drawings.
              </p>
            </div>

            {/* stats */}
            <div
              className="hidden lg:flex flex-col gap-3 shrink-0"
              style={{ opacity: heroReady ? 1 : 0, transition: "opacity 0.6s ease 0.4s" }}
            >
              {[
                { n: "1", label: "Full product catalog" },
                { n: `${brochures.length}`, label: "Category brochures" },
                { n: "PDF", label: "Ready to download" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 px-4 py-3"
                >
                  <span className="font-display text-2xl font-bold text-white w-10 shrink-0">{s.n}</span>
                  <span className="text-xs uppercase tracking-wider text-white/45">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATALOG FEATURE ── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-16">
          <SlideIn from="left">
            <div className="group relative overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--navy)] p-10 text-white transition-all duration-300 hover:shadow-[0_16px_48px_rgba(26,36,86,0.20)]">
              {/* bg grid */}
              <div className="grid-bg absolute inset-0 opacity-20 pointer-events-none" />
              {/* glow */}
              <div
                className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[var(--electric)]/15 pointer-events-none"
                style={{ filter: "blur(60px)" }}
              />
              {/* left accent */}
              <span className="absolute left-0 top-0 h-full w-[3px] bg-[var(--electric)]" />

              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[var(--electric)]/15 border border-[var(--electric)]/25 transition-transform duration-300 group-hover:scale-110">
                    <BookOpen size={26} className="text-[var(--electric)]" />
                  </div>
                  <div>
                    <p className="label-eyebrow !text-[var(--electric)] mb-2">Full Catalog</p>
                    <h2 className="font-display text-3xl font-bold uppercase leading-tight">ENTES Product Catalog</h2>
                    <p className="mt-2 max-w-lg text-sm text-white/60 leading-relaxed">
                      The complete ENTES product catalog — all 500+ references with full technical specifications,
                      dimensions, ordering codes, and application notes.
                    </p>
                    {/* meta tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["PDF Format", "500+ References", "All Categories", "Technical Specs"].map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-white/10 bg-white/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/55"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <a
                  href={CATALOG_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 rounded-md bg-[var(--electric)] px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[var(--electric)]/30 transition-all duration-200 hover:bg-[var(--electric-dark)] hover:-translate-y-0.5 hover:shadow-[var(--electric)]/50 group/btn"
                >
                  <Download size={16} className="transition-transform duration-200 group-hover/btn:translate-y-0.5" />
                  Download Catalog
                </a>
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ── BROCHURES ── */}
      <section className="bg-[var(--offwhite)]">
        <div className="mx-auto max-w-[1280px] px-6 py-16">
          <FadeUp className="mb-10">
            <div className="flex items-end justify-between">
              <div>
                <p className="label-eyebrow !text-[var(--electric)] mb-2">By Category</p>
                <h2 className="font-display text-3xl font-bold uppercase text-[var(--navy)] bolt-left">
                  Product Brochures
                </h2>
              </div>
              <span className="hidden sm:block text-sm text-[var(--ink)]/50">{brochures.length} documents</span>
            </div>
          </FadeUp>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {brochures.map((b, i) => (
              <FadeUp key={b.title} delay={i * 70}>
                <article className="group relative flex flex-col gap-4 rounded-lg border border-[var(--line)] bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(26,36,86,0.10)] hover:border-[var(--electric)]/20">
                  {/* left accent on hover */}
                  <span className="absolute left-0 top-0 h-0 w-[3px] bg-[var(--electric)] group-hover:h-full transition-all duration-300 rounded-sm" />

                  {/* header */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[var(--electric)]/10 transition-all duration-300 group-hover:bg-[var(--electric)] group-hover:scale-110">
                      <FileText
                        size={20}
                        className="text-[var(--electric)] transition-colors duration-300 group-hover:text-white"
                      />
                    </div>
                    <span className="rounded border border-[var(--line)] bg-[var(--offwhite)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--ink)]/50 transition-colors duration-200 group-hover:border-[var(--electric)]/30 group-hover:text-[var(--electric)]">
                      PDF
                    </span>
                  </div>

                  {/* content */}
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold uppercase text-[var(--navy)] transition-colors duration-200 group-hover:text-[var(--electric)] leading-tight">
                      {b.title}
                    </h3>
                    <p className="mt-1.5 text-xs uppercase tracking-wider text-[var(--ink)]/50">{b.category}</p>
                  </div>

                  {/* download */}
                  <a
                    href="#"
                    className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[var(--navy)] transition-colors duration-200 hover:text-[var(--electric)] group/dl"
                  >
                    <Download size={15} className="transition-transform duration-200 group-hover/dl:translate-y-0.5" />
                    Download
                    <ArrowRight
                      size={13}
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1"
                    />
                  </a>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="relative overflow-hidden bg-[var(--navy)] text-white">
        <div className="grid-bg absolute inset-0 opacity-25" />
        <div
          className="absolute -left-16 top-1/2 -translate-y-1/2 h-56 w-56 rounded-full bg-[var(--electric)]/15 pointer-events-none"
          style={{ filter: "blur(70px)" }}
        />
        <div className="relative mx-auto max-w-[1280px] px-6 py-14">
          <FadeUp>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="bolt-left">
                <p className="label-eyebrow !text-[var(--electric)]">Need more?</p>
                <h2 className="mt-2 font-display text-3xl font-bold uppercase">
                  Can't find what
                  <br />
                  you're looking for?
                </h2>
                <p className="mt-2 text-sm text-white/55 max-w-sm">
                  Our team can provide custom documentation, datasheet translations, or a full technical proposal for
                  your project.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row shrink-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--electric)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[var(--electric)]/30 transition-all duration-200 hover:bg-[var(--electric-dark)] hover:-translate-y-0.5 group"
                >
                  Contact Us <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
