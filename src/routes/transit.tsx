import { createFileRoute, Link } from "@tanstack/react-router";
import { FileCheck, IdCard, ShieldCheck, ParkingSquare, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { CTASection } from "@/components/CTASection";
import transitImg from "@/assets/transit-vehicles.jpg";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

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
    title: "EX-A",
    price: "60 €",
    desc:
      "Déclaration douanière obligatoire attestant la sortie légale du véhicule de l’Union Européenne.",
    highlights: [
      "Conformité douanière",
      "Attestation de sortie UE",
      "Possibilité de récupération TVA",
    ],
  },

  {
    icon: FileCheck,
    title: "MRN",
    price: "80 €",
    desc:
      "Validation et gestion du numéro MRN permettant le suivi de votre dossier dans le système douanier européen.",
    highlights: [
      "Numéro officiel unique",
      "Suivi douanier",
      "Validation administrative",
    ],
  },

  {
    icon: IdCard,
    title: "Carte provisoire d'immatriculation",
    price: "60 €",
    desc:
      "Permet au véhicule de circuler légalement avant son exportation vers sa destination finale.",
    highlights: [
      "Circulation légale",
      "Traitement rapide",
      "Gestion administrative complète",
    ],
  },

  {
    icon: IdCard,
    title: "Plaques d'immatriculation",
    price: "20 €",
    desc:
      "Plaques conformes destinées aux véhicules exportés avant leur embarquement.",
    highlights: [
      "Conformes export",
      "Disponibilité rapide",
      "Prêtes à l'emploi",
    ],
  },

  {
    icon: ShieldCheck,
    title: "Assurance temporaire",
    price: "À partir de 45 €",
    desc:
      "Couverture temporaire adaptée aux véhicules destinés à l’export pour circuler en toute conformité.",
    highlights: [
      "1 à 30 jours",
      "Conforme à la législation",
      "Activation rapide",
    ],
    extra: [
      { label: "1 jour", price: "45 €" },
      { label: "3 jours", price: "70 €" },
      { label: "8 jours", price: "110 €" },
      { label: "10 jours", price: "140 €" },
      { label: "15 jours", price: "160 €" },
      { label: "30 jours", price: "260 €" },
    ],
  },

  {
    icon: ParkingSquare,
    title: "Stationnement & remise",
    price: "À partir de 30 €",
    desc:
      "Stockage sécurisé proche du port de Marseille avec remise organisée au transporteur maritime.",
    highlights: [
      "Parc sécurisé",
      "Proximité immédiate du port",
      "Gestion logistique complète",
    ],
    extra: [
      { label: "Jour arrivée camion", price: "30 €" },
      { label: "1 à 2 nuits", price: "50 €" },
      { label: "Au-delà de 2 nuits", price: "50 € + 10 €/nuit" },
      {
        label: "Longue durée (mois)",
        price: "110 €/mois + 50 € sortie",
      },
    ],
  },
];

const steps = [
  { n: "01", title: "Réception du dossier", desc: "Vous nous transmettez les informations du véhicule et la destination." },
  { n: "02", title: "Formalités administratives", desc: "Nous réalisons les déclarations douanières, l’immatriculation provisoire et l’assurance." },
  { n: "03", title: "Préparation du véhicule", desc: "Contrôle, sécurisation et stationnement sur notre parc à proximité des ports." },
  { n: "04", title: "Remise au transporteur", desc: "Remise au transporteur, suivi du chargement, transmission des documents." },
];

const faq = [
  {
    question: "Pourquoi ai-je besoin d’un document EX-A pour exporter mon véhicule ?",
    answer:
      "Le document EX-A est une déclaration douanière indispensable pour exporter un véhicule hors de l’Union Européenne. Il permet d’attester officiellement la sortie du véhicule du territoire européen, constitue une étape essentielle pour garantir la conformité de votre exportation et permet également une récupération de TVA.\n\nChez GACTI, nous prenons en charge l’ensemble des formalités liées à l’établissement de cette déclaration. Une fois le véhicule exporté, nous fournissons les documents définitifs attestant de sa sortie. Grâce à notre expérience dans le transit international de véhicules, nous assurons un traitement rapide, conforme et sécurisé afin que vous puissiez exporter votre véhicule en toute sérénité."
  },

  {
    question: "À quoi sert un numéro MRN dans le cadre d’une exportation ?",
    answer:
      "Le MRN (Movement Reference Number) est un numéro unique délivré par les autorités douanières européennes lors d’une déclaration d’exportation ou d’importation. Il sert de référence officielle pour identifier et suivre votre dossier dans les systèmes douaniers.\n\nLorsque vous achetez un véhicule à l’étranger ou auprès d’un professionnel, ce numéro peut vous être transmis dans le cadre de la procédure d’export. GACTI vérifie la validité des informations associées au MRN et s’assure que votre dossier respecte les exigences douanières avant l’embarquement du véhicule."
  },

  {
    question: "Pourquoi passer par GACTI pour obtenir une carte provisoire d’immatriculation (CPI) ?",
    answer:
      "La carte provisoire d’immatriculation permet à un véhicule de circuler légalement avant son exportation. Son obtention nécessite plusieurs démarches administratives qui peuvent rapidement devenir complexes lorsqu’on ne connaît pas les procédures.\n\nEn confiant cette démarche à GACTI, vous bénéficiez d’un accompagnement complet : vérification des documents, constitution du dossier, suivi administratif et transmission du document une fois validé. Notre expertise nous permet d’accélérer les démarches tout en garantissant leur conformité. Que vous exportiez un seul véhicule ou une flotte complète, nous adaptons notre accompagnement à vos besoins."
  },

  {
    question: "Quelle assurance choisir pour un véhicule destiné à l’export ?",
    answer:
      "Une assurance temporaire permet de couvrir le véhicule pendant sa période de transit avant embarquement. Les durées proposées vont de 1 à 30 jours selon vos besoins.",
  },

  {
    question: "Où sont stationnés les véhicules avant leur départ ?",
    answer:
      "Les véhicules sont stockés dans un espace sécurisé à proximité immédiate du port de Marseille afin de faciliter leur préparation, leur contrôle et leur remise au transporteur maritime.",
  },

  {
    question: "Quels documents dois-je fournir ?",
    answer:
      "Selon votre situation, nous pouvons demander une pièce d'identité, les documents de propriété du véhicule, la facture d'achat, le certificat de cession ou encore les informations techniques nécessaires à l'exportation.",
  },

  {
    question: "Combien de temps prennent les formalités ?",
    answer:
      "Les délais varient selon le pays de destination et les documents à obtenir. Notre équipe vous accompagne afin de traiter votre dossier dans les meilleurs délais possibles.",
  },
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
    title="Prestations & tarifs"
    intro="Retrouvez l'ensemble des formalités administratives et services logistiques nécessaires à l’exportation de votre véhicule depuis Marseille."
  />

  <div className="mt-16 space-y-6">
    {services.map((s, i) => (
      <Reveal key={s.title} delay={i * 0.06}>
        <div className="bg-card border border-border p-6 md:p-10 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-[2px]">

          {/* HEADER */}
          <div className="flex items-start justify-between gap-4 sm:gap-6">
            <s.icon className="size-7 md:size-8 text-gold shrink-0" />

            <div className="text-right">
              <div className="text-xs uppercase tracking-[0.25em] text-navy/50">
                Tarif
              </div>

              <div className="font-serif text-2xl md:text-3xl text-gold tracking-wide">
                {s.price}
              </div>
            </div>
          </div>

          {/* TITLE */}
          <h3 className="mt-5 font-serif text-xl md:text-2xl text-navy leading-tight">
            {s.title}
          </h3>

          {/* DESC */}
          <p className="mt-3 text-sm md:text-base text-navy/70 leading-relaxed">
            {s.desc}
          </p>

          {/* HIGHLIGHTS */}
          <div className="mt-6 border-t border-border pt-6">
            <ul className="space-y-3">
              {s.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm md:text-base text-navy/75"
                >
                  <span className="mt-1.5 size-2 rounded-full bg-gold shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* DETAIL TARIFS */}
            {s.extra && (
              <div className="mt-6 overflow-hidden rounded-xl border border-gold/20 bg-gradient-to-br from-cream to-white">

                <div className="border-b border-gold/15 px-5 py-4">
                  <div className="text-xs uppercase tracking-[0.25em] text-navy/50">
                    Détail des tarifs
                  </div>

                  <div className="mt-1 text-sm text-navy/60">
                    Tarification selon la formule choisie
                  </div>
                </div>

                <div className="p-4 md:p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {s.extra.map((item) => (
                      <div
                        key={item.label}
                        className="
                          rounded-xl
                          border
                          border-border
                          bg-white
                          p-4
                          transition-all
                          duration-300
                          hover:border-gold/40
                          hover:shadow-sm
                        "
                      >
                        <div className="text-xs uppercase tracking-wide text-navy/50">
                          {item.label}
                        </div>

                        <div className="mt-2 font-serif text-2xl text-gold">
                          {item.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
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

      <section className="py-24 md:py-32 bg-cream">
        <div className="container-x max-w-5xl">

          <SectionHeader
            eyebrow="Questions fréquentes"
            title="Tout savoir avant l'exportation de votre véhicule"
            intro="Retrouvez les réponses aux questions les plus fréquentes concernant les formalités douanières, l'immatriculation provisoire et la préparation de votre véhicule avant son départ."
          />

          <Accordion.Root
            type="single"
            collapsible
            className="mt-16 rounded-2xl border border-border bg-card overflow-hidden"
          >
            {faq.map((item, index) => (
              <Accordion.Item
                key={index}
                value={`item-${index}`}
                className="border-b border-border last:border-b-0"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between px-6 md:px-8 py-6 text-left hover:bg-muted/40 transition-colors">
                    <span className="font-serif text-xl md:text-2xl text-navy">
                      {item.question}
                    </span>

                    <ChevronDown className="size-5 shrink-0 text-gold transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="px-6 md:px-8 pb-6 text-navy/70 leading-relaxed text-base md:text-lg whitespace-pre-line">
                    {item.answer}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>

        </div>
      </section>

      <CTASection />
    </>
  );
}
