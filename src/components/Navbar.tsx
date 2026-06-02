import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/site";
import logoGacti from "@/assets/logo-gacti.png";

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

  const wa = `https://wa.me/${SITE.phoneRaw.replace("+", "")}?text=${encodeURIComponent(
    SITE.whatsappMessage
  )}`;

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 backdrop-saturate-150 ${
          scrolled || open
            ? "bg-cream/80 backdrop-blur-xl border-b border-border/40 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container-x flex items-center justify-between h-16 sm:h-20">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            onClick={() => setOpen(false)}
            aria-label="GACTI — accueil"
          >
            <img
              src={logoGacti}
              alt="GACTI"
              className="h-24 sm:h-28 w-auto object-contain transition-opacity group-hover:opacity-80"
            />
          </Link>

          {/* DESKTOP NAV (UPGRADED) */}
          <nav
            className="hidden lg:flex items-center gap-10 xl:gap-12"
            aria-label="Navigation principale"
          >
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="group relative flex flex-col leading-none"
                activeOptions={{ exact: l.to === "/" }}
              >
               

                {/* LABEL */}
                <span className="text-sm font-medium tracking-wide text-navy/70 group-hover:text-navy transition-colors">
                  {l.label}
                </span>

                {/* UNDERLINE */}
                <span className="mt-1 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-3 relative z-[60]">

            <Link
              to="/devis"
              className="hidden sm:inline-flex items-center gap-2 bg-navy text-cream px-5 py-2.5 text-xs lg:text-sm tracking-wide hover:bg-gold hover:text-navy transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Devis express
              <ArrowRight className="size-4" />
            </Link>

            <button
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
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

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40 bg-navy text-cream overflow-y-auto"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse at top right, rgba(212,175,55,0.15) 0%, transparent 60%)",
              }}
            />

            <div className="relative container-x pt-24 pb-10 min-h-full flex flex-col">

              <div className="text-[10px] tracking-[0.3em] uppercase text-gold/80 flex items-center gap-3">
                <span className="w-8 h-px bg-gold/60" /> Menu
              </div>

              <nav className="mt-8 flex-1">
                <ul className="divide-y divide-cream/10">
                  {links.map((l, i) => (
                    <motion.li
                      key={l.to}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        to={l.to}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline justify-between py-4 sm:py-5 hover:bg-white/5 px-2 transition-colors"
                        activeOptions={{ exact: l.to === "/" }}
                      >
                        <span className="flex items-baseline gap-4 sm:gap-5">
                          <span className="text-[10px] tracking-[0.2em] text-cream/40 font-mono">
                            {l.num}
                          </span>
                          <span className="font-serif text-3xl sm:text-4xl text-cream group-hover:text-gold transition-colors">
                            {l.label}
                          </span>
                        </span>

                        <ArrowRight className="size-4 text-cream/40 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8 pt-8 border-t border-cream/10 space-y-4">

                <Link
                  to="/devis"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between bg-gold text-navy px-5 py-4 text-sm tracking-wide hover:bg-cream transition-colors"
                >
                  <span className="font-medium">Devis express · réponse 24 h</span>
                  <ArrowRight className="size-4" />
                </Link>

                <div className="grid grid-cols-3 gap-3">

                  <a href={`tel:${SITE.phoneRaw}`} className="flex flex-col items-center justify-center gap-1.5 border border-cream/15 hover:border-gold hover:text-gold py-3 transition-colors">
                    <Phone className="size-4" />
                    <span className="text-[10px] uppercase tracking-widest">Appeler</span>
                  </a>

                  <a href={`mailto:${SITE.email}`} className="flex flex-col items-center justify-center gap-1.5 border border-cream/15 hover:border-gold hover:text-gold py-3 transition-colors">
                    <Mail className="size-4" />
                    <span className="text-[10px] uppercase tracking-widest">Email</span>
                  </a>

                  <a href={wa} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1.5 border border-cream/15 hover:border-gold hover:text-gold py-3 transition-colors">
                    <MessageCircle className="size-4" />
                    <span className="text-[10px] uppercase tracking-widest">WhatsApp</span>
                  </a>

                </div>

                <div className="text-[11px] text-cream/40 text-center">
                  {SITE.phone} · {SITE.email}
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
