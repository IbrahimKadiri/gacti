import { createFileRoute } from "@tanstack/react-router";
import { Container, Globe2, Ship, Anchor } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { CTASection } from "@/components/CTASection";
import maritimeImg from "@/assets/maritime.jpg";
import portAerial from "@/assets/port-aerial.jpg";

export const Route = createFileRoute("/transport")({
  head: () => ({
    meta: [
      { title: "Transport maritime — GACTI" },
      {
        name: "description",
        content:
          "Solutions de transport maritime sur mesure : conteneurs, RoRo, destinations Afrique, Moyen-Orient et monde entier.",
      },
      { property: "og:title", content: "Transport maritime — GACTI" },
      {
        property: "og:description",
        content: "Conteneurs, solutions sur mesure, expédition vers Afrique, Moyen-Orient et monde entier.",
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
    desc: "Étude de l'itinéraire optimal, choix de la compagnie maritime, négociation des tarifs et planification du chargement.",
  },
  {
    icon: Container,
    title: "Conteneurs",
    desc: "Conteneurs 20', 40', 40' HC en groupage ou en exclusif. Chargement véhicules, marchandises générales ou produits agroalimentaires.",
  },
  {
    icon: Globe2,
    title: "Destinations mondiales",
    desc: "Maghreb, Afrique de l'Ouest, Afrique centrale, Moyen-Orient et au-delà. Notre réseau couvre les principaux ports d'arrivée.",
  },
  {
    icon: Anchor,
    title: "Documentation & douane",
    desc: "Bill of Lading, certificat d'origine, formalités d'embarquement et coordination avec votre transitaire de destination.",
  },
];

const steps = [
  ["Cotation", "Prix ferme et délai sous 24 h."],
  ["Réservation", "Booking auprès de la compagnie maritime."],
  ["Empotage", "Chargement et scellement du conteneur au port."],
  ["Embarquement", "Suivi temps réel jusqu'au port de destination."],
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
      <PageHero
        eyebrow="Service · Transport maritime"
        title="Du quai au port d'arrivée, sans rupture."
        intro="Spécialiste du fret maritime international depuis 15 ans, GACTI organise vos expéditions au départ des grands ports français vers le monde entier."
        image={maritimeImg}
      />

      <section className="py-24 md:py-32 container-x">
        <SectionHeader
          eyebrow="Prestations maritimes"
          title="Une expertise complète, port à port."
        />
        <div className="mt-16 grid md:grid-cols-2 gap-px bg-border">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="bg-cream p-8 md:p-10 h-full hover:bg-card transition-colors">
                <s.icon className="size-9 text-gold" />
                <h3 className="mt-6 font-serif text-2xl text-navy">{s.title}</h3>
                <p className="mt-3 text-navy/70 leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-navy text-cream py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <div className="text-xs tracking-[0.25em] uppercase text-gold flex items-center gap-3">
              <span className="w-8 h-px bg-gold" /> Notre processus
            </div>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl text-cream max-w-3xl text-balance">
              Quatre étapes pour <span className="italic">embarquer sereinement</span>.
            </h2>
          </Reveal>
          <div className="mt-16 grid md:grid-cols-4 gap-8">
            {steps.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.1}>
                <div className="border-t border-gold/40 pt-6">
                  <div className="font-serif text-5xl text-gold">0{i + 1}</div>
                  <h3 className="mt-3 font-serif text-2xl text-cream">{t}</h3>
                  <p className="mt-2 text-cream/65 text-sm">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative">
        <img
          src={portAerial}
          alt="Port d'export"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-cream/92" />
        <div className="container-x relative py-24 md:py-32">
          <SectionHeader
            eyebrow="Destinations"
            title="Là où vos marchandises doivent arriver."
            intro="Une sélection des principales destinations couvertes au départ de la France. Pour toute autre destination, consultez-nous."
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

      <CTASection title="Une expédition à organiser ?" subtitle="Cotation maritime sous 24 h, ports français vers monde entier." />
    </>
  );
}
