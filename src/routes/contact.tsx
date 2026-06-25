import { useState, useRef, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import { MapPin, Phone, Mail, Send, ArrowRight, Clock, Zap } from "lucide-react";
import { categories } from "@/data/mockData";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — House Électricité" },
      {
        name: "description",
        content: "Contact House Électricité in Casablanca for ENTES product quotes and technical support.",
      },
      { property: "og:title", content: "Contact — House Électricité" },
      { property: "og:description", content: "Reach our technical team for quotes and project support." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  fullName: z.string().trim().min(1, "Required").max(100),
  company: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().email("Invalid email").max(200),
  phone: z.string().trim().max(40).optional(),
  interest: z.string().max(80).optional(),
  message: z.string().trim().min(1, "Required").max(2000),
});

/* ── hooks ── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView(0.05);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function SlideIn({
  children,
  from = "left",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  from?: "left" | "right";
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView(0.05);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : `translateX(${from === "left" ? "-40px" : "40px"})`,
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Field component ── */
function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="group">
      <label className="label-eyebrow !text-[var(--navy)] block mb-2">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full rounded-md border px-3.5 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink)]/35 focus:outline-none transition-all duration-200"
        style={{
          borderColor: focused ? "var(--electric)" : "var(--line)",
          boxShadow: focused ? "0 0 0 3px rgba(212,43,43,0.08)" : "none",
          background: "#fff",
        }}
      />
    </div>
  );
}

/* ── page ── */
function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      fullName: String(form.get("fullName") ?? ""),
      company: String(form.get("company") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      interest: String(form.get("interest") ?? ""),
      message: String(form.get("message") ?? ""),
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Request sent — our team will reply within 1 business day.");
      (e.target as HTMLFormElement).reset();
    }, 700);
  }

  const contactItems = [
    {
      icon: MapPin,
      label: "Address",
      content: "Quartier les Camps, Lotissement Amine,\nLot A N°13, Casablanca 20300, Morocco",
      href: "https://maps.google.com/?q=Casablanca+20300+Morocco",
    },
    {
      icon: Phone,
      label: "Phone",
      content: "+212 5226-02169\n+212 05226-11663\n+212 05226-111120",
      href: "tel:+212522602169",
    },
    {
      icon: Mail,
      label: "Email",
      content: "info@houseelectricite.ma",
      href: "mailto:info@houseelectricite.ma",
    },
    {
      icon: Clock,
      label: "Business Hours",
      content: "Mon – Fri: 8:30 AM – 6:00 PM\nSat: 9:00 AM – 1:00 PM",
      href: null,
    },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[var(--navy)] text-white">
        <div className="grid-bg absolute inset-0 opacity-20" />
        <div
          className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[var(--electric)]/12 pointer-events-none"
          style={{ filter: "blur(90px)" }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, var(--electric), transparent)",
              transform: heroReady ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: "transform 1.1s ease 0.2s",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-6 py-20 sm:py-24">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div
              style={{
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
              }}
            >
              <nav className="text-xs uppercase tracking-wider text-white/45 mb-5">
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span className="mx-2 text-white/20">/</span>
                <span className="text-white/70">Contact</span>
              </nav>
              <p className="label-eyebrow !text-[var(--electric)] mb-3">Get in Touch</p>
              <h1 className="font-display text-5xl font-bold uppercase bolt-left sm:text-6xl leading-none">
                Let's Talk
                <br />
                About Your Project
              </h1>
              <p className="mt-5 pl-4 text-base text-white/60 max-w-lg leading-relaxed">
                Tell us about your project. Our technical team will reply with sizing, product references, and a
                competitive quote — within 1 business day.
              </p>
            </div>

            {/* quick contact cards */}
            <div
              className="hidden lg:flex flex-col gap-3 shrink-0"
              style={{ opacity: heroReady ? 1 : 0, transition: "opacity 0.7s ease 0.35s" }}
            >
              <a
                href="tel:+212522602169"
                className="flex items-center gap-3 rounded-md border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/70 hover:border-[var(--electric)]/40 hover:bg-[var(--electric)]/10 hover:text-white transition-all duration-200 backdrop-blur-sm group/q"
              >
                <Phone size={15} className="text-[var(--electric)] shrink-0" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-white/35 mb-0.5">Call us</div>
                  <div className="font-medium text-xs">+212 5226-02169</div>
                </div>
                <ArrowRight size={13} className="ml-auto opacity-0 group-hover/q:opacity-100 transition-opacity" />
              </a>
              <a
                href="mailto:info@houseelectricite.ma"
                className="flex items-center gap-3 rounded-md border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/70 hover:border-[var(--electric)]/40 hover:bg-[var(--electric)]/10 hover:text-white transition-all duration-200 backdrop-blur-sm group/q"
              >
                <Mail size={15} className="text-[var(--electric)] shrink-0" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-white/35 mb-0.5">Email us</div>
                  <div className="font-medium text-xs">info@houseelectricite.ma</div>
                </div>
                <ArrowRight size={13} className="ml-auto opacity-0 group-hover/q:opacity-100 transition-opacity" />
              </a>
              <div className="flex items-center gap-3 rounded-md border border-white/10 bg-white/6 px-4 py-3">
                <Zap size={15} className="text-[var(--electric)] shrink-0 fill-[var(--electric)]" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-white/35 mb-0.5">Response time</div>
                  <div className="font-medium text-xs text-white/70">Within 1 business day</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN ── */}
      <section className="bg-[var(--offwhite)]">
        <div className="mx-auto max-w-[1280px] px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
            {/* ── SIDEBAR ── */}
            <aside className="flex flex-col gap-5">
              {/* contact info */}
              <SlideIn from="left">
                <div className="rounded-lg border border-[var(--line)] bg-white overflow-hidden">
                  <div className="bg-[var(--navy)] px-6 py-4 relative overflow-hidden">
                    <div className="grid-bg absolute inset-0 opacity-20" />
                    <p className="relative label-eyebrow !text-[var(--electric)]">Contact Information</p>
                  </div>
                  <ul className="divide-y divide-[var(--line)]">
                    {contactItems.map((item, i) => {
                      const Icon = item.icon;
                      const inner = (
                        <div className="flex gap-3.5 px-6 py-4 transition-colors duration-200 hover:bg-[var(--offwhite)] group/ci">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--electric)]/10 mt-0.5 transition-all duration-200 group-hover/ci:bg-[var(--electric)] group-hover/ci:scale-110">
                            <Icon
                              size={16}
                              className="text-[var(--electric)] transition-colors duration-200 group-hover/ci:text-white"
                            />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-[var(--ink)]/45 mb-1">
                              {item.label}
                            </p>
                            <p className="text-sm text-[var(--ink)]/85 whitespace-pre-line leading-relaxed font-medium">
                              {item.content}
                            </p>
                          </div>
                        </div>
                      );
                      return item.href ? (
                        <li key={item.label}>
                          <a
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel="noreferrer"
                          >
                            {inner}
                          </a>
                        </li>
                      ) : (
                        <li key={item.label}>{inner}</li>
                      );
                    })}
                  </ul>
                </div>
              </SlideIn>

              {/* map */}
              <SlideIn from="left" delay={100}>
                <div className="overflow-hidden rounded-lg border border-[var(--line)] shadow-sm">
                  <iframe
                    title="Casablanca location"
                    src="https://www.google.com/maps?q=Casablanca%2020300%20Morocco&output=embed"
                    className="h-56 w-full"
                    loading="lazy"
                  />
                </div>
              </SlideIn>

              {/* ENTES badge */}
              <SlideIn from="left" delay={160}>
                <div className="flex items-center gap-3 rounded-lg border border-[var(--navy)]/15 bg-[var(--navy)] px-5 py-4 text-white">
                  <Zap size={18} className="shrink-0 fill-[var(--electric)] text-[var(--electric)]" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40">Official distributor</p>
                    <p className="font-display text-sm font-bold uppercase">ENTES Elektronik · Morocco</p>
                  </div>
                </div>
              </SlideIn>
            </aside>

            {/* ── FORM ── */}
            <SlideIn from="right">
              <div className="rounded-lg border border-[var(--line)] bg-white overflow-hidden">
                {/* form header */}
                <div className="relative overflow-hidden bg-[var(--navy)] px-8 py-6">
                  <div className="grid-bg absolute inset-0 opacity-15" />
                  <div
                    className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[var(--electric)]/15 pointer-events-none"
                    style={{ filter: "blur(40px)" }}
                  />
                  <span className="absolute left-0 top-0 h-full w-[3px] bg-[var(--electric)]" />
                  <p className="relative label-eyebrow !text-[var(--electric)] mb-1">Request a Quote</p>
                  <h2 className="relative font-display text-2xl font-bold uppercase text-white">
                    Tell Us About Your Project
                  </h2>
                  <p className="relative mt-1 text-sm text-white/50">All fields marked * are required.</p>
                </div>

                {/* success state */}
                {submitted ? (
                  <div className="flex flex-col items-center gap-4 px-8 py-16 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--electric)]/10">
                      <Send size={28} className="text-[var(--electric)]" />
                    </div>
                    <h3 className="font-display text-2xl font-bold uppercase text-[var(--navy)]">Request Sent!</h3>
                    <p className="text-sm text-[var(--ink)]/70 max-w-xs">
                      Our team will get back to you within 1 business day with product references and a quote.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-2 inline-flex items-center gap-2 rounded-md border border-[var(--line)] px-5 py-2.5 text-sm font-semibold text-[var(--navy)] hover:border-[var(--electric)] hover:text-[var(--electric)] transition-colors"
                    >
                      Send another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="px-8 py-8">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Full Name *" name="fullName" required placeholder="Your full name" />
                      <Field label="Company Name *" name="company" required placeholder="Your company" />
                      <Field label="Email *" name="email" type="email" required placeholder="you@company.com" />
                      <Field label="Phone" name="phone" type="tel" placeholder="+212 6XX XXX XXX" />

                      <div className="sm:col-span-2">
                        <label className="label-eyebrow !text-[var(--navy)] block mb-2">
                          Product / Solution of Interest
                        </label>
                        <select
                          name="interest"
                          defaultValue=""
                          onFocus={() => setFocused("interest")}
                          onBlur={() => setFocused(null)}
                          className="w-full rounded-md border px-3.5 py-3 text-sm text-[var(--ink)] focus:outline-none transition-all duration-200 bg-white"
                          style={{
                            borderColor: focused === "interest" ? "var(--electric)" : "var(--line)",
                            boxShadow: focused === "interest" ? "0 0 0 3px rgba(212,43,43,0.08)" : "none",
                          }}
                        >
                          <option value="">All Categories</option>
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="label-eyebrow !text-[var(--navy)] block mb-2">
                          Message / Project Description *
                        </label>
                        <textarea
                          name="message"
                          rows={5}
                          required
                          placeholder="Describe your project, site, or the products you need…"
                          onFocus={() => setFocused("message")}
                          onBlur={() => setFocused(null)}
                          className="w-full rounded-md border px-3.5 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink)]/35 focus:outline-none transition-all duration-200 resize-none bg-white"
                          style={{
                            borderColor: focused === "message" ? "var(--electric)" : "var(--line)",
                            boxShadow: focused === "message" ? "0 0 0 3px rgba(212,43,43,0.08)" : "none",
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center gap-2 rounded-md bg-[var(--electric)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md shadow-[var(--electric)]/20 transition-all duration-200 hover:bg-[var(--electric-dark)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed group"
                      >
                        <Send size={15} className={submitting ? "animate-pulse" : ""} />
                        {submitting ? "Sending…" : "Send Request"}
                        {!submitting && (
                          <ArrowRight
                            size={14}
                            className="transition-transform duration-200 group-hover:translate-x-1"
                          />
                        )}
                      </button>
                      <p className="text-xs text-[var(--ink)]/45">
                        By submitting, you agree to be contacted regarding your inquiry.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </SlideIn>
          </div>
        </div>
      </section>
    </>
  );
}
