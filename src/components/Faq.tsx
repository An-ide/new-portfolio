"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How long do projects typically take?",
    a: "Most projects run 8-12 weeks end-to-end. Timelines can flex based on scope, but I set milestones from day one so there are no surprises.",
  },
  {
    q: "What do you need to start working together?",
    a: "We'll discuss your specific needs during a discovery call and I'll provide a tailored proposal. After that, just a signed contract and initial deposit.",
  },
  {
    q: "Can you handle branding, design, and development?",
    a: "Absolutely. My specialty is delivering all three under one roof — narrative, identity, visuals, and functionality aligned from day one.",
  },
  {
    q: "What happens after launch?",
    a: "I provide 30 days of hands-on support to ensure everything runs smoothly. You'll also get documentation and training so your team can manage updates.",
  },
  {
    q: "What is the project investment?",
    a: "Projects typically start from $10K, with most ranging from $15K - $30K depending on scope and complexity.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative bg-transparent text-black overflow-hidden">
      <div className="section-divider mx-auto max-w-7xl" />
      <div className="section-padding relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-mono text-black/40 tracking-[0.2em] uppercase mb-4">
              FAQs
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black">
              Common questions
            </h2>
          </motion.div>

          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-black/10 py-6">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <span className="text-sm md:text-base font-medium tracking-tight pr-8 text-black group-hover:text-black/70 transition-colors">
                    {faq.q}
                  </span>
                  <span
                    className={`text-lg text-black/30 transition-transform duration-300 shrink-0 ${
                      openIndex === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-black/50 leading-relaxed pt-4 pr-8">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
