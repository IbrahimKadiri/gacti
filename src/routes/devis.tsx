import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Minus, Trash2, Check, Ship, FileText, Shield, ParkingSquare } from "lucide-react";

export const Route = createFileRoute("/devis")({
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
  { id: "cpi", title: "Carte provisoire", subtitle: "Immatriculation temporaire", price: 60, icon: FileText },
  { id: "plates", title: "Plaques export", subtitle: "Plaques W garage", price: 20, icon: FileText },
];

const variableServices = [
  {
    id: "assurance",
    title: "Assurance temporaire",
    icon: Shield,
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
    icon: ParkingSquare,
    options: [
      { label: "Jour arrivée camion", price: 30 },
      { label: "1 à 2 nuits", price: 50 },
      { label: "Au-delà de 2 nuits", price: 80 },
      { label: "Longue durée", price: 110 },
    ],
  },
];

const maritimeServices = [
  { id: "maritime-container", title: "Transport Conteneur", subtitle: "Chargement en conteneur 20' ou 40'" },
  { id: "maritime-roro", title: "Transport RoRo", subtitle: "Roll-on Roll-off, véhicules roulants" },
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
  const [selected, setSelected] = useState<Item[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    loadingPlace: "", deliveryPlace: "",
    cargoType: "", weight: "",
    loadingDate: "", deliveryDate: "",
    message: "",
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

  const selectOption = (service: typeof variableServices[0], opt: { label: string; price: number }) => {
    setSelected((prev) => {
      const filtered = prev.filter((x) => x.id !== service.id);
      return [...filtered, { id: service.id, title: service.title, price: opt.price, quantity: 1, option: opt.label }];
    });
  };

  const total = useMemo(() =>
    selected.reduce((acc, s) => acc + (s.price ?? 0) * s.quantity, 0),
    [selected]
  );

  const isSelected = (id: string) => !!selected.find((x) => x.id === id);
  const getSelected = (id: string) => selected.find((x) => x.id === id);

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    // EmailJS à connecter ici
    console.log({ selected, form, total });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="pt-32 pb-24 bg-cream min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <Check className="size-8 text-gold" />
          </div>
          <h2 className="font-serif text-3xl text-navy mb-3">Demande envoyée</h2>
          <p className="text-navy/60 mb-8">Notre équipe revient vers vous sous 24h avec une proposition détaillée.</p>
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
                            <div className="flex items-start justify-between gap-1">
                              <div className="text-xs md:text-sm text-navy/70">{opt.label}</div>
                              {active && <Check className="size-3.5 text-gold shrink-0 mt-0.5" />}
                            </div>
                            <div className="font-serif text-gold text-base md:text-lg mt-1">{opt.price} €</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* TRANSPORT MARITIME */}
            <div className="bg-white border border-navy/8 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Ship className="size-5 text-gold" />
                <h2 className="font-serif text-xl md:text-2xl text-navy">Transport maritime</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {maritimeServices.map((s) => {
                  const active = isSelected(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggleMaritime(s)}
                      className={`border p-5 text-left transition-all duration-200 w-full ${
                        active
                          ? "border-gold bg-gold/5 shadow-sm"
                          : "border-navy/10 hover:border-gold/50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className={`font-semibold text-sm md:text-base ${active ? "text-navy" : "text-navy/80"}`}>
                            {s.title}
                          </div>
                          <div className="text-xs text-navy/40 mt-0.5">{s.subtitle}</div>
                          <div className="text-xs text-gold/80 mt-2 italic">Sur devis selon destination</div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          active ? "bg-gold border-gold" : "border-navy/20"
                        }`}>
                          {active && <Check className="size-3 text-white" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* INFOS LOGISTIQUES */}
              <div className="border-t border-navy/8 pt-6">
                <h3 className="font-medium text-navy mb-4 text-sm tracking-wide uppercase">
                  Informations logistiques
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { placeholder: "Pays / Ville de chargement", key: "loadingPlace" },
                    { placeholder: "Pays / Ville de livraison", key: "deliveryPlace" },
                    { placeholder: "Type de marchandise (ex: véhicule, conteneur…)", key: "cargoType" },
                    { placeholder: "Poids estimé (kg)", key: "weight" },
                  ].map(({ placeholder, key }) => (
                    <input
                      key={key}
                      placeholder={placeholder}
                      className="w-full p-3 border border-navy/10 bg-cream/50 text-navy placeholder:text-navy/30 text-sm focus:outline-none focus:border-gold transition-colors"
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    />
                  ))}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-navy/40 pl-1">Date de chargement</label>
                    <input
                      type="date"
                      className="w-full p-3 border border-navy/10 bg-cream/50 text-navy text-sm focus:outline-none focus:border-gold transition-colors"
                      onChange={(e) => setForm({ ...form, loadingDate: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-navy/40 pl-1">Date de livraison souhaitée</label>
                    <input
                      type="date"
                      className="w-full p-3 border border-navy/10 bg-cream/50 text-navy text-sm focus:outline-none focus:border-gold transition-colors"
                      onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })}
                    />
                  </div>
                </div>
                <textarea
                  placeholder="Informations complémentaires…"
                  maxLength={280}
                  rows={3}
                  className="w-full mt-3 p-3 border border-navy/10 bg-cream/50 text-navy placeholder:text-navy/30 text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
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

            {/* SUBMIT MOBILE */}
            <div className="lg:hidden">
              <MobileSummary selected={selected} total={total} onSubmit={handleSubmit} form={form} />
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
                      </div>
                      <div className="shrink-0 font-medium text-navy">
                        {s.price === null
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
                disabled={!form.name || !form.email || selected.length === 0}
                className="w-full bg-navy text-cream py-3.5 text-sm font-medium tracking-wide hover:bg-gold hover:text-navy transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Envoyer le devis <Check className="size-4" />
              </button>

              <p className="text-xs text-navy/30 text-center mt-3">Réponse garantie sous 24h</p>

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
  selected, total, onSubmit, form
}: {
  selected: Item[];
  total: number;
  onSubmit: () => void;
  form: { name: string; email: string };
}) {
  return (
    <div className="bg-white border border-navy/8 p-6">
      <div className="flex justify-between items-baseline mb-4">
        <h3 className="font-serif text-lg text-navy">Total estimé</h3>
        <span className="font-serif text-2xl text-gold">{total} €</span>
      </div>
      {selected.length > 0 && (
        <div className="space-y-1 mb-4 text-sm text-navy/60">
          {selected.map((s) => (
            <div key={s.id} className="flex justify-between">
              <span>{s.title}{s.option && ` (${s.option})`}</span>
              <span>{s.price === null ? "Sur devis" : `${s.price * s.quantity} €`}</span>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={onSubmit}
        disabled={!form.name || !form.email || selected.length === 0}
        className="w-full bg-navy text-cream py-3.5 text-sm font-medium hover:bg-gold hover:text-navy transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        Envoyer le devis <Check className="size-4" />
      </button>
      <p className="text-xs text-navy/30 text-center mt-2">Réponse garantie sous 24h</p>
    </div>
  );
}
