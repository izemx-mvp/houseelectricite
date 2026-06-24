import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Zap, CheckCircle2, Download, FileText } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { categories, solutions, CATALOG_URL } from "@/data/mockData";

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
        content:
          "Precision electrical equipment for industrial and commercial applications across Morocco.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--navy)] text-white">
        <div className="grid-bg absolute inset-0 opacity-50" />
        <div className="absolute inset-y-0 right-[-10%] w-[55%] bg-gradient-to-bl from-[var(--electric)]/20 via-transparent to-transparent blur-3xl" />
        <div className="relative mx-auto max-w-[1280px] px-6 py-24 sm:py-32">
          <p className="label-eyebrow !text-[var(--electric)]">Official ENTES Distributor · Morocco</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl bolt-left">
            More than a supplier,
            <br />
            <span className="text-white">we are the solution.</span>
          </h1>
          <p className="mt-6 max-w-2xl pl-4 text-lg text-white/75">
            Official distributor of ENTES Elektronik in Morocco. Precision electrical equipment
            for industrial and commercial applications — energy metering, power quality,
            protection and control.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 pl-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/0 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-all hover:bg-white hover:text-[var(--navy)]"
            >
              Explore Products <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--electric)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[var(--electric)]/30 transition-all hover:bg-[var(--electric-dark)] hover:-translate-y-0.5"
            >
              Contact Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-b border-[var(--line)] bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { n: "15+", l: "Years of expertise" },
              { n: "500+", l: "Products distributed" },
              { n: "ENTES", l: "Certified distributor" },
              { n: "Casablanca", l: "Morocco-based" },
            ].map((s) => (
              <div key={s.l} className="flex items-start gap-3">
                <Zap size={20} className="mt-1 shrink-0 fill-[var(--electric)] text-[var(--electric)]" />
                <div>
                  <div className="font-display text-3xl font-bold uppercase text-[var(--navy)]">
                    {s.n}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-[var(--ink)]/70">{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-[var(--offwhite)]">
        <div className="mx-auto max-w-[1280px] px-6 py-20">
          <SectionHeading
            eyebrow="Catalog"
            title="Our Product Range"
            description="Six categories of ENTES equipment, engineered for precision in industrial Morocco."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.id}
                  to="/products"
                  className="group relative flex flex-col gap-4 overflow-hidden rounded-lg border border-[var(--line)] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(26,36,86,0.12)]"
                >
                  <span className="absolute left-0 top-0 h-full w-[3px] bg-[var(--electric)] opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[var(--navy)] text-white">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase text-[var(--navy)]">
                    {c.name}
                  </h3>
                  <p className="text-sm text-[var(--ink)]/75">{c.description}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--electric)]">
                    View products <ArrowRight size={16} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-20">
          <SectionHeading
            eyebrow="Solutions"
            title="Industry Solutions"
            description="Pre-engineered solution sets matching the most common industrial requirements."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {solutions.map((s) => {
              const Icon = s.icon;
              return (
                <article
                  key={s.id}
                  className="group relative flex flex-col gap-4 overflow-hidden rounded-lg bg-[var(--navy)] p-7 text-white transition-all duration-200 hover:-translate-y-1"
                >
                  <span className="absolute left-0 top-0 h-full w-[3px] bg-[var(--electric)]" />
                  <Icon size={28} className="text-[var(--electric)]" />
                  <h3 className="font-display text-xl font-bold uppercase">{s.title}</h3>
                  <p className="text-sm text-white/75">{s.paragraphs[0]}</p>
                  <Link
                    to="/solutions"
                    hash={s.id}
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--electric)] hover:text-white"
                  >
                    Learn more <ArrowRight size={16} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-[var(--offwhite)]">
        <div className="mx-auto max-w-[1280px] px-6 py-20">
          <SectionHeading eyebrow="Trust" title="Why House Électricité?" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              "Official ENTES Moroccan distributor",
              "Technical expertise & after-sales support",
              "Full product catalog available",
              "Custom quotes for large projects",
            ].map((point) => (
              <div
                key={point}
                className="flex items-start gap-4 rounded-lg border border-[var(--line)] bg-white p-6"
              >
                <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--electric)]" size={22} />
                <p className="font-medium text-[var(--navy)]">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-20">
          <SectionHeading
            eyebrow="Documents"
            title="Support & Documents"
            description="All technical documentation in one place."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-lg border border-[var(--line)] bg-[var(--offwhite)] p-8">
              <Download className="text-[var(--electric)]" size={28} />
              <h3 className="font-display text-2xl font-bold uppercase text-[var(--navy)]">Catalog</h3>
              <p className="text-sm text-[var(--ink)]/80">
                Download the complete ENTES product catalog (PDF).
              </p>
              <a
                href={CATALOG_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex w-fit items-center gap-2 rounded-md bg-[var(--electric)] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-[var(--electric-dark)]"
              >
                Download Catalog <Download size={16} />
              </a>
            </div>
            <div className="flex flex-col gap-4 rounded-lg border border-[var(--line)] bg-[var(--offwhite)] p-8">
              <FileText className="text-[var(--electric)]" size={28} />
              <h3 className="font-display text-2xl font-bold uppercase text-[var(--navy)]">Brochures</h3>
              <p className="text-sm text-[var(--ink)]/80">
                Browse individual product and solution brochures.
              </p>
              <Link
                to="/support"
                className="mt-auto inline-flex w-fit items-center gap-2 rounded-md border border-[var(--navy)] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white"
              >
                View Brochures <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative overflow-hidden bg-[var(--navy)] text-white">
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div className="relative mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 px-6 py-16 md:flex-row md:items-center">
          <div className="bolt-left">
            <h2 className="font-display text-3xl font-bold uppercase sm:text-4xl">
              Have a project in mind?
            </h2>
            <p className="mt-2 text-white/75">
              Our technical team is ready to help you find the right solution.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-[var(--electric)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[var(--electric)]/30 hover:bg-[var(--electric-dark)]"
          >
            Get a Free Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}