"use client";

import { motion } from "framer-motion";
import { useMusic } from "./MusicProvider";

type MuteButtonProps = {
  /** RGB triplet for the current section tint (same source as the nav links/logo). */
  color: [number, number, number];
};

export function MuteButton({ color: _color }: MuteButtonProps) {
  const { muted, toggle } = useMusic();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={muted ? "Unmute music" : "Mute music"}
      aria-pressed={muted}
      title={muted ? "Unmute" : "Mute"}
      className="hidden md:flex absolute right-8 items-center justify-center w-9 h-9 rounded-md bg-neutral-900/90 hover:bg-neutral-800 active:scale-95 transition-all duration-150"
    >
      <SpeakerIcon muted={muted} />
    </button>
  );
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  // Small, minimal: a filled speaker wedge. When muted, two short lines
  // through it indicate the off state. Pure white, no section tinting.
  return (
    <span className="relative inline-block w-5 h-5">
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute inset-0 w-full h-full"
        animate={{ opacity: muted ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        aria-hidden
      >
        {/* Hollow speaker (just outline) + two sound-wave arcs */}
        <path d="M11 4.5L6.5 8H3.5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3L11 19.5V4.5z" />
        <path d="M15.5 8.5a4 4 0 0 1 0 7" />
        <path d="M18.5 5.5a8 8 0 0 1 0 13" />
      </motion.svg>
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute inset-0 w-full h-full"
        animate={{ opacity: muted ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        aria-hidden
      >
        {/* Hollow speaker + X overlay */}
        <path d="M11 4.5L6.5 8H3.5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3L11 19.5V4.5z" />
        <line x1="16" y1="9" x2="22" y2="15" />
        <line x1="22" y1="9" x2="16" y2="15" />
      </motion.svg>
    </span>
  );
}
