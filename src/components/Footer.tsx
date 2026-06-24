import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail } from "lucide-react";
import logoAsset from "@/assets/HouseLogo.png.asset.json";
import { categories } from "@/data/mockData";

export function Footer() {
  return (
    <footer className="bg-[var(--navy)] text-white">
      <div className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="inline-flex rounded-md bg-white px-3 py-2">
              <img src={logoAsset.url} alt="House Électricité" className="h-10 w-auto" />
            </div>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              More than a supplier, we are the solution. Official ENTES Elektronik distributor in Morocco.
            </p>
          </div>

          <div>
            <h4 className="label-eyebrow !text-white/60">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["/", "Home"],
                ["/products", "Products"],
                ["/solutions", "Solutions"],
                ["/support", "Support"],
                ["/about", "About"],
                ["/contact", "Contact"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-white/80 hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label-eyebrow !text-white/60">Product Categories</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    to="/products"
                    search={{ category: c.id }}
                    className="text-white/80 hover:text-white"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label-eyebrow !text-white/60">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li className="flex gap-3">
                <MapPin size={18} className="shrink-0 text-[var(--electric)]" />
                <span>Quartier les Camps, Lot Amine, Lot A N°13, Casablanca 20300, Morocco</span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="shrink-0 text-[var(--electric)]" />
                <span>+212 522 602 169</span>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="shrink-0 text-[var(--electric)]" />
                <a href="mailto:info@houseelectricite.ma" className="hover:text-white">
                  info@houseelectricite.ma
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-lg border border-white/10">
          <iframe
            title="House Électricité location"
            src="https://www.google.com/maps?q=Casablanca%20Morocco&output=embed"
            className="h-64 w-full"
            loading="lazy"
          />
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center">
          <p>© 2025 House Électricité S.A.R.L. All rights reserved.</p>
          <p>Official ENTES Elektronik distributor — Morocco</p>
        </div>
      </div>
    </footer>
  );
}