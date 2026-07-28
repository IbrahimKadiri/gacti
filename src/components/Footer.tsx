import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, FileText } from "lucide-react";
import { SITE } from "@/lib/site";
import logoGactiWhite from "@/assets/logo-gacti-white.avif";

export function Footer() {

  const base = import.meta.env.BASE_URL;

  return (
    <footer className="bg-navy text-cream/80 mt-32 border-t border-cream/10">

      <div className="container-x py-20 grid md:grid-cols-4 gap-12">

        {/* BRAND */}
        <div className="md:col-span-2">

          <Link to="/" className="inline-flex items-center">
            <img
              src={logoGactiWhite}
              alt="GACTI"
              width={120}
              height={120}
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/70">
            {SITE.fullName}. Spécialiste du transit véhicules, transport maritime et
            distribution agroalimentaire depuis plus de 10 ans, au cœur des grands ports français.
          </p>

          <div className="mt-6 text-[11px] tracking-widest uppercase text-cream/40">
            Logistique internationale · Transit · Export maritime
          </div>

        </div>

        {/* NAVIGATION */}
        <div>
          <h4 className="text-cream text-sm tracking-widest uppercase mb-4">
            Navigation
          </h4>

          <ul className="space-y-2 text-sm">
            {[
              ["/transit-vehicules", "Transit véhicules"],
              ["/vehicules", "Trouver un véhicule"],
              ["/catalogues", "Catalogues produits"],
              ["/transport", "Transport maritime"],
              ["/equipe", "Notre équipe"],
              ["/devis-express", "Devis express"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link
                  to={to}
                  className="hover:text-gold transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT + LEGAL */}
        <div>
          <h4 className="text-cream text-sm tracking-widest uppercase mb-4">
            Contact
          </h4>

          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="size-4 mt-0.5 text-gold" />
              <a href={`tel:${SITE.phoneRaw}`} className="hover:text-gold">
                {SITE.phone}
              </a>
            </li>

            <li className="flex items-start gap-2">
              <Mail className="size-4 mt-0.5 text-gold" />
              <a href={`mailto:${SITE.email}`} className="hover:text-gold">
                {SITE.email}
              </a>
            </li>

            <li className="flex items-start gap-2">
              <MapPin className="size-4 mt-0.5 text-gold" />
              <span>{SITE.address}</span>
            </li>
          </ul>

          {/* LEGAL */}
          <div className="mt-8">
            <h4 className="text-cream text-sm tracking-widest uppercase mb-4">
              Légal
            </h4>

            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`${base}legal/cgv.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors inline-flex items-center gap-2"
                >
                  <FileText className="size-3.5" />
                  Conditions générales de vente
                </a>
              </li>

              <li>
                <a
                  href={`${base}legal/mentions-legales.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors inline-flex items-center gap-2"
                >
                  <FileText className="size-3.5" />
                  Mentions légales
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-cream/10">
        <div className="container-x py-6 text-xs text-cream/50 flex flex-col md:flex-row gap-2 justify-between">

          <span>
            © {new Date().getFullYear()} GACTI — {SITE.fullName}
          </span>

          <span className="text-cream/40">
            Site édité avec soin · Tous droits réservés
          </span>

        </div>
      </div>

    </footer>
  );
}
