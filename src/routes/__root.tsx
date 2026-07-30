import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { CookieBanner } from "@/components/CookieBanner";
import { HeadContent } from '@tanstack/react-router'

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-8xl text-navy">404</h1>
        <h2 className="mt-4 font-serif text-2xl text-navy">Page introuvable</h2>
        <p className="mt-3 text-navy/60">Cette page n'existe pas ou a été déplacée.</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center bg-navy text-cream px-6 py-3 text-sm tracking-wide hover:bg-gold hover:text-navy transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { title: "GACTI — Transit véhicules, transport maritime & export" },
      {
        name: "description",
        content:
          "GACTI — Groupe Abid de Commerce et Transports Internationaux. Spécialiste du transit véhicules, transport maritime et distribution agroalimentaire depuis plus de 4 ans.",
      },
      {
        name: "keywords",
        content:
          "transit véhicules, transport maritime, export Afrique, Marseille, Fos-sur-Mer, immatriculation provisoire, douanes, GACTI, Groupe Abid",
      },
      { name: "author", content: "GACTI" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "format-detection", content: "telephone=no" },
      { httpEquiv: "Content-Language", content: "fr-FR" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "GACTI" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:url", content: "https://gacti.fr" },
      {
        property: "og:image",
        content: "https://gacti.fr/og/hero-port.jpg",
      },
      {
        property: "og:image:width",
        content: "1200",
      },
      {
        property: "og:image:height",
        content: "630",
      },
      {
        property: "og:image:alt",
        content: "GACTI - Transit véhicules et transport maritime",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@gacti" },
      { name: "theme-color", content: "#0A0F1E" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "https://gacti.fr" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});


function RootComponent() {
  return (
    <>
      <HeadContent />
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
      <CookieBanner />
    </>
  );
}
