import { Link } from "@tanstack/react-router";
import { ArrowRight, FileText } from "lucide-react";
import type { Product } from "@/data/mockData";
import { getCategory } from "@/data/mockData";

export function ProductCard({ product }: { product: Product }) {
  const cat = getCategory(product.category);
  const initials = product.name
    .replace(/[^A-Z0-9]/gi, "")
    .slice(0, 4)
    .toUpperCase();
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-[var(--line)] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(26,36,86,0.12)]">
      <div className="relative flex aspect-[4/3] items-center justify-center bg-[var(--offwhite)]">
        <div className="absolute left-0 top-0 h-full w-[3px] bg-[var(--electric)] opacity-0 transition-opacity group-hover:opacity-100" />
        <span className="font-display text-5xl font-bold tracking-tight text-[var(--navy)]/30">
          {initials}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="inline-flex w-fit items-center rounded border border-[var(--electric)]/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--electric)]">
          {cat?.name}
        </span>
        <h3 className="font-display text-2xl font-bold uppercase leading-tight text-[var(--navy)]">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm text-[var(--ink)]/80">{product.highlight}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <Link
            to="/products/$slug"
            params={{ slug: product.slug }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--navy)] hover:text-[var(--electric)]"
          >
            View Details <ArrowRight size={16} />
          </Link>
          <Link
            to="/contact"
            aria-label={`Request quote for ${product.name}`}
            className="rounded-md border border-[var(--line)] p-2 text-[var(--navy)] transition-colors hover:border-[var(--electric)] hover:text-[var(--electric)]"
          >
            <FileText size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}