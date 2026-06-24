import { useState, useRef, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Search, SlidersHorizontal, X, ArrowRight, FileText } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { categories, products, getCategory, getProductImage, type CategoryId } from "@/data/mockData";

const searchSchema = z.object({ category: z.string().optional() });

export const Route = createFileRoute("/products/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Products — House Électricité" },
      {
        name: "description",
        content:
          "Browse the full ENTES catalog: energy meters, power factor controllers, protection relays and timers.",
      },
      { property: "og:title", content: "Products — House Électricité" },
      {
        property: "og:description",
        content: "Browse the full ENTES catalog distributed by House Électricité in Morocco.",
      },
    ],
  }),
  component: ProductsPage,
});

type Filter = "all" | CategoryId;

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
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── enhanced product card ── */
function ProductCard({ product, index }: { product: ReturnType<(typeof products)[0]["valueOf"]>; index: number }) {
  const cat = getCategory(product.category);
  const image = getProductImage(product.slug);
  const { ref, inView } = useInView(0.05);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(32px) scale(0.96)",
        transition: `opacity 0.5s ease ${(index % 3) * 80}ms, transform 0.5s ease ${(index % 3) * 80}ms`,
      }}
    >
      <article className="group relative flex flex-col overflow-hidden rounded-lg border border-[var(--line)] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(26,36,86,0.13)] hover:border-[var(--electric)]/20">
        {/* left accent — grows from top */}
        <span className="absolute left-0 top-0 z-10 w-[3px] bg-[var(--electric)] h-0 group-hover:h-full transition-all duration-300 ease-in-out rounded-sm" />

        {/* image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--offwhite)]">
          <img
            src={image}
            alt={`${product.name} — ${cat?.name ?? ""}`}
            loading="lazy"
            width={1024}
            height={768}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* dark overlay */}
          <div className="absolute inset-0 bg-[var(--navy)]/0 group-hover:bg-[var(--navy)]/12 transition-colors duration-300" />
          {/* quote button appears on hover */}
          <Link
            to="/contact"
            aria-label={`Request quote for ${product.name}`}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-md bg-[var(--navy)] text-white opacity-0 translate-y-[-6px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[var(--electric)] shadow-lg"
          >
            <FileText size={15} />
          </Link>
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col gap-2.5 p-5">
          <span className="inline-flex w-fit items-center rounded border border-[var(--electric)]/35 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--electric)] transition-colors duration-200 group-hover:bg-[var(--electric)]/8">
            {cat?.name}
          </span>
          <h3 className="font-display text-2xl font-bold uppercase leading-tight text-[var(--navy)] transition-colors duration-200 group-hover:text-[var(--electric)]">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-sm text-[var(--ink)]/75 leading-relaxed">{product.highlight}</p>

          {/* spec preview — 2 first specs */}
          <div className="mt-1 flex flex-col gap-1 border-t border-[var(--line)] pt-3">
            {product.specs.slice(0, 2).map((s) => (
              <div key={s.label} className="flex items-center justify-between text-xs">
                <span className="text-[var(--ink)]/50 uppercase tracking-wide">{s.label}</span>
                <span className="font-medium text-[var(--navy)]">{s.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between pt-3">
            <Link
              to="/products/$slug"
              params={{ slug: product.slug }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--navy)] hover:text-[var(--electric)] transition-colors duration-200 group/link"
            >
              View Details
              <ArrowRight size={15} className="transition-transform duration-200 group-hover/link:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              aria-label={`Request quote for ${product.name}`}
              className="rounded-md border border-[var(--line)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--navy)] transition-all duration-200 hover:border-[var(--electric)] hover:text-[var(--electric)] hover:bg-[var(--electric)]/5"
            >
              Quote
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

/* ── page ── */
function ProductsPage() {
  const search = Route.useSearch();
  const initial = (search.category as Filter | undefined) ?? "all";
  const [active, setActive] = useState<Filter>(initial);
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  const filtered = products
    .filter((p) => active === "all" || p.category === active)
    .filter(
      (p) =>
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.highlight.toLowerCase().includes(query.toLowerCase()),
    );

  const activeCategory = categories.find((c) => c.id === active);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[var(--navy)] py-16 text-white">
        <div className="grid-bg absolute inset-0 opacity-20" />
        {/* glow */}
        <div
          className="absolute -right-20 top-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-[var(--electric)]/12 pointer-events-none"
          style={{ filter: "blur(70px)" }}
        />
        {/* bottom line */}
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
            className="text-xs uppercase tracking-wider text-white/50 mb-4"
            style={{ opacity: heroReady ? 1 : 0, transition: "opacity 0.5s ease 0.1s" }}
          >
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2 text-white/25">/</span>
            <span className="text-white/75">Products</span>
          </nav>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div
              style={{
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
              }}
            >
              <p className="label-eyebrow !text-[var(--electric)] mb-2">ENTES Elektronik Catalog</p>
              <h1 className="font-display text-5xl font-bold uppercase bolt-left">
                {active === "all" ? "Our Products" : activeCategory?.name}
              </h1>
            </div>
            {/* search bar */}
            <div
              style={{ opacity: heroReady ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}
              className="relative w-full sm:w-72"
            >
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search products…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-md border border-white/15 bg-white/8 py-2.5 pl-9 pr-4 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[var(--electric)]/60 focus:bg-white/12 transition-all duration-200 backdrop-blur-sm"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <section className="bg-[var(--offwhite)]">
        <div className="mx-auto max-w-[1280px] px-6 py-12">
          {/* mobile filter toggle */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <p className="text-sm text-[var(--ink)]/70">
              <span className="font-semibold text-[var(--navy)]">{filtered.length}</span> product
              {filtered.length !== 1 ? "s" : ""}
            </p>
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-md border border-[var(--line)] bg-white px-3 py-2 text-sm font-medium text-[var(--navy)] hover:border-[var(--electric)]/40 transition-colors"
            >
              <SlidersHorizontal size={15} /> Filters
              {active !== "all" && <span className="h-1.5 w-1.5 rounded-full bg-[var(--electric)]" />}
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            {/* ── SIDEBAR ── */}
            <aside className={`${sidebarOpen ? "block" : "hidden"} lg:block self-start`}>
              <FadeUp>
                <div className="rounded-lg border border-[var(--line)] bg-white p-6 sticky top-24">
                  <h2 className="label-eyebrow !text-[var(--navy)] mb-4">Filter by Category</h2>
                  <ul className="space-y-1">
                    {(
                      [
                        { id: "all" as const, name: "All Products", count: products.length },
                        ...categories.map((c) => ({ ...c, count: products.filter((p) => p.category === c.id).length })),
                      ] as const
                    ).map((c) => {
                      const isActive = active === c.id;
                      return (
                        <li key={c.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setActive(c.id as Filter);
                              setSidebarOpen(false);
                            }}
                            className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm transition-all duration-200 ${isActive ? "bg-[var(--navy)] text-white shadow-sm" : "text-[var(--ink)] hover:bg-[var(--offwhite)] hover:text-[var(--navy)]"}`}
                          >
                            <span
                              className={`h-3 w-[3px] rounded-full flex-shrink-0 transition-colors duration-200 ${isActive ? "bg-[var(--electric)]" : "bg-[var(--line)]"}`}
                            />
                            <span className="flex-1 font-medium">{c.name}</span>
                            <span
                              className={`text-xs rounded px-1.5 py-0.5 font-medium transition-colors ${isActive ? "bg-white/15 text-white/80" : "bg-[var(--offwhite)] text-[var(--ink)]/50"}`}
                            >
                              {c.count}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>

                  {active !== "all" && (
                    <button
                      onClick={() => setActive("all")}
                      className="mt-4 flex items-center gap-1.5 text-xs text-[var(--electric)] hover:underline underline-offset-2 font-medium"
                    >
                      <X size={12} /> Clear filter
                    </button>
                  )}
                </div>
              </FadeUp>
            </aside>

            {/* ── GRID ── */}
            <div>
              {/* count + active filter badge */}
              <FadeUp>
                <div className="flex items-center gap-3 mb-6">
                  <p className="text-sm text-[var(--ink)]/70 hidden lg:block">
                    Showing <span className="font-semibold text-[var(--navy)]">{filtered.length}</span> product
                    {filtered.length !== 1 ? "s" : ""}
                    {query && (
                      <>
                        {" "}
                        matching <span className="font-semibold text-[var(--navy)]">"{query}"</span>
                      </>
                    )}
                  </p>
                  {active !== "all" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--electric)]/30 bg-[var(--electric)]/8 px-3 py-1 text-xs font-medium text-[var(--electric)]">
                      {activeCategory?.name}
                      <button onClick={() => setActive("all")} className="hover:text-[var(--electric-dark)]">
                        <X size={11} />
                      </button>
                    </span>
                  )}
                </div>
              </FadeUp>

              {filtered.length === 0 ? (
                <FadeUp>
                  <div className="rounded-lg border border-[var(--line)] bg-white p-14 text-center">
                    <Search size={32} className="mx-auto mb-3 text-[var(--ink)]/20" />
                    <p className="font-display text-xl font-bold uppercase text-[var(--navy)]">No products found</p>
                    <p className="mt-1 text-sm text-[var(--ink)]/60">Try a different search term or category.</p>
                    <button
                      onClick={() => {
                        setQuery("");
                        setActive("all");
                      }}
                      className="mt-4 inline-flex items-center gap-2 rounded-md bg-[var(--navy)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--electric)] transition-colors duration-200"
                    >
                      Clear all filters
                    </button>
                  </div>
                </FadeUp>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((p, i) => (
                    <ProductCard key={p.slug} product={p} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
