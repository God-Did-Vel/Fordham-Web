"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Utensils, Wine, Coffee } from "lucide-react";

const highlights = [
  { icon: Utensils, label: "Fine Dining Restaurant" },
  { icon: Wine,     label: "Premium Cocktail Bar"   },
  { icon: Coffee,   label: "All-Day Lounge & Café"  },
];

export default function FoodBeverage() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative bg-surface-rich overflow-hidden">
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/15 to-transparent" />

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[580px]">

        {/* ── Text Panel ── */}
        <div className="flex items-center justify-end">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full max-w-[560px] px-8 md:px-14 lg:pr-16 xl:pr-20 py-16 lg:py-24 space-y-7"
          >
            {/* Label */}
            <div className="flex items-center gap-4">
              <div className="gold-divider-left w-10" />
              <span className="section-label">Food &amp; Beverage</span>
            </div>

            {/* Heading */}
            <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-light text-foreground leading-[1.1]">
              Why Wouldn't You{" "}
              <em className="not-italic text-gold-gradient">Dine In?</em>
            </h2>

            {/* Divider */}
            <div className="gold-divider-left" />

            {/* Body */}
            <p className="font-body font-light text-text-secondary text-[0.88rem] leading-[1.95]">
              Our culinary team, trained across the world's finest kitchens, delivers a symphony
              of flavour using premium local produce and imported delicacies. From sunrise
              breakfasts to candlelit dinners, every meal is a celebration.
            </p>

            {/* Highlights */}
            <ul className="space-y-3">
              {highlights.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <Icon size={13} className="text-accent shrink-0" strokeWidth={1.5} />
                  <span className="font-body text-[0.82rem] font-light text-text-secondary">
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href="/restaurant"
              className="inline-flex items-center gap-3 btn-luxury text-[0.6rem]"
            >
              <span>Explore Dining</span>
              <ArrowRight size={11} />
            </Link>
          </motion.div>
        </div>

        {/* ── Image Panel ── */}
        <div className="relative overflow-hidden min-h-[420px] lg:min-h-0">
          <motion.div
            initial={{ scale: 1.08 }}
            animate={inView ? { scale: 1 } : { scale: 1.08 }}
            transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full h-full"
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=85&w=1200&auto=format&fit=crop')",
              }}
            />
          </motion.div>

          {/* Reveal overlay */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={inView ? { scaleX: 0 } : { scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 bg-surface-rich origin-right z-10"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-surface-rich/30 z-0" />

          {/* Floating label */}
          <div
            className="absolute bottom-8 left-8 z-20
                       border border-accent/25 px-5 py-3 backdrop-blur-sm bg-surface-void/60"
          >
            <p className="font-body text-[0.58rem] font-semibold uppercase tracking-[0.4em] text-accent mb-1">
              Daddy Wealth Hotel &amp; Suites
            </p>
            <p className="font-display text-[1.1rem] font-light text-foreground">
              Signature Cuisine
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
