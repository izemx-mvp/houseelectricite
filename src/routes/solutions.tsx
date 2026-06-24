import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
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
      {
        property: "og:description",
        content: "Pre-engineered ENTES solutions deployed across Moroccan industry.",
      },
    ],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  return (
    <>
      <section className="bg-[var(--navy)] py-14 text-white">
        <div className="mx-auto max-w-[1280px] px-6">
          <nav className="text-xs uppercase tracking-wider text-white/60">
            <Link to="/" className="hover:text-white">Home</Link> <span>/</span> Solutions
          </nav>
          <h1 className="mt-3 font-display text-5xl font-bold uppercase bolt-left">
            Industry Solutions
          </h1>
          <p className="mt-4 max-w-2xl pl-4 text-white/75">
            From energy visibility to full equipment protection, our solution sets bring proven
            ENTES hardware into Moroccan industrial sites.
          </p>
        </div>
      </section>

      {solutions.map((s, idx) => {
        const Icon = s.icon;
        const dark = idx % 2 === 1;
        const related = s.relatedProducts
          .map((slug) => products.find((p) => p.slug === slug))
          .filter((p): p is NonNullable<typeof p> => Boolean(p));
        return (
          <section
            key={s.id}
            id={s.id}
            className={dark ? "bg-[var(--offwhite)]" : "bg-white"}
          >
            <div className="mx-auto max-w-[1280px] px-6 py-20">
              <div className={`grid gap-12 lg:grid-cols-2 lg:items-center ${idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="relative overflow-hidden rounded-lg border border-[var(--line)] shadow-[0_8px_24px_rgba(26,36,86,0.08)]">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    width={1280}
                    height={896}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-0 top-0 h-full w-[3px] bg-[var(--electric)]" />
                </div>
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[var(--navy)] text-white">
                    <Icon size={26} />
                  </div>
                  <h2 className="mt-5 font-display text-4xl font-bold uppercase text-[var(--navy)] bolt-left">
                    {s.title}
                  </h2>
                  <div className="mt-6 space-y-4 text-[var(--ink)]/85 leading-relaxed">
                    {s.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  <ul className="mt-6 space-y-3">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-[var(--ink)]/85">
                        <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--electric)]" size={18} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="label-eyebrow !text-[var(--navy)]">Related products</h3>
                <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((p) => (
                    <ProductCard key={p.slug} product={p} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}