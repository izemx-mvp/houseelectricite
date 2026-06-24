import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Handshake, Wrench, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — House Électricité" },
      {
        name: "description",
        content: "Casablanca-based official ENTES Elektronik distributor for Moroccan industry.",
      },
      { property: "og:title", content: "About — House Électricité" },
      {
        property: "og:description",
        content: "Who we are and how we serve Moroccan industrial clients.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--navy)] py-20 text-white">
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-[1280px] px-6">
          <p className="label-eyebrow !text-[var(--electric)]">About us</p>
          <h1 className="mt-3 font-display text-6xl font-bold uppercase bolt-left">Who We Are</h1>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-5 text-base leading-relaxed text-[var(--ink)]/85">
              <p>
                House Électricité S.A.R.L. is a Casablanca-based company specialized in the
                distribution of high-quality electrical measurement and protection equipment. As
                the official distributor of ENTES Elektronik in Morocco, we provide industrial
                clients with proven solutions for energy management, power quality, and
                electrical protection.
              </p>
              <p>
                Founded with a commitment to technical excellence and customer support, we serve
                electrical contractors, industrial facilities, energy managers, and engineering
                firms across Morocco — from large manufacturing plants to commercial real estate
                portfolios.
              </p>
            </div>
            <div className="rounded-lg border border-[var(--line)] bg-[var(--offwhite)] p-8">
              <h3 className="label-eyebrow !text-[var(--navy)]">At a glance</h3>
              <dl className="mt-4 grid grid-cols-2 gap-y-4 text-sm">
                <dt className="text-[var(--ink)]/70">Headquarters</dt>
                <dd className="font-semibold text-[var(--navy)]">Casablanca, Morocco</dd>
                <dt className="text-[var(--ink)]/70">Founded</dt>
                <dd className="font-semibold text-[var(--navy)]">15+ years ago</dd>
                <dt className="text-[var(--ink)]/70">Partnership</dt>
                <dd className="font-semibold text-[var(--navy)]">ENTES Elektronik</dd>
                <dt className="text-[var(--ink)]/70">Products</dt>
                <dd className="font-semibold text-[var(--navy)]">500+ references</dd>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--offwhite)]">
        <div className="mx-auto max-w-[1280px] px-6 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Building2, title: "Casablanca HQ", body: "Centrally located to serve clients across Morocco." },
              { icon: Handshake, title: "ENTES Certified Partner", body: "Official distributor with direct factory support." },
              { icon: Wrench, title: "Technical Support Team", body: "Field-tested expertise for sizing and commissioning." },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="rounded-lg border border-[var(--line)] bg-white p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[var(--navy)] text-white">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold uppercase text-[var(--navy)]">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--ink)]/80">{c.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-16">
          <div className="rounded-lg border border-[var(--line)] bg-[var(--navy)] p-10 text-white">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
              <div>
                <p className="label-eyebrow !text-[var(--electric)]">Manufacturer</p>
                <h2 className="mt-3 font-display text-4xl font-bold uppercase bolt-left">
                  Our Products
                </h2>
              </div>
              <div className="space-y-4 text-white/80">
                <p>
                  ENTES Elektronik is a leading Turkish manufacturer of electrical measurement
                  and protection equipment, with worldwide distribution across more than 60
                  countries. Their portfolio covers power quality analyzers, energy meters,
                  reactive power controllers, protection relays and current transformers — all
                  engineered to international standards.
                </p>
                <a
                  href="https://entes.eu"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--electric)] hover:text-white"
                >
                  Visit entes.eu <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--electric)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-[var(--electric-dark)]"
            >
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}