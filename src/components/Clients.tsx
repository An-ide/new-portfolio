"use client";

import { motion } from "framer-motion";

const clients = [
  "TechCorp", "Aether Studio", "Muse Media",
  "Vertex Inc", "Pulse Labs", "Drift Co",
  "Nova Group", "BuildRight",
];

export default function Clients() {
  return (
    <section className="relative bg-transparent text-black overflow-hidden">
      <div className="section-divider mx-auto max-w-7xl" />
      <div className="section-padding py-16 md:py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.p
            className="text-xs font-mono text-black/40 tracking-[0.2em] uppercase mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Brands I&apos;ve worked with
          </motion.p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
            {clients.map((client, i) => (
              <motion.span
                key={client}
                className="text-sm md:text-base font-medium text-black/30 tracking-wide"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                {client}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
