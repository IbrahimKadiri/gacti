import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function CTASection({
  title = "Un devis express en moins de 24 h.",
  subtitle = "Décrivez votre projet, nous nous engageons à traiter toutes les demandes dans un délai de moins de 24 heures pour vous offrir un service rapide et efficace",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-navy text-cream py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 grain opacity-30" />
      <div className="container-x relative">
        <div className="grid md:grid-cols-5 gap-10 items-end">
          <Reveal className="md:col-span-3">
            <div className="text-xs tracking-[0.25em] uppercase text-gold flex items-center gap-3">
              <span className="w-8 h-px bg-gold" /> Démarrer
            </div>
            <h2 className="mt-5 font-serif text-4xl md:text-6xl text-cream text-balance leading-[1.05]">
              {title}
            </h2>
            <p className="mt-6 max-w-xl text-cream/70 text-lg italic">{subtitle}</p>
          </Reveal>
          <Reveal className="md:col-span-2 flex md:justify-end" delay={0.1}>
            <Link
              to="/devis-express"
              className="group inline-flex items-center gap-3 bg-gold text-navy px-8 py-5 text-base tracking-wide hover:bg-cream transition-colors"
            >
              Demander un devis
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
