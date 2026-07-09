"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "We uncover your story",
    description:
      "We dig deep into your brand, surface what makes you irreplaceable, and shape it into sharp positioning and strategy.",
  },
  {
    number: "02",
    title: "We shape your presence",
    description:
      "With your narrative locked, we design a brand and website that feels premium, signals credibility, and drives action.",
  },
  {
    number: "03",
    title: "We launch it into the world",
    description:
      "Your brand goes live as a long-term asset that turns attention into opportunity and attracts the clients you're built for.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative bg-transparent text-black overflow-hidden">
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
              Process
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black">
              How I work
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="border border-black/10 p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="text-6xl md:text-7xl font-bold text-black/10 block mb-6">
                  {step.number}
                </span>
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-black">
                  {step.title}
                </h3>
                <p className="text-sm text-black/50 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
