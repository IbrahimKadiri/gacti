import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Phone, Send, Quote } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { CTASection } from "@/components/CTASection";
import vehiclesImg from "@/assets/vehicles-find.jpg";

export const Route = createFileRoute("/vehicules")({
  head: () => ({
    meta: [
      { title: "Trouver votre véhicule — GACTI" },
      {
        name: "description",
        content:
          "GACTI sourcing véhicules sur mesure. Décrivez votre projet, notre réseau international de fournisseurs trouve la voiture qu'il vous faut.",
      },
      { property: "og:title", content: "Trouver votre véhicule — GACTI" },
      { property: "og:description", content: "Sourcing véhicules sur mesure auprès de notre réseau international." },
      { property: "og:image", content: vehiclesImg },
      { name: "twitter:image", content: vehiclesImg },
    ],
  }),
  component: VehiculesPage,
});

function VehiculesPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Service · Sourcing véhicules"
        title="La voiture que vous cherchez, où qu'elle soit."
        intro="GACTI ne tient pas un catalogue figé : nous mobilisons un réseau international de fournisseurs pour trouver le véhicule exact qui correspond à votre besoin."
        image={vehiclesImg}
      />

      <section className="py-24 md:py-32 container-x">
        <div className="grid md:grid-cols-12 gap-16 items-start">
          <Reveal className="md:col-span-5">
            <div className="text-xs tracking-[0.25em] uppercase text-gold flex items-center gap-3">
              <span className="w-8 h-px bg-gold" /> Comment ça marche
            </div>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl text-navy leading-[1.05]">
              Un sourcing <span className="italic">à la commande</span>.
            </h2>
            <p className="mt-6 text-navy/70 text-lg leading-relaxed">
              Plutôt que de vous proposer un stock limité, nous interrogeons nos partenaires
              en France et à l'étranger jusqu'à trouver la perle rare — au juste prix.
            </p>
            <ol className="mt-10 space-y-6">
              {[
                ["Décrivez votre recherche", "Marque, modèle, année, budget, destination."],
                ["On contacte nos fournisseurs", "Notre réseau identifie les véhicules disponibles."],
                ["On vous propose le véhicule", "Photos, fiche détaillée, prix tout compris."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-5">
                  <span className="font-serif text-3xl text-gold leading-none">0{i + 1}</span>
                  <div>
                    <div className="font-medium text-navy">{t}</div>
                    <div className="text-sm text-navy/65 mt-1">{d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="md:col-span-7" delay={0.1}>
            <div className="bg-card border border-border p-8 md:p-10">
              <div className="flex items-center gap-3 text-navy">
                <Search className="size-6 text-gold" />
                <h3 className="font-serif text-2xl">Décrivez votre recherche</h3>
              </div>
              {submitted ? (
                <div className="mt-8 p-8 border border-gold bg-gold/10 text-navy text-center">
                  <p className="font-serif text-2xl">Demande envoyée.</p>
                  <p className="mt-2 text-navy/70">Nous revenons vers vous sous 24 h avec des propositions.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5"
                >
                  {[
                    ["brand", "Marque souhaitée", "Mercedes, BMW, Toyota…"],
                    ["model", "Modèle & options", "Classe E, X5, Land Cruiser…"],
                    ["year", "Année", "2020 - 2024"],
                    ["budget", "Budget approximatif", "20 000 € - 40 000 €"],
                  ].map(([name, label, ph]) => (
                    <label key={name} className="block">
                      <span className="text-xs tracking-wider uppercase text-navy/60">{label}</span>
                      <input
                        required
                        name={name}
                        placeholder={ph}
                        className="mt-2 w-full bg-cream border border-border focus:border-gold focus:outline-none px-4 py-3 text-navy"
                      />
                    </label>
                  ))}
                  <label className="block sm:col-span-2">
                    <span className="text-xs tracking-wider uppercase text-navy/60">Pays de destination</span>
                    <input
                      required
                      name="country"
                      placeholder="Maroc, Sénégal, Côte d'Ivoire…"
                      className="mt-2 w-full bg-cream border border-border focus:border-gold focus:outline-none px-4 py-3 text-navy"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-xs tracking-wider uppercase text-navy/60">Message complémentaire</span>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Préférences couleur, équipement, délais…"
                      className="mt-2 w-full bg-cream border border-border focus:border-gold focus:outline-none px-4 py-3 text-navy resize-none"
                    />
                  </label>
                  <button
                    type="submit"
                    className="sm:col-span-2 mt-2 inline-flex items-center justify-center gap-3 bg-navy text-cream px-6 py-4 hover:bg-gold hover:text-navy transition-colors"
                  >
                    Envoyer ma recherche <Send className="size-4" />
                  </button>
                  <a
                    href="tel:+33608465741"
                    className="sm:col-span-2 inline-flex items-center justify-center gap-2 text-sm text-navy/70 hover:text-gold"
                  >
                    <Phone className="size-4" /> Ou appelez-nous au +33 6 08 46 57 41
                  </a>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy text-cream py-24">
        <div className="container-x max-w-3xl">
          <Reveal>
            <Quote className="size-10 text-gold" />
            <blockquote className="mt-6 font-serif text-3xl md:text-4xl text-cream leading-snug text-balance italic">
              « Service impeccable pour le transit de mon véhicule. Suivi constant et équipe très professionnelle. »
            </blockquote>
            <div className="mt-8 text-cream/70">— Nitcha Hakim, Tunisie</div>
          </Reveal>
        </div>
      </section>

      <CTASection title="Prêt à trouver votre prochaine voiture ?" subtitle="Demandez un devis express ou contactez-nous directement." />
    </>
  );
}
