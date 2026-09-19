"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";

const gallery = [
  {
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=85&w=800&auto=format&fit=crop",
    caption: "Presidential Suite",
    span:    "row-span-2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=85&w=800&auto=format&fit=crop",
    caption: "Infinity Pool",
    span:    "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=85&w=800&auto=format&fit=crop",
    caption: "Fine Dining",
    span:    "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=85&w=800&auto=format&fit=crop",
    caption: "The Oasis Spa",
    span:    "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=85&w=800&auto=format&fit=crop",
    caption: "Hotel Exterior",
    span:    "row-span-2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=85&w=800&auto=format&fit=crop",
    caption: "Penthouse Suite",
    span:    "",
  },
];

export default function GalleryPreview() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section className="section-padding bg-surface-deep relative overflow-hidden">

      <div className="container-luxury">

        {/* ── Header ── */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.9 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="gold-divider-left w-10" />
              <span className="section-label">Visual Journey</span>
            </div>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-foreground leading-[1.1]">
              Inside{" "}
              <em className="not-italic text-gold-gradient">Daddy Wealth</em>
              <br />Hotel &amp; Suites
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2.5 text-[0.62rem] font-body font-semibold
                       uppercase tracking-[0.3em] text-accent hover:text-accent-bright
                       transition-colors duration-300 group shrink-0"
          >
            Full Gallery
            <ArrowRight
              size={12}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </Link>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 gap-3 h-[580px] md:h-[680px]">
          {gallery.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, delay: i * 0.08 }}
              className={`group relative overflow-hidden cursor-pointer ${item.span}`}
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700
                           group-hover:scale-107"
                style={{ backgroundImage: `url('${item.image}')` }}
              />

              {/* Dark overlay */}
              <div
                className="absolute inset-0 bg-surface-void/50 opacity-0 group-hover:opacity-100
                           transition-opacity duration-500"
              />

              {/* Hover content */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-3
                           opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10"
              >
                <div className="border border-accent/50 p-2 text-accent">
                  <Plus size={14} strokeWidth={2} />
                </div>
                <span className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/90">
                  {item.caption}
                </span>
              </div>

              {/* Bottom caption bar (always visible) */}
              <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent
                              opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
