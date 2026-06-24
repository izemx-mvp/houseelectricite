import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ArrowRight, Zap } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { solutions, products } from "@/data/mockData";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — House Électricité" },
      {
        name: "description",
        content:
          "Energy management, power factor correction, and protection and control solutions for industrial sites in Morocco.",
      },
      { property: "og:title", content: "Solutions — House Électricité" },
      { property: "og:description", content: "Pre-engineered ENTES solutions deployed across Moroccan industry." },
    ],
  }),
  component: SolutionsPage,
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
        transform: inView ? "translateX(0)" : `translateX(${from === "left" ? "-48px" : "48px"})`,
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── page ── */
function SolutionsPage() {
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
          className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[var(--electric)]/10 pointer-events-none"
          style={{ filter: "blur(100px)" }}
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
          {/* breadcrumb */}
          <nav
            className="text-xs uppercase tracking-wider text-white/50 mb-5"
            style={{ opacity: heroReady ? 1 : 0, transition: "opacity 0.5s ease 0.1s" }}
          >
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2 text-white/25">/</span>
            <span className="text-white/75">Solutions</span>
          </nav>

          {/* title + sub */}
          <div
            className="grid lg:grid-cols-[1fr_auto] gap-8 items-end pb-12"
            style={{
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
            }}
          >
            <div>
              <p className="label-eyebrow !text-[var(--electric)] mb-2">Pre-engineered for Moroccan Industry</p>
              <h1 className="font-display text-5xl font-bold uppercase bolt-left sm:text-6xl">Industry Solutions</h1>
              <p className="mt-4 max-w-2xl pl-4 text-base text-white/60 leading-relaxed">
                From energy visibility to full equipment protection, our solution sets bring proven ENTES hardware into
                Moroccan industrial sites.
              </p>
            </div>

            {/* solution quick-nav */}
            <div
              className="hidden lg:flex flex-col gap-2 shrink-0"
              style={{ opacity: heroReady ? 1 : 0, transition: "opacity 0.6s ease 0.4s" }}
            >
              {solutions.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex items-center gap-2.5 rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-white/55 transition-all duration-200 hover:border-[var(--electric)]/40 hover:bg-[var(--electric)]/8 hover:text-white group/nav"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--electric)] opacity-0 group-hover/nav:opacity-100 transition-opacity" />
                  {s.title}
                  <ArrowRight size={12} className="ml-auto opacity-0 group-hover/nav:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      {solutions.map((s, idx) => {
        const Icon = s.icon;
        const dark = idx % 2 === 1;
        const flip = idx % 2 === 1;
        const related = s.relatedProducts
          .map((slug) => products.find((p) => p.slug === slug))
          .filter((p): p is NonNullable<typeof p> => Boolean(p));

        return (
          <section key={s.id} id={s.id} className={dark ? "bg-[var(--offwhite)]" : "bg-white"}>
            <div className="mx-auto max-w-[1280px] px-6 py-20">
              {/* ── main grid ── */}
              <div
                className={`grid gap-12 lg:grid-cols-2 lg:items-center ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                {/* image */}
                <SlideIn from={flip ? "right" : "left"}>
                  <div className="group relative overflow-hidden rounded-lg border border-[var(--line)] shadow-[0_8px_32px_rgba(26,36,86,0.10)]">
                    <span className="absolute left-0 top-0 z-10 h-full w-[3px] bg-[var(--electric)]" />
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      width={1280}
                      height={896}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* dark overlay on hover */}
                    <div className="absolute inset-0 bg-[var(--navy)]/0 group-hover:bg-[var(--navy)]/10 transition-colors duration-300" />
                    {/* solution number watermark */}
                    <div className="absolute bottom-4 right-4 font-display text-6xl font-bold uppercase text-white/10 select-none pointer-events-none">
                      0{idx + 1}
                    </div>
                  </div>
                </SlideIn>

                {/* content */}
                <div className="flex flex-col gap-6">
                  {/* icon + title */}
                  <SlideIn from={flip ? "left" : "right"} delay={60}>
                    <div className="flex items-start gap-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[var(--navy)] text-white shadow-md transition-all duration-300 hover:bg-[var(--electric)] hover:scale-110">
                        <Icon size={26} />
                      </div>
                      <div>
                        <p className="label-eyebrow !text-[var(--electric)]">Solution 0{idx + 1}</p>
                        <h2 className="mt-1 font-display text-4xl font-bold uppercase text-[var(--navy)] bolt-left leading-tight">
                          {s.title}
                        </h2>
                      </div>
                    </div>
                  </SlideIn>

                  {/* paragraphs */}
                  <SlideIn from={flip ? "left" : "right"} delay={120}>
                    <div className="space-y-4 text-[var(--ink)]/80 leading-relaxed text-base">
                      {s.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </SlideIn>

                  {/* benefits */}
                  <SlideIn from={flip ? "left" : "right"} delay={180}>
                    <div className="rounded-lg border border-[var(--line)] bg-[var(--offwhite)] p-5">
                      <p className="label-eyebrow !text-[var(--navy)] mb-4">Key Benefits</p>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {s.benefits.map((b, bi) => (
                          <li
                            key={b}
                            className="flex items-start gap-2.5 text-sm text-[var(--ink)]/85"
                            style={{ transitionDelay: `${bi * 50}ms` }}
                          >
                            <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--electric)]" size={16} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SlideIn>

                  {/* CTA */}
                  <SlideIn from={flip ? "left" : "right"} delay={240}>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 rounded-md bg-[var(--electric)] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white shadow-md shadow-[var(--electric)]/20 transition-all duration-200 hover:bg-[var(--electric-dark)] hover:-translate-y-0.5 group"
                      >
                        Get a Quote
                        <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                      <a
                        href={`#${solutions[(idx + 1) % solutions.length]?.id}`}
                        className="inline-flex items-center gap-2 rounded-md border border-[var(--line)] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-[var(--navy)] transition-all duration-200 hover:border-[var(--navy)]/40 hover:bg-[var(--offwhite)] group"
                      >
                        Next Solution
                        <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                      </a>
                    </div>
                  </SlideIn>
                </div>
              </div>

              {/* ── related products ── */}
              <div className="mt-16 border-t border-[var(--line)] pt-12">
                <FadeUp>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="label-eyebrow !text-[var(--navy)]">Related Products</h3>
                    <Link
                      to="/products"
                      className="text-xs font-semibold text-[var(--electric)] hover:underline underline-offset-4 inline-flex items-center gap-1"
                    >
                      View all <ArrowRight size={12} />
                    </Link>
                  </div>
                </FadeUp>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((p, i) => (
                    <FadeUp key={p.slug} delay={i * 80}>
                      <ProductCard product={p} />
                    </FadeUp>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── BOTTOM CTA ── */}
      <section className="relative overflow-hidden bg-[var(--navy)] text-white">
        <div className="grid-bg absolute inset-0 opacity-25" />
        <div
          className="absolute -left-16 top-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-[var(--electric)]/15 pointer-events-none"
          style={{ filter: "blur(70px)" }}
        />
        <div className="relative mx-auto max-w-[1280px] px-6 py-16">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <FadeUp>
              <div className="bolt-left">
                <p className="label-eyebrow !text-[var(--electric)]">Let's talk</p>
                <h2 className="mt-2 font-display text-3xl font-bold uppercase sm:text-4xl">
                  Ready to implement
                  <br />a solution?
                </h2>
                <p className="mt-3 text-sm text-white/55 max-w-sm">
                  Our technical team will size the right ENTES equipment for your site and provide a detailed quote.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={100}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--electric)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[var(--electric)]/30 transition-all duration-200 hover:bg-[var(--electric-dark)] hover:-translate-y-0.5 group"
                >
                  Contact Our Team <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5"
                >
                  Browse Products
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
