"use client";

import { motion } from "framer-motion";

const principles = [
  {
    number: "01",
    title: "Outcomes first, aesthetics second",
    description:
      "Every creative decision is interrogated against one question: does this actually serve the brand's growth?",
  },
  {
    number: "02",
    title: "All in or nothing",
    description:
      "Fewer projects, deeper focus. When I commit to your brand, I'm fully present and responsible for the result.",
  },
  {
    number: "03",
    title: "Human-first, always",
    description:
      "Behind every brand is a person with real stakes. The most powerful experiences feel unmistakably human.",
  },
  {
    number: "04",
    title: "Intention over speed",
    description:
      "Rushed work compounds into regret. Every layer earns its place before we move to the next.",
  },
];

export default function Principles() {
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
              Philosophy
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black">
              My principles
            </h2>
          </motion.div>

          <div className="space-y-8">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.number}
                className="border-b border-black/10 pb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-6 md:gap-12">
                  <span className="text-xs font-mono text-black/30 mt-1 shrink-0 w-8">
                    {principle.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-3">
                      {principle.title}
                    </h3>
                    <p className="text-base text-black/50 leading-relaxed max-w-2xl">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
