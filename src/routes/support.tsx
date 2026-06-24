import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
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
      {
        property: "og:description",
        content: "Catalog and brochures for ENTES products available in Morocco.",
      },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  return (
    <>
      <section className="bg-[var(--navy)] py-14 text-white">
        <div className="mx-auto max-w-[1280px] px-6">
          <nav className="text-xs uppercase tracking-wider text-white/60">
            <Link to="/" className="hover:text-white">Home</Link> <span>/</span> Support
          </nav>
          <h1 className="mt-3 font-display text-5xl font-bold uppercase bolt-left">
            Support & Documents
          </h1>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-16">
          <div className="rounded-lg border border-[var(--line)] bg-[var(--offwhite)] p-10">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-display text-3xl font-bold uppercase text-[var(--navy)] bolt-left">
                  ENTES Catalog
                </h2>
                <p className="mt-3 max-w-xl text-sm text-[var(--ink)]/80">
                  The complete ENTES product catalog, including all reference numbers, technical
                  specifications and ordering codes.
                </p>
              </div>
              <a
                href={CATALOG_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--electric)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-[var(--electric-dark)]"
              >
                <Download size={16} /> Download Catalog (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--offwhite)]">
        <div className="mx-auto max-w-[1280px] px-6 py-16">
          <h2 className="font-display text-3xl font-bold uppercase text-[var(--navy)] bolt-left">
            Brochures
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {brochures.map((b) => (
              <article
                key={b.title}
                className="group flex flex-col gap-4 rounded-lg border border-[var(--line)] bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(26,36,86,0.1)]"
              >
                <div className="flex items-center justify-between">
                  <FileText className="text-[var(--electric)]" size={24} />
                  <span className="rounded border border-[var(--line)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--ink)]/60">
                    PDF
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold uppercase text-[var(--navy)]">
                    {b.title}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-[var(--ink)]/60">
                    {b.category}
                  </p>
                </div>
                <a
                  href="#"
                  className="mt-auto inline-flex w-fit items-center gap-2 text-sm font-semibold text-[var(--navy)] hover:text-[var(--electric)]"
                >
                  <Download size={16} /> Download
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}