"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Crown, Award, Users, Star } from "lucide-react";
import Link from "next/link";

const stats = [
  { icon: Crown,  value: "25+",  label: "Years of Excellence" },
  { icon: Award,  value: "50+",  label: "International Awards" },
  { icon: Users,  value: "200",  label: "Dedicated Staff"      },
  { icon: Star,   value: "5★",   label: "Luxury Rating"        },
];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.9, ease: "easeOut" as const } },
};

export default function About() {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-80px" });
  const imgRef  = useRef<HTMLDivElement>(null);
  const imgView = useInView(imgRef, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-surface-deep relative overflow-hidden">

      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.025] pointer-events-none"
           style={{ background: "radial-gradient(ellipse at 80% 50%, #d4af37 0%, transparent 65%)" }} />

      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Text Side ── */}
          <motion.div
            ref={ref}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="space-y-7"
          >
            {/* Label */}
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <div className="gold-divider-left w-10" />
              <span className="section-label">Our Legacy</span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={fadeUp}
              className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-light text-foreground leading-[1.1]"
            >
              The Art of{" "}
              <em className="not-italic text-gold-gradient">Unrivalled</em>
              <br />Hospitality
            </motion.h2>

            {/* Gold rule */}
            <motion.div variants={fadeUp} className="gold-divider-left" />

            {/* Body copy */}
            <motion.p variants={fadeUp} className="font-body font-light text-text-secondary text-[0.9rem] leading-[1.95] max-w-[480px]">
              At <strong className="text-accent font-medium">Daddy Wealth Hotel and Suites</strong>,
              every moment is meticulously crafted to exceed expectation. Since our founding, we have
              set the gold standard for luxury accommodation — where architecture whispers grandeur and
              every detail speaks of care.
            </motion.p>

            <motion.p variants={fadeUp} className="font-body font-light text-text-muted text-[0.88rem] leading-[1.95] max-w-[480px]">
              From the hand-embroidered linens to the Michelin-trained kitchen brigade, from the
              bespoke spa rituals to the 24-hour butler service — our commitment is singular: your
              comfort, your pleasure, your world.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeUp}>
              <Link href="/rooms" className="btn-luxury text-[0.6rem]">
                <span>Discover Our Suites</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* ── Image Side ── */}
          <div ref={imgRef} className="relative">
            {/* Main image */}
            <div className="relative overflow-hidden aspect-[4/5] w-full max-w-[480px] mx-auto lg:mx-0 lg:ml-auto">
              <motion.div
                initial={{ scale: 1.08 }}
                animate={imgView ? { scale: 1 } : { scale: 1.08 }}
                transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full h-full"
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=85&w=800&auto=format&fit=crop')",
                  }}
                />
              </motion.div>

              {/* Reveal overlay */}
              <motion.div
                initial={{ scaleX: 1 }}
                animate={imgView ? { scaleX: 0 } : { scaleX: 1 }}
                transition={{ duration: 1.1, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 bg-surface-deep origin-left z-10"
              />
            </div>

            {/* Gold accent border behind image */}
            <div
              className="absolute -bottom-5 -right-5 w-[85%] h-[85%] border border-accent/15 z-0
                         hidden lg:block pointer-events-none"
            />

            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={imgView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="absolute -bottom-8 -left-6 lg:-left-12 z-20
                         bg-surface-card border border-[rgba(212,175,55,0.12)]
                         p-6 shadow-luxury hidden md:grid grid-cols-2 gap-5"
            >
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center min-w-[80px]">
                  <Icon size={14} className="text-accent mx-auto mb-2" strokeWidth={1.5} />
                  <p className="font-display text-[1.5rem] font-light text-foreground leading-none">{value}</p>
                  <p className="font-body text-[0.62rem] font-light text-text-muted mt-1 tracking-wide leading-snug">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Mobile Stats Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="md:hidden grid grid-cols-2 gap-5 mt-14"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center border border-[rgba(212,175,55,0.1)] py-5 px-3">
              <Icon size={14} className="text-accent mx-auto mb-2" strokeWidth={1.5} />
              <p className="font-display text-2xl font-light text-foreground leading-none">{value}</p>
              <p className="font-body text-[0.65rem] font-light text-text-muted mt-1.5 tracking-wide">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
