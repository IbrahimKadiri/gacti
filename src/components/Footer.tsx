import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy text-cream/80 mt-32">
      <div className="container-x py-20 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="font-serif text-3xl text-cream">
            GA<span className="text-gold">C</span>TI
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/70">
            {SITE.fullName}. Spécialiste du transit véhicules, transport maritime et
            distribution agroalimentaire depuis plus de 15 ans, au cœur des grands ports français.
          </p>
        </div>

        <div>
          <h4 className="text-cream text-sm tracking-widest uppercase mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm">
            {[
              ["/transit", "Transit véhicules"],
              ["/vehicules", "Trouver un véhicule"],
              ["/catalogues", "Catalogues produits"],
              ["/transport", "Transport maritime"],
              ["/equipe", "Notre équipe"],
              ["/devis", "Devis express"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-gold transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-cream text-sm tracking-widest uppercase mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="size-4 mt-0.5 text-gold" />
              <a href={`tel:${SITE.phoneRaw}`} className="hover:text-gold">{SITE.phone}</a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="size-4 mt-0.5 text-gold" />
              <a href={`mailto:${SITE.email}`} className="hover:text-gold">{SITE.email}</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="size-4 mt-0.5 text-gold" />
              <span>{SITE.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-x py-6 text-xs text-cream/50 flex flex-col md:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} GACTI — {SITE.fullName}</span>
          <span>Site édité avec soin · Tous droits réservés</span>
        </div>
      </div>
    </footer>
  );
}
