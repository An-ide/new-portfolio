"use client"

import { motion } from "framer-motion"
import { CenterUnderline, ComesInGoesOutUnderline, GoesOutComesInUnderline } from "./UnderlineAnimations"

export default function Contact() {
  return (
    <section id="contact" className="relative bg-transparent text-black overflow-hidden">
      <div className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-mono text-black/40 tracking-widest uppercase mb-6">
              Contact
            </p>
            <ul className="flex flex-col gap-2.5">
              <li><CenterUnderline label="LINKEDIN" className="text-sm font-medium text-black/70" /></li>
              <li><ComesInGoesOutUnderline label="INSTAGRAM" direction="right" className="text-sm font-medium text-black/70" /></li>
              <li><ComesInGoesOutUnderline label="X (TWITTER)" direction="left" className="text-sm font-medium text-black/70" /></li>
              <li><GoesOutComesInUnderline label="FANCY@FANCY.DEV" direction="left" className="text-sm font-medium text-black/70" /></li>
              <li><GoesOutComesInUnderline label="HELLO@FANCY.DEV" direction="right" className="text-sm font-medium text-black/70" /></li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
