"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "For years, our website struggled to showcase our work effectively. Within 30 days of launch, we generated $100K in new sales.",
    author: "Alex Chen",
    role: "Founder, TechCorp",
  },
  {
    quote:
      "A rare collaborator who cares about your vision as if it were their own. Talented, humble, and relentless in finding elegant solutions.",
    author: "Sarah Kim",
    role: "Creative Director, Aether Studio",
  },
  {
    quote:
      "Lead management improved significantly. The design is not only impressive but innovative — it truly stands out.",
    author: "Marcus Johnson",
    role: "CEO, Nova Group",
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-transparent text-black overflow-hidden">
      <div className="section-divider mx-auto max-w-7xl" />
      <div className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-mono text-black/40 tracking-[0.2em] uppercase mb-4">
              Testimonials
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black">
              Client stories
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                className="border border-black/10 p-8 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <p className="text-5xl text-black/10 mb-4 leading-none font-serif">&ldquo;</p>
                <p className="text-sm text-black/60 leading-relaxed flex-1">{t.quote}</p>
                <div className="mt-6 pt-6 border-t border-black/10">
                  <p className="text-sm font-semibold text-black">{t.author}</p>
                  <p className="text-xs font-mono text-black/40 mt-1">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
