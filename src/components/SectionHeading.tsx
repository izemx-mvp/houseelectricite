import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p className={`label-eyebrow ${align === "center" ? "" : ""}`}>{eyebrow}</p>
      )}
      <h2
        className={`mt-3 font-display text-4xl font-bold uppercase leading-[1.05] sm:text-5xl ${
          align === "left" ? "bolt-left" : ""
        } ${isDark ? "text-white" : "text-[var(--navy)]"}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed ${isDark ? "text-white/75" : "text-[var(--ink)]/80"}`}>
          {description}
        </p>
      )}
    </div>
  );
}