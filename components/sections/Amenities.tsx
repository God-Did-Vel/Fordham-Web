"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const amenities = [
  {
    number:   "01",
    label:    "Wellness",
    title:    "The Oasis Spa & Wellness Centre",
    body:     "Surrender to total renewal in our award-winning spa. Ancient healing rituals, cutting-edge therapies and bespoke treatments converge in a sanctuary of utter tranquillity — designed to restore body, mind and spirit.",
    cta:      { label: "Discover Wellness", href: "/spa" },
    image:    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=85&w=1200&auto=format&fit=crop",
    reverse:  false,
  },
  {
    number:   "02",
    label:    "Dining",
    title:    "Gastronomic Excellence",
    body:     "Our culinary philosophy celebrates the finest local ingredients elevated through international technique. From our à la carte restaurant to intimate private dining, every meal at Daddy Wealth Hotel and Suites is an occasion.",
    cta:      { label: "Explore Dining", href: "/restaurant" },
    image:    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=85&w=1200&auto=format&fit=crop",
    reverse:  true,
  },
  {
    number:   "03",
    label:    "Recreation",
    title:    "The Infinity Pool & Leisure Deck",
    body:     "Our rooftop infinity pool offers panoramic views that stretch to the horizon. Complemented by private cabanas, a pool bar and an attentive team — the leisure deck is your outdoor paradise, morning to midnight.",
    cta:      { label: "View Facilities", href: "/gallery" },
    image:    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=85&w=1200&auto=format&fit=crop",
    reverse:  false,
  },
];

export default function Amenities() {
  return (
    <section className="bg-surface-deep overflow-hidden">
      {amenities.map((item, idx) => (
        <AmenityRow key={item.number} item={item} idx={idx} />
      ))}
    </section>
  );
}

function AmenityRow({
  item,
  idx,
}: {
  item: (typeof amenities)[0];
  idx: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className={`relative grid grid-cols-1 lg:grid-cols-2 min-h-[560px] ${
        idx < amenities.length - 1 ? "border-b border-[rgba(212,175,55,0.05)]" : ""
      }`}
    >
      {/* ── Image ── */}
      <div
        className={`relative overflow-hidden min-h-[380px] lg:min-h-0 ${
          item.reverse ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <motion.div
          initial={{ scale: 1.08 }}
          animate={inView ? { scale: 1 } : { scale: 1.08 }}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full h-full"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${item.image}')` }}
          />
        </motion.div>

        {/* Image reveal */}
        <motion.div
          initial={{ scaleX: 1 }}
          animate={inView ? { scaleX: 0 } : { scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`absolute inset-0 bg-surface-deep z-10 ${
            item.reverse ? "origin-right" : "origin-left"
          }`}
        />

        {/* Number overlay */}
        <div
          className="absolute bottom-6 right-6 font-display text-[5rem] font-light
                     leading-none text-white/[0.04] select-none pointer-events-none z-20"
        >
          {item.number}
        </div>
      </div>

      {/* ── Content ── */}
      <div
        className={`flex items-center ${item.reverse ? "lg:order-1" : "lg:order-2"} ${
          item.reverse
            ? "bg-surface-rich lg:bg-surface-rich"
            : "bg-surface-deep"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: item.reverse ? -30 : 30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: item.reverse ? -30 : 30 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="p-10 lg:p-16 xl:p-20 space-y-6 max-w-[540px]"
        >
          {/* Label */}
          <div className="flex items-center gap-3">
            <span className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.45em] text-accent/60">
              {item.number}
            </span>
            <div className="w-6 h-px bg-accent/40" />
            <span className="section-label">{item.label}</span>
          </div>

          {/* Title */}
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-light text-foreground leading-[1.1]">
            {item.title}
          </h2>

          {/* Divider */}
          <div className="gold-divider-left" />

          {/* Body */}
          <p className="font-body font-light text-text-secondary text-[0.88rem] leading-[1.95]">
            {item.body}
          </p>

          {/* CTA */}
          <Link
            href={item.cta.href}
            className="inline-flex items-center gap-3 text-[0.62rem] font-body font-semibold
                       uppercase tracking-[0.3em] text-accent hover:text-accent-bright
                       transition-colors duration-300 group"
          >
            {item.cta.label}
            <ArrowRight
              size={12}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
