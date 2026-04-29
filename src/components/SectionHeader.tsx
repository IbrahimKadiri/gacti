import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <Reveal>
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-gold">
            <span className="w-8 h-px bg-gold" />
            {eyebrow}
          </div>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-5 font-serif text-4xl md:text-5xl lg:text-6xl text-navy text-balance">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-6 text-lg text-navy/70 leading-relaxed text-pretty">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
