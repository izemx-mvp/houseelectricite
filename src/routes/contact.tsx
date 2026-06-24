import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import { MapPin, Phone, Mail, Send } from "lucide-react";
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
      {
        property: "og:description",
        content: "Reach our technical team for quotes and project support.",
      },
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

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

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
      toast.success("Request sent — our team will reply within 1 business day.");
      (e.target as HTMLFormElement).reset();
    }, 600);
  }

  return (
    <>
      <section className="bg-[var(--navy)] py-14 text-white">
        <div className="mx-auto max-w-[1280px] px-6">
          <nav className="text-xs uppercase tracking-wider text-white/60">
            <Link to="/" className="hover:text-white">Home</Link> <span>/</span> Contact
          </nav>
          <h1 className="mt-3 font-display text-5xl font-bold uppercase bolt-left">Contact Us</h1>
          <p className="mt-3 max-w-2xl pl-4 text-white/75">
            Tell us about your project. Our technical team will reply with sizing, references and a quote.
          </p>
        </div>
      </section>

      <section className="bg-[var(--offwhite)]">
        <div className="mx-auto max-w-[1280px] px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <aside className="space-y-6">
              <div className="rounded-lg border border-[var(--line)] bg-white p-6">
                <h2 className="label-eyebrow !text-[var(--navy)]">Reach us</h2>
                <ul className="mt-5 space-y-4 text-sm">
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 shrink-0 text-[var(--electric)]" size={18} />
                    <span className="text-[var(--ink)]/85">
                      Quartier les Camps, Lotissement Amine,<br />Lot A N°13, Casablanca 20300, Morocco
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Phone className="mt-0.5 shrink-0 text-[var(--electric)]" size={18} />
                    <span className="text-[var(--ink)]/85">
                      +212 522 602 169<br />
                      +212 522 611 663<br />
                      +212 522 611 120
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Mail className="mt-0.5 shrink-0 text-[var(--electric)]" size={18} />
                    <a href="mailto:info@houseelectricite.ma" className="text-[var(--navy)] hover:text-[var(--electric)] font-medium">
                      info@houseelectricite.ma
                    </a>
                  </li>
                </ul>
              </div>
              <div className="overflow-hidden rounded-lg border border-[var(--line)]">
                <iframe
                  title="Casablanca location"
                  src="https://www.google.com/maps?q=Casablanca%2020300%20Morocco&output=embed"
                  className="h-64 w-full"
                  loading="lazy"
                />
              </div>
            </aside>

            <form onSubmit={onSubmit} className="rounded-lg border border-[var(--line)] bg-white p-8">
              <h2 className="font-display text-2xl font-bold uppercase text-[var(--navy)] bolt-left">
                Quote Request
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Full Name *" name="fullName" required />
                <Field label="Company Name *" name="company" required />
                <Field label="Email *" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" />
                <div className="sm:col-span-2">
                  <label className="label-eyebrow !text-[var(--navy)]">
                    Product / Solution of Interest
                  </label>
                  <select
                    name="interest"
                    defaultValue=""
                    className="mt-2 w-full rounded-md border border-[var(--line)] bg-white px-3 py-2.5 text-sm text-[var(--ink)] focus:border-[var(--navy)] focus:outline-none focus:ring-2 focus:ring-[var(--navy)]/20"
                  >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="label-eyebrow !text-[var(--navy)]">
                    Message / Project Description *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="mt-2 w-full rounded-md border border-[var(--line)] bg-white px-3 py-2.5 text-sm text-[var(--ink)] focus:border-[var(--navy)] focus:outline-none focus:ring-2 focus:ring-[var(--navy)]/20"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-[var(--electric)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-[var(--electric-dark)] disabled:opacity-70"
              >
                <Send size={16} /> {submitting ? "Sending..." : "Send Request"}
              </button>
              <p className="mt-3 text-xs text-[var(--ink)]/60">
                By submitting, you agree to be contacted regarding your inquiry.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="label-eyebrow !text-[var(--navy)]">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-md border border-[var(--line)] bg-white px-3 py-2.5 text-sm text-[var(--ink)] focus:border-[var(--navy)] focus:outline-none focus:ring-2 focus:ring-[var(--navy)]/20"
      />
    </div>
  );
}