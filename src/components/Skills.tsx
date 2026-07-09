"use client";

import { motion } from "framer-motion";

const skills = [
  { title: "Brand Identity", description: "Strategy, visual language, guidelines" },
  { title: "UI/UX Design", description: "Wireframes, prototypes, user flows" },
  { title: "Web Design", description: "Responsive sites, landing pages" },
  { title: "Art Direction", description: "Visual storytelling, campaign creative" },
  { title: "Typography", description: "Custom type, editorial layout" },
  { title: "Motion Design", description: "Animation, micro-interactions" },
];

export default function Skills() {
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
            <p className="text-xs font-mono text-black/40 tracking-widest uppercase mb-4">
              Expertise
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black">
              Services
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                className="border border-black/10 p-8 hover:bg-black/5 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <p className="text-xs font-mono text-black/20 mb-4">
                  {(index + 1).toString().padStart(2, "0")}
                </p>
                <h3 className="text-xl font-semibold mb-3 text-black">{skill.title}</h3>
                <p className="text-sm text-black/50">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
