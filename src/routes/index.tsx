import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Ship, Car, Package, FileText, Quote, Compass, ShieldCheck, Clock } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { SITE } from "@/lib/site";

import heroPort from "@/assets/hero-port.jpg";
import portAerial from "@/assets/port-aerial.jpg";
import transitImg from "@/assets/transit-vehicles.jpg";
import vehiclesImg from "@/assets/vehicles-find.jpg";
import productsImg from "@/assets/products.jpg";
import maritimeImg from "@/assets/maritime.jpg";

const ldJson = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "GACTI — Groupe Abid de Commerce et Transports Internationaux",
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    addressCountry: "FR",
    addressLocality: "Marseille",
    streetAddress: "Proche des ports d'export",
  },
  areaServed: ["FR", "MA", "TN", "DZ", "SN", "CI", "CM", "AE"],
  description:
    "Spécialiste du transit véhicules, transport maritime international et distribution agroalimentaire.",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GACTI — Vos exports, orchestrés avec précision" },
      {
        name: "description",
        content:
          "Transit véhicules, transport maritime et distribution agroalimentaire. 15+ ans d'expertise, 30+ pays desservis. Devis express en moins de 24h.",
      },
      { property: "og:title", content: "GACTI — Vos exports, orchestrés avec précision" },
      {
        property: "og:description",
        content:
          "Spécialiste français du transit véhicules et transport maritime international. Devis express sous 24h.",
      },
      { property: "og:image", content: heroPort },
      { name: "twitter:image", content: heroPort },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(ldJson) },
    ],
  }),
  component: Index,
});

const stats = [
  { value: "15+", label: "Années d'expertise" },
  { value: "2 000+", label: "Véhicules exportés" },
  { value: "30+", label: "Pays desservis" },
  { value: "98%", label: "Clients satisfaits" },
];

const services = [
  {
    title: "Transit véhicules",
    desc: "Formalités douanières, immatriculation provisoire et préparation à l'expédition.",
    icon: Car,
    img: transitImg,
    to: "/transit",
  },
  {
    title: "Trouver votre véhicule",
    desc: "Sourcing sur mesure auprès de notre réseau international de fournisseurs.",
    icon: Compass,
    img: vehiclesImg,
    to: "/vehicules",
  },
  {
    title: "Catalogues produits",
    desc: "Distribution agroalimentaire de qualité — GIAS, Bonna et produits divers.",
    icon: Package,
    img: productsImg,
    to: "/catalogues",
  },
  {
    title: "Transport maritime",
    desc: "Solutions sur mesure, conteneurs et destinations Afrique, Moyen-Orient, Monde.",
    icon: Ship,
    img: maritimeImg,
    to: "/transport",
  },
] as const;

const testimonials = [
  {
    name: "Sayah Adam",
    place: "Maroc",
    quote:
      "Excellente expérience avec GACTI. Les démarches d'immatriculation ont été rapides et transparentes.",
  },
  {
    name: "Nitcha Hakim",
    place: "Tunisie",
    quote:
      "Service impeccable pour le transit de mon véhicule. Suivi constant et équipe très professionnelle.",
  },
  {
    name: "Cressier Dominique",
    place: "Professionnel",
    quote:
      "Entreprise fiable et à l'écoute. Service de mise à disposition parfaitement organisé.",
  },
];

function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden bg-navy">
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <img
            src={heroPort}
            alt="Port d'export GACTI au coucher du soleil"
            className="w-full h-full object-cover"
            width={1920}
            height={1280}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/40" />
        </motion.div>

        <div className="container-x relative pt-32 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-gold"
          >
            <span className="w-10 h-px bg-gold" />
            Groupe Abid · Marseille
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-serif text-cream text-balance leading-[0.98] text-[clamp(2.75rem,7vw,6.5rem)]"
          >
            Vos exports,<br />
            <span className="italic text-gold">orchestrés</span> avec précision.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 max-w-2xl text-lg md:text-xl text-cream/75 text-pretty"
          >
            Depuis 15 ans, GACTI accompagne particuliers et professionnels dans le transit
            international de véhicules, le transport maritime et la distribution agroalimentaire,
            au cœur des grands ports français.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/devis"
              className="group inline-flex items-center gap-3 bg-gold text-navy px-7 py-4 text-base hover:bg-cream transition-colors"
            >
              Devis express <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/transit"
              className="inline-flex items-center gap-3 border border-cream/30 text-cream px-7 py-4 text-base hover:bg-cream/10 transition-colors"
            >
              Découvrir nos services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-navy text-cream border-t border-cream/10">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-cream/10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="py-10 md:py-12 px-2 text-center md:text-left first:pl-0">
              <div className="font-serif text-4xl md:text-5xl text-gold">{s.value}</div>
              <div className="mt-2 text-xs tracking-[0.2em] uppercase text-cream/60">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 md:py-32 container-x">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <Reveal className="md:col-span-5">
            <div className="text-xs tracking-[0.25em] uppercase text-gold flex items-center gap-3">
              <span className="w-8 h-px bg-gold" /> Nos métiers
            </div>
            <h2 className="mt-5 font-serif text-4xl md:text-6xl text-navy leading-[1.05] text-balance">
              Quatre expertises,<br /><span className="italic">une seule</span> exigence.
            </h2>
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7 self-end" delay={0.1}>
            <p className="text-lg text-navy/70 text-pretty">
              Du sourcing à la livraison finale, nous orchestrons chaque étape avec la même
              rigueur. Notre savoir-faire couvre l'intégralité de la chaîne d'export.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <Link
                to={s.to}
                className="group block bg-card border border-border overflow-hidden hover:shadow-2xl hover:shadow-navy/10 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <s.icon className="size-6 text-gold" />
                  <h3 className="mt-4 font-serif text-2xl text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm text-navy/65 leading-relaxed">{s.desc}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm text-navy group-hover:text-gold transition-colors">
                    En savoir plus <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* APPROACH — editorial */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-x grid md:grid-cols-12 gap-12 items-center">
          <Reveal className="md:col-span-5">
            <div className="text-xs tracking-[0.25em] uppercase text-gold flex items-center gap-3">
              <span className="w-8 h-px bg-gold" /> Notre approche
            </div>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl text-navy leading-[1.05]">
              Une logistique <span className="italic">sur mesure</span>, jamais standardisée.
            </h2>
            <p className="mt-6 text-navy/70 text-lg leading-relaxed">
              Chaque dossier est unique. Nous écoutons vos contraintes, étudions la destination,
              les délais, les formalités douanières — puis construisons une solution dédiée. Pas
              de processus rigide : une équipe humaine, joignable, qui suit votre expédition de
              bout en bout.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: ShieldCheck, label: "Fiabilité" },
                { icon: Clock, label: "Réactivité" },
                { icon: Compass, label: "Expertise" },
              ].map((v) => (
                <div key={v.label} className="border-l-2 border-gold pl-4">
                  <v.icon className="size-5 text-gold" />
                  <div className="mt-2 text-sm font-medium text-navy">{v.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="md:col-span-7" delay={0.15}>
            <div className="relative aspect-[4/5] md:aspect-[5/6] overflow-hidden">
              <img
                src={transitImg}
                alt="Préparation des véhicules à l'export"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-navy/85 text-cream p-6 backdrop-blur-sm">
                <div className="text-xs tracking-[0.25em] uppercase text-gold mb-2">Au cœur du port</div>
                <p className="text-sm leading-relaxed">
                  Une implantation stratégique au plus près des terminaux, pour des délais maîtrisés.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CINEMATIC BREAK */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <motion.img
          src={portAerial}
          alt="Vue aérienne du port"
          loading="lazy"
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/30" />
        <div className="container-x relative h-full flex items-end pb-16 md:pb-24">
          <Reveal>
            <p className="font-serif italic text-cream text-3xl md:text-5xl max-w-3xl text-balance">
              « Chaque conteneur qui quitte le port porte la signature d'un travail méticuleux. »
            </p>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32 container-x">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <div className="text-xs tracking-[0.25em] uppercase text-gold flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-gold" /> Ils nous font confiance
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl text-navy text-balance">
              Des clients aux <span className="italic">quatre coins</span> du monde.
            </h2>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="h-full bg-card border border-border p-8 md:p-10 flex flex-col">
                <Quote className="size-8 text-gold" />
                <blockquote className="mt-5 font-serif text-xl text-navy leading-snug text-balance flex-1">
                  « {t.quote} »
                </blockquote>
                <figcaption className="mt-8 pt-6 border-t border-border">
                  <div className="font-medium text-navy">{t.name}</div>
                  <div className="text-sm text-navy/60">{t.place}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
