"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function ExtendedLuxuryText() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-b from-surface-rich to-surface-void overflow-hidden py-20 md:py-28"
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ background: "radial-gradient(ellipse at 50% 30%, #d4af37 0%, transparent 60%)" }}
      />

      <div className="container-luxury max-w-4xl text-center space-y-10">

        {/* Label + rule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4"
        >
          <div className="gold-divider" />
          <span className="section-label">The Daddy Wealth Experience</span>
          <div className="gold-divider" />
        </motion.div>

        {/* Heading */}
        <motion.h3
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-foreground leading-[1.2]"
        >
          Discover the Pinnacle of{" "}
          <em className="not-italic text-gold-gradient">Nigerian Luxury</em>{" "}
          Hospitality
        </motion.h3>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="gold-divider"
        />

        {/* Body paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="space-y-5"
        >
          <p className="font-body font-light text-text-secondary text-[0.88rem] leading-[2]">
            Daddy Wealth Hotel and Suites stands as the foremost beacon of luxury hospitality
            in Nigeria. Our philosophy is simple: every guest is royalty. From the moment
            you step through our grand entrance, you enter a world where your every desire is
            anticipated and every comfort is guaranteed.
          </p>
          <p className="font-body font-light text-text-muted text-[0.85rem] leading-[2]">
            Our accommodations are a testament to architectural elegance — each suite a
            masterclass in bespoke interior design, where hand-selected furnishings, bespoke
            art pieces, and premium materials converge to create a living space unlike any other.
            The Daddy Wealth experience is not merely a stay; it is a transformation.
          </p>
          <p className="font-body font-light text-text-muted text-[0.85rem] leading-[2]">
            Whether you are here for a romantic escape, a high-stakes corporate summit, a family
            celebration, or simply to indulge in the finest spa treatments the continent has
            to offer — Daddy Wealth Hotel and Suites promises an encounter with luxury that will
            remain etched in your memory long after you depart.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link href="/book" className="btn-luxury text-[0.6rem]">
            <span>Reserve Your Stay</span>
          </Link>
          <Link
            href="/rooms"
            className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.3em]
                       text-text-muted hover:text-accent transition-colors duration-300 flex items-center gap-2"
          >
            Explore Rooms
            <span className="inline-block w-5 h-px bg-current" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
