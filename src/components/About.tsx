"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, Fragment } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const p1 = "I build with React, Next.js, TypeScript, Tailwind on the frontend, and PostgreSQL, Prisma, REST APIs on the backend. I've wired up auth, payment flows, CI pipelines, and AI integrations. I care about load times, bundle size, and how the thing actually feels when you use it \u2014 not just how it looks in a screenshot."
const p2 = "I'll work with whatever framework gets the job done. I don't have loyalty to logos. If it ships on time, performs well, and the client is happy, that's what counts. Currently exploring Go, Docker, and figuring out how to build things that don't fall apart when they grow."

function BlurRevealText({ text }: { text: string }) {
  const words = text.split(/\s+/);
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="word" style={{ display: "inline-block", filter: "blur(10px)", opacity: 0.3 }}>
            {word}
          </span>
        </Fragment>
      ))}
    </>
  );
}

function RevealSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>(".word");
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { filter: "blur(10px)", opacity: 0.3, color: "rgba(0,0,0,0.2)" },
        {
          filter: "blur(0px)",
          opacity: 1,
          color: "rgba(0,0,0,0.85)",
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "center 20%",
            scrub: 1,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="text-2xl md:text-5xl leading-[1.35] font-polite font-semibold"
    >
      <div className="flex flex-col gap-10">
        <p>
          <BlurRevealText text={p1} />
        </p>
        <p>
          <BlurRevealText text={p2} />
        </p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative bg-transparent text-black overflow-hidden">
      <div className="section-padding relative z-10">
          <style>{`@media (max-width: 767px) { .about-text { margin-left: 0 !important; margin-right: 0 !important; } }`}</style>
          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-black">
                <div style={{ width: "fit-content" }} className="bg-white px-1 whitespace-nowrap mb-5">
                  Self-taught
                </div>
                <div style={{ width: "fit-content" }} className="bg-white px-1 whitespace-nowrap mb-5">
                  builder
                </div>
              </h2>
            </motion.div>
            <div
              className="about-text max-w-4xl"
              style={{ marginLeft: 'auto', marginRight: '6rem' }}
            >
              <RevealSection />
            </div>
          </div>
      </div>
    </section>
  );
}
