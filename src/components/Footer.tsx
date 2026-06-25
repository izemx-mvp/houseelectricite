import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, ArrowRight, ExternalLink } from "lucide-react";
import logoAsset from "@/assets/HouseLogo.png.asset.json";
import { categories } from "@/data/mockData";

const quickLinks = [
  ["/", "Home"],
  ["/products", "Products"],
  ["/solutions", "Solutions"],
  ["/support", "Support & Documents"],
  ["/about", "About Us"],
  ["/contact", "Contact"],
] as const;

export function Footer() {
  return (
    <footer className="bg-[var(--navy)] text-white">
      {/* ── pre-footer CTA strip ── */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="grid-bg absolute inset-0 opacity-15" />
        <div className="absolute left-0 top-0 h-full w-[3px] bg-[var(--electric)]" />
        <div className="relative mx-auto max-w-[1280px] px-6 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="label-eyebrow !text-[var(--electric)] mb-1">Ready to work with us?</p>
            <p className="font-display text-2xl font-bold uppercase">Get a quote for your project</p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-2 rounded-md bg-[var(--electric)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[var(--electric)]/25 transition-all duration-200 hover:bg-[var(--electric-dark)] hover:-translate-y-0.5 group"
          >
            Contact Our Team <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ── main footer ── */}
      <div className="mx-auto max-w-[1280px] px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* brand */}
          <div className="lg:col-span-1">
            <div className="inline-flex rounded-md bg-white px-3 py-2 mb-4">
              <img src={logoAsset.url} alt="House Électricité" className="h-10 w-auto" />
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              More than a supplier, we are the solution. Official ENTES Elektronik distributor in Morocco since our
              founding.
            </p>
            {/* ENTES badge */}
            <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--electric)]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                ENTES Certified · Morocco
              </span>
            </div>
          </div>

          {/* quick links */}
          <div>
            <h4 className="label-eyebrow !text-white/40 mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="group flex items-center gap-2 text-sm text-white/65 transition-colors duration-200 hover:text-white"
                  >
                    <ArrowRight
                      size={12}
                      className="text-[var(--electric)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* categories */}
          <div>
            <h4 className="label-eyebrow !text-white/40 mb-4">Product Categories</h4>
            <ul className="space-y-2.5">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    to="/products"
                    search={{ category: c.id }}
                    className="group flex items-center gap-2 text-sm text-white/65 transition-colors duration-200 hover:text-white"
                  >
                    <ArrowRight
                      size={12}
                      className="text-[var(--electric)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0"
                    />
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <h4 className="label-eyebrow !text-white/40 mb-4">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="https://maps.google.com/?q=Casablanca+20300+Morocco"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex gap-3 text-white/65 hover:text-white transition-colors duration-200"
                >
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--electric)]" />
                  <span className="leading-relaxed">
                    Quartier les Camps, Lot Amine,
                    <br />
                    Lot A N°13, Casablanca 20300
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+212522602169"
                  className="flex gap-3 text-white/65 hover:text-white transition-colors duration-200"
                >
                  <Phone size={16} className="mt-0.5 shrink-0 text-[var(--electric)]" />
                  <span>+212 5226-02169</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@houseelectricite.ma"
                  className="flex gap-3 text-white/65 hover:text-white transition-colors duration-200"
                >
                  <Mail size={16} className="mt-0.5 shrink-0 text-[var(--electric)]" />
                  <span>info@houseelectricite.ma</span>
                </a>
              </li>
              <li>
                <a
                  href="https://entes.eu"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[var(--electric)] hover:text-white transition-colors duration-200 text-xs font-semibold uppercase tracking-wide mt-2"
                >
                  <ExternalLink size={13} /> entes.eu
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* map */}
        <div className="mt-12 overflow-hidden rounded-lg border border-white/10 transition-all duration-300 hover:border-white/20">
          <iframe
            title="House Électricité location"
            src="https://www.google.com/maps?q=Casablanca%20Morocco&output=embed"
            className="h-56 w-full"
            loading="lazy"
          />
        </div>

        {/* bottom bar */}
        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>© 2025 House Électricité S.A.R.L. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p>Official ENTES Elektronik distributor — Morocco</p>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <a href="https://entes.eu" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              entes.eu
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
