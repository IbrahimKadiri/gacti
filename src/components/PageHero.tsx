import { motion } from "framer-motion";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
}) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-navy">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.45 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img src={image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/40 to-navy" />
      </motion.div>
      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-gold">
            <span className="w-8 h-px bg-gold" />
            {eyebrow}
          </div>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl text-cream text-balance leading-[1.05]">
            {title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-cream/75 leading-relaxed text-pretty">
            {intro}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
