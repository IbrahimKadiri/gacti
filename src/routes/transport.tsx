import { createFileRoute } from "@tanstack/react-router";
import { Container, Globe2, Ship, Anchor } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { CTASection } from "@/components/CTASection";
import maritimeImg from "@/assets/maritime.avif";
import portAerial from "@/assets/port-aerial.avif";

export const Route = createFileRoute("/transport")({
  head: () => ({
    meta: [
      { title: "Transport maritime — GACTI" },
      {
        name: "description",
        content:
          "Transport maritime international : conteneurs, RoRo, groupage et expéditions depuis la France vers l’Afrique, le Moyen-Orient et le monde entier.",
      },
      { property: "og:title", content: "Transport maritime — GACTI" },
      {
        property: "og:description",
        content:
          "Fret maritime, conteneurs, RoRo et solutions d’expédition internationales sur mesure.",
      },
      { property: "og:image", content: maritimeImg },
      { name: "twitter:image", content: maritimeImg },
    ],
  }),
  component: TransportPage,
});

const services = [
  {
    icon: Ship,
    title: "Solutions sur mesure",
    desc: "Analyse complète de votre expédition : choix du navire, optimisation du fret maritime, planification du transit et coordination portuaire de bout en bout.",
  },
  {
    icon: Container,
    title: "Conteneurs & RoRo",
    desc: "Conteneurs 20’, 40’ et 40’ HC en FCL ou LCL. Transport de véhicules également en RoRo (Roll-on/Roll-off) ou en conteneur selon le type de marchandise.",
  },
  {
    icon: Globe2,
    title: "Destinations internationales",
    desc: "Réseau de ports couvrant l’Afrique de l’Ouest, l’Afrique centrale, le Maghreb et le Moyen-Orient via les principales lignes maritimes internationales.",
  },
  {
    icon: Anchor,
    title: "Douane & documentation",
    desc: "Gestion du Bill of Lading, certificats d’origine, documents export et coordination avec les transitaires et agents portuaires à destination.",
  },
];

const steps = [
  ["Cotation fret", "Tarification et délai d’expédition sous 24 h."],
  ["Booking navire", "Réservation auprès de la compagnie maritime."],
  ["Empotage / RoRo", "Chargement conteneur ou embarquement RoRo au port."],
  ["Transit maritime", "Suivi du navire jusqu’au port de destination."],
];

const destinations = [
  "Casablanca",
  "Tanger Med",
  "Tunis",
  "Alger",
  "Dakar",
  "Abidjan",
  "Douala",
  "Cotonou",
  "Lomé",
  "Beyrouth",
  "Djeddah",
  "Dubaï",
];

function TransportPage() {
  return (
    <>
      {/* HERO */}
      <PageHero
        eyebrow="Service · Transport maritime"
        title="Transport maritime depuis la France vers le monde entier"
        intro="GACTI organise vos expéditions maritimes depuis les ports français vers l’Afrique, le Moyen-Orient et l’international. Nous assurons la coordination complète du fret, de la réservation jusqu’à l’embarquement."
        image={maritimeImg}
      />

      {/* SERVICES */}
      <section className="py-24 md:py-32 container-x">
        <SectionHeader
          eyebrow="Prestations maritimes"
          title="Une maîtrise complète du fret international."
        />

        <div className="mt-16 grid md:grid-cols-2 gap-px bg-border">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="bg-cream p-8 md:p-10 h-full hover:bg-card transition-colors">
                <s.icon className="size-9 text-gold" />
                <h3 className="mt-6 font-serif text-2xl text-navy">
                  {s.title}
                </h3>
                <p className="mt-3 text-navy/70 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-navy text-cream py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <div className="text-xs tracking-[0.25em] uppercase text-gold flex items-center gap-3">
              <span className="w-8 h-px bg-gold" /> Notre processus
            </div>

            <h2 className="mt-5 font-serif text-4xl md:text-5xl text-cream max-w-3xl">
              Quatre étapes pour <span className="italic">un embarquement maîtrisé</span>.
            </h2>
          </Reveal>

          <div className="mt-16 grid md:grid-cols-4 gap-8">
            {steps.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.1}>
                <div className="border-t border-gold/40 pt-6">
                  <div className="font-serif text-5xl text-gold">
                    0{i + 1}
                  </div>
                  <h3 className="mt-3 font-serif text-2xl text-cream">
                    {t}
                  </h3>
                  <p className="mt-2 text-cream/65 text-sm">
                    {d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="relative">
        <img
          src={portAerial}
          alt="Port international"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-cream/92" />

        <div className="container-x relative py-24 md:py-32">
          <SectionHeader
            eyebrow="Destinations"
            title="Réseau maritime international depuis la France"
            intro="Nous desservons les principaux ports commerciaux en Afrique, au Moyen-Orient et en Méditerranée. Autres destinations sur demande."
          />

          <Reveal delay={0.15}>
            <ul className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-border border border-border">
              {destinations.map((d) => (
                <li
                  key={d}
                  className="bg-cream p-6 text-center font-serif text-lg text-navy hover:bg-gold hover:text-navy transition-colors"
                >
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Organiser une expédition maritime"
        subtitle="Cotation fret sous 24 h — conteneur, RoRo ou groupage."
      />
    </>
  );
}
