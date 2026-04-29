import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Zap, Eye, Award } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { CTASection } from "@/components/CTASection";
import teamImg from "@/assets/team.jpg";

export const Route = createFileRoute("/equipe")({
  head: () => ({
    meta: [
      { title: "Notre équipe — GACTI" },
      {
        name: "description",
        content:
          "Découvrez l'histoire du Groupe Abid et l'équipe GACTI : 15 ans d'expertise au service de l'export international.",
      },
      { property: "og:title", content: "Notre équipe — GACTI" },
      { property: "og:description", content: "L'histoire et les valeurs du Groupe Abid de Commerce et Transports Internationaux." },
      { property: "og:image", content: teamImg },
      { name: "twitter:image", content: teamImg },
    ],
  }),
  component: EquipePage,
});

const values = [
  { icon: ShieldCheck, title: "Fiabilité", desc: "Engagements tenus, dossiers traités avec rigueur du premier au dernier document." },
  { icon: Zap, title: "Réactivité", desc: "Réponse sous 24 h, équipe joignable, décisions prises rapidement." },
  { icon: Eye, title: "Transparence", desc: "Tarifs clairs, documents partagés en temps réel, aucun frais caché." },
  { icon: Award, title: "Expertise", desc: "Plus de 15 ans de pratique du transit, du fret maritime et des formalités douanières." },
];

const team = [
  { name: "Direction Groupe Abid", role: "Stratégie & relations clients internationaux", initials: "GA" },
  { name: "Pôle Transit", role: "Formalités douanières, immatriculation, assurance", initials: "PT" },
  { name: "Pôle Maritime", role: "Cotation, booking, suivi des expéditions", initials: "PM" },
  { name: "Pôle Distribution", role: "Catalogues, commandes et relations fournisseurs", initials: "PD" },
];

function EquipePage() {
  return (
    <>
      <PageHero
        eyebrow="À propos · Équipe"
        title="Une maison familiale devenue référence."
        intro="Fondé sous le nom de Groupe Abid, GACTI cumule plus de 15 ans d'expertise dans le transit international, le transport maritime et la distribution agroalimentaire."
        image={teamImg}
      />

      <section className="py-24 md:py-32 container-x">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <Reveal className="md:col-span-5">
            <div className="text-xs tracking-[0.25em] uppercase text-gold flex items-center gap-3">
              <span className="w-8 h-px bg-gold" /> Notre histoire
            </div>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl text-navy leading-[1.05]">
              Quinze ans à <span className="italic">orchestrer</span> l'export.
            </h2>
          </Reveal>
          <Reveal className="md:col-span-7" delay={0.1}>
            <div className="space-y-5 text-navy/75 text-lg leading-relaxed">
              <p>
                Né de l'expérience du Groupe Abid, GACTI s'est implanté au plus près des grands
                ports français pour accompagner particuliers et professionnels dans leurs projets
                d'exportation. Au fil des années, notre activité s'est structurée autour de quatre
                pôles complémentaires : transit véhicules, sourcing automobile, distribution
                agroalimentaire et transport maritime.
              </p>
              <p>
                Cette diversification n'est pas une dispersion : chaque pôle se nourrit des
                autres. Nos clients trouvent un seul interlocuteur, capable de comprendre une
                opération de bout en bout — du choix du véhicule jusqu'à sa livraison
                outre-Méditerranée.
              </p>
              <p>
                Aujourd'hui, ce sont plus de 2 000 véhicules exportés et 30 pays desservis qui
                attestent de la confiance accordée par nos partenaires.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy text-cream py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <div className="text-xs tracking-[0.25em] uppercase text-gold flex items-center gap-3">
              <span className="w-8 h-px bg-gold" /> Nos valeurs
            </div>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl text-cream max-w-3xl text-balance">
              Quatre principes <span className="italic">non négociables</span>.
            </h2>
          </Reveal>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="border-t border-gold/40 pt-6">
                  <v.icon className="size-8 text-gold" />
                  <h3 className="mt-4 font-serif text-2xl text-cream">{v.title}</h3>
                  <p className="mt-2 text-cream/65 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 container-x">
        <SectionHeader
          eyebrow="L'équipe"
          title="Des pôles complémentaires, un même engagement."
        />
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <div className="aspect-[3/4] bg-navy text-cream flex flex-col justify-between p-6 group hover:bg-gold hover:text-navy transition-colors">
                <div className="font-serif text-7xl text-gold group-hover:text-navy">{m.initials}</div>
                <div>
                  <div className="font-serif text-xl">{m.name}</div>
                  <div className="text-xs tracking-widest uppercase mt-2 opacity-70">{m.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection title="Travaillons ensemble." subtitle="Une question, un projet, un dossier complexe ? Notre équipe est joignable directement." />
    </>
  );
}
