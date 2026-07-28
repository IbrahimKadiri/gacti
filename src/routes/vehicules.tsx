import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Phone, Send, Quote } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import vehiclesImg from "@/assets/vehicles-find.avif";
import { sendMail } from "@/lib/mail";

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
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    brand: "",
    model: "",
    year: "",
    budget: "",
    country: "",
    message: "",
  });

   const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      await sendMail({

        type: "sourcing",
        name: form.name,
        email: form.email,
        phone: form.phone,

        details: {
          "Marque recherchée": form.brand,
          "Modèle": form.model,
          "Année": form.year,
          "Budget": form.budget,
          "Pays destination": form.country,
          "Message": form.message,
        }

      });
      setSubmitted(true);

    } catch(error){

      console.error(error);
      alert(
        "Une erreur est survenue, veuillez réessayer."
      );

    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <PageHero
        eyebrow="Service · Sourcing véhicules"
        title="Sourcing de véhicules sur mesure, en France et à l’international."
        intro="Grâce à notre réseau de partenaires européens et internationaux, nous identifions et sélectionnons le véhicule exact correspondant à vos critères, au meilleur prix du marché."
        image={vehiclesImg}
      />

      <section className="py-24 md:py-32 container-x">
        <div className="grid md:grid-cols-12 gap-16 items-start">
          <Reveal className="md:col-span-5">
            <div className="text-xs tracking-[0.25em] uppercase text-gold flex items-center gap-3">
              <span className="w-8 h-px bg-gold" /> Comment ça marche
            </div>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl text-navy leading-[1.05]">
              Un sourcing <span className="italic">à la demande</span>.
            </h2>
            <p className="mt-6 text-navy/70 text-lg leading-relaxed">
              Contrairement à un catalogue classique, nous travaillons uniquement à la demande. Chaque recherche est traitée individuellement auprès de notre réseau de fournisseurs vérifiés.
            </p>
            <ol className="mt-10 space-y-6">
              {[
                ["Décrivez votre recherche", "Marque, modèle, budget, options et destination sont étudiés avec précision."],
                ["On contacte nos fournisseurs", "Nous sollicitons notre réseau de partenaires en Europe et à l’international."],
                ["On vous propose le véhicule", "Vous recevez une sélection de véhicules disponibles avec photos, historique et prix final."],
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
                <h3 className="font-serif text-2xl">Décrivez votre véhicule idéal</h3>
              </div>
              {submitted ? (
                <div className="mt-8 p-8 border border-gold bg-gold/10 text-navy text-center">
                  <p className="font-serif text-2xl">Demande envoyée.</p>
                  <p className="mt-2 text-navy/70">Nous revenons vers vous sous 24h ouvrés avec des propositions.</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5"
                  >

                  <label className="block sm:col-span-2">
                  <span className="text-xs tracking-wider uppercase text-navy/60">
                  Nom
                  </span>

                  <input
                  required
                  value={form.name}
                  onChange={(e)=>setForm({
                  ...form,
                  name:e.target.value
                  })}
                  placeholder="Votre nom"
                  className="mt-2 w-full bg-cream border border-border focus:border-gold focus:outline-none px-4 py-3 text-navy"
                  />

                  </label>



                  <label className="block">
                  <span className="text-xs tracking-wider uppercase text-navy/60">
                  Email
                  </span>

                  <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e)=>setForm({
                  ...form,
                  email:e.target.value
                  })}
                  placeholder="email@exemple.com"
                  className="mt-2 w-full bg-cream border border-border focus:border-gold focus:outline-none px-4 py-3 text-navy"
                  />

                  </label>



                  <label className="block">
                  <span className="text-xs tracking-wider uppercase text-navy/60">
                  Téléphone
                  </span>

                  <input
                  value={form.phone}
                  onChange={(e)=>setForm({
                  ...form,
                  phone:e.target.value
                  })}
                  placeholder="+33..."
                  className="mt-2 w-full bg-cream border border-border focus:border-gold focus:outline-none px-4 py-3 text-navy"
                  />

                  </label>




                  <label className="block">

                  <span className="text-xs tracking-wider uppercase text-navy/60">
                  Marque souhaitée
                  </span>

                  <input
                  required
                  value={form.brand}
                  onChange={(e)=>setForm({
                  ...form,
                  brand:e.target.value
                  })}
                  placeholder="Mercedes, BMW, Toyota..."
                  className="mt-2 w-full bg-cream border border-border focus:border-gold focus:outline-none px-4 py-3 text-navy"
                  />

                  </label>




                  <label className="block">

                  <span className="text-xs tracking-wider uppercase text-navy/60">
                  Modèle & options
                  </span>

                  <input
                  required
                  value={form.model}
                  onChange={(e)=>setForm({
                  ...form,
                  model:e.target.value
                  })}
                  placeholder="Classe E, X5, Land Cruiser..."
                  className="mt-2 w-full bg-cream border border-border focus:border-gold focus:outline-none px-4 py-3 text-navy"
                  />

                  </label>





                  <label className="block">

                  <span className="text-xs tracking-wider uppercase text-navy/60">
                  Année
                  </span>

                  <input
                  required
                  value={form.year}
                  onChange={(e)=>setForm({
                  ...form,
                  year:e.target.value
                  })}
                  placeholder="2020 - 2024"
                  className="mt-2 w-full bg-cream border border-border focus:border-gold focus:outline-none px-4 py-3 text-navy"
                  />

                  </label>




                  <label className="block">

                  <span className="text-xs tracking-wider uppercase text-navy/60">
                  Budget approximatif
                  </span>

                  <input
                  required
                  value={form.budget}
                  onChange={(e)=>setForm({
                  ...form,
                  budget:e.target.value
                  })}
                  placeholder="30 000 €"
                  className="mt-2 w-full bg-cream border border-border focus:border-gold focus:outline-none px-4 py-3 text-navy"
                  />

                  </label>





                  <label className="block sm:col-span-2">

                  <span className="text-xs tracking-wider uppercase text-navy/60">
                  Pays de destination
                  </span>


                  <input
                  required
                  value={form.country}
                  onChange={(e)=>setForm({
                  ...form,
                  country:e.target.value
                  })}
                  placeholder="Maroc, Sénégal..."
                  className="mt-2 w-full bg-cream border border-border focus:border-gold focus:outline-none px-4 py-3 text-navy"
                  />

                  </label>





                  <label className="block sm:col-span-2">

                  <span className="text-xs tracking-wider uppercase text-navy/60">
                  Message complémentaire
                  </span>


                  <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e)=>setForm({
                  ...form,
                  message:e.target.value
                  })}
                  placeholder="Couleur, équipements, délais..."
                  className="mt-2 w-full bg-cream border border-border focus:border-gold focus:outline-none px-4 py-3 text-navy resize-none"
                  />

                  </label>




                  <button
                  disabled={loading}
                  type="submit"
                  className="
                  sm:col-span-2
                  mt-2
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  bg-navy
                  text-cream
                  px-6
                  py-4
                  hover:bg-gold
                  hover:text-navy
                  transition-colors
                  disabled:opacity-50
                  "
                  >

                  {
                  loading
                  ?
                  "Envoi en cours..."
                  :
                  <>
                  Lancer ma recherche
                  <Send className="size-4"/>
                  </>
                  }

                  </button>



                  <a
                  href="tel:+33608465741"
                  className="sm:col-span-2 inline-flex items-center justify-center gap-2 text-sm text-navy/70 hover:text-gold"
                  >
                  <Phone className="size-4" />
                  Ou appelez-nous au +33 6 08 46 57 41
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
