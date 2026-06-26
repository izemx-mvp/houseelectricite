import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import logoUrl from "@/assets/HouseLogo.png";
import { categories } from "@/data/mockData";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products", mega: true },
  { to: "/solutions", label: "Solutions" },
  { to: "/support", label: "Support" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close mega on route change */
  useEffect(() => {
    setMegaOpen(false);
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 16px rgba(26,36,86,0.06)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 py-3">
        {/* logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center"
          aria-label="House Électricité home"
          onClick={() => setMegaOpen(false)}
        >
          <img
            src={logoUrl}
            alt="House Électricité"
            className="transition-all duration-300"
            style={{ height: scrolled ? "38px" : "44px", width: "auto" }}
          />
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            const isMega = "mega" in l && l.mega;
            return (
              <div
                key={l.to}
                className="relative"
                onMouseEnter={() => isMega && setMegaOpen(true)}
                onMouseLeave={() => isMega && setMegaOpen(false)}
              >
                <Link
                  to={l.to}
                  className="relative flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-all duration-200"
                  style={{ color: active ? "var(--navy)" : "var(--ink)" }}
                >
                  <span className="hover:text-[var(--navy)] transition-colors">{l.label}</span>
                  {isMega && (
                    <ChevronDown
                      size={13}
                      className="transition-transform duration-200"
                      style={{ transform: megaOpen ? "rotate(180deg)" : "rotate(0deg)", color: "var(--electric)" }}
                    />
                  )}
                  {/* active underline */}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[var(--electric)]" />
                  )}
                </Link>

                {/* mega dropdown */}
                {isMega && (
                  <div
                    className="absolute left-1/2 top-full pt-2"
                    style={{
                      transform: "translateX(-50%)",
                      opacity: megaOpen ? 1 : 0,
                      pointerEvents: megaOpen ? "auto" : "none",
                      transition: "opacity 0.2s ease, transform 0.2s ease",
                      transformOrigin: "top center",
                      translate: megaOpen ? "0 0" : "0 -6px",
                    }}
                  >
                    <div className="w-[480px] rounded-xl border border-[var(--line)] bg-white shadow-[0_16px_48px_rgba(26,36,86,0.14)] overflow-hidden">
                      {/* header */}
                      <div className="bg-[var(--navy)] px-5 py-4 flex items-center justify-between">
                        <div>
                          <p className="label-eyebrow !text-[var(--electric)] mb-0.5">ENTES Catalog</p>
                          <p className="font-display text-lg font-bold uppercase text-white">Product Categories</p>
                        </div>
                        <Link
                          to="/products"
                          className="inline-flex items-center gap-1.5 rounded-md bg-[var(--electric)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-[var(--electric-dark)] transition-colors"
                        >
                          View All <ArrowRight size={11} />
                        </Link>
                      </div>
                      {/* category grid */}
                      <div className="grid grid-cols-2 gap-px bg-[var(--line)] p-px">
                        {categories.map((c) => {
                          const Icon = c.icon;
                          return (
                            <Link
                              key={c.id}
                              to="/products"
                              search={{ category: c.id }}
                              className="group flex items-center gap-3 bg-white px-4 py-3.5 transition-all duration-150 hover:bg-[var(--offwhite)]"
                            >
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--navy)]/8 transition-all duration-200 group-hover:bg-[var(--electric)] group-hover:scale-110">
                                <Icon
                                  size={15}
                                  className="text-[var(--navy)] transition-colors duration-200 group-hover:text-white"
                                />
                              </div>
                              <span className="text-xs font-semibold text-[var(--navy)] group-hover:text-[var(--electric)] transition-colors leading-tight">
                                {c.name}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-[var(--electric)] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition-all duration-200 hover:bg-[var(--electric-dark)] hover:-translate-y-0.5 hover:shadow-md group"
          >
            Request a Quote
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          className="lg:hidden rounded-md p-2 text-[var(--navy)] transition-colors hover:bg-[var(--offwhite)]"
          onClick={() => setOpen((v) => !v)}
        >
          <div style={{ transition: "transform 0.2s ease", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </div>
        </button>
      </div>

      {/* mobile menu */}
      <div
        className="lg:hidden overflow-hidden border-t border-[var(--line)] bg-white"
        style={{ maxHeight: open ? "600px" : "0", transition: "max-height 0.3s ease" }}
      >
        <div className="mx-auto flex max-w-[1280px] flex-col gap-1 px-6 py-4">
          {links.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-3 text-sm font-semibold uppercase tracking-wide transition-colors"
                style={{
                  background: active ? "var(--offwhite)" : "transparent",
                  color: active ? "var(--navy)" : "var(--ink)",
                }}
              >
                {active && <span className="h-3 w-[3px] rounded-full bg-[var(--electric)]" />}
                {l.label}
              </Link>
            );
          })}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-md bg-[var(--electric)] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[var(--electric-dark)]"
          >
            Request a Quote <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </header>
  );
}
