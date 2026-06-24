import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { categories, products, type CategoryId } from "@/data/mockData";

const searchSchema = z.object({
  category: z.string().optional(),
});

export const Route = createFileRoute("/products")({
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

function ProductsPage() {
  const search = Route.useSearch();
  const initial = (search.category as Filter | undefined) ?? "all";
  const [active, setActive] = useState<Filter>(initial);

  const filtered = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <>
      <section className="bg-[var(--navy)] py-14 text-white">
        <div className="mx-auto max-w-[1280px] px-6">
          <nav className="text-xs uppercase tracking-wider text-white/60">
            <Link to="/" className="hover:text-white">Home</Link> <span>/</span> Products
          </nav>
          <h1 className="mt-3 font-display text-5xl font-bold uppercase bolt-left">Our Products</h1>
        </div>
      </section>

      <section className="bg-[var(--offwhite)]">
        <div className="mx-auto max-w-[1280px] px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            <aside className="self-start rounded-lg border border-[var(--line)] bg-white p-6">
              <h2 className="label-eyebrow !text-[var(--navy)]">Filter by Category</h2>
              <ul className="mt-4 space-y-2">
                {([{ id: "all" as const, name: "All Products" }, ...categories] as const).map((c) => {
                  const isActive = active === c.id;
                  return (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => setActive(c.id as Filter)}
                        className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                          isActive
                            ? "bg-[var(--navy)] text-white"
                            : "text-[var(--ink)] hover:bg-[var(--offwhite)]"
                        }`}
                      >
                        <span
                          className={`h-3 w-[3px] ${isActive ? "bg-[var(--electric)]" : "bg-[var(--line)]"}`}
                        />
                        <span className="flex-1">{c.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>

            <div>
              <p className="mb-6 text-sm text-[var(--ink)]/70">
                Showing <span className="font-semibold text-[var(--navy)]">{filtered.length}</span>{" "}
                product{filtered.length !== 1 ? "s" : ""}
              </p>
              {filtered.length === 0 ? (
                <div className="rounded-lg border border-[var(--line)] bg-white p-10 text-center text-[var(--ink)]/70">
                  No products in this category yet.
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((p) => (
                    <ProductCard key={p.slug} product={p} />
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