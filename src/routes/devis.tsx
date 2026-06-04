import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, ShieldCheck, Clock, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EMAILJS, SITE } from "@/lib/site";

export const Route = createFileRoute("/devis")({
  head: () => ({
    meta: [
      { title: "Devis express — GACTI" },
      {
        name: "description",
        content:
          "Demandez votre devis GACTI en 4 étapes. Réponse sous 24 h pour transit, sourcing véhicule, transport maritime et distribution.",
      },
      { property: "og:title", content: "Devis express — GACTI" },
      { property: "og:description", content: "Devis personnalisé sous 24 h. Quatre étapes simples." },
      { property: "og:image", content: "https://ibrahimkadiri.github.io/gacti/og/hero-port.jpg" },
    ],
  }),
  component: DevisPage,
});

const serviceTypes = [
  ["transit", "Transit véhicules"],
  ["vehicle", "Recherche d'un véhicule"],
  ["catalogue", "Commande catalogue"],
  ["transport", "Transport maritime"],
  ["other", "Autre demande"],
] as const;

type FormState = {
  service: string;
  details: string;
  destination: string;
  delay: string;
  name: string;
  email: string;
  phone: string;
};

function DevisPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [data, setData] = useState<FormState>({
    service: "",
    details: "",
    destination: "",
    delay: "",
    name: "",
    email: "",
    phone: "",
  });

  const update = (k: keyof FormState, v: string) => setData((d) => ({ ...d, [k]: v }));

  const next = () => setStep((s) => Math.min(3, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const submit = () => {
    // EmailJS-ready: emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, data, EMAILJS.publicKey)
    console.log("Devis submission:", { config: EMAILJS, data });
    setDone(true);
  };

  const canNext = () => {
    if (step === 0) return !!data.service;
    if (step === 1) return data.details.trim().length > 3;
    if (step === 2) return !!data.destination;
    return true;
  };

  return (
    <section className="pt-32 pb-24 bg-cream min-h-screen">
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="text-xs tracking-[0.25em] uppercase text-gold flex items-center gap-3">
            <span className="w-8 h-px bg-gold" /> Devis express
          </div>
          <h1 className="mt-5 font-serif text-4xl md:text-6xl text-navy leading-[1.05] text-balance">
            Une réponse <span className="italic">sous 24 h</span>.
          </h1>
          <p className="mt-5 max-w-xl text-navy/70 text-lg">
            Quatre étapes pour décrire votre besoin. Notre équipe vous recontacte avec une
            proposition claire et chiffrée.
          </p>

          {/* Progress */}
          {!done && (
            <div className="mt-12 flex items-center gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex-1">
                  <div
                    className={`h-1 transition-colors ${
                      i <= step ? "bg-gold" : "bg-navy/10"
                    }`}
                  />
                  <div className={`mt-2 text-xs tracking-widest uppercase ${i <= step ? "text-navy" : "text-navy/40"}`}>
                    Étape {i + 1}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 bg-card border border-border p-5 sm:p-8 md:p-10 min-h-[420px]">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-10"
                >
                  <div className="mx-auto size-16 rounded-full bg-gold/20 flex items-center justify-center">
                    <Check className="size-8 text-gold" />
                  </div>
                  <h2 className="mt-6 font-serif text-3xl text-navy">Demande reçue.</h2>
                  <p className="mt-3 text-navy/70 max-w-md mx-auto">
                    Merci {data.name || ""} ! Nous étudions votre demande et revenons vers vous
                    sous 24 h sur <strong>{data.email}</strong>.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {step === 0 && (
                    <div>
                      <h3 className="font-serif text-2xl text-navy">Quel type de service ?</h3>
                      <div className="mt-6 grid sm:grid-cols-2 gap-3">
                        {serviceTypes.map(([v, l]) => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => update("service", v)}
                            className={`text-left p-5 border transition-all ${
                              data.service === v
                                ? "border-gold bg-gold/10 text-navy"
                                : "border-border hover:border-navy/40 text-navy/80"
                            }`}
                          >
                            <span className="font-medium">{l}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <h3 className="font-serif text-2xl text-navy">Détails de votre demande</h3>
                      <p className="mt-2 text-navy/60 text-sm">
                        Véhicule : marque, modèle, année. Produit : référence et quantité.
                      </p>
                      <textarea
                        rows={8}
                        value={data.details}
                        onChange={(e) => update("details", e.target.value)}
                        placeholder="Ex. : BMW Série 5 2021, blanche, en provenance de France, à transiter vers Casablanca…"
                        className="mt-5 w-full bg-cream border border-border focus:border-gold focus:outline-none px-4 py-3 text-navy resize-none"
                      />
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h3 className="font-serif text-2xl text-navy">Destination & délais</h3>
                      <div className="mt-6 grid sm:grid-cols-2 gap-5">
                        <label className="block">
                          <span className="text-xs tracking-wider uppercase text-navy/60">Pays / port de destination</span>
                          <input
                            value={data.destination}
                            onChange={(e) => update("destination", e.target.value)}
                            placeholder="Maroc — Casablanca"
                            className="mt-2 w-full bg-cream border border-border focus:border-gold focus:outline-none px-4 py-3 text-navy"
                          />
                        </label>
                        <label className="block">
                          <span className="text-xs tracking-wider uppercase text-navy/60">Délai souhaité</span>
                          <input
                            value={data.delay}
                            onChange={(e) => update("delay", e.target.value)}
                            placeholder="Sous 4 semaines"
                            className="mt-2 w-full bg-cream border border-border focus:border-gold focus:outline-none px-4 py-3 text-navy"
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <h3 className="font-serif text-2xl text-navy">Vos coordonnées</h3>
                      <div className="mt-6 grid sm:grid-cols-2 gap-5">
                        <label className="block sm:col-span-2">
                          <span className="text-xs tracking-wider uppercase text-navy/60">Nom complet</span>
                          <input
                            required
                            value={data.name}
                            onChange={(e) => update("name", e.target.value)}
                            className="mt-2 w-full bg-cream border border-border focus:border-gold focus:outline-none px-4 py-3 text-navy"
                          />
                        </label>
                        <label className="block">
                          <span className="text-xs tracking-wider uppercase text-navy/60">Email</span>
                          <input
                            required
                            type="email"
                            value={data.email}
                            onChange={(e) => update("email", e.target.value)}
                            className="mt-2 w-full bg-cream border border-border focus:border-gold focus:outline-none px-4 py-3 text-navy"
                          />
                        </label>
                        <label className="block">
                          <span className="text-xs tracking-wider uppercase text-navy/60">Téléphone</span>
                          <input
                            required
                            type="tel"
                            value={data.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            className="mt-2 w-full bg-cream border border-border focus:border-gold focus:outline-none px-4 py-3 text-navy"
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {!done && (
              <div className="mt-8 sm:mt-10 flex items-center justify-between gap-3">
                <button
                  onClick={prev}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-navy/70 hover:text-navy disabled:opacity-30"
                >
                  <ArrowLeft className="size-4" /> Précédent
                </button>
                {step < 3 ? (
                  <button
                    onClick={next}
                    disabled={!canNext()}
                    className="inline-flex items-center gap-2 bg-navy text-cream px-4 sm:px-6 py-2.5 sm:py-3 text-sm hover:bg-gold hover:text-navy transition-colors disabled:opacity-40 disabled:hover:bg-navy disabled:hover:text-cream"
                  >
                    Continuer <ArrowRight className="size-4" />
                  </button>
                ) : (
                  <button
                    onClick={submit}
                    disabled={!data.name || !data.email || !data.phone}
                    className="inline-flex items-center gap-2 bg-gold text-navy px-4 sm:px-6 py-2.5 sm:py-3 text-sm hover:bg-navy hover:text-cream transition-colors disabled:opacity-40"
                  >
                    Envoyer <Check className="size-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <aside className="lg:col-span-4 lg:pt-32 space-y-6 sm:space-y-8">
          <div className="bg-navy text-cream p-6 sm:p-8">
            <div className="text-xs tracking-[0.25em] uppercase text-gold">Pourquoi un devis ?</div>
            <ul className="mt-6 space-y-5">
              {[
                [Clock, "Réponse sous 24 h", "Notre équipe étudie chaque demande dès réception."],
                [ShieldCheck, "Tarif ferme et clair", "Pas de frais cachés, devis détaillé."],
                [Check, "Sans engagement", "Vous décidez librement après réception."],
              ].map(([Icon, t, d]) => (
                <li key={t as string} className="flex gap-4">
                  <Icon className="size-5 text-gold mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium text-cream">{t as string}</div>
                    <div className="text-sm text-cream/60">{d as string}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-border p-8">
            <div className="text-xs tracking-[0.25em] uppercase text-navy/60">Préférez parler ?</div>
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="mt-3 flex items-center gap-3 font-serif text-2xl text-navy hover:text-gold"
            >
              <Phone className="size-5 text-gold" /> {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="mt-2 block text-navy/70 hover:text-gold">
              {SITE.email}
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
