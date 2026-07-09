"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import TiltedCard from "./TiltedCard";

gsap.registerPlugin(ScrollTrigger);

const API_KEY = "87bd096b771f211ccc7c3e6e46a711cd";
const USER = "Ann_nyd";

const EASE = [0.16, 1, 0.3, 1] as const;

function VinylDisc({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 shrink-0" style={{ marginLeft: "28px" }}>
      <div className="p-2 rounded-full bg-white/30 ring-1 ring-white/40 shadow-xl">
        <div
          className={`w-full h-full rounded-full overflow-hidden bg-black/10 shadow-inner transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        >
          <img
              src={src || "/fallback-album.jpg"}
              alt={alt}
              onLoad={() => setLoaded(true)}
              className="w-full h-full object-cover rounded-full animate-[spin_9s_linear_infinite]"
            />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-9 h-9 md:w-12 md:h-12 bg-white/90 rounded-full shadow-inner flex items-center justify-center ring-1 ring-white/50">
          <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-black/20" />
        </div>
      </div>
    </div>
  );
}

function NowPlaying({ now }: { now: any }) {
  return (
    <div className="p-1.5 rounded-[2.25rem] bg-white/25 ring-1 ring-white/30 shadow-lg overflow-hidden max-md:!mx-0" style={{ marginLeft: "96px", marginRight: "96px" }}>
      <div className="rounded-[calc(2.25rem-0.375rem)] bg-white overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
        <div className="flex flex-row items-center p-7 md:p-12 min-h-[130px] md:min-h-[240px] gap-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {/* Mobile disc */}
            <div className="md:hidden">
              <div className="relative w-28 h-28 shrink-0 translate-x-2">
                <div className="p-2 rounded-full bg-white/30 ring-1 ring-white/40 shadow-xl">
                  <div className="w-full h-full rounded-full overflow-hidden bg-black/10 shadow-inner">
                    <img src={now.image || "/fallback-album.jpg"} alt={now.album} className="w-full h-full object-cover rounded-full animate-[spin_9s_linear_infinite]" />
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-9 h-9 bg-white/90 rounded-full shadow-inner flex items-center justify-center ring-1 ring-white/50">
                    <div className="w-2.5 h-2.5 rounded-full bg-black/20" />
                  </div>
                </div>
              </div>
            </div>
            {/* Desktop disc */}
            <div className="hidden md:block">
              <VinylDisc src={now.image} alt={now.album} />
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col text-center sm:text-left flex-1 min-w-0 py-8 md:py-12"
            style={{ paddingLeft: "clamp(24px, 5vw, 56px)" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-4 md:mb-5">
              {now.isNow ? (
                <>
                  <span className="relative flex w-2.5 h-2.5">
                    <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-40" />
                    <span className="relative rounded-full bg-green-500 w-2.5 h-2.5" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-black/35">
                    Now Playing
                  </span>
                </>
              ) : (
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-black/35">
                  Last played
                </span>
              )}
            </div>

            <h3 className="font-harmond text-lg sm:text-3xl lg:text-4xl italic leading-[0.9] tracking-tight text-black mb-3 max-md:!text-lg">
              {now.name}
            </h3>
            <div className="w-10 h-0.5 bg-black/10 mb-4 hidden sm:block" />
            <p className="text-lg md:text-2xl font-medium text-black/55 mb-1 font-polite">
              {now.artist}
            </p>
            <p className="text-xs font-mono uppercase tracking-widest text-black/25 mb-8">
              {now.album}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function AlbumCard({ album, index, large }: { album: any; index: number; large?: boolean }) {
  const img = album.image[3]?.["#text"] || album.image[2]?.["#text"];
  const reduce = useReducedMotion();
  const cleanName = index === 5 ? album.name : album.name.replace(/\s*\(.*?\)\s*/g, "").trim();
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 });
  const [showTip, setShowTip] = useState(false);

  function handleMouse(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    setTipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <motion.a
      href={album.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block relative ${large ? "md:col-span-2 md:row-span-2" : ""}`}
      initial={reduce ? false : { opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: (index % 5) * 0.07, ease: EASE }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
      {showTip && (
        <div style={{
          position: "absolute",
          left: tipPos.x,
          top: tipPos.y,
          zIndex: 999,
          pointerEvents: "none",
          transform: "translate(-50%, -100%)",
          marginTop: "-8px"
        }}>
          <div style={{ background: "rgba(0,0,0,0.85)", color: "white", padding: "6px 12px", borderRadius: "6px", fontSize: "13px", fontWeight: 600, whiteSpace: "nowrap" }}>
            {cleanName} — {album.artist.name}
          </div>
        </div>
      )}
      <div>
        <div style={{ borderRadius: 0, overflow: "hidden" }}>
          <div className="aspect-square relative overflow-hidden">
            <div style={{ position: "absolute", top: "5%", left: "8%", right: "0.5%", bottom: "11%", overflow: "hidden" }}>
              <img
                src={img}
                alt={album.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="lazy"
              />
            </div>
            <img src="/cd-case.png" alt="" style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", pointerEvents: "none", zIndex: 2
            }} />
            <div className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-md text-black font-mono text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm ring-1 ring-black/5">
              #{String(index).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function ArtistCard({ artist, rank }: { artist: any; rank: number }) {
  const customImages: Record<string, string> = {
    "Chris Cornell": "/artists/chris-cornell.jpg",
    "Soundgarden": "/artists/soundgarden.jpg",
    "Audioslave": "/artists/audioslave.jpg",
    "The Beatles": "/artists/the-beatles.jpg",
    "Temple of the Dog": "/artists/temple-of-the-dog.jpg",
  };
  const img = customImages[artist.name] || artist.image[3]?.["#text"] || artist.image[2]?.["#text"];
  const reduce = useReducedMotion();

  return (
    <motion.a
      href={artist.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative"
      initial={reduce ? false : { opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: ((rank - 1) % 5) * 0.07, ease: EASE }}
    >
      {/* Mobile: simple rounded image */}
      <div className="md:hidden relative w-full aspect-square">
        {img ? (
          <img src={img} alt={artist.name} className="w-full h-full object-cover rounded-2xl" />
        ) : (
          <div className="w-full h-full rounded-2xl bg-black/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-black/30">{artist.name[0]}</span>
          </div>
        )}
        <div className="absolute top-2 left-2 bg-white/90 text-black font-mono text-[8px] font-bold px-2 py-0.5 rounded-full">
          #{String(rank).padStart(2, "0")}
        </div>
        <div className="absolute bottom-1.5 left-1.5 right-1.5">
          <span className="inline bg-white/90 px-1 shadow-sm text-[9px] font-bold text-black/90 whitespace-nowrap">
            {artist.name}
          </span>
        </div>
      </div>

      {/* Desktop: TiltedCard */}
      <div className="hidden md:block relative w-full" style={{ aspectRatio: "1 / 1" }}>
        {img ? (
          <TiltedCard
            imageSrc={img}
            altText={artist.name}
            captionText={artist.name}
            containerHeight="100%"
            containerWidth="100%"
            imageHeight="300px"
            imageWidth="300px"
            scaleOnHover={1}
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent={true}
            overlayContent={
              <>
                <div className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-md text-black font-mono text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm ring-1 ring-black/5">
                  #{String(rank).padStart(2, "0")}
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <span className="inline bg-white/90 px-1.5 shadow-sm text-base font-bold text-black/90 whitespace-nowrap">
                    {artist.name}
                  </span>
                </div>
              </>
            }
          />
        ) : (
          <div className="w-full h-full" style={{
            background: "linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.2))",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <span style={{ fontSize: "42px", fontWeight: "bold", color: "rgba(0,0,0,0.3)" }}>
              {artist.name[0]}
            </span>
          </div>
        )}
      </div>
    </motion.a>
  );
}

export default function MusicSection() {
  const [now, setNow] = useState<any>(null);
  const [topAlbums, setTopAlbums] = useState<any[]>([]);
  const [topArtists, setTopArtists] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const r = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USER}&api_key=${API_KEY}&format=json`
        ).then((r) => r.json());
        if (r.recenttracks?.track?.[0]) {
          const t = r.recenttracks.track[0];
          setNow({
            name: t.name,
            artist: t.artist["#text"],
            album: t.album["#text"],
            image: t.image[3]?.["#text"] || t.image[2]?.["#text"],
            url: t.url,
            isNow: t["@attr"]?.nowplaying === "true",
          });
        }
      } catch (e) {
        console.error(e);
      }
    };

    const fetchTopAlbums = async () => {
      try {
        const a = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${USER}&api_key=${API_KEY}&format=json&limit=10&period=overall`
        ).then((r) => r.json());
        if (a.topalbums?.album) setTopAlbums(a.topalbums.album);
      } catch (e) {
        console.error(e);
      }
    };

    const fetchTopArtists = async () => {
      try {
        const a = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${USER}&api_key=${API_KEY}&format=json&limit=4&period=overall`
        ).then((r) => r.json());
        if (a.topartists?.artist) setTopArtists(a.topartists.artist);
      } catch (e) {
        console.error(e);
      }
    };

    Promise.all([fetchNowPlaying(), fetchTopAlbums(), fetchTopArtists()]).then(() => setLoaded(true));
    setTimeout(() => setLoaded(true), 5000);
    const i = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(i);
  }, []);

  return (
    <section id="music" ref={sectionRef} className="relative bg-[#93c5fd] text-black overflow-x-hidden mt-16 md:mt-24">
      <div className="music-reveal">
          <div className="max-md:px-4 max-md:pt-14 max-md:pb-10" style={{ padding: "80px 16px" }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mb-8 md:mb-12"
              style={{ paddingLeft: "clamp(4px, 2vw, 72px)" }}
            >
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-black">
                <div style={{ width: "fit-content" }} className="bg-white px-1 whitespace-nowrap mb-5 shadow-sm">
                  Heavy
                </div>
                <div style={{ width: "fit-content" }} className="bg-white px-1 whitespace-nowrap shadow-sm">
                  rotation
                </div>
              </h2>
            </motion.div>

            {loaded ? (
                <div className="flex flex-col">
                 {now && <div style={{ marginTop: "clamp(40px, 8vw, 120px)" }}><NowPlaying now={now} /></div>}

                {topArtists.length > 0 && (
                  <div style={{ marginTop: "clamp(40px, 8vw, 80px)", marginLeft: "clamp(16px, 5vw, 48px)", marginRight: "clamp(16px, 5vw, 48px)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
                      <h3 className="max-md:!ml-0" style={{
                        fontSize: "clamp(18px, 4vw, 28px)",
                        fontWeight: 900,
                        lineHeight: 1.2,
                        margin: 0,
                        marginLeft: "160px"
                      }}>
                        <span className="inline bg-white px-1.5 whitespace-nowrap shadow-sm" style={{ color: "rgba(0,0,0,0.9)" }}>
                          Top artists of all time
                        </span>
                      </h3>
                      <span style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.4), transparent)" }} />
                    </div>
                    <div
                      className="max-md:grid max-md:grid-cols-2 max-md:gap-4 md:flex md:flex-wrap md:gap-12 pb-4 relative z-50 md:justify-center"
                    >
                      {topArtists.slice(0, 5).map((artist, i) => (
                        <ArtistCard key={artist.name} artist={artist} rank={i + 1} />
                      ))}
                    </div>
                  </div>
                )}

                {topAlbums.length > 0 && (
                  <>
                  {/* Mobile Top Albums */}
                  <div className="md:hidden" style={{ marginTop: "clamp(40px, 8vw, 80px)", marginLeft: "16px", marginRight: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
                      <h3 style={{ fontSize: "clamp(18px, 4vw, 28px)", fontWeight: 900, lineHeight: 1.2, margin: 0 }}>
                        <span className="inline bg-white px-1.5 whitespace-nowrap shadow-sm" style={{ color: "rgba(0,0,0,0.9)" }}>
                          Top albums
                        </span>
                      </h3>
                      <span style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.4), transparent)" }} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {topAlbums.slice(0, 10).map((album, i) => (
                        <div key={album.name}>
                          <AlbumCard album={album} index={i + 1} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Desktop Top Albums */}
                  <div className="hidden md:block" style={{ marginTop: "clamp(40px, 8vw, 80px)", marginLeft: "120px", marginRight: "clamp(16px, 5vw, 48px)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
                      <h3 style={{ fontSize: "clamp(18px, 4vw, 28px)", fontWeight: 900, lineHeight: 1.2, margin: 0 }}>
                        <span className="inline bg-white px-1.5 whitespace-nowrap shadow-sm" style={{ color: "rgba(0,0,0,0.9)" }}>
                          Top albums
                        </span>
                      </h3>
                      <span style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.4), transparent)" }} />
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "32px", paddingBottom: "16px", position: "relative", zIndex: 50, justifyContent: "flex-start" }}>
                      {topAlbums.slice(0, 10).map((album, i) => (
                        <div key={album.name} style={{ width: "calc((100% - 48px) / 5)", minWidth: "100px", maxWidth: "300px" }}>
                          <AlbumCard album={album} index={i + 1} />
                        </div>
                      ))}
                    </div>
                  </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 gap-5">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 rounded-full border-2 border-white/20" />
                  <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-white/70 animate-spin" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/40 font-bold">
                  Loading frequencies
                </span>
              </div>
            )}
          </div>
      </div>
    </section>
  );
}
