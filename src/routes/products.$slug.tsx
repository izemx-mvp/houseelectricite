import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowLeft, Download, FileText, CheckCircle2, Zap } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { getProductBySlug, getCategory, getProductImage, products } from "@/data/mockData";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — House Électricité` },
          { name: "description", content: loaderData.product.highlight },
          { property: "og:title", content: `${loaderData.product.name} — House Électricité` },
          { property: "og:description", content: loaderData.product.highlight },
        ]
      : [{ title: "Product — House Électricité" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-[1280px] px-6 py-24 text-center">
      <h1 className="font-display text-4xl font-bold uppercase text-[var(--navy)]">Product not found</h1>
      <Link to="/products" className="mt-6 inline-block text-[var(--electric)]">
        Back to products
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-[1280px] px-6 py-24 text-center">
      <h1 className="font-display text-3xl uppercase text-[var(--navy)]">Something went wrong</h1>
      <p className="mt-2 text-sm text-[var(--ink)]/70">{error.message}</p>
      <button onClick={reset} className="mt-6 text-[var(--electric)]">
        Try again
      </button>
    </div>
  ),
  component: ProductDetail,
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
        transform: inView ? "translateX(0)" : `translateX(${from === "left" ? "-36px" : "36px"})`,
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── component ── */
function ProductDetail() {
  const { product } = Route.useLoaderData();
  const category = getCategory(product.category);
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);
  const image = getProductImage(product.slug);
  const [heroReady, setHeroReady] = useState(false);
  const [activeSpec, setActiveSpec] = useState<number | null>(null);
  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ── HERO BREADCRUMB ── */}
      <section className="relative overflow-hidden bg-[var(--navy)] py-10 text-white">
        <div className="grid-bg absolute inset-0 opacity-20" />
        <div
          className="absolute -right-16 top-0 h-48 w-48 rounded-full bg-[var(--electric)]/10 pointer-events-none"
          style={{ filter: "blur(70px)" }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, var(--electric), transparent)",
              transform: heroReady ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: "transform 1s ease 0.2s",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-[1280px] px-6">
          <nav
            className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-white/50"
            style={{ opacity: heroReady ? 1 : 0, transition: "opacity 0.5s ease 0.1s" }}
          >
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/20">/</span>
            <Link to="/products" className="hover:text-white transition-colors">
              Products
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white/60">{category?.name}</span>
            <span className="text-white/20">/</span>
            <span className="text-white font-semibold">{product.name}</span>
          </nav>

          {/* product name in hero */}
          <div
            className="mt-5 flex items-end justify-between gap-6"
            style={{
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            <div>
              <span className="inline-flex items-center rounded border border-[var(--electric)]/35 bg-[var(--electric)]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--electric)] mb-3">
                {category?.name}
              </span>
              <h1 className="font-display text-5xl font-bold uppercase bolt-left sm:text-6xl">{product.name}</h1>
              <p className="mt-3 pl-4 text-sm text-white/55 max-w-lg">{product.highlight}</p>
            </div>
            <Link
              to="/contact"
              className="hidden sm:inline-flex shrink-0 items-center gap-2 rounded-md bg-[var(--electric)] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[var(--electric)]/25 transition-all duration-200 hover:bg-[var(--electric-dark)] hover:-translate-y-0.5"
            >
              Request a Quote <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:items-start">
            {/* LEFT — image */}
            <SlideIn from="left">
              <div className="group relative aspect-square overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--offwhite)] sticky top-24">
                <span className="absolute left-0 top-0 z-10 h-full w-[3px] bg-[var(--electric)]" />
                <img
                  src={image}
                  alt={`${product.name} — ${category?.name ?? ""}`}
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* category watermark */}
                <div className="absolute bottom-4 right-4 rounded-md bg-[var(--navy)]/80 px-3 py-1.5 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/70">{category?.name}</p>
                </div>
              </div>
            </SlideIn>

            {/* RIGHT — details */}
            <div className="flex flex-col gap-8">
              {/* description */}
              <SlideIn from="right" delay={60}>
                <p className="text-base leading-relaxed text-[var(--ink)]/80">{product.description}</p>
              </SlideIn>

              {/* specs */}
              <SlideIn from="right" delay={120}>
                <div>
                  <h2 className="label-eyebrow !text-[var(--navy)] mb-4">Technical Specifications</h2>
                  <div className="overflow-hidden rounded-lg border border-[var(--line)]">
                    {product.specs.map((s: { label: string; value: string }, i: number) => (
                      <div
                        key={s.label}
                        onClick={() => setActiveSpec(activeSpec === i ? null : i)}
                        className="group/spec flex items-center justify-between px-4 py-3.5 cursor-pointer transition-all duration-150 border-b border-[var(--line)] last:border-0"
                        style={{
                          background: activeSpec === i ? "rgba(26,36,86,0.04)" : i % 2 ? "var(--offwhite)" : "#fff",
                        }}
                      >
                        <span className="flex items-center gap-2.5 text-sm font-medium text-[var(--navy)]">
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-[var(--electric)] opacity-0 group-hover/spec:opacity-100 transition-opacity shrink-0"
                            style={{ opacity: activeSpec === i ? 1 : undefined }}
                          />
                          {s.label}
                        </span>
                        <span className="text-sm text-[var(--ink)]/80 font-medium text-right max-w-[55%]">
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </SlideIn>

              {/* downloads */}
              <SlideIn from="right" delay={180}>
                <div>
                  <h2 className="label-eyebrow !text-[var(--navy)] mb-4">Downloads</h2>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { label: "User Manual (PDF)", icon: FileText },
                      { label: "Technical Drawing (PDF)", icon: Download },
                    ].map(({ label, icon: Icon }) => (
                      <a
                        key={label}
                        href="#"
                        className="group/dl inline-flex items-center gap-2.5 rounded-md border border-[var(--line)] bg-[var(--offwhite)] px-4 py-2.5 text-sm font-semibold text-[var(--navy)] transition-all duration-200 hover:border-[var(--electric)]/40 hover:bg-white hover:text-[var(--electric)] hover:-translate-y-0.5 hover:shadow-sm"
                      >
                        <Icon size={16} className="transition-transform duration-200 group-hover/dl:scale-110" />
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </SlideIn>

              {/* CTAs */}
              <SlideIn from="right" delay={240}>
                <div className="flex flex-wrap gap-3 pt-2 border-t border-[var(--line)]">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-md bg-[var(--electric)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md shadow-[var(--electric)]/20 transition-all duration-200 hover:bg-[var(--electric-dark)] hover:-translate-y-0.5 hover:shadow-[var(--electric)]/40 group"
                  >
                    Request a Quote
                    <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 rounded-md border border-[var(--line)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[var(--navy)] transition-all duration-200 hover:border-[var(--navy)] hover:bg-[var(--offwhite)] group"
                  >
                    <ArrowLeft size={15} className="transition-transform duration-200 group-hover:-translate-x-1" />
                    Back to Products
                  </Link>
                </div>
              </SlideIn>

              {/* ENTES badge */}
              <SlideIn from="right" delay={300}>
                <div className="flex items-center gap-3 rounded-lg border border-[var(--navy)]/12 bg-[var(--navy)] px-5 py-4 text-white">
                  <Zap size={18} className="shrink-0 fill-[var(--electric)] text-[var(--electric)]" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40">Distributed by</p>
                    <p className="font-display text-sm font-bold uppercase">
                      House Électricité — Official ENTES Distributor in Morocco
                    </p>
                  </div>
                </div>
              </SlideIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED PRODUCTS ── */}
      {related.length > 0 && (
        <section className="bg-[var(--offwhite)]">
          <div className="mx-auto max-w-[1280px] px-6 py-16">
            <FadeUp>
              <div className="flex items-end justify-between mb-8">
                <h2 className="font-display text-3xl font-bold uppercase text-[var(--navy)] bolt-left">
                  Related Products
                </h2>
                <Link
                  to="/products"
                  search={{ category: product.category }}
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--electric)] hover:underline underline-offset-4"
                >
                  View all in category <ArrowRight size={14} />
                </Link>
              </div>
            </FadeUp>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <FadeUp key={p.slug} delay={i * 80}>
                  <ProductCard product={p} />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
