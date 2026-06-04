import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Minus, Trash2, Check } from "lucide-react";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/devis")({
  head: () => ({
    meta: [
      { title: "Devis express — GACTI" },
      {
        name: "description",
        content:
          "Simulez votre devis GACTI en ligne : transit véhicules, formalités douanières, assurance et logistique portuaire. Réponse sous 24h.",
      },
      { property: "og:title", content: "Devis express — GACTI" },
      {
        property: "og:description",
        content:
          "Obtenez une estimation instantanée de votre transit véhicule et export maritime.",
      },
      {
        property: "og:image",
        content:
          "https://ibrahimkadiri.github.io/gacti/og/hero-port.jpg",
      },
    ],
  }),
  component: DevisPage,
});

/* =========================
   SERVICES GACTI
========================= */

const services = [
  { id: "exa", title: "EX-A", price: 60 },
  { id: "mrn", title: "MRN", price: 80 },
  { id: "cpi", title: "Carte provisoire", price: 60 },
  { id: "plates", title: "Plaques export", price: 20 },
];

const variableServices = [
  {
    id: "assurance",
    title: "Assurance temporaire",
    options: [
      { label: "1 jour", price: 45 },
      { label: "3 jours", price: 70 },
      { label: "8 jours", price: 110 },
      { label: "10 jours", price: 140 },
      { label: "15 jours", price: 160 },
      { label: "30 jours", price: 260 },
    ],
  },
  {
    id: "parking",
    title: "Stationnement & remise",
    options: [
      { label: "Jour arrivée camion", price: 30 },
      { label: "1 à 2 nuits", price: 50 },
      { label: "Au-delà de 2 nuits", price: 80 },
      { label: "Longue durée", price: 110 },
    ],
  },
];

/* =========================
   TYPE
========================= */

type Item = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  option?: string;
};

function DevisPage() {
  const [selected, setSelected] = useState<Item[]>([]);
  const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
  loadingPlace: "",
  deliveryPlace: "",
  cargoType: "",
  weight: "",
  loadingDate: "",
  deliveryDate: "",
  message: "",
});

  /* =========================
     ADD / REMOVE FIXE
========================= */
  const toggleService = (s: any) => {
    setSelected((prev) => {
      const exists = prev.find((x) => x.id === s.id);

      if (exists) {
        return prev.filter((x) => x.id !== s.id);
      }

      return [
        ...prev,
        {
          id: s.id,
          title: s.title,
          price: s.price,
          quantity: 1,
        },
      ];
    });
  };

  /* =========================
     DELETE SERVICE
========================= */
  const removeService = (id: string) => {
    setSelected((prev) => prev.filter((s) => s.id !== id));
  };

  /* =========================
     QUANTITY CONTROL
========================= */
  const updateQty = (id: string, delta: number) => {
    setSelected((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, quantity: Math.max(1, s.quantity + delta) }
          : s
      )
    );
  };

  /* =========================
     VARIABLE SERVICES
========================= */
  const selectOption = (service: any, opt: any) => {
    setSelected((prev) => {
      const filtered = prev.filter((x) => x.id !== service.id);

      return [
        ...filtered,
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

  /* =========================
     TOTAL
========================= */
  const total = useMemo(() => {
  return selected.reduce((acc, s) => {
    if (s.price === null || s.price === undefined) return acc;
    return acc + s.price * s.quantity;
  }, 0);
}, [selected]);

  const submit = () => {
    console.log({ selected, form, total });
    alert("Devis envoyé !");
  };

  /* =========================
     UI GACTI STYLE
========================= */

  return (
    <section className="pt-32 pb-24 bg-cream min-h-screen">
      <div className="container-x">

        {/* HEADER RESTAURÉ */}
        <div className="text-xs tracking-[0.25em] uppercase text-gold flex items-center gap-3">
          <span className="w-8 h-px bg-gold" /> Devis express
        </div>

        <h1 className="mt-5 font-serif text-4xl md:text-6xl text-navy">
          Simulez votre <span className="italic">devis instantané</span>
        </h1>

        <p className="mt-4 text-navy/70 max-w-2xl">
          Sélectionnez vos services, ajustez les quantités et obtenez une
          estimation immédiate de votre transit véhicule.
        </p>

        {/* MAIN LAYOUT */}
        <div className="mt-12 grid lg:grid-cols-12 gap-10">

          {/* LEFT */}
          <div className="lg:col-span-8 space-y-8">

            {/* FIXED SERVICES */}
            <div className="bg-card border border-border p-8">
              <h2 className="font-serif text-2xl text-navy mb-6">
                Services administratifs
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((s) => {
                  const isSelected = selected.find((x) => x.id === s.id);

                  return (
                    <div
                      key={s.id}
                      className="border border-border p-5"
                    >
                      <button
                        onClick={() => toggleService(s)}
                        className="text-left w-full"
                      >
                        <div className="font-medium text-navy">
                          {s.title}
                        </div>
                        <div className="text-gold font-serif">
                          {s.price} €
                        </div>
                      </button>

                      {isSelected && (
                        <div className="mt-3 flex items-center justify-between">
                          
                          {/* qty */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQty(s.id, -1)}
                              className="border p-1"
                            >
                              <Minus className="size-4" />
                            </button>

                            <span className="w-6 text-center">
                              {isSelected.quantity}
                            </span>

                            <button
                              onClick={() => updateQty(s.id, 1)}
                              className="border p-1"
                            >
                              <Plus className="size-4" />
                            </button>
                          </div>

                          {/* remove */}
                          <button
                            onClick={() => removeService(s.id)}
                            className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                          >
                            <Trash2 className="size-3" />
                            Retirer
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* VARIABLE SERVICES */}
            <div className="bg-card border border-border p-8">
              <h2 className="font-serif text-2xl text-navy mb-6">
                Options variables
              </h2>

              {variableServices.map((s) => (
                <div key={s.id} className="mb-8">
                  <div className="font-medium text-navy mb-3">
                    {s.title}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {s.options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => selectOption(s, opt)}
                        className="border border-border p-4 text-left hover:border-gold"
                      >
                        <div className="text-sm text-navy/70">
                          {opt.label}
                        </div>
                        <div className="text-gold font-serif">
                          {opt.price} €
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

              {/* =========================
                TRANSPORT MARITIME
              ========================= */}

              <div className="bg-card border border-border p-8">
                <h2 className="font-serif text-2xl text-navy mb-6">
                  Transport maritime
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">

                  {/* CONTENEUR */}
                  <div className="border border-border p-5">
                    <div className="font-medium text-navy">
                      Transport Conteneur
                    </div>

                    <div className="text-sm text-navy/60 mt-1">
                      Sur devis selon destination
                    </div>

                    <button
                      onClick={() =>
                        setSelected((prev) => {
                          const exists = prev.find((x) => x.id === "maritime-container");

                          if (exists) {
                            return prev.filter((x) => x.id !== "maritime-container");
                          }

                          return [
                            ...prev,
                            {
                              id: "maritime-container",
                              title: "Transport maritime Conteneur",
                              price: null,
                              quantity: 1,
                              isQuote: true,
                            },
                          ];
                        })
                      }
                      className="mt-4 w-full border border-border px-3 py-2 hover:border-gold"
                    >
                      Ajouter
                    </button>
                  </div>

                  {/* RORO */}
                  <div className="border border-border p-5">
                    <div className="font-medium text-navy">
                      Transport RoRo
                    </div>

                    <div className="text-sm text-navy/60 mt-1">
                      Sur devis selon destination
                    </div>

                    <button
                      onClick={() =>
                        setSelected((prev) => {
                          const exists = prev.find((x) => x.id === "maritime-roro");

                          if (exists) {
                            return prev.filter((x) => x.id !== "maritime-roro");
                          }

                          return [
                            ...prev,
                            {
                              id: "maritime-roro",
                              title: "Transport maritime RoRo",
                              price: null,
                              quantity: 1,
                              isQuote: true,
                            },
                          ];
                        })
                      }
                      className="mt-4 w-full border border-border px-3 py-2 hover:border-gold"
                    >
                      Ajouter
                    </button>
                  </div>

                </div>

                {/* =========================
                  LOGISTIQUE LIÉE (IMPORTANT)
                ========================= */}

                <div className="mt-8 border-t border-border pt-6">
                  <h3 className="font-medium text-navy mb-4">
                    Informations logistiques
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">

                    <input
                      placeholder="Pays / Ville de chargement"
                      className="w-full p-3 border border-border"
                      onChange={(e) =>
                        setForm({ ...form, loadingPlace: e.target.value })
                      }
                    />

                    <input
                      placeholder="Pays / Ville de livraison"
                      className="w-full p-3 border border-border"
                      onChange={(e) =>
                        setForm({ ...form, deliveryPlace: e.target.value })
                      }
                    />

                    <input
                      placeholder="Type de marchandise (ex: véhicule, conteneur…)"
                      className="w-full p-3 border border-border"
                      onChange={(e) =>
                        setForm({ ...form, cargoType: e.target.value })
                      }
                    />

                    <input
                      placeholder="Poids (kg)"
                      className="w-full p-3 border border-border"
                      onChange={(e) =>
                        setForm({ ...form, weight: e.target.value })
                      }
                    />

                    <input
                      type="date"
                      className="w-full p-3 border border-border"
                      onChange={(e) =>
                        setForm({ ...form, loadingDate: e.target.value })
                      }
                    />

                    <input
                      type="date"
                      className="w-full p-3 border border-border"
                      onChange={(e) =>
                        setForm({ ...form, deliveryDate: e.target.value })
                      }
                    />

                  </div>

                  <textarea
                    placeholder="Message complémentaire"
                    className="w-full mt-4 p-3 border border-border"
                    maxLength={180}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  />
                </div>
              </div>
            {/* FORM */}
            <div className="bg-card border border-border p-8">
              <h2 className="font-serif text-2xl text-navy mb-6">
                Vos coordonnées
              </h2>

              <input
                placeholder="Nom"
                className="w-full p-3 border mb-3"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                placeholder="Email"
                className="w-full p-3 border mb-3"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <input
                placeholder="Téléphone"
                className="w-full p-3 border"
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 bg-card border border-border p-6">

              <h3 className="font-serif text-xl text-navy">
                Votre devis estimé
              </h3>

              <div className="mt-4 space-y-2">
                {selected.map((s) => (
                <div key={s.id} className="flex justify-between text-sm mb-2">
                  <span>
                    {s.title}
                    {s.option && ` (${s.option})`}
                    {s.quantity > 1 && ` x${s.quantity}`}
                  </span>

                  <span className="text-navy">
                    {s.price === null ? (
                      <span className="text-gold italic">Sur devis</span>
                    ) : (
                      `${s.price * s.quantity} €`
                    )}
                  </span>
                </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border flex justify-between">
                <span className="font-medium text-navy">
                  Total estimé
                </span>
                <span className="font-serif text-2xl text-gold">
                  {total} €
                </span>
              </div>

              <button
                onClick={submit}
                className="mt-6 w-full bg-gold text-navy py-3 hover:bg-navy hover:text-cream transition"
              >
                Envoyer le devis <Check className="inline size-4 ml-2" />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
