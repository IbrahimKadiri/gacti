import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";
import { motion } from "framer-motion";

export function WhatsAppFab() {
  const href = `https://wa.me/${SITE.phoneRaw.replace("+", "")}?text=${encodeURIComponent(
    SITE.whatsappMessage
  )}`;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp GACTI"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 18 }}
      className="fixed bottom-6 right-6 z-40 group"
    >
      <span className="absolute inset-0 rounded-full bg-gold/40 animate-ping" />
      <span className="relative flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl shadow-navy/30 hover:scale-105 transition-transform">
        <MessageCircle className="size-5" />
        <span className="hidden sm:inline text-sm font-medium pr-1">WhatsApp</span>
      </span>
    </motion.a>
  );
}
