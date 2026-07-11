"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Kerala Waterfall Finder",
    year: "2024",
    typ: "Interactive Map",
    url: "https://casscade.vercel.app",
    shot: "/screenshots/kerala-waterfall.jpg",
    note: "Every waterfall in Kerala, fetched live from Wikidata and plotted on a dark Leaflet map. Search, filter by height, explore detailed info panels.",
    stack: ["Leaflet", "Wikidata", "Vite"],
  },
  {
    title: "Chris Cornell Tribute",
    year: "2024",
    typ: "Tribute",
    url: "https://chriscornell.vercel.app",
    shot: "/screenshots/chris-cornell.jpg",
    note: "A visual tribute to the life and music of Chris Cornell. Clean, responsive design built with Vite — fast, focused, the content does the work.",
    stack: ["Vite", "Vanilla JS"],
  },
  {
    title: "Ephemeral Pastebin",
    year: "2024",
    typ: "Utility",
    url: "https://epastebin.netlify.app",
    shot: "/screenshots/ephemeral-pastebin.jpg",
    note: "Privacy-first pastebin where shared text automatically expires. No accounts, no tracking — just temporary sharing that cleans up after itself.",
    stack: ["Netlify", "Express"],
  },
  {
    title: "Heritage India",
    year: "2023",
    typ: "Cultural",
    url: "https://heritage-ind.vercel.app",
    shot: "/screenshots/heritage-india.jpg",
    note: "A digital showcase of India's rich cultural heritage. Built to make tradition feel modern — immersive visuals, thoughtful navigation, authentic storytelling.",
    stack: ["Vite", "GSAP"],
  },
  {
    title: "Fix Your Grammar",
    year: "2024",
    typ: "Utility",
    url: "https://fix-your-grammar.vercel.app",
    shot: "/screenshots/fix-your-grammar.jpg",
    note: "AI-powered grammar checker that cleans up your writing in seconds. Powered by LanguageTool, built with Express and EJS for instant feedback.",
    stack: ["Express", "EJS", "LanguageTool"],
  },
  {
    title: "SpicX",
    year: "2024",
    typ: "Food",
    url: "https://spicx.vercel.app",
    shot: "/screenshots/booties.jpg",
    note: "A spice discovery app that helps you explore flavors and find perfect pairings. Built for cooks who want to experiment beyond the recipe.",
    stack: ["Vite", "React"],
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth;
      };

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,

        }
      });
      return () => {
        tween.kill();
      };
    });

    mm.add("(max-width: 767px)", () => {
      const cards = section.querySelectorAll<HTMLElement>(".work-card");
      cards.forEach((card, i) => {
        const img = card.querySelector<HTMLElement>(".work-card-img");
        const isEven = i % 2 === 0;

        gsap.fromTo(card,
          { opacity: 0, x: isEven ? -60 : 60, y: 40 },
          {
            opacity: 1, x: 0, y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            }
          }
        );

        if (img) {
          gsap.fromTo(img,
            { scale: 1.1, y: 30 },
            {
              scale: 1, y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              }
            }
          );
        }
      });
    });

    const children = section.querySelectorAll<HTMLElement>(":scope > :not(.skip-reveal)");
    children.forEach(child => {
      gsap.fromTo(child,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 85%", once: true } }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <>
    <section id="work" ref={sectionRef} className="relative bg-[#f2f0eb] text-black md:h-screen overflow-hidden pt-24 pb-32 md:pt-0 md:pb-24">
      {/* Fixed Title inside the pinned section (Desktop) or static (Mobile) */}
      <div className="work-title-wrap md:absolute left-8 md:top-24 md:left-24 z-20 pointer-events-none max-md:!mb-12 md:mt-0 md:mb-0 max-md:!pl-5 max-md:!pr-4 md:px-0">
        <style>{`
          @media (max-width: 767px) {
            .work-title-wrap { padding-top: clamp(60px, 10vw, 120px); }
          }
        `}</style>
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-black"
        >
          <div style={{ width: "fit-content" }} className="bg-white px-1 whitespace-nowrap mb-5 shadow-sm">
            Selected
          </div>
          <div style={{ width: "fit-content" }} className="bg-white px-1 whitespace-nowrap mb-5 shadow-sm">
            works
          </div>
        </motion.h2>
      </div>

      {/* Horizontal Track (Desktop) / Vertical Stack (Mobile) */}
      <div ref={trackRef} className="h-auto md:h-full flex flex-col md:flex-row md:flex-nowrap items-center md:items-start px-8 relative z-10 w-full md:w-fit gap-16 md:gap-24 max-md:!pt-24" style={{ paddingTop: "12rem" }}>
        {/* Spacer to guarantee first project starts precisely in the visible middle without overflowing right */}
        <div className="hidden md:block flex-shrink-0" style={{ width: "25vw" }}></div>
        
        {projects.map((p, i) => (
          <div key={p.title} className="work-card w-full md:w-[65vw] h-auto md:h-[75vh] flex-shrink-0 flex flex-col md:flex-row items-center justify-center gap-12 md:pr-[25vw]">

             {/* Uncropped Whole Screenshot Display */}
             <div className="w-full max-md:w-10/12 md:w-7/12 relative flex items-center justify-center">
                <div className="work-card-img relative w-full aspect-video pointer-events-auto rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl bg-[#ebe9e1]">
                   <Image
                     src={p.shot}
                     alt={p.title}
                     fill
                     className="object-cover object-top"
                   />
                </div>
             </div>
             
             {/* Text Minimalist Block */}
             <div className="w-full md:w-5/12 flex flex-col gap-6 text-black text-center md:text-left max-md:items-center">
                <div className="max-md:w-fit max-md:mx-auto">
                   <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
                      {p.title}
                   </h3>
                   <p className="text-base md:text-lg font-medium text-black/70 max-md:w-full md:max-w-sm mx-auto md:mx-0 leading-relaxed max-md:text-center">
                      {p.note}
                   </p>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                   {p.stack.map(tech => (
                     <span key={tech} className="px-3 py-1.5 bg-black/5 rounded-sm text-[10px] font-bold tracking-widest uppercase text-black/80">
                       {tech}
                     </span>
                   ))}
                </div>

                <div className="mt-6">
                   <a
                     href={p.url}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-4 px-8 py-4 bg-black text-white rounded-sm font-black text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-black/80 hover:px-10 shadow-lg"
                   >
                     Go to Website
                   </a>
                </div>
             </div>
             
          </div>
        ))}
      </div>
    </section>
    <div className="bg-[#f2f0eb] h-32 md:h-48" />
    </>
  );
}
