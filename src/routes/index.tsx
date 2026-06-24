import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Zap, CheckCircle2, Download, FileText, Phone, Mail } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { categories, solutions, CATALOG_URL } from "@/data/mockData";
import heroBg from "@/assets/hero-bg.jpg";
import whyImg from "@/assets/about.jpg";

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
        content: "Precision electrical equipment for industrial and commercial applications across Morocco.",
      },
    ],
  }),
  component: HomePage,
});

const trustStats = [
  { n: "15+", l: "Years of expertise" },
  { n: "500+", l: "Products distributed" },
  { n: "ENTES", l: "Certified distributor" },
  { n: "Casablanca", l: "Morocco-based" },
];

const whyPoints = [
  "Official ENTES Moroccan distributor",
  "Technical expertise & after-sales support",
  "Full product catalog available",
  "Custom quotes for large projects",
];

function HomePage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] overflow-hidden bg-[var(--navy)] text-white flex items-center">
        {/* Background image */}
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-30 pointer-events-none select-none"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy)] via-[var(--navy)]/90 to-[var(--navy)]/50" />
        <div className="grid-bg absolute inset-0 opacity-25" />
        {/* Red glow top-right */}
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[var(--electric)]/15 blur-[120px] pointer-events-none" />
        {/* Bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--electric)]/40 to-transparent" />

        <div className="relative mx-auto w-full max-w-[1280px] px-6 py-24 sm:py-32 lg:py-36">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="fade-up inline-flex items-center gap-2 rounded-full border border-[var(--electric)]/30 bg-[var(--electric)]/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--electric)] animate-pulse" />
              <p className="label-eyebrow !text-[var(--electric)]">Official ENTES Distributor · Morocco</p>
            </div>

            {/* Headline */}
            <h1
              className="mt-6 font-display text-5xl font-bold uppercase leading-[0.92] tracking-tight sm:text-6xl lg:text-[5.5rem] bolt-left fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              More than a supplier,
              <br />
              <span className="text-white/90">we are the</span>{" "}
              <span className="text-[var(--electric)]">solution.</span>
            </h1>

            {/* Sub */}
            <p
              className="mt-7 max-w-xl pl-4 text-lg leading-relaxed text-white/70 fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              Precision electrical equipment for industrial and commercial applications — energy metering, power
              quality, protection and control across Morocco.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4 pl-4 fade-up" style={{ animationDelay: "0.3s" }}>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-[var(--navy)] hover:border-white"
              >
                Explore Products <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--electric)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[var(--electric)]/25 transition-all duration-200 hover:bg-[var(--electric-dark)] hover:-translate-y-0.5 hover:shadow-[var(--electric)]/40"
              >
                Request a Quote <ArrowRight size={16} />
              </Link>
            </div>

            {/* Quick contact line */}
            <div className="mt-10 flex flex-wrap items-center gap-6 pl-4 fade-up" style={{ animationDelay: "0.4s" }}>
              <a
                href="tel:+212522602169"
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
              >
                <Phone size={14} className="text-[var(--electric)]" />
                +212 5226-02169
              </a>
              <a
                href="mailto:info@houseelectricite.ma"
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
              >
                <Mail size={14} className="text-[var(--electric)]" />
                info@houseelectricite.ma
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="border-b border-[var(--line)] bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-8 sm:py-10">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {trustStats.map((s) => (
              <div key={s.l} className="flex items-start gap-3">
                <Zap size={18} className="mt-1 shrink-0 fill-[var(--electric)] text-[var(--electric)]" />
                <div>
                  <div className="font-display text-2xl font-bold uppercase text-[var(--navy)] sm:text-3xl">{s.n}</div>
                  <div className="text-xs uppercase tracking-wider text-[var(--ink)]/60">{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRODUCT CATEGORIES ─── */}
      <section className="bg-[var(--offwhite)]">
        <div className="mx-auto max-w-[1280px] px-6 py-16 sm:py-20">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Catalog"
              title="Our Product Range"
              description="Six categories of ENTES equipment, engineered for precision in industrial Morocco."
            />
            <Link
              to="/products"
              className="hidden sm:inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[var(--electric)] hover:underline underline-offset-4"
            >
              View all products <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.id}
                  to="/products"
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-[var(--line)] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(26,36,86,0.10)]"
                >
                  {/* Red left accent on hover */}
                  <span className="absolute left-0 top-0 z-10 h-full w-[3px] bg-[var(--electric)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-[var(--offwhite)]">
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      width={640}
                      height={360}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Dark overlay on hover */}
                    <div className="absolute inset-0 bg-[var(--navy)]/0 transition-colors duration-200 group-hover:bg-[var(--navy)]/10" />
                    {/* Icon badge */}
                    <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-md bg-[var(--navy)] text-white shadow-lg transition-colors duration-200 group-hover:bg-[var(--electric)]">
                      <Icon size={18} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="font-display text-lg font-bold uppercase text-[var(--navy)] sm:text-xl">{c.name}</h3>
                    <p className="text-sm leading-relaxed text-[var(--ink)]/70">{c.description}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-[var(--electric)] transition-gap duration-200 group-hover:gap-2">
                      View products <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Mobile view all */}
          <div className="mt-8 flex justify-center sm:hidden">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--electric)] px-5 py-2.5 text-sm font-semibold text-[var(--electric)] hover:bg-[var(--electric)] hover:text-white transition-colors"
            >
              View all products <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SOLUTIONS ─── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-16 sm:py-20">
          <SectionHeading
            eyebrow="Solutions"
            title="Industry Solutions"
            description="Pre-engineered solution sets matching the most common industrial requirements."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {solutions.map((s) => {
              const Icon = s.icon;
              return (
                <article
                  key={s.id}
                  className="group relative flex flex-col overflow-hidden rounded-lg bg-[var(--navy)] text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(26,36,86,0.25)]"
                >
                  {/* Red left accent */}
                  <span className="absolute left-0 top-0 h-full w-[3px] bg-[var(--electric)]" />

                  {/* Image strip */}
                  {s.image && (
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        className="h-full w-full object-cover opacity-50 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy)]/20 to-[var(--navy)]" />
                      <div className="absolute bottom-4 left-7">
                        <Icon size={26} className="text-[var(--electric)]" />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col gap-3 p-7 pt-5">
                    <h3 className="font-display text-xl font-bold uppercase">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-white/70">{s.paragraphs[0]}</p>
                    {/* Benefits */}
                    <ul className="mt-1 flex flex-col gap-1.5">
                      {s.benefits.slice(0, 3).map((b) => (
                        <li key={b} className="flex items-start gap-2 text-xs text-white/60">
                          <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-[var(--electric)]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/solutions"
                      hash={s.id}
                      className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-[var(--electric)] hover:text-white transition-colors"
                    >
                      Learn more <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="bg-[var(--offwhite)]">
        <div className="mx-auto max-w-[1280px] px-6 py-16 sm:py-20">
          <SectionHeading eyebrow="Trust" title="Why House Électricité?" />
          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            {/* Image */}
            <div className="relative overflow-hidden rounded-lg border border-[var(--line)] shadow-sm">
              <span className="absolute left-0 top-0 z-10 h-full w-[3px] bg-[var(--electric)]" />
              <img
                src={whyImg}
                alt="House Électricité distribution warehouse in Casablanca"
                loading="lazy"
                width={1600}
                height={1024}
                className="h-full max-h-80 w-full object-cover lg:max-h-none"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-5 left-8 rounded-md bg-[var(--navy)]/90 px-4 py-2.5 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Casablanca, Morocco</p>
                <p className="font-display text-lg font-bold uppercase text-white">Official ENTES Partner</p>
              </div>
            </div>

            {/* Points */}
            <div className="grid gap-4 sm:grid-cols-2">
              {whyPoints.map((point) => (
                <div
                  key={point}
                  className="group flex items-start gap-3 rounded-lg border border-[var(--line)] bg-white p-5 transition-all duration-200 hover:border-[var(--electric)]/30 hover:shadow-[0_4px_16px_rgba(212,43,43,0.06)]"
                >
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-[var(--electric)] transition-transform duration-200 group-hover:scale-110"
                    size={20}
                  />
                  <p className="text-sm font-medium leading-snug text-[var(--navy)]">{point}</p>
                </div>
              ))}

              {/* ENTES badge */}
              <div className="sm:col-span-2 flex items-center gap-4 rounded-lg border border-[var(--navy)]/15 bg-[var(--navy)] px-5 py-4 text-white">
                <Zap size={20} className="shrink-0 fill-[var(--electric)] text-[var(--electric)]" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/50">Authorized by</p>
                  <p className="font-display text-base font-bold uppercase">ENTES Elektronik — Istanbul, Turkey</p>
                </div>
                <a
                  href="https://www.entes.eu"
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto shrink-0 text-xs text-white/40 hover:text-white transition-colors underline underline-offset-2"
                >
                  entes.eu ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SUPPORT ─── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-16 sm:py-20">
          <SectionHeading
            eyebrow="Documents"
            title="Support & Documents"
            description="All technical documentation in one place."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {/* Catalog */}
            <div className="group flex flex-col gap-4 rounded-lg border border-[var(--line)] bg-[var(--offwhite)] p-7 transition-all duration-200 hover:border-[var(--electric)]/30 hover:shadow-[0_4px_20px_rgba(212,43,43,0.07)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[var(--electric)]/10">
                <Download className="text-[var(--electric)]" size={24} />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold uppercase text-[var(--navy)]">Product Catalog</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink)]/70">
                  Download the complete ENTES product catalog — full specifications for all 500+ references.
                </p>
              </div>
              <a
                href={CATALOG_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex w-fit items-center gap-2 rounded-md bg-[var(--electric)] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-200 hover:bg-[var(--electric-dark)] hover:-translate-y-0.5"
              >
                Download Catalog <Download size={15} />
              </a>
            </div>

            {/* Brochures */}
            <div className="group flex flex-col gap-4 rounded-lg border border-[var(--line)] bg-[var(--offwhite)] p-7 transition-all duration-200 hover:border-[var(--navy)]/20 hover:shadow-[0_4px_20px_rgba(26,36,86,0.07)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[var(--navy)]/8">
                <FileText className="text-[var(--navy)]" size={24} />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold uppercase text-[var(--navy)]">Brochures</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink)]/70">
                  Browse individual product and solution brochures by category — PDFs ready to share with your team.
                </p>
              </div>
              <Link
                to="/support"
                className="mt-auto inline-flex w-fit items-center gap-2 rounded-md border border-[var(--navy)] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-[var(--navy)] transition-all duration-200 hover:bg-[var(--navy)] hover:text-white hover:-translate-y-0.5"
              >
                View Brochures <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="relative overflow-hidden bg-[var(--navy)] text-white">
        <div className="grid-bg absolute inset-0 opacity-30" />
        {/* Red glow */}
        <div className="absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[var(--electric)]/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--electric)]/30 to-transparent" />

        <div className="relative mx-auto max-w-[1280px] px-6 py-16 sm:py-20">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="bolt-left max-w-xl">
              <p className="label-eyebrow !text-[var(--electric)]">Get in touch</p>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase leading-tight sm:text-4xl lg:text-5xl">
                Have a project
                <br />
                in mind?
              </h2>
              <p className="mt-3 text-base text-white/65">
                Our technical team is ready to help you find the right solution — from a single relay to a complete
                energy management system.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--electric)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[var(--electric)]/30 transition-all duration-200 hover:bg-[var(--electric-dark)] hover:-translate-y-0.5"
              >
                Get a Free Quote <ArrowRight size={16} />
              </Link>
              <a
                href="tel:+212522602169"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/10"
              >
                <Phone size={15} /> Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
