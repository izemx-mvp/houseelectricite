import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/HouseLogo.png.asset.json";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/solutions", label: "Solutions" },
  { to: "/support", label: "Support" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 py-3">
        <Link to="/" className="flex shrink-0 items-center" aria-label="House Électricité home">
          <img src={logoAsset.url} alt="House Électricité" className="h-10 w-auto md:h-12" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative font-medium uppercase tracking-wide text-sm transition-colors ${
                  active ? "text-[var(--navy)]" : "text-[var(--ink)] hover:text-[var(--navy)]"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-[18px] left-0 right-0 h-[3px] bg-[var(--electric)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md bg-[var(--electric)] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition-all hover:bg-[var(--electric-dark)] hover:-translate-y-0.5"
          >
            Request a Quote
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="lg:hidden rounded-md p-2 text-[var(--navy)]"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[var(--line)] bg-white">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-1 px-6 py-4">
            {links.map((l) => {
              const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-3 text-sm font-medium uppercase tracking-wide ${
                    active
                      ? "bg-[var(--offwhite)] text-[var(--navy)]"
                      : "text-[var(--ink)] hover:bg-[var(--offwhite)]"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-[var(--electric)] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}