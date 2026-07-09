"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ShinyText from "./ShinyText";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const clipReveal = useTransform(scrollYProgress, (v) => {
    const pct = v * 100;
    return `inset(0 0 ${pct}% 0)`;
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.85, 1],
    [1, 1, 0, 0],
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.5, 0.85, 1],
    [0, 0, -30, -30],
  );

  const nameOpacity = useTransform(scrollYProgress, [0.6, 0.9], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen text-white overflow-hidden flex flex-col bg-[#e7cb73]">
      <div className="flex-1 flex items-center justify-center relative z-30">
        <div className="px-6 py-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center -mt-12 md:-mt-16 mb-2"
          >
            <img
              src="/cross.png"
              alt=""
              className="w-32 h-32 md:w-40 md:h-40 object-contain"
            />
          </motion.div>

          <motion.div
            className="max-w-sm mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-xl md:text-2xl font-black leading-[1.2] font-sans font-semibold text-center">
              <span className="inline bg-white px-1 whitespace-nowrap max-md:whitespace-normal max-md:text-[22px]">
                <ShinyText
                  text="I design and craft"
                  color="rgba(0,0,0,0.9)"
                  shineColor="#333333"
                  speed={3}
                  className="inline"
                />
              </span>
              <br />
              <span className="inline bg-white px-1 whitespace-nowrap max-md:whitespace-normal max-md:text-[22px]">
                <ShinyText
                  text="beautiful websites that solve"
                  color="rgba(0,0,0,0.9)"
                  shineColor="#333333"
                  speed={3}
                  className="inline"
                />
              </span>
              <br />
              <span className="inline bg-white px-1 whitespace-nowrap max-md:whitespace-normal max-md:text-[22px]">
                <ShinyText
                  text="real business tasks."
                  color="rgba(0,0,0,0.9)"
                  shineColor="#333333"
                  speed={3}
                  className="inline"
                />
              </span>
            </p>
          </motion.div>

          <div style={{ height: "2rem" }} />

          <motion.div
            className="max-w-sm mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p className="text-xl md:text-2xl font-black leading-[1.2] font-sans font-semibold text-center">
              <span className="inline bg-white px-1 whitespace-nowrap max-md:whitespace-normal max-md:text-[22px]">
                <ShinyText
                  text="My aim is to create work"
                  color="rgba(0,0,0,0.9)"
                  shineColor="#333333"
                  speed={3}
                  className="inline"
                />
              </span>
              <br />
              <span className="inline bg-white px-1 whitespace-nowrap max-md:whitespace-normal max-md:text-[22px]">
                <ShinyText
                  text="that is meaningful, meticulously"
                  color="rgba(0,0,0,0.9)"
                  shineColor="#333333"
                  speed={3}
                  className="inline"
                />
              </span>
              <br />
              <span className="inline bg-white px-1 whitespace-nowrap max-md:whitespace-normal max-md:text-[22px]">
                <ShinyText
                  text="crafted, and actually useful."
                  color="rgba(0,0,0,0.9)"
                  shineColor="#333333"
                  speed={3}
                  className="inline"
                />
              </span>
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute inset-0 max-md:hidden z-20"
        style={{ clipPath: clipReveal, scale: imageScale }}
      >
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center" />
      </motion.div>
      <motion.div
        className="absolute inset-0 md:hidden z-20"
        style={{ clipPath: clipReveal, scale: imageScale }}
      >
        <div className="absolute inset-0 bg-[url('/hero-mobile.jpg')] bg-cover bg-center" />
      </motion.div>

      <motion.div
        className="w-full relative z-30"
        style={{ opacity: nameOpacity }}
      >
        <p className="font-pulchella font-medium text-blue-400 text-[clamp(5rem,22vw,36rem)] max-md:text-[clamp(5rem,22vw,36rem)] leading-[0.8] text-center select-none pointer-events-none scale-y-[1.5] max-md:scale-y-[2] md:translate-y-8">
          AnideDevan
        </p>
      </motion.div>
    </section>
  );
}
