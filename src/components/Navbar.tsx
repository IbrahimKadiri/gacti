import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/site";

const links = [
  { to: "/", label: "Accueil", num: "01" },
  { to: "/transit", label: "Transit", num: "02" },
  { to: "/vehicules", label: "Véhicules", num: "03" },
  { to: "/catalogues", label: "Catalogues", num: "04" },
  { to: "/transport", label: "Transport", num: "05" },
  { to: "/equipe", label: "Équipe", num: "06" },
  { to: "/contact", label: "Contact", num: "07" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const wa = `https://wa.me/${SITE.phoneRaw.replace("+", "")}?text=${encodeURIComponent(SITE.whatsappMessage)}`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "bg-cream/90 backdrop-blur-md border-b border-border/60"
            : "bg-transparent"
        }`}
      >
        <div className="container-x flex items-center justify-between h-16 sm:h-20">
          <Link
            to="/"
            className="flex items-center gap-2 group relative z-[60]"
            onClick={() => setOpen(false)}
            aria-label="GACTI — accueil"
          >
            <span className="font-serif text-xl sm:text-2xl tracking-tight text-navy">
              GA<span className="text-gold">C</span>TI
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 xl:gap-9" aria-label="Navigation principale">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm tracking-wide text-navy/75 hover:text-navy transition-colors relative"
                activeProps={{ className: "text-navy font-medium" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 relative z-[60]">
            <Link
              to="/devis"
              className="hidden sm:inline-flex items-center gap-2 bg-navy text-cream px-4 lg:px-5 py-2 lg:py-2.5 text-xs lg:text-sm tracking-wide hover:bg-gold hover:text-navy transition-colors"
            >
              Devis express <ArrowRight className="size-3.5 lg:size-4" />
            </Link>
            <button
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              aria-controls="primary-mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden text-navy w-11 h-11 flex items-center justify-center -mr-2 hover:bg-navy/5 transition-colors rounded-sm"
            >
              <div className="relative w-5 h-5">
                <span
                  className={`absolute left-0 top-1.5 block h-px w-5 bg-current transition-all duration-300 ${
                    open ? "rotate-45 translate-y-1" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-3.5 block h-px bg-current transition-all duration-300 ${
                    open ? "w-5 -rotate-45 -translate-y-1" : "w-3.5"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="primary-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-40 bg-navy text-cream overflow-y-auto"
          >
            {/* subtle decorative gradient */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse at top right, color-mix(in oklab, var(--gold) 25%, transparent) 0%, transparent 55%)",
              }}
            />

            <div className="relative container-x pt-24 pb-10 min-h-full flex flex-col">
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold/80 flex items-center gap-3">
                <span className="w-8 h-px bg-gold/60" /> Menu
              </div>

              <nav className="mt-8 flex-1" aria-label="Navigation mobile">
                <ul className="divide-y divide-cream/10">
                  {links.map((l, i) => (
                    <motion.li
                      key={l.to}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        to={l.to}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline justify-between py-4 sm:py-5"
                        activeProps={{ className: "[&_.label]:text-gold" }}
                        activeOptions={{ exact: l.to === "/" }}
                      >
                        <span className="flex items-baseline gap-4 sm:gap-5">
                          <span className="text-[10px] tracking-[0.2em] text-cream/40 font-mono">
                            {l.num}
                          </span>
                          <span className="label font-serif text-3xl sm:text-4xl text-cream group-hover:text-gold transition-colors">
                            {l.label}
                          </span>
                        </span>
                        <ArrowRight className="size-4 text-cream/40 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-8 pt-8 border-t border-cream/10 space-y-4"
              >
                <Link
                  to="/devis"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between bg-gold text-navy px-5 py-4 text-sm tracking-wide hover:bg-cream transition-colors"
                >
                  <span className="font-medium">Devis express · réponse 24 h</span>
                  <ArrowRight className="size-4" />
                </Link>
                <div className="grid grid-cols-3 gap-3">
                  <a
                    href={`tel:${SITE.phoneRaw}`}
                    className="flex flex-col items-center justify-center gap-1.5 border border-cream/15 hover:border-gold hover:text-gold py-3 transition-colors"
                    aria-label="Appeler GACTI"
                  >
                    <Phone className="size-4" />
                    <span className="text-[10px] tracking-widest uppercase">Appeler</span>
                  </a>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex flex-col items-center justify-center gap-1.5 border border-cream/15 hover:border-gold hover:text-gold py-3 transition-colors"
                    aria-label="Envoyer un email"
                  >
                    <Mail className="size-4" />
                    <span className="text-[10px] tracking-widest uppercase">Email</span>
                  </a>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-1.5 border border-cream/15 hover:border-gold hover:text-gold py-3 transition-colors"
                    aria-label="Contact WhatsApp"
                  >
                    <MessageCircle className="size-4" />
                    <span className="text-[10px] tracking-widest uppercase">WhatsApp</span>
                  </a>
                </div>
                <div className="pt-2 text-[11px] tracking-wider uppercase text-cream/40 text-center">
                  {SITE.phone} · {SITE.email}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
