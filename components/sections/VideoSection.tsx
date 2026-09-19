"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Crown } from "lucide-react";
import Link from "next/link";

export default function VideoSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const inView      = useInView(sectionRef, { once: true, margin: "-80px" });

  const [playing, setPlaying] = useState(true);
  const [muted,   setMuted]   = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setPlaying((v) => !v);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted((v) => !v);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] overflow-hidden flex items-center justify-center"
    >
      {/* ── Video Background ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="https://res.cloudinary.com/duweg8kpv/video/upload/v1748048397/5572068-uhd_3840_2160_25fps_pttqkk.mp4"
        onError={(e) => {
          // Fallback: hide video, show static background
          const el = e.currentTarget as HTMLVideoElement;
          el.style.display = "none";
        }}
      />

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-surface-void/40" />

      {/* ── Content ── */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <Crown size={30} className="text-accent mx-auto" strokeWidth={1} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12, letterSpacing: "0.1em" }}
          animate={inView ? { opacity: 1, y: 0, letterSpacing: "0.4em" } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="section-label mb-6"
        >
          Daddy Wealth Hotel &amp; Suites
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.0, delay: 0.45 }}
          className="font-display text-[clamp(2.8rem,7vw,6rem)] font-light text-foreground
                     leading-[1.05] tracking-[0.02em] mb-6"
        >
          The Art of{" "}
          <em className="not-italic text-gold-gradient">Luxury</em>
          <br />Living
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-14 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-7"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="font-body font-light text-white/65 text-[0.88rem] max-w-lg mx-auto leading-loose mb-10"
        >
          Step inside and allow the grandeur of Daddy Wealth Hotel and Suites to unfold around you.
          Every corridor, suite and garden tells a story of intentional luxury.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, delay: 0.85 }}
        >
          <Link href="/book" className="btn-luxury text-[0.6rem] px-10 py-4">
            <span>Begin Your Journey</span>
          </Link>
        </motion.div>
      </div>

      {/* ── Video Controls ── */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3">
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="border border-white/20 hover:border-accent/50 text-white/50 hover:text-accent
                     p-2.5 transition-all duration-300 backdrop-blur-sm"
        >
          {muted
            ? <VolumeX size={14} strokeWidth={1.5} />
            : <Volume2 size={14} strokeWidth={1.5} />
          }
        </button>
        <button
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : "Play video"}
          className="border border-white/20 hover:border-accent/50 text-white/50 hover:text-accent
                     p-2.5 transition-all duration-300 backdrop-blur-sm"
        >
          {playing
            ? <Pause size={14} strokeWidth={1.5} />
            : <Play  size={14} strokeWidth={1.5} />
          }
        </button>
      </div>

      {/* ── Scroll hint ── */}
      <div className="absolute bottom-8 left-8 z-20 flex flex-col items-center gap-2">
        <div className="w-px h-10 overflow-hidden bg-white/10">
          <div className="w-full h-full bg-gradient-to-b from-accent to-transparent animate-scroll-line" />
        </div>
      </div>
    </section>
  );
}
