import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, Download, FileText } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { getProductBySlug, getCategory, products } from "@/data/mockData";

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
      <h1 className="font-display text-4xl font-bold uppercase text-[var(--navy)]">
        Product not found
      </h1>
      <Link to="/products" className="mt-6 inline-block text-[var(--electric)]">
        Back to products
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-[1280px] px-6 py-24 text-center">
      <h1 className="font-display text-3xl uppercase text-[var(--navy)]">Something went wrong</h1>
      <p className="mt-2 text-sm text-[var(--ink)]/70">{error.message}</p>
      <button onClick={reset} className="mt-6 text-[var(--electric)]">Try again</button>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const category = getCategory(product.category);
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);
  const initials = product.name.replace(/[^A-Z0-9]/gi, "").slice(0, 4).toUpperCase();

  return (
    <>
      <section className="bg-[var(--navy)] py-10 text-white">
        <div className="mx-auto max-w-[1280px] px-6">
          <nav className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-white/60">
            <Link to="/" className="hover:text-white">Home</Link><span>/</span>
            <Link to="/products" className="hover:text-white">Products</Link><span>/</span>
            <span className="text-white/80">{category?.name}</span><span>/</span>
            <span className="text-white">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--offwhite)]">
              <span className="absolute left-0 top-0 h-full w-[3px] bg-[var(--electric)]" />
              <span className="font-display text-8xl font-bold tracking-tight text-[var(--navy)]/25">
                {initials}
              </span>
            </div>

            <div>
              <span className="inline-flex w-fit items-center rounded border border-[var(--electric)]/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--electric)]">
                {category?.name}
              </span>
              <h1 className="mt-4 font-display text-5xl font-bold uppercase text-[var(--navy)] bolt-left">
                {product.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[var(--ink)]/85">{product.description}</p>

              <h2 className="mt-10 label-eyebrow !text-[var(--navy)]">Technical specifications</h2>
              <div className="mt-3 overflow-hidden rounded-lg border border-[var(--line)]">
                <table className="w-full text-sm">
                  <tbody>
                    {product.specs.map((s: { label: string; value: string }, i: number) => (
                      <tr key={s.label} className={i % 2 ? "bg-[var(--offwhite)]" : "bg-white"}>
                        <td className="w-1/2 px-4 py-3 font-medium text-[var(--navy)]">{s.label}</td>
                        <td className="px-4 py-3 text-[var(--ink)]/85">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="mt-10 label-eyebrow !text-[var(--navy)]">Downloads</h2>
              <div className="mt-3 flex flex-wrap gap-3">
                <a href="#" className="inline-flex items-center gap-2 rounded-md border border-[var(--line)] px-4 py-2.5 text-sm font-semibold text-[var(--navy)] hover:border-[var(--electric)] hover:text-[var(--electric)]">
                  <FileText size={16} /> User Manual (PDF)
                </a>
                <a href="#" className="inline-flex items-center gap-2 rounded-md border border-[var(--line)] px-4 py-2.5 text-sm font-semibold text-[var(--navy)] hover:border-[var(--electric)] hover:text-[var(--electric)]">
                  <Download size={16} /> Technical Drawing (PDF)
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-md bg-[var(--electric)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-[var(--electric-dark)]"
                >
                  Request a Quote for this product <ArrowRight size={16} />
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-md border border-[var(--line)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[var(--navy)] hover:border-[var(--navy)]"
                >
                  <ArrowLeft size={16} /> Back to products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-[var(--offwhite)]">
          <div className="mx-auto max-w-[1280px] px-6 py-16">
            <h2 className="font-display text-3xl font-bold uppercase text-[var(--navy)] bolt-left">
              Other Products
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}