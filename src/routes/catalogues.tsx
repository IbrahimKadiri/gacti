import { createFileRoute } from "@tanstack/react-router";
import { Download, Mail, FileText } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { CTASection } from "@/components/CTASection";
import { SITE } from "@/lib/site";
import productsImg from "@/assets/products.jpg";

export const Route = createFileRoute("/catalogues")({
  head: () => ({
    meta: [
      { title: "Catalogues produits — GACTI" },
      {
        name: "description",
        content:
          "Distribution agroalimentaire de qualité. Téléchargez nos catalogues GIAS, Bonna et produits divers.",
      },
      { property: "og:title", content: "Catalogues produits — GACTI" },
      { property: "og:description", content: "Catalogues GIAS, Bonna et produits divers à télécharger." },
      { property: "og:image", content: productsImg },
      { name: "twitter:image", content: productsImg },
    ],
  }),
  component: CataloguesPage,
});

const catalogues = [
  {
    name: "GIAS",
    desc: "Catalogue multilingue regroupant nos références agroalimentaires premium destinées à l'export international.",
    pages: "Catalogue multilingue",
    file: "#",
  },
  {
    name: "Bonna",
    desc: "Sélection détaillée des conserves et produits Bonna, partenaire historique de notre réseau de distribution.",
    pages: "Édition décembre 2018",
    file: "#",
  },
  {
    name: "Produits divers",
    desc: "Compilation de produits complémentaires disponibles à la commande : épicerie, boissons, accessoires.",
    pages: "Catalogue à jour",
    file: "#",
  },
];

function CataloguesPage() {
  return (
    <>
      <PageHero
        eyebrow="Service · Distribution agroalimentaire"
        title="Une sélection rigoureuse, une distribution fiable."
        intro="GACTI distribue à l'international des produits agroalimentaires de qualité, sourcés auprès de fabricants partenaires de confiance. Trois catalogues à votre disposition."
        image={productsImg}
      />

      <section className="py-24 md:py-32 container-x">
        <SectionHeader
          eyebrow="Nos catalogues"
          title="Téléchargez. Choisissez. Commandez."
          intro="Chaque catalogue présente nos références, conditionnements et conditions de commande à l'export. Pour toute demande spécifique, contactez-nous directement."
        />

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {catalogues.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <article className="h-full bg-card border border-border p-8 md:p-10 flex flex-col group hover:border-gold transition-colors">
                <FileText className="size-10 text-gold" />
                <h3 className="mt-6 font-serif text-3xl text-navy">{c.name}</h3>
                <div className="mt-1 text-xs tracking-widest uppercase text-navy/50">{c.pages}</div>
                <p className="mt-4 text-navy/70 leading-relaxed flex-1">{c.desc}</p>
                <a
                  href={c.file}
                  className="mt-8 inline-flex items-center justify-center gap-3 bg-navy text-cream px-5 py-3 hover:bg-gold hover:text-navy transition-colors"
                >
                  <Download className="size-4" /> Télécharger le PDF
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-navy text-cream py-24">
        <div className="container-x grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="text-xs tracking-[0.25em] uppercase text-gold flex items-center gap-3">
              <span className="w-8 h-px bg-gold" /> Commande sur mesure
            </div>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl text-cream leading-[1.05]">
              Vous cherchez un produit <span className="italic">spécifique</span> ?
            </h2>
            <p className="mt-6 text-cream/70 text-lg leading-relaxed">
              Au-delà de nos catalogues, nous traitons régulièrement des demandes sur mesure :
              volumes importants, références particulières, conditionnement personnalisé.
              Parlons-en.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-cream/5 border border-cream/15 p-8">
              <Mail className="size-7 text-gold" />
              <div className="mt-4 text-cream/60 text-xs tracking-widest uppercase">Écrivez-nous</div>
              <a href={`mailto:${SITE.email}`} className="mt-2 block font-serif text-3xl text-cream hover:text-gold">
                {SITE.email}
              </a>
              <div className="mt-6 text-cream/60 text-xs tracking-widest uppercase">Ou par téléphone</div>
              <a href={`tel:${SITE.phoneRaw}`} className="mt-2 block font-serif text-3xl text-cream hover:text-gold">
                {SITE.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection title="Une commande à passer ?" subtitle="Devis express et conditions personnalisées sous 24 h." />
    </>
  );
}
