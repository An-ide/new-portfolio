"use client";

import { motion } from "framer-motion";

export default function Cta() {
  return (
    <section className="relative bg-transparent text-black overflow-hidden">
      <div className="section-divider mx-auto max-w-7xl" />
      <div className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="border border-black/10 p-10 md:p-16">
            <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xs font-mono text-black/40 tracking-[0.2em] uppercase mb-6">
                  Contact
                </p>
                <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-black">
                  Ready to build
                  <br />
                  <span className="text-black/40">something</span>
                  <br />
                  that <span className="italic">moves</span>
                  <br />
                  people?
                </h2>
              </motion.div>
              <motion.div
                className="space-y-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-lg text-black/60 leading-relaxed">
                  Have a project in mind? Let&apos;s talk about how we can bring
                  your vision to life. Tell me about your brand and what
                  you&apos;re looking to achieve.
                </p>
                <a
                  href="mailto:hello@example.com"
                  className="group inline-flex items-center gap-3 text-sm font-mono tracking-[0.1em] uppercase text-white bg-black px-8 py-4 hover:bg-black/80 transition-colors"
                >
                  Start a project
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </a>
                <div className="pt-6 space-y-3">
                  <p className="text-xs font-mono text-black/30 tracking-[0.15em] uppercase">Connect</p>
                  <div className="flex flex-wrap gap-6">
                    {["Email", "LinkedIn", "Instagram", "Dribbble"].map((link) => (
                      <a
                        key={link}
                        href="#"
                        className="text-sm text-black/40 hover:text-black transition-colors"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
