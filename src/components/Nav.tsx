"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MuteButton } from "./MuteButton";
import { useMusic } from "./MusicProvider";

const links = [
  { label: "About",   href: "#about"   },
  { label: "Work",    href: "#work"    },
  { label: "Music",   href: "#music"   },
  { label: "Contact", href: "#contact" },
];

// ─── Section-tint colours (desktop only) ─────────────────────────────────────
const SECTION_COLORS: Record<string, [number, number, number]> = {
  work:    [147, 197, 253],
  music:   [0,   0,   0  ],
  contact: [255, 214, 10 ],
};

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

// ─── Mobile mute button ───────────────────────────────────────────────────────
function MobileMuteButton({ color }: { color: [number, number, number] }) {
  const { muted, toggle } = useMusic();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={muted ? "Unmute music" : "Mute music"}
      className="relative z-[1001] flex items-center justify-center w-9 h-9 rounded-md bg-neutral-900/90 hover:bg-neutral-800 active:scale-95 transition-all duration-150 translate-x-[8px] translate-y-[1px]"
    >
      <MobileSpeakerIcon muted={muted} color={color} />
    </button>
  );
}
function MobileSpeakerIcon({ muted, color }: { muted: boolean; color: [number, number, number] }) {
  const c = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  return (
    <span className="relative inline-block w-5 h-5">
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round"
        className="absolute inset-0 w-full h-full"
        animate={{ opacity: muted ? 0 : 1 }} transition={{ duration: 0.15 }} aria-hidden>
        <path d="M11 4.5L6.5 8H3.5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3L11 19.5V4.5z" />
        <path d="M15.5 8.5a4 4 0 0 1 0 7" /><path d="M18.5 5.5a8 8 0 0 1 0 13" />
      </motion.svg>
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round"
        className="absolute inset-0 w-full h-full"
        animate={{ opacity: muted ? 1 : 0 }} transition={{ duration: 0.15 }} aria-hidden>
        <path d="M11 4.5L6.5 8H3.5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3L11 19.5V4.5z" />
        <line x1="16" y1="9" x2="22" y2="15" /><line x1="22" y1="9" x2="16" y2="15" />
      </motion.svg>
    </span>
  );
}

// ─── GSAP Staggered Panel Menu ────────────────────────────────────────────────
function StaggeredPanel({ onClose }: { onClose: () => void }) {
  const panelRef   = useRef<HTMLDivElement>(null);
  const layer1Ref  = useRef<HTMLDivElement>(null);
  const layer2Ref  = useRef<HTMLDivElement>(null);
  const itemsRef   = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const panel  = panelRef.current;
    const layer1 = layer1Ref.current;
    const layer2 = layer2Ref.current;
    const items  = itemsRef.current.filter(Boolean) as HTMLSpanElement[];

    if (!panel) return;

    gsap.set([layer2, layer1, panel], { xPercent: 100 });
    gsap.set(items, { yPercent: 140, rotate: 10, opacity: 1 });

    const tl = gsap.timeline();
    if (layer2) tl.to(layer2, { xPercent: 0, duration: 0.45, ease: "power4.out" }, 0);
    if (layer1) tl.to(layer1, { xPercent: 0, duration: 0.45, ease: "power4.out" }, 0.07);
    tl.to(panel,  { xPercent: 0, duration: 0.6,  ease: "power4.out" }, 0.14);
    tl.to(items,  { yPercent: 0, rotate: 0, duration: 0.9, ease: "power4.out",
                    stagger: { each: 0.08, from: "start" } }, 0.28);
    return () => { tl.kill(); };
  }, []);

  function handleClose() {
    const panel  = panelRef.current;
    const layer1 = layer1Ref.current;
    const layer2 = layer2Ref.current;
    const items  = itemsRef.current.filter(Boolean) as HTMLSpanElement[];

    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(items, { yPercent: 140, rotate: 10, duration: 0.4, ease: "power4.in",
                   stagger: { each: 0.05, from: "end" } }, 0);
    tl.to(panel,  { xPercent: 100, duration: 0.45, ease: "power4.in" }, 0.05);
    if (layer1) tl.to(layer1, { xPercent: 100, duration: 0.4, ease: "power4.in" }, 0.1);
    if (layer2) tl.to(layer2, { xPercent: 100, duration: 0.4, ease: "power4.in" }, 0.15);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[1001] md:hidden"
        onClick={handleClose}
        aria-label="Close menu"
      />

      {/* Pre-layer 2 (accent strip) */}
      <div
        ref={layer2Ref}
        className="fixed top-0 right-0 h-full w-[70vw] max-w-xs z-[1002] md:hidden pointer-events-none"
        style={{ background: "#1a1a1a" }}
      />
      {/* Pre-layer 1 (slightly lighter strip) */}
      <div
        ref={layer1Ref}
        className="fixed top-0 right-0 h-full w-[70vw] max-w-xs z-[1003] md:hidden pointer-events-none"
        style={{ background: "#111111" }}
      />

      {/* Main panel */}
      <div
        ref={panelRef}
        className="fixed top-0 right-0 h-full w-[70vw] max-w-xs z-[1004] md:hidden flex flex-col pt-32"
        style={{ background: "#2a2a2a", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Top row inside panel */}
        <div className="flex items-center justify-end px-6 pt-5 pb-2">
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-8 h-8 rounded-md text-white/60 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col mt-16 px-6 gap-0 overflow-hidden">
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleClose}
              className="group relative flex items-baseline gap-4 py-4 border-b border-white/[0.07] overflow-hidden"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <span
                ref={(el) => { itemsRef.current[i] = el; }}
                className="font-sans font-semibold text-[3.5rem] leading-none uppercase tracking-[-2px] text-white group-hover:text-[#00d3ff] transition-colors duration-150 inline-block"
                style={{ display: "inline-block" }}
              >
                {link.label}
              </span>
              <span className="ml-auto text-[#00d3ff] text-[18px] font-normal tracking-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 self-center">
                {String(i + 1).padStart(2, "0")}
              </span>
            </a>
          ))}
        </nav>

      </div>
    </>
  );
}

// ─── 3-dot menu button ────────────────────────────────────────────────────────
function MenuToggle({ open, onClick, color }: { open: boolean; onClick: () => void; color: [number, number, number] }) {
  const c = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="relative z-[1001] flex items-center justify-center w-14 h-14 rounded-md active:scale-95 transition-all duration-150"
    >
      <div className="flex flex-col gap-[5px]">
        <motion.span
          className="block w-5 h-[2.5px] rounded-full origin-center"
          style={{ background: c }}
          animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.span
          className="block w-5 h-[2.5px] rounded-full origin-center"
          style={{ background: c }}
          animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block w-5 h-[2.5px] rounded-full origin-center"
          style={{ background: c }}
          animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>
    </button>
  );
}

// ─── Main Nav export ──────────────────────────────────────────────────────────
export default function Nav() {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId]   = useState<string | null>(null);
  const [menuOpen, setMenuOpen]   = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Section-tint scroll tracking (desktop)
  useEffect(() => {
    const onScroll = () => {
      const vh   = window.innerHeight;
      const FADE = vh * 0.4;
      let currentId: string | null = null;
      let currentTop = -Infinity;
      for (const id of Object.keys(SECTION_COLORS)) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= 0 && top > currentTop) { currentTop = top; currentId = id; }
      }
      const order = ["work", "music", "contact"];
      const currentIdx = currentId ? order.indexOf(currentId) : -1;
      const nextId = currentIdx >= 0 && currentIdx < order.length - 1 ? order[currentIdx + 1] : null;
      let baseColor: [number, number, number] = [255, 255, 255];
      let p = 0;
      if (nextId) {
        const nextEl = document.getElementById(nextId);
        if (nextEl) {
          const nextTop = nextEl.getBoundingClientRect().top;
          if (nextTop <= 0) { baseColor = SECTION_COLORS[nextId]; p = 1; }
          else if (nextTop <= FADE) { baseColor = SECTION_COLORS[nextId]; p = 1 - nextTop / FADE; }
          else if (currentId) { baseColor = SECTION_COLORS[currentId]; p = 1; }
        }
      } else if (currentId) { baseColor = SECTION_COLORS[currentId]; p = 1; }
      setActiveId(currentId);
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const base = activeId ? SECTION_COLORS[activeId] : [255, 255, 255];
  const r = Math.round(lerp(255, base[0], progress));
  const g = Math.round(lerp(255, base[1], progress));
  const b = Math.round(lerp(255, base[2], progress));

  const [hovered, setHovered] = useState<number | null>(null);
  const linkRefs     = useRef<(HTMLAnchorElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [target, setTarget] = useState<number | null>(null);
  const [rects, setRects]   = useState<{ left: number; width: number; top: number; height: number }[]>([]);

  const measure = useCallback(() => {
    const measured = links.map((_, i) => {
      const el = linkRefs.current[i];
      const container = containerRef.current;
      if (el && container) {
        const r  = el.getBoundingClientRect();
        const cr = container.getBoundingClientRect();
        return { left: r.left - cr.left, width: r.width, top: r.top - cr.top, height: r.height };
      }
      return { left: 0, width: 0, top: 0, height: 0 };
    });
    setRects(measured);
  }, []);

  useLayoutEffect(() => { measure(); }, [measure]);
  useEffect(() => {
    document.fonts.ready.then(() => measure());
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <>
      {/* ── Mobile top bar ───────────────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[999] flex md:hidden items-center justify-between px-4 py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <MobileMuteButton color={[r, g, b]} />
        <a
          href="/"
          className="absolute left-1/2 -translate-x-1/2 top-2 select-none"
        >
          <img
            src="/navbar logo.png"
            alt="AnideDevan"
            className="h-[34px] w-auto"
            style={{
              filter: "brightness(0) saturate(100%) invert(22%) sepia(95%) saturate(5000%) hue-rotate(346deg) brightness(95%) contrast(105%)",
            }}
          />
        </a>
        <MenuToggle open={menuOpen} onClick={() => setMenuOpen((v) => !v)} color={[r, g, b]} />
      </motion.div>

      {/* ── GSAP staggered panel (renders when open) ─────────────────────── */}
      {menuOpen && (
        <StaggeredPanel onClose={() => setMenuOpen(false)} />
      )}

      {/* ── Desktop nav (completely unchanged) ───────────────────────────── */}
      <motion.nav
        className="fixed top-6 left-0 right-0 z-[999] hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center justify-center px-8 py-4 w-full relative">
          <a
            href="/"
            className="hidden md:block absolute left-[26px] -translate-y-1 select-none"
          >
            <img
              src="/navbar logo.png"
              alt="AnideDevan"
              className="h-[31px] md:h-[35px] w-auto"
              style={{
                filter: "brightness(0) saturate(100%) invert(22%) sepia(95%) saturate(5000%) hue-rotate(346deg) brightness(95%) contrast(105%)",
              }}
            />
          </a>
          <div ref={containerRef} className="relative flex items-center gap-4 sm:gap-8">
            {links.map((link, i) => (
              <a
                key={link.label}
                ref={(el) => { linkRefs.current[i] = el; }}
                href={link.href}
                onMouseEnter={() => { setHovered(i); setTarget(i); }}
                onMouseLeave={() => setHovered(null)}
                className="relative px-4 py-2 text-xl md:text-2xl font-maragsa leading-[1.2] font-semibold tracking-[0.1em] capitalize"
                style={{ color: hovered === i ? "#000" : `rgb(${r}, ${g}, ${b})` }}
              >
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
            {target !== null && rects.length > 0 && (
              <motion.span
                className="absolute bg-white pointer-events-none origin-left"
                initial={{ left: rects[target].left, width: rects[target].width, top: rects[target].top, height: rects[target].height, scaleX: 0 }}
                animate={{
                  left: rects[target].left, width: rects[target].width,
                  top: rects[target].top,   height: rects[target].height,
                  scaleX: hovered !== null ? 1 : 0,
                }}
                transition={{
                  scaleX: { duration: 0.25, ease: "easeOut" },
                  default: { type: "spring", stiffness: 400, damping: 30 },
                }}
              />
            )}
          </div>
          <MuteButton color={[r, g, b]} />
        </div>
      </motion.nav>
    </>
  );
}
