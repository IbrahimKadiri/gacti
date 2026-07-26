import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact GACTI — Transit véhicules & transport maritime Marseille" },
      {
        name: "description",
        content:
          "Contactez GACTI à Marseille : téléphone +33 6 08 46 57 41, email contact@gacti.fr, WhatsApp. Équipe joignable du lundi au vendredi, 9h-12h, 13h-17h.",
      },
      { name: "keywords", content: "contact GACTI, transit véhicules Marseille, transport maritime, devis export Afrique" },
      { property: "og:title", content: "Contact GACTI — Transit & transport maritime" },
      { property: "og:description", content: "Téléphone, email, WhatsApp — toutes les façons de joindre nos experts." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Contact GACTI" },
      { name: "twitter:description", content: "Joignez notre équipe Marseille — réponse rapide tous canaux." },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/contact` }],
  }),
  component: ContactPage,
});

const cards = [
  { icon: Phone, label: "Téléphone", value: SITE.phone, href: `tel:${SITE.phoneRaw}` },
  { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: MapPin, label: "Adresse", value: SITE.address },
  { icon: Clock, label: "Horaires", value: "Lundi – Vendredi. • 9h–12h · 13h–17h" }
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  const wa = `https://wa.me/${SITE.phoneRaw.replace("+", "")}?text=${encodeURIComponent(SITE.whatsappMessage)}`;
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const updateConsent = () => {
      setHasConsent(
        localStorage.getItem("gacti_cookie_consent") === "accepted"
      );
    };

    updateConsent();

    window.addEventListener(
      "cookie-consent-changed",
      updateConsent
    );

    return () => {
      window.removeEventListener(
        "cookie-consent-changed",
        updateConsent
      );
    };
  }, []);

  const MAP_QUERY = encodeURIComponent(
    "25 boulevard LEDRU ROLLIN ZA URBAN PARK LOT 11, 13015 MARSEILLE"
  );
  return (
    <>
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 container-x">
        <Reveal>
          <div className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-gold flex items-center gap-3">
            <span className="w-8 h-px bg-gold" /> Nous joindre
          </div>
          <h1 className="mt-5 font-serif text-4xl sm:text-5xl md:text-7xl text-navy leading-[1.02] text-balance max-w-3xl">
            Parlons de votre <span className="italic">prochain projet</span>.
          </h1>
          <p className="mt-5 sm:mt-6 max-w-2xl text-base sm:text-lg text-navy/70">
            Une équipe humaine, joignable directement. Choisissez le canal qui vous convient.
          </p>
        </Reveal>
      </section>

      <section className="container-x">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {cards.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06}>
              <div className="bg-cream p-5 sm:p-6 h-full">
                <c.icon className="size-5 sm:size-6 text-gold" />
                <div className="mt-3 sm:mt-4 text-[10px] sm:text-xs tracking-widest uppercase text-navy/50">
                  {c.label}
                </div>
                {c.href ? (
                  <a
                    href={c.href}
                    className="mt-1 block font-serif text-base sm:text-xl text-navy hover:text-gold break-words"
                  >
                    {c.value}
                  </a>
                ) : (
                  <div className="mt-1 font-serif text-base sm:text-xl text-navy">{c.value}</div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-24 md:py-32 container-x grid lg:grid-cols-12 gap-10 lg:gap-12">
        <div className="lg:col-span-7">
          <SectionHeader eyebrow="Formulaire" title="Écrivez-nous." />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="mt-8 sm:mt-10 grid sm:grid-cols-2 gap-4 sm:gap-5 bg-card border border-border p-5 sm:p-8"
          >
            {sent ? (
              <div className="sm:col-span-2 text-center py-10">
                <p className="font-serif text-2xl sm:text-3xl text-navy">Message envoyé.</p>
                <p className="mt-2 text-navy/65 text-sm sm:text-base">
                  Nous vous répondons dans les meilleurs délais.
                </p>
              </div>
            ) : (
              <>
                <label className="block">
                  <span className="text-[10px] sm:text-xs tracking-wider uppercase text-navy/60">Nom</span>
                  <input
                    required
                    autoComplete="name"
                    className="mt-2 w-full bg-cream border border-border focus:border-gold focus:outline-none px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] sm:text-xs tracking-wider uppercase text-navy/60">Email</span>
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    className="mt-2 w-full bg-cream border border-border focus:border-gold focus:outline-none px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-[10px] sm:text-xs tracking-wider uppercase text-navy/60">Objet</span>
                  <input
                    required
                    className="mt-2 w-full bg-cream border border-border focus:border-gold focus:outline-none px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-[10px] sm:text-xs tracking-wider uppercase text-navy/60">Message</span>
                  <textarea
                    required
                    rows={6}
                    className="mt-2 w-full bg-cream border border-border focus:border-gold focus:outline-none px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base resize-none"
                  />
                </label>
                <div className="sm:col-span-2 flex flex-col sm:flex-row flex-wrap gap-3 mt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-navy text-cream px-5 sm:px-6 py-2.5 sm:py-3 text-sm hover:bg-gold hover:text-navy transition-colors"
                  >
                    Envoyer <Send className="size-4" />
                  </button>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm hover:opacity-90 transition-opacity"
                  >
                    <MessageCircle className="size-4" /> WhatsApp direct
                  </a>
                </div>
              </>
            )}
          </form>
        </div>

        <div className="lg:col-span-5 flex flex-col">
          <SectionHeader eyebrow="Nous trouver" title="Au cœur du port de Marseille." />
          <div className="mt-8 sm:mt-10 flex-1 flex flex-col gap-4">
            <div className="relative w-full overflow-hidden border border-border bg-muted aspect-[4/3] sm:aspect-square lg:aspect-auto lg:flex-1 lg:min-h-[420px]">
  
              {hasConsent ? (
                <iframe
                  title="GACTI — 25 boulevard LEDRU ROLLIN ZA URBAN PARK LOT 11, 13015 MARSEILLE"
                  src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-navy/5 text-center p-6">
                  <div>
                    <MapPin className="mx-auto size-6 text-gold" />
                    <p className="mt-3 text-sm text-navy/70">
                      Carte désactivée sans consentement cookies
                    </p>
                    <p className="mt-1 text-[11px] text-navy/40">
                      Google Maps nécessite l’acceptation des cookies
                    </p>
                  </div>
                </div>
              )}

            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-2 border border-border bg-card hover:border-gold hover:text-gold px-4 py-3 text-sm text-navy transition-colors"
            >
              <span className="flex items-center gap-2">
                <MapPin className="size-4 text-gold" />
                Ouvrir dans Google Maps
              </span>
              <span className="text-[10px] tracking-widest uppercase text-navy/50">
                Itinéraire
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
