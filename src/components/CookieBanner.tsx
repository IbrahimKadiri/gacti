import { useEffect, useState } from "react";

const COOKIE_KEY = "gacti_cookie_consent";

type Consent = "accepted" | "rejected" | null;

export function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_KEY) as Consent;
    if (!saved) {
      setVisible(true);
    } else {
      setConsent(saved);
    }
  }, []);

  const handleAccept = () => {
  localStorage.setItem("gacti_cookie_consent", "accepted");

  window.dispatchEvent(
    new CustomEvent("cookie-consent-changed")
  );

  setVisible(false);
};

const handleReject = () => {
  localStorage.setItem("gacti_cookie_consent", "rejected");

  window.dispatchEvent(
    new CustomEvent("cookie-consent-changed")
  );

  setVisible(false);
};

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-[9999]">
      <div className="bg-navy text-cream border border-cream/10 shadow-xl p-5 backdrop-blur-md">
        
        <h3 className="font-serif text-lg text-gold">
          Cookies & confidentialité
        </h3>

        <p className="mt-2 text-sm text-cream/70 leading-relaxed">
          Nous utilisons Google Maps pour afficher nos emplacements.
          Vous pouvez accepter ou refuser les cookies liés aux services externes.
        </p>

        <div className="mt-4 flex gap-3">
          
          <button
            onClick={handleAccept}
            className="flex-1 bg-gold text-navy px-4 py-2 text-sm font-medium hover:bg-cream transition-colors"
          >
            Accepter
          </button>

          <button
            onClick={handleReject}
            className="flex-1 border border-cream/20 text-cream px-4 py-2 text-sm hover:border-gold hover:text-gold transition-colors"
          >
            Refuser
          </button>

        </div>

        <p className="mt-3 text-[11px] text-cream/40">
          En refusant, certaines fonctionnalités (comme Google Maps) seront désactivées.
        </p>

      </div>
    </div>
  );
}
