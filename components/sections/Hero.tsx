"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Crown } from "lucide-react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=85&w=2000&auto=format&fit=crop",
    label:    "Presidential Suites",
    headline: "Where Royalty\nComes to Rest",
    sub:      "Indulge in the pinnacle of luxury with our bespoke suites, curated for the discerning traveller.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=85&w=2000&auto=format&fit=crop",
    label:    "World-Class Dining",
    headline: "A Feast for\nEvery Sense",
    sub:      "Our culinary masters craft each dish as a masterpiece, honouring tradition while embracing innovation.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=85&w=2000&auto=format&fit=crop",
    label:    "The Oasis Spa",
    headline: "Surrender to\nSerenity",
    sub:      "Restore body and mind in our award-winning spa — a sanctuary of warmth, silence and healing.",
  },
];

const INTERVAL = 7000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    []
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + slides.length) % slides.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, INTERVAL);
    return () => clearTimeout(t);
  }, [current, paused, next]);

  return (
    <section
      className="relative h-screen min-h-[680px] w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Slides ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1,  scale: 1    }}
          exit={{    opacity: 0,  scale: 0.98 }}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slides[current].image}')` }}
          />
          {/* Layered overlays for depth */}
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="absolute inset-0 bg-dark-vignette" />
        </motion.div>
      </AnimatePresence>

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">

        {/* Crown icon */}
        <motion.div
          key={`crown-${current}`}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0   }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-5"
        >
          <Crown size={28} className="text-accent mx-auto" strokeWidth={1} />
        </motion.div>

        {/* Section label */}
        <motion.p
          key={`label-${current}`}
          initial={{ opacity: 0, y: 12, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, y: 0,  letterSpacing: "0.35em" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="section-label mb-5"
        >
          {slides[current].label}
        </motion.p>

        {/* Hotel name */}
        <motion.div
          key={`name-${current}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mb-3"
        >
          <span className="font-body text-[0.6rem] font-semibold tracking-[0.55em] uppercase text-accent/80">
            Daddy Wealth Hotel &amp; Suites
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          key={`h1-${current}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 1.0, delay: 0.5 }}
          className="font-display text-[clamp(3rem,8vw,6.5rem)] font-light text-foreground
                     leading-[1.05] tracking-[0.02em] whitespace-pre-line max-w-4xl mx-auto mb-7"
        >
          {slides[current].headline}
        </motion.h1>

        {/* Gold rule */}
        <motion.div
          key={`rule-${current}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1  }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent mb-7 origin-center"
        />

        {/* Subtitle */}
        <motion.p
          key={`sub-${current}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="font-body font-light text-[0.88rem] text-white/70 max-w-xl leading-loose mb-12 tracking-wide"
        >
          {slides[current].sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          key={`cta-${current}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.9, delay: 0.95 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/book" className="btn-luxury text-[0.6rem] px-10 py-4">
            <span>Reserve Your Suite</span>
          </Link>
          <Link
            href="/rooms"
            className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.3em]
                       text-white/60 hover:text-accent transition-colors duration-300 flex items-center gap-2"
          >
            Explore Rooms
            <span className="inline-block w-5 h-px bg-current" />
          </Link>
        </motion.div>
      </div>

      {/* ── Slide Controls ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-500 ${
              i === current
                ? "w-8 h-px bg-accent"
                : "w-3 h-px bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* ── Arrow Controls ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-5 md:left-10 top-1/2 -translate-y-1/2 z-20
                   border border-white/15 hover:border-accent/50 text-white/50 hover:text-accent
                   p-2.5 md:p-3 transition-all duration-400 backdrop-blur-sm"
      >
        <ChevronLeft size={18} strokeWidth={1.5} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 z-20
                   border border-white/15 hover:border-accent/50 text-white/50 hover:text-accent
                   p-2.5 md:p-3 transition-all duration-400 backdrop-blur-sm"
      >
        <ChevronRight size={18} strokeWidth={1.5} />
      </button>

      {/* ── Slide Counter ── */}
      <div className="absolute bottom-10 right-8 md:right-16 z-20 text-white/30 font-body text-[0.65rem] tracking-[0.2em]">
        <span className="text-accent font-medium">0{current + 1}</span>
        <span className="mx-2">/</span>
        0{slides.length}
      </div>

      {/* ── Scroll Indicator ── */}
      <div className="absolute bottom-10 left-8 md:left-16 z-20 flex flex-col items-center gap-2.5">
        <div className="w-px h-12 overflow-hidden bg-white/10">
          <div className="w-full h-full bg-gradient-to-b from-accent to-transparent animate-scroll-line" />
        </div>
        <span className="font-body text-[0.55rem] font-semibold uppercase tracking-[0.35em] text-white/30 rotate-90 origin-center mt-4">
          Scroll
        </span>
      </div>
    </section>
  );
}
