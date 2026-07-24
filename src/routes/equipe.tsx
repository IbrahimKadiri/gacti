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
          "GACTI (Groupe Abid) : une équipe experte du transit international, du transport maritime et de la logistique export depuis plus de 10.",
      },
      { property: "og:title", content: "Notre équipe — GACTI" },
      {
        property: "og:description",
        content:
          "Une structure organisée autour de pôles métiers complémentaires dédiés à l’export international.",
      },
      { property: "og:image", content: teamImg },
      { name: "twitter:image", content: teamImg },
    ],
  }),
  component: EquipePage,
});

const values = [
  {
    icon: ShieldCheck,
    title: "Fiabilité opérationnelle",
    desc: "Chaque dossier est traité avec rigueur, du premier document jusqu’à la remise finale au transporteur.",
  },
  {
    icon: Zap,
    title: "Réactivité",
    desc: "Des réponses rapides, une équipe disponible et une prise en charge immédiate des demandes urgentes.",
  },
  {
    icon: Eye,
    title: "Transparence",
    desc: "Une communication claire à chaque étape, des coûts maîtrisés et aucun frais imprévu.",
  },
  {
    icon: Award,
    title: "Expertise terrain",
    desc: "Plus de 10 ans d’expérience dans le transit, la logistique portuaire et les formalités internationales.",
  },
];

const team = [
  {
    name: "Direction générale",
    role: "Pilotage stratégique & relations partenaires internationaux",
    initials: "DG",
  },
  {
    name: "Pôle Transit",
    role: "Douane, immatriculation, assurance & gestion administrative export",
    initials: "TR",
  },
  {
    name: "Pôle Maritime",
    role: "Cotation, booking navires, coordination portuaire & suivi export",
    initials: "MR",
  },
  {
    name: "Pôle Logistique & Sourcing",
    role: "Recherche véhicules, fournisseurs et coordination des flux",
    initials: "LG",
  },
];

function EquipePage() {
  return (
    <>
      <PageHero
        eyebrow="À propos · Groupe Abid"
        title="Une structure organisée autour de l’export international."
        intro="Depuis plus de 10 ans, GACTI accompagne les opérations de transit, de transport maritime et de distribution à l’international depuis les principaux ports français."
        image={teamImg}
      />

      {/* HISTORY */}
      <section className="py-24 md:py-32 container-x">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <Reveal className="md:col-span-5">
            <div className="text-xs tracking-[0.25em] uppercase text-gold flex items-center gap-3">
              <span className="w-8 h-px bg-gold" /> Notre histoire
            </div>

            <h2 className="mt-5 font-serif text-4xl md:text-5xl text-navy leading-[1.05]">
              Une croissance construite sur le terrain.
            </h2>
          </Reveal>

          <Reveal className="md:col-span-7" delay={0.1}>
            <div className="space-y-5 text-navy/75 text-lg leading-relaxed">
              <p>
                Issu du Groupe Abid, GACTI s’est développé autour d’une activité
                terrain : le transit de véhicules et la logistique portuaire.
                L’entreprise s’est structurée progressivement au contact des
                ports français et des partenaires internationaux.
              </p>

              <p>
                Aujourd’hui, l’organisation repose sur plusieurs pôles métiers
                complémentaires qui travaillent ensemble sur chaque dossier :
                préparation administrative, coordination maritime, sourcing et
                distribution.
              </p>

              <p>
                Cette organisation permet un suivi unique pour chaque client,
                avec un interlocuteur dédié du début jusqu’à l’expédition finale.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-navy text-cream py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <div className="text-xs tracking-[0.25em] uppercase text-gold flex items-center gap-3">
              <span className="w-8 h-px bg-gold" /> Nos engagements
            </div>

            <h2 className="mt-5 font-serif text-4xl md:text-5xl text-cream max-w-3xl">
              Des principes qui structurent chaque opération.
            </h2>
          </Reveal>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="border-t border-gold/40 pt-6">
                  <v.icon className="size-8 text-gold" />
                  <h3 className="mt-4 font-serif text-2xl text-cream">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-cream/65 text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 md:py-32 container-x">
        <SectionHeader
          eyebrow="Organisation"
          title="Une structure claire, pensée pour l’efficacité."
          intro="Chaque pôle est spécialisé mais travaille en coordination directe avec les autres pour garantir la fluidité des opérations."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <div className="aspect-[3/4] bg-navy text-cream flex flex-col justify-between p-6 group hover:bg-gold hover:text-navy transition-colors">
                <div className="font-serif text-7xl text-gold group-hover:text-navy">
                  {m.initials}
                </div>

                <div>
                  <div className="font-serif text-xl">{m.name}</div>
                  <div className="text-xs tracking-widest uppercase mt-2 opacity-70">
                    {m.role}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Travaillons ensemble."
        subtitle="Une demande, un projet ou un dossier complexe ? Notre équipe vous répond rapidement."
      />
    </>
  );
}
