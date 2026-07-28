import { createFileRoute } from "@tanstack/react-router";
import { Mail, FileText } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { CTASection } from "@/components/CTASection";
import { SITE } from "@/lib/site";
import productsImg from "@/assets/products.avif";

export const Route = createFileRoute("/catalogues")({
  head: () => ({
    meta: [
      { title: "Distribution agroalimentaire — GACTI" },
      {
        name: "description",
        content:
          "Sourcing et distribution agroalimentaire sur demande. Produits, volumes et export international avec GACTI.",
      },
      { property: "og:title", content: "Distribution agroalimentaire — GACTI" },
      {
        property: "og:description",
        content:
          "Sourcing produits agroalimentaires et distribution internationale sur demande.",
      },
      { property: "og:image", content: productsImg },
      { name: "twitter:image", content: productsImg },
    ],
  }),
  component: CataloguesPage,
});

const services = [
  {
    title: "Produits agroalimentaires",
    desc: "Sourcing de produits alimentaires auprès de fournisseurs partenaires selon vos besoins d’export et vos marchés cibles.",
  },
  {
    title: "Conditionnement & volumes",
    desc: "Adaptation des formats, palettes et volumes selon les contraintes logistiques, douanières et destinations internationales.",
  },
  {
    title: "Distribution internationale",
    desc: "Gestion de la distribution vers l’Afrique, le Moyen-Orient et l’Europe avec suivi logistique complet et sécurisé.",
  },
];

function CataloguesPage() {
  return (
    <>
      {/* HERO */}
      <PageHero
        eyebrow="Service · Distribution agroalimentaire"
        title="Distribution agroalimentaire sur demande, sans catalogue figé."
        intro="Nous sourçons et distribuons des produits agroalimentaires auprès de partenaires sélectionnés selon vos besoins, volumes et destinations d’export."
        image={productsImg}
      />

      {/* SERVICES */}
      <section className="py-24 md:py-32 container-x">
        <SectionHeader
          eyebrow="Nos solutions"
          title="Un sourcing flexible, adapté à vos besoins."
          intro="Chaque demande est traitée individuellement. Nous analysons vos besoins et activons notre réseau pour vous proposer une solution adaptée."
        />

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {services.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <article className="h-full bg-card border border-border p-8 md:p-10 flex flex-col hover:border-gold transition-colors">

                <FileText className="size-10 text-gold" />

                <h3 className="mt-6 font-serif text-3xl text-navy">
                  {c.title}
                </h3>

                <p className="mt-4 text-navy/70 leading-relaxed flex-1">
                  {c.desc}
                </p>

                <div className="mt-8 text-sm text-navy/60">
                  Service sur demande
                </div>

              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA CONTACT BLOCK */}
      <section className="bg-navy text-cream py-24">
        <div className="container-x grid md:grid-cols-2 gap-12 items-center">

          <Reveal>
            <div className="text-xs tracking-[0.25em] uppercase text-gold flex items-center gap-3">
              <span className="w-8 h-px bg-gold" /> Commande sur mesure
            </div>

            <h2 className="mt-5 font-serif text-4xl md:text-5xl text-cream leading-[1.05]">
              Vous recherchez un produit <span className="italic">spécifique</span> ?
            </h2>

            <p className="mt-6 text-cream/70 text-lg leading-relaxed">
              Nous traitons des demandes sur mesure selon vos volumes, destinations et contraintes logistiques.
              Contactez-nous pour une étude personnalisée.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-cream/5 border border-cream/15 p-8">

              <Mail className="size-7 text-gold" />

              <div className="mt-4 text-cream/60 text-xs tracking-widest uppercase">
                Contact email
              </div>

              <a
                href={`mailto:${SITE.email}`}
                className="mt-2 block font-serif text-3xl text-cream hover:text-gold"
              >
                {SITE.email}
              </a>

              <div className="mt-6 text-cream/60 text-xs tracking-widest uppercase">
                Téléphone
              </div>

              <a
                href={`tel:${SITE.phoneRaw}`}
                className="mt-2 block font-serif text-3xl text-cream hover:text-gold"
              >
                {SITE.phone}
              </a>

            </div>
          </Reveal>

        </div>
      </section>

      {/* FINAL CTA */}
      <CTASection
        title="Lancer une demande de sourcing"
        subtitle="Réponse sous 24h avec étude de disponibilité et conditions d’export."
      />
    </>
  );
}
