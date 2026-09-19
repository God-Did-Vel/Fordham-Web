"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Crown } from "lucide-react";
import ExtendedLuxuryText from "@/components/sections/ExtendedLuxuryText";

const images = [
  {
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=85&w=1200&auto=format&fit=crop",
    category: "Suites",
    caption: "Presidential Suite",
  },
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=85&w=1200&auto=format&fit=crop",
    category: "Recreation",
    caption: "Infinity Pool",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=85&w=1200&auto=format&fit=crop",
    category: "Dining",
    caption: "Fine Dining Restaurant",
  },
  {
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=85&w=1200&auto=format&fit=crop",
    category: "Wellness",
    caption: "The Oasis Spa",
  },
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=85&w=1200&auto=format&fit=crop",
    category: "Exterior",
    caption: "Hotel Façade",
  },
  {
    src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=85&w=1200&auto=format&fit=crop",
    category: "Suites",
    caption: "Penthouse Suite",
  },
  {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=85&w=1200&auto=format&fit=crop",
    category: "Recreation",
    caption: "Rooftop Terrace",
  },
  {
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=85&w=1200&auto=format&fit=crop",
    category: "Suites",
    caption: "Honeymoon Suite",
  },
  {
    src: "https://images.unsplash.com/photo-1549294413-26f195200c16?q=85&w=1200&auto=format&fit=crop",
    category: "Rooms",
    caption: "Deluxe Room",
  },
];

const categories = ["All", "Suites", "Rooms", "Dining", "Wellness", "Recreation", "Exterior"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<null | (typeof images)[0]>(null);

  const filtered =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-surface-deep">

      {/* ── Hero Banner ── */}
      <div className="relative h-[45vh] min-h-[340px] overflow-hidden flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=85&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 container-luxury pb-14 pt-32">
          <div className="flex items-center gap-4 mb-4">
            <div className="gold-divider-left w-10" />
            <span className="section-label">Visual Journey</span>
          </div>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light text-foreground">
            Our{" "}
            <em className="not-italic text-gold-gradient">Gallery</em>
          </h1>
          <p className="font-body font-light text-white/60 text-[0.88rem] mt-4 max-w-xl leading-loose">
            A curated visual tour through the spaces, experiences and moments that define
            Daddy Wealth Hotel and Suites.
          </p>
        </div>
      </div>

      {/* ── Filter Tabs ── */}
      <div className="border-b border-[rgba(212,175,55,0.08)] bg-surface-void">
        <div className="container-luxury">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 font-body text-[0.6rem] font-semibold uppercase tracking-[0.3em]
                            px-5 py-4 transition-all duration-300 border-b-2
                            ${activeCategory === cat
                              ? "border-accent text-accent"
                              : "border-transparent text-text-muted hover:text-accent/70"
                            }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="container-luxury py-16">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence>
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                onClick={() => setLightbox(img)}
                className="group relative overflow-hidden aspect-[4/3] cursor-pointer
                           border border-[rgba(212,175,55,0.07)] hover:border-[rgba(212,175,55,0.25)]
                           transition-all duration-500"
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-surface-void/0 group-hover:bg-surface-void/55
                                transition-all duration-500 flex flex-col items-center justify-center gap-3">
                  <ZoomIn
                    size={20}
                    strokeWidth={1.5}
                    className="text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                    <p className="font-body text-[0.58rem] font-semibold uppercase tracking-[0.35em] text-accent/80 mb-1">
                      {img.category}
                    </p>
                    <p className="font-display text-[0.95rem] font-light text-white">
                      {img.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-surface-void/95
                       backdrop-blur-sm p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{    scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.caption}
                className="w-full max-h-[80vh] object-contain"
              />
              {/* Caption bar */}
              <div className="absolute bottom-0 inset-x-0 bg-surface-void/80 backdrop-blur-sm
                              border-t border-[rgba(212,175,55,0.12)] px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="font-body text-[0.58rem] font-semibold uppercase tracking-[0.35em] text-accent mb-0.5">
                    {lightbox.category}
                  </p>
                  <p className="font-display text-[1rem] font-light text-foreground">
                    {lightbox.caption}
                  </p>
                </div>
                <span className="font-body text-[0.65rem] font-light text-text-muted">
                  Daddy Wealth Hotel &amp; Suites
                </span>
              </div>
              {/* Close */}
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 border border-[rgba(212,175,55,0.2)]
                           hover:border-accent bg-surface-card text-text-muted hover:text-accent
                           p-2.5 transition-all duration-300"
                aria-label="Close"
              >
                <X size={14} strokeWidth={2} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ExtendedLuxuryText />
    </div>
  );
}
