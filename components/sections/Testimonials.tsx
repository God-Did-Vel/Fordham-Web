"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "Daddy Wealth Hotel and Suites redefined what luxury means to me. The Presidential Suite was beyond anything I had ever experienced — the butler service alone was worth every naira. I will absolutely return.",
    author:   "Chief Emeka Okafor",
    title:    "CEO, Okafor Group Holdings",
    country:  "Lagos, Nigeria",
    stars:    5,
  },
  {
    quote:
      "From the moment we arrived, everything felt considered and personal. Our wedding weekend at Daddy Wealth Hotel and Suites was magical — every detail was executed flawlessly. Our guests are still talking about it.",
    author:   "Mr & Mrs Adeyemi",
    title:    "Wedding Guests",
    country:  "Abuja, Nigeria",
    stars:    5,
  },
  {
    quote:
      "The Oasis Spa experience is genuinely world-class. I travel extensively for business and rarely find a hotel that truly understands what five-star hospitality means. Daddy Wealth Hotel and Suites is the rare exception.",
    author:   "Dr. Fatima Al-Hassan",
    title:    "International Business Consultant",
    country:  "Dubai, UAE",
    stars:    5,
  },
  {
    quote:
      "We hosted our annual board retreat here and the facilities and service exceeded our expectations entirely. The conference setup, the cuisine, the rooms — absolute perfection. Our preferred venue from now on.",
    author:   "Engr. Babatunde Fashola Jr.",
    title:    "MD, Horizon Capital Ltd",
    country:  "Port Harcourt, Nigeria",
    stars:    5,
  },
];

export default function Testimonials() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(headRef, { once: true, margin: "-60px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="section-padding bg-surface-dark relative overflow-hidden">

      {/* Gold glow accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ background: "radial-gradient(ellipse at 50% 50%, #d4af37 0%, transparent 65%)" }}
      />

      <div className="container-luxury">

        {/* ── Header ── */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-16 space-y-5"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="gold-divider" />
            <span className="section-label">Guest Experiences</span>
            <div className="gold-divider" />
          </div>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-foreground">
            Voices of Our{" "}
            <em className="not-italic text-gold-gradient">Distinguished</em>
            {" "}Guests
          </h2>
        </motion.div>

        {/* ── Testimonial Card ── */}
        <div className="relative max-w-3xl mx-auto">

          {/* Large decorative quote */}
          <div className="absolute -top-4 -left-4 md:-left-10 opacity-[0.06] pointer-events-none">
            <Quote size={90} className="text-accent fill-accent" strokeWidth={0} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0  }}
              exit={{    opacity: 0, y: -20 }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center space-y-8"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1.5">
                {Array.from({ length: testimonials[current].stars }).map((_, i) => (
                  <Star key={i} size={13} className="text-accent fill-accent" strokeWidth={0} />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="font-display text-[clamp(1.15rem,2.5vw,1.65rem)] font-light
                                     text-text-primary leading-[1.7] italic px-4 md:px-0">
                &ldquo;{testimonials[current].quote}&rdquo;
              </blockquote>

              {/* Divider */}
              <div className="gold-divider" />

              {/* Author */}
              <div className="space-y-1.5">
                <p className="font-body text-[0.9rem] font-semibold text-foreground tracking-wide">
                  {testimonials[current].author}
                </p>
                <p className="font-body text-[0.75rem] font-light text-text-muted tracking-wide">
                  {testimonials[current].title}
                </p>
                <p className="font-body text-[0.68rem] font-light text-accent/70 tracking-[0.15em] uppercase">
                  {testimonials[current].country}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Navigation ── */}
          <div className="flex items-center justify-center gap-6 mt-14">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="border border-[rgba(212,175,55,0.2)] hover:border-accent text-text-muted
                         hover:text-accent p-3 transition-all duration-300"
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`transition-all duration-400 ${
                    i === current
                      ? "w-7 h-px bg-accent"
                      : "w-2.5 h-px bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="border border-[rgba(212,175,55,0.2)] hover:border-accent text-text-muted
                         hover:text-accent p-3 transition-all duration-300"
            >
              <ChevronRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
