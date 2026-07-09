"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type MusicContextValue = {
  muted: boolean;
  toggle: () => void;
  ready: boolean;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function useMusic(): MusicContextValue {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error("useMusic must be used inside <MusicProvider>");
  }
  return ctx;
}

type MusicProviderProps = {
  /** Path to the looping track, served from /public. */
  src: string;
  /** Initial volume in 0..1. */
  volume?: number;
  children: ReactNode;
};

export function MusicProvider({
  src,
  volume = 0.6,
  children,
}: MusicProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  // `ready` flips true the first time playback actually starts.
  // Until then the button can still toggle, but the user won't hear anything
  // change — used to disable the UI / show a hint if we ever need to.
  const [ready, setReady] = useState(false);

  // Mount once: create the audio element, wire loop, attach to the DOM
  // (so iOS Safari treats it as eligible for programmatic play later).
  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = volume;
    audioRef.current = audio;

    const onPlay = () => setReady(true);
    audio.addEventListener("play", onPlay);

    // Try to autoplay unmuted immediately
    audio.play().catch(() => {});

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [src, volume]);

  // Keep <audio>.muted in sync with state.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = muted;
  }, [muted]);

  // Try to start playback on first user gesture. Most browsers block
  // autoplay until the user interacts with the page, so we listen for any
  // pointerdown/keydown/touchstart and call play() then.
  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      const audio = audioRef.current;
      if (!audio) return;
      audio.muted = false;
      audio.volume = volume;
      audio.play().catch(() => {});
    };
    const events: (keyof DocumentEventMap)[] = [
      "pointerdown",
      "keydown",
      "touchstart",
    ];
    events.forEach((e) => document.addEventListener(e, start, { once: true, passive: true }));
    return () => {
      cancelled = true;
      events.forEach((e) => document.removeEventListener(e, start));
    };
  }, [volume]);

  const toggle = useCallback(() => {
    setMuted((m) => !m);
  }, []);

  return (
    <MusicContext.Provider value={{ muted, toggle, ready }}>
      {children}
    </MusicContext.Provider>
  );
}
