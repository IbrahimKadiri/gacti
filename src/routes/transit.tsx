import { createFileRoute, Link } from "@tanstack/react-router";
import { FileCheck, IdCard, ShieldCheck, ParkingSquare, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { CTASection } from "@/components/CTASection";
import transitImg from "@/assets/transit-vehicles.jpg";

export const Route = createFileRoute("/transit")({
  head: () => ({
    meta: [
      { title: "Transit véhicules — GACTI" },
      {
        name: "description",
        content:
          "Services douaniers EX-A et MRN, carte provisoire d'immatriculation, assurance temporaire et stationnement. Tout le transit véhicule par GACTI.",
      },
      { property: "og:title", content: "Transit véhicules — GACTI" },
      {
        property: "og:description",
        content: "Formalités douanières, immatriculation, assurance et préparation à l'expédition.",
      },
      { property: "og:image", content: transitImg },
      { name: "twitter:image", content: transitImg },
    ],
  }),
  component: TransitPage,
});

const services = [
  {
    icon: FileCheck,
    title: "Services douaniers (EX-A, MRN)",
    desc: "Déclaration d’exportation EX-A, obtention du MRN et gestion complète des formalités douanières en France et à l’international.",
  },
  {
    icon: IdCard,
    title: "Carte provisoire d'immatriculation",
    desc: "Demande et délivrance de la plaque WW transit (W garage) pour permettre la circulation légale du véhicule jusqu'au port d'embarquement.",
  },
  {
    icon: ShieldCheck,
    title: "Assurance temporaire (1-30 jours)",
    desc: "Souscription d'une assurance auto temporaire d'une durée modulable de 1 à 30 jours, adaptée à votre période de transit.",
  },
  {
    icon: ParkingSquare,
    title: "Stationnement & remise des véhicules",
    desc: "Parc sécurisé proche des terminaux, gardiennage, lavage, contrôle technique et remise officielle au transporteur maritime.",
  },
];

const steps = [
  { n: "01", title: "Réception du dossier", desc: "Vous nous transmettez les informations du véhicule et la destination." },
  { n: "02", title: "Formalités administratives", desc: "Nous réalisons les déclarations douanières, l’immatriculation provisoire et l’assurance." },
  { n: "03", title: "Préparation du véhicule", desc: "Contrôle, sécurisation et stationnement sur notre parc à proximité des ports." },
  { n: "04", title: "Remise au transporteur", desc: "Remise au transporteur, suivi du chargement, transmission des documents." },
];

function TransitPage() {
  return (
    <>
      <PageHero
        eyebrow="Service · Transit véhicules"
        title="Transit de véhicules à Marseille, maîtrisé de bout en bout."
        intro="Du dossier douanier à la remise au transporteur maritime, nous gérons l’ensemble des formalités d’export depuis notre zone logistique proche des ports de Marseille."
        image={transitImg}
      />

      <section className="py-24 md:py-32 container-x">
        <SectionHeader
          eyebrow="Prestations"
          title="Tout ce dont votre véhicule a besoin avant le départ."
          intro="Nous prenons en main les démarches administratives, juridiques et logistiques pour que vous n'ayez plus qu'à valider."
        />
        <div className="mt-16 grid md:grid-cols-2 gap-px bg-border">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="bg-cream p-8 md:p-10 h-full hover:bg-card transition-colors group">
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
            <h2 className="mt-5 font-serif text-4xl md:text-5xl text-cream text-balance max-w-3xl">
              Un <span className="italic">processus</span> structuré et maîtrisé.
            </h2>
          </Reveal>
          <div className="mt-16 grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="border-t border-gold/40 pt-6">
                  <div className="font-serif text-5xl text-gold">{s.n}</div>
                  <h3 className="mt-4 font-serif text-2xl text-cream">{s.title}</h3>
                  <p className="mt-2 text-cream/65 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4}>
            <Link
              to="/devis"
              className="mt-16 inline-flex items-center gap-3 bg-gold text-navy px-7 py-4 hover:bg-cream transition-colors"
            >
              Obtenir mon devis transit <ArrowRight className="size-5" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
