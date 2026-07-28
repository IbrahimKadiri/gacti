import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Minus, Trash2, Check, Ship, FileText, Shield, ParkingSquare } from "lucide-react";
import { sendMail } from "@/lib/mail";

export const Route = createFileRoute("/devis-express")({
  head: () => ({
    meta: [
      { title: "Devis express — GACTI" },
      {
        name: "description",
        content: "Simulez votre devis GACTI en ligne : transit véhicules, formalités douanières, assurance et logistique portuaire. Réponse sous 24h.",
      },
      { property: "og:title", content: "Devis express — GACTI" },
      { property: "og:description", content: "Obtenez une estimation instantanée de votre transit véhicule et export maritime." },
      { property: "og:image", content: "https://ibrahimkadiri.github.io/gacti/og/hero-port.jpg" },
    ],
  }),
  component: DevisPage,
});

const services = [
  { id: "exa", title: "EX-A", subtitle: "Déclaration d'exportation", price: 60, icon: FileText },
  { id: "mrn", title: "MRN", subtitle: "Mouvement de référence", price: 80, icon: FileText },
  { id: "cpi", title: "CPI", subtitle: "Certificat immatriculation temporaire", price: 60, icon: FileText },
  { id: "plates", title: "Plaques export", subtitle: "Plaques W garage", price: 30, icon: FileText },
  { id: "CPI+P", title: "CPI + Plaques", subtitle: "Certificat provisoire d'immatriculation + plaques W garage", price: 80, icon: FileText },

];

const variableServices = [
  {
    id: "assurance",
    title: "Assurance temporaire",
    icon: Shield,
    options: [
      { label: "1 jour", price: 50 },
      { label: "3 jours", price: 70 },
      { label: "8 jours", price: 110 },
      { label: "10 jours", price: 140 },
      { label: "15 jours", price: 160 },
      { label: "30 jours", price: 220 },
    ],
  },
   {
    id: "parking-port",
    title: "Stationnement PORT & remise véhicule",
    icon: ParkingSquare,
    options: [
      {
        label: "1 à 8 jours",
        price: 80,
      },
      {
        label: "8 à 15 jours",
        price: 120,
      },
      {
        label: "15 à 31 jours",
        price: 160,
      },
    ],
  },

  {
    id: "parking-bureau",
    title: "Stationnement Bureau & remise véhicule",
    icon: ParkingSquare,
    options: [
      {
        label: "Pack 2 nuits",
        price: 50,
      },
    ],
    note:
      "Remise le jour même gratuite pour les clients réalisant leurs formalités administratives chez GACTI. +10 € par nuit supplémentaire.",
    variableNightPrice: 10,
  },
];

const maritimeServices = [
  {
    id: "container",
    title: "Transport conteneur",
    subtitle: "FCL / LCL"
  },
  {
    id: "roro",
    title: "Transport RoRo",
    subtitle: "Roll-on / Roll-off"
  }
];

type Item = {
  id: string;
  title: string;
  price: number | null;
  quantity: number;
  option?: string;
  isQuote?: boolean;
};

function DevisPage() {
  const [extraNights, setExtraNights] = useState(0);
  const [selected, setSelected] = useState<Item[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",

    // CONTENEUR
    containerLoadingCountry: "",
    containerLoadingCity: "",
    containerDeliveryCountry: "",
    containerDeliveryCity: "",
    cargoType: "",
    cargoWeight: "",
    containerLoadingDate: "",
    containerDeliveryDate: "",
    containerMessage: "",

    // RORO
    roroDepartureCountry: "",
    roroDepartureCity: "",
    roroArrivalCountry: "",
    roroArrivalCity: "",
    roroDate: "",
    roroMessage: "",
  });

  const toggleService = (s: typeof services[0]) => {
    setSelected((prev) => {
      const exists = prev.find((x) => x.id === s.id);
      if (exists) return prev.filter((x) => x.id !== s.id);
      return [...prev, { id: s.id, title: s.title, price: s.price, quantity: 1 }];
    });
  };

  const toggleMaritime = (s: typeof maritimeServices[0]) => {
    setSelected((prev) => {
      const exists = prev.find((x) => x.id === s.id);
      if (exists) return prev.filter((x) => x.id !== s.id);
      return [...prev, { id: s.id, title: s.title, price: null, quantity: 1, isQuote: true }];
    });
  };

  const removeService = (id: string) => setSelected((prev) => prev.filter((s) => s.id !== id));

  const updateQty = (id: string, delta: number) => {
    setSelected((prev) =>
      prev.map((s) => s.id === id ? { ...s, quantity: Math.max(1, s.quantity + delta) } : s)
    );
  };

  const selectOption = (
  service: typeof variableServices[0],
  opt: { label: string; price: number }
) => {
  setSelected((prev) => {
    const current = prev.find((x) => x.id === service.id);

    // Désélection si on reclique sur la même option
    if (current?.option === opt.label) {
      return prev.filter((x) => x.id !== service.id);
    }

    // Sinon remplacer par la nouvelle option
    return [
      ...prev.filter((x) => x.id !== service.id),
      {
        id: service.id,
        title: service.title,
        price: opt.price,
        quantity: 1,
        option: opt.label,
      },
    ];
  });
};
  const total = useMemo(() =>
  selected.reduce((acc, s) => {
    let price = (s.price ?? 0) * s.quantity;

    if (s.id === "parking-bureau") {
      price += extraNights * 10;
    }

    return acc + price;
  }, 0),
[selected, extraNights]);

  const isSelected = (id: string) => !!selected.find((x) => x.id === id);
  const getSelected = (id: string) => selected.find((x) => x.id === id);

  const handleSubmit = async () => {

    if (!form.name || !form.email || selected.length === 0) {
      return;
    }

    try {

      setLoading(true);

      await sendMail({
        type: "devis-express",
        name: form.name,
        email: form.email,
        phone: form.phone,
        details: {
          services: selected.map((s) => {
            let price = s.isQuote ? null : (s.price ?? 0) * s.quantity;
            let note = null;

            if (s.id === "parking-bureau" && extraNights > 0) {
              price = (price ?? 0) + extraNights * 10;
              note = `+ ${extraNights} nuit${extraNights > 1 ? "s" : ""} supplémentaire${extraNights > 1 ? "s" : ""} (${extraNights * 10} €)`;
            }

            return {
              title: s.title,
              option: s.option || null,
              quantity: s.quantity,
              price,
              note,
            };
          }),
          total,

          container: isSelected("container")
            ? {
                loadingCountry: form.containerLoadingCountry,
                loadingCity: form.containerLoadingCity,
                deliveryCountry: form.containerDeliveryCountry,
                deliveryCity: form.containerDeliveryCity,
                cargoType: form.cargoType,
                cargoWeight: form.cargoWeight,
                loadingDate: form.containerLoadingDate,
                deliveryDate: form.containerDeliveryDate,
                message: form.containerMessage,
              }
            : null,

          roro: isSelected("roro")
            ? {
                departureCountry: form.roroDepartureCountry,
                departureCity: form.roroDepartureCity,
                arrivalCountry: form.roroArrivalCountry,
                arrivalCity: form.roroArrivalCity,
                date: form.roroDate,
                message: form.roroMessage,
              }
            : null,
        }

      });

      setSubmitted(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    } catch(error){
      console.error(error);
      alert(
        "Une erreur est survenue lors de l'envoi."
      );

    } finally {
      setLoading(false);
    }

  };

  if (submitted) {
    return (
      <section className="pt-32 pb-24 bg-cream min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <Check className="size-8 text-gold" />
          </div>
          <h2 className="font-serif text-3xl text-navy mb-3">Demande envoyée</h2>
          <p className="text-navy/60 mb-8">Notre équipe revient vers vous sous 24h ouvrés avec une proposition détaillée.</p>
          <button
            onClick={() => { setSubmitted(false); setSelected([]); }}
            className="border border-navy/20 text-navy px-8 py-3 hover:bg-navy hover:text-cream transition-colors duration-200"
          >
            Nouveau devis
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-24 bg-cream min-h-screen">
      <div className="container-x">

        {/* HEADER */}
        <div className="text-xs tracking-[0.25em] uppercase text-gold flex items-center gap-3">
          <span className="w-8 h-px bg-gold" /> Devis express
        </div>
        <h1 className="mt-5 font-serif text-4xl md:text-6xl text-navy">
          Simulez votre <span className="italic">devis instantané</span>
        </h1>
        <p className="mt-4 text-navy/60 max-w-2xl text-base md:text-lg">
          Sélectionnez vos services, ajustez les quantités et obtenez une estimation immédiate de votre transit véhicule.
        </p>

        {/* LAYOUT */}
        <div className="mt-12 grid lg:grid-cols-12 gap-8 xl:gap-12 items-start">

          {/* LEFT */}
          <div className="lg:col-span-8 space-y-6">

            {/* SERVICES ADMINISTRATIFS */}
            <div className="bg-white border border-navy/8 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="size-5 text-gold" />
                <h2 className="font-serif text-xl md:text-2xl text-navy">Services administratifs</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {services.map((s) => {
                  const active = isSelected(s.id);
                  const sel = getSelected(s.id);
                  return (
                    <div
                      key={s.id}
                      className={`border p-5 transition-all duration-200 ${
                        active
                          ? "border-gold bg-gold/5 shadow-sm"
                          : "border-navy/10 hover:border-gold/50"
                      }`}
                    >
                      <button onClick={() => toggleService(s)} className="text-left w-full">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className={`font-semibold text-sm md:text-base transition-colors ${active ? "text-navy" : "text-navy/80"}`}>
                              {s.title}
                            </div>
                            <div className="text-xs text-navy/40 mt-0.5">{s.subtitle}</div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-serif text-gold text-lg">{s.price} €</span>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              active ? "bg-gold border-gold" : "border-navy/20"
                            }`}>
                              {active && <Check className="size-3 text-white" />}
                            </div>
                          </div>
                        </div>
                      </button>

                      {active && sel && (
                        <div className="mt-4 pt-3 border-t border-gold/20 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQty(s.id, -1)}
                              className="w-7 h-7 border border-navy/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium text-navy">{sel.quantity}</span>
                            <button
                              onClick={() => updateQty(s.id, 1)}
                              className="w-7 h-7 border border-navy/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeService(s.id)}
                            className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="size-3" /> Retirer
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* OPTIONS VARIABLES */}
            <div className="bg-white border border-navy/8 p-6 md:p-8">
              {variableServices.map((s) => {
                const sel = getSelected(s.id);
                const Icon = s.icon;
                return (
                  <div key={s.id} className="mb-8 last:mb-0">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="size-5 text-gold" />
                      <h2 className="font-serif text-xl md:text-2xl text-navy">{s.title}</h2>
                      {sel && (
                        <span className="ml-auto text-xs bg-gold/10 text-gold px-3 py-1 font-medium">
                          {sel.option} — {sel.price} €
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
  {s.options.map((opt) => {
    const active = sel?.option === opt.label;

    return (
      <button
        key={opt.label}
        onClick={() => selectOption(s, opt)}
        className={`border p-3 md:p-4 text-left transition-all duration-200 ${
          active
            ? "border-gold bg-gold/5 shadow-sm"
            : "border-navy/10 hover:border-gold/50"
        }`}
      >
        <div className="text-xs md:text-sm text-navy/70">
          {opt.label}
        </div>

        <div className="font-serif text-gold text-base md:text-lg mt-1">
          {opt.price} €
        </div>

        {opt.label === "Pack 2 nuits" && s.variableNightPrice && (
          <div className="text-xs text-navy/40 mt-2">
            Puis +{s.variableNightPrice} € / nuit supplémentaire
          </div>
        )}
      </button>
    );
  })}
</div>


{/* Nuits supplémentaires */}
{s.variableNightPrice && sel && (
  <div className="mt-5 rounded-xl border border-navy/10 bg-cream/50 p-4">

    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

      <div>
        <div className="text-sm font-medium text-navy">
          Nuits supplémentaires
        </div>

        <div className="text-xs text-navy/50 mt-1">
          Après le pack initial de 2 nuits · +10 € / nuit
        </div>
      </div>


      <div className="flex items-center gap-3">
        <button
          onClick={() => setExtraNights(Math.max(0, extraNights - 1))}
          className="size-8 border border-navy/20 hover:border-gold transition"
        >
          -
        </button>

        <span className="w-8 text-center font-serif text-lg text-navy">
          {extraNights}
        </span>

        <button
          onClick={() => setExtraNights(extraNights + 1)}
          className="size-8 border border-navy/20 hover:border-gold transition"
        >
          +
        </button>
      </div>

    </div>

  </div>
)}
                    {s.note && (
                      <div className="mt-5 rounded-lg border border-gold/20 bg-gold/5 p-4">
                        <p className="text-xs md:text-sm text-navy/60 leading-relaxed">
                          {s.note}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

              
           {/* TRANSPORT MARITIME */}
            <div className="bg-white border border-navy/8 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Ship className="size-5 text-gold" />
                <h2 className="font-serif text-xl md:text-2xl text-navy">
                  Transport maritime
                </h2>
              </div>

              <p className="text-sm text-navy/50 mb-6 leading-relaxed">
                Sélectionnez un ou plusieurs modes de transport maritime.
                Chaque option nécessite des informations logistiques spécifiques pour établir un devis précis.
              </p>

              {/* CHOIX TRANSPORT */}
              <div className="grid md:grid-cols-2 gap-4">
                {maritimeServices.map((s) => {
                  const active = isSelected(s.id);

                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleMaritime(s)}
                      className={`border p-5 text-left transition-all duration-200 ${
                        active
                          ? "border-gold bg-gold/5 shadow-sm"
                          : "border-navy/10 hover:border-gold/50"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <div className="font-semibold text-navy">
                            {s.title}
                          </div>

                          <div className="text-sm text-navy/50 mt-1">
                            {s.subtitle}
                          </div>

                          <div className="text-xs text-gold mt-3 italic">
                            Sur devis selon destination
                          </div>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            active ? "bg-gold border-gold" : "border-navy/20"
                          }`}
                        >
                          {active && <Check className="size-3 text-white" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* ===================== */}
              {/* CONTENEUR FORM */}
              {/* ===================== */}
              {isSelected("container") && (
                <div className="mt-8 border-t border-navy/8 pt-6">
                  <h3 className="font-serif text-lg text-navy mb-4">
                    Transport conteneur (FCL / LCL)
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      placeholder="Pays de chargement"
                      className="p-3 border border-navy/10 bg-cream/50 text-sm"
                      onChange={(e) =>
                        setForm({ ...form, containerLoadingCountry: e.target.value })
                      }
                    />

                    <input
                      placeholder="Ville de chargement"
                      className="p-3 border border-navy/10 bg-cream/50 text-sm"
                      onChange={(e) =>
                        setForm({ ...form, containerLoadingCity: e.target.value })
                      }
                    />

                    <input
                      placeholder="Pays de livraison"
                      className="p-3 border border-navy/10 bg-cream/50 text-sm"
                      onChange={(e) =>
                        setForm({ ...form, containerDeliveryCountry: e.target.value })
                      }
                    />

                    <input
                      placeholder="Ville de livraison"
                      className="p-3 border border-navy/10 bg-cream/50 text-sm"
                      onChange={(e) =>
                        setForm({ ...form, containerDeliveryCity: e.target.value })
                      }
                    />

                    <input
                      placeholder="Type de marchandise"
                      className="p-3 border border-navy/10 bg-cream/50 text-sm"
                      onChange={(e) =>
                        setForm({ ...form, cargoType: e.target.value })
                      }
                    />

                    <input
                      placeholder="Poids estimé (kg)"
                      className="p-3 border border-navy/10 bg-cream/50 text-sm"
                      onChange={(e) =>
                        setForm({ ...form, cargoWeight: e.target.value })
                      }
                    />

                    <div>
                      <label className="text-xs text-navy/40">Date de chargement</label>
                      <input
                        type="date"
                        className="w-full mt-1 p-3 border border-navy/10 bg-cream/50 text-sm"
                        onChange={(e) =>
                          setForm({ ...form, containerLoadingDate: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-xs text-navy/40">Date de livraison souhaitée</label>
                      <input
                        type="date"
                        className="w-full mt-1 p-3 border border-navy/10 bg-cream/50 text-sm"
                        onChange={(e) =>
                          setForm({ ...form, containerDeliveryDate: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <textarea
                    placeholder="Informations complémentaires (conteneur)"
                    rows={3}
                    className="w-full mt-4 p-3 border border-navy/10 bg-cream/50 text-sm resize-none"
                    onChange={(e) =>
                      setForm({ ...form, containerMessage: e.target.value })
                    }
                  />
                </div>
              )}

              {/* ===================== */}
              {/* RORO FORM */}
              {/* ===================== */}
              {isSelected("roro") && (
                <div className="mt-8 border-t border-navy/8 pt-6">
                  <h3 className="font-serif text-lg text-navy mb-4">
                    Transport RoRo (Roll-on / Roll-off)
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      placeholder="Pays de départ"
                      className="p-3 border border-navy/10 bg-cream/50 text-sm"
                      onChange={(e) =>
                        setForm({ ...form, roroDepartureCountry: e.target.value })
                      }
                    />

                    <input
                      placeholder="Ville / Port de départ"
                      className="p-3 border border-navy/10 bg-cream/50 text-sm"
                      onChange={(e) =>
                        setForm({ ...form, roroDepartureCity: e.target.value })
                      }
                    />

                    <input
                      placeholder="Pays d’arrivée"
                      className="p-3 border border-navy/10 bg-cream/50 text-sm"
                      onChange={(e) =>
                        setForm({ ...form, roroArrivalCountry: e.target.value })
                      }
                    />

                    <input
                      placeholder="Ville / Port d’arrivée"
                      className="p-3 border border-navy/10 bg-cream/50 text-sm"
                      onChange={(e) =>
                        setForm({ ...form, roroArrivalCity: e.target.value })
                      }
                    />

                    <div className="md:col-span-2">
                      <label className="text-xs text-navy/40">
                        Date de disponibilité du véhicule
                      </label>
                      <input
                        type="date"
                        className="w-full mt-1 p-3 border border-navy/10 bg-cream/50 text-sm"
                        onChange={(e) =>
                          setForm({ ...form, roroDate: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <textarea
                    placeholder="Informations complémentaires (RoRo)"
                    rows={3}
                    className="w-full mt-4 p-3 border border-navy/10 bg-cream/50 text-sm resize-none"
                    onChange={(e) =>
                      setForm({ ...form, roroMessage: e.target.value })
                    }
                  />
                </div>
              )}
            </div>

            
            {/* COORDONNÉES */}
            <div className="bg-white border border-navy/8 p-6 md:p-8">
              <h2 className="font-serif text-xl md:text-2xl text-navy mb-6">Vos coordonnées</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { placeholder: "Nom complet *", key: "name", type: "text" },
                  { placeholder: "Email professionnel *", key: "email", type: "email" },
                  { placeholder: "Téléphone", key: "phone", type: "tel" },
                ].map(({ placeholder, key, type }) => (
                  <input
                    key={key}
                    type={type}
                    placeholder={placeholder}
                    className={`p-3 border border-navy/10 bg-cream/50 text-navy placeholder:text-navy/30 text-sm focus:outline-none focus:border-gold transition-colors ${
                      key === "phone" ? "sm:col-span-2" : ""
                    }`}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
                ))}
              </div>
            </div>

     {/* DEMANDE SPECIFIQUE */}
<div className="relative overflow-hidden bg-navy p-6 md:p-10 border border-navy/10 text-center">

  {/* Décoration */}
  <div className="absolute -right-20 -top-20 w-56 h-56 rounded-full bg-gold/10 blur-3xl" />
  <div className="absolute -left-16 -bottom-16 w-40 h-40 rounded-full bg-gold/5 blur-2xl" />

  <div className="relative mx-auto max-w-xl">

    <p className="text-xs uppercase tracking-[0.25em] text-gold mb-3">
      Besoin particulier
    </p>

    <h2 className="font-serif text-2xl md:text-3xl text-cream">
      Une demande spécifique ?
    </h2>

    <p className="mt-4 text-sm md:text-base text-cream/60 leading-relaxed">
      Une prestation qui ne figure pas dans notre simulateur ?
      Veuillez nous envoyer un email à l'adresse suivante :
    </p>

    <a
      href="mailto:contact@gacti.fr"
      className="
        inline-flex
        items-center
        justify-center
        gap-2
        mt-6
        bg-gold
        text-navy
        px-6
        py-3.5
        text-sm
        font-medium
        transition-all
        hover:bg-gold/90
        hover:-translate-y-0.5
      "
    >
      contact@gacti.fr
      <span>→</span>
    </a>

  </div>
</div>
            {/* SUBMIT MOBILE */}
            <div className="lg:hidden">
              <MobileSummary selected={selected} total={total} onSubmit={handleSubmit} form={form} extraNights={extraNights} loading={loading}/>
            </div>
          </div>

          {/* SIDEBAR DESKTOP */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28 bg-white border border-navy/8 p-6">
              <h3 className="font-serif text-xl text-navy mb-1">Votre devis estimé</h3>
              <p className="text-xs text-navy/40 mb-5">Mis à jour en temps réel</p>

              {selected.length === 0 ? (
                <div className="text-center py-8 text-navy/30 text-sm">
                  Sélectionnez des services pour voir votre estimation
                </div>
              ) : (
                <div className="space-y-2 mb-5">
                  {selected.map((s) => (
                    <div key={s.id} className="flex items-start justify-between gap-3 text-sm py-2 border-b border-navy/5 last:border-0">
                      <div className="text-navy/70 leading-tight">
                        {s.title}
                        {s.option && <span className="text-navy/40"> ({s.option})</span>}
                        {s.quantity > 1 && <span className="text-navy/40"> ×{s.quantity}</span>}
                        {s.id === "parking-bureau" && extraNights > 0 && (
                          <div className="mt-1 text-xs text-navy/40">
                            + {extraNights} nuit{extraNights > 1 ? "s" : ""} supplémentaire
                            {extraNights > 1 ? "s" : ""} ({extraNights * 10} €)
                          </div>
                        )}
                      </div>
                      <div className="shrink-0 font-medium text-navy">
                        {s.id === "parking-bureau"
                          ? `${(s.price ?? 0) + extraNights * 10} €`
                          : s.price === null
                            ? <span className="text-gold italic text-xs">Sur devis</span>
                            : `${s.price * s.quantity} €`
                        }
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-navy/10 pt-4 flex justify-between items-baseline mb-6">
                <span className="text-sm font-medium text-navy">Total estimé</span>
                <span className="font-serif text-3xl text-gold">{total} €</span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || !form.name || !form.email || selected.length === 0}
                className="w-full bg-navy text-cream py-3.5 text-sm font-medium tracking-wide hover:bg-gold hover:text-navy transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer le devis <Check className="size-4" />
                  </>
                )}
              </button>

              <p className="text-xs text-navy/30 text-center mt-3">Réponse garantie sous 24h durant les jours ouvrés</p>

              <div className="mt-6 pt-4 border-t border-navy/8 space-y-2">
                <a href="tel:+33608465741" className="flex items-center gap-2 text-xs text-navy/50 hover:text-navy transition-colors">
                  <span>📞</span> +33 6 08 46 57 41
                </a>
                <a href="mailto:contact@gacti.fr" className="flex items-center gap-2 text-xs text-navy/50 hover:text-navy transition-colors">
                  <span>✉️</span> contact@gacti.fr
                </a>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}

function MobileSummary({
  selected,
  total,
  onSubmit,
  form,
  extraNights,
  loading
}: {
  selected: Item[];
  total: number;
  onSubmit: () => void;
  form: { name: string; email: string };
  extraNights: number;
  loading:boolean;
}) {
  return (
    <div className="bg-white border border-navy/8 p-5 sm:p-6">

      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-5">
        <h3 className="font-serif text-lg text-navy">
          Total estimé
        </h3>

        <span className="font-serif text-2xl text-gold">
          {total} €
        </span>
      </div>


      {selected.length > 0 && (
        <div className="space-y-4 mb-6">

          {selected.map((s) => (
            <div
              key={s.id}
              className="border-b border-navy/5 pb-3 last:border-0"
            >

              <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">
                  <div className="text-sm text-navy/70 leading-snug break-words">
                    {s.title}
                  </div>

                  {s.option && (
                    <div className="text-xs text-navy/40 mt-1">
                      {s.option}
                    </div>
                  )}

                  {s.quantity > 1 && (
                    <div className="text-xs text-navy/40 mt-1">
                      Quantité : ×{s.quantity}
                    </div>
                  )}

                  {s.id === "parking-bureau" && extraNights > 0 && (
                    <div className="text-xs text-navy/40 mt-2">
                      + {extraNights} nuit
                      {extraNights > 1 ? "s" : ""} supplémentaire
                      {extraNights > 1 ? "s" : ""}
                      {" "}({extraNights * 10} €)
                    </div>
                  )}
                </div>


                <div className="shrink-0 text-sm font-medium text-navy">
                  {s.id === "parking-bureau"
                    ? `${(s.price ?? 0) + extraNights * 10} €`
                    : s.price === null
                      ? (
                        <span className="text-gold italic text-xs">
                          Sur devis
                        </span>
                      )
                      : `${s.price * s.quantity} €`
                  }
                </div>

              </div>

            </div>
          ))}

        </div>
      )}


      <button
        onClick={onSubmit}
        disabled={loading || !form.name || !form.email || selected.length === 0}
        className="
          w-full
          bg-navy
          text-cream
          py-3.5
          text-sm
          font-medium
          hover:bg-gold
          hover:text-navy
          transition-colors
          duration-200
          disabled:opacity-40
          disabled:cursor-not-allowed
          flex
          items-center
          justify-center
          gap-2
        "
      >
        {loading ? "Envoi en cours..." : "Envoyer le devis"}
        <Check className="size-4" />
      </button>

      <p className="text-xs text-navy/30 text-center mt-3">
        Réponse garantie sous 24h durant les jours ouvrés
      </p>

    </div>
  );
}
