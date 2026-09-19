"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { BedDouble, Users, Maximize2, ArrowRight } from "lucide-react";

const rooms = [
  {
    name:     "Royal Presidential Suite",
    category: "Presidential Suite",
    price:    "₦850,000",
    per:      "per night",
    size:     "120 m²",
    guests:   4,
    bed:      "King Bed",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=85&w=800&auto=format&fit=crop",
    features: ["Private butler service", "Floor-to-ceiling windows", "Jacuzzi & Rain shower", "Complimentary minibar"],
    slug: "royal-presidential-suite",
  },
  {
    name:     "Deluxe Penthouse Suite",
    category: "Penthouse Suite",
    price:    "₦550,000",
    per:      "per night",
    size:     "85 m²",
    guests:   2,
    bed:      "King Bed",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=85&w=800&auto=format&fit=crop",
    features: ["City skyline views", "Private terrace", "Marble en-suite", "Premium sound system"],
    slug: "deluxe-penthouse-suite",
  },
  {
    name:     "Executive Luxury Room",
    category: "Executive Room",
    price:    "₦250,000",
    per:      "per night",
    size:     "55 m²",
    guests:   2,
    bed:      "King Bed",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=85&w=800&auto=format&fit=crop",
    features: ["Work desk & seating area", "Smart TV & streaming", "Walk-in wardrobe", "Express laundry"],
    slug: "executive-luxury-room",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show:   (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

export default function FeaturedRooms() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section className="section-padding bg-surface-rich relative overflow-hidden">

      {/* Subtle top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="container-luxury">

        {/* ── Section Header ── */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-16 space-y-5"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="gold-divider w-8" />
            <span className="section-label">Our Accommodations</span>
            <div className="gold-divider w-8" />
          </div>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-foreground">
            Spaces Designed for{" "}
            <em className="not-italic text-gold-gradient">Royalty</em>
          </h2>
          <p className="font-body font-light text-text-muted text-[0.88rem] max-w-[500px] mx-auto leading-loose">
            Each room and suite at Daddy Wealth Hotel and Suites is a private sanctuary — a
            meticulous union of heritage craft and contemporary comfort.
          </p>
        </motion.div>

        {/* ── Room Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {rooms.map((room, i) => (
            <motion.div
              key={room.slug}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="group flex flex-col bg-surface-card border border-[rgba(212,175,55,0.07)]
                         hover:border-[rgba(212,175,55,0.22)] transition-all duration-600 overflow-hidden"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700
                             group-hover:scale-105"
                  style={{ backgroundImage: `url('${room.image}')` }}
                />
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-surface-void/0 group-hover:bg-surface-void/30 transition-all duration-500" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="font-body text-[0.55rem] font-semibold uppercase tracking-[0.3em]
                                   text-surface-deep bg-accent px-3 py-1.5">
                    {room.category}
                  </span>
                </div>

                {/* Price */}
                <div className="absolute bottom-4 right-4 text-right">
                  <p className="font-display text-xl font-light text-white leading-none">{room.price}</p>
                  <p className="font-body text-[0.6rem] text-white/60 tracking-wide mt-0.5">{room.per}</p>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 gap-4">
                <div>
                  <h3 className="font-display text-[1.25rem] font-light text-foreground leading-tight mb-2">
                    {room.name}
                  </h3>
                  {/* Meta row */}
                  <div className="flex items-center gap-4 text-text-muted">
                    <span className="flex items-center gap-1.5 text-[0.72rem] font-body">
                      <Maximize2 size={11} strokeWidth={1.5} />
                      {room.size}
                    </span>
                    <span className="flex items-center gap-1.5 text-[0.72rem] font-body">
                      <Users size={11} strokeWidth={1.5} />
                      {room.guests} Guests
                    </span>
                    <span className="flex items-center gap-1.5 text-[0.72rem] font-body">
                      <BedDouble size={11} strokeWidth={1.5} />
                      {room.bed}
                    </span>
                  </div>
                </div>

                {/* Thin rule */}
                <div className="h-px bg-[rgba(212,175,55,0.07)]" />

                {/* Features */}
                <ul className="grid grid-cols-1 gap-1.5">
                  {room.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[0.75rem] font-body font-light text-text-muted">
                      <span className="w-1 h-1 bg-accent shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-auto pt-2">
                  <Link
                    href={`/book?roomSlug=${room.slug}`}
                    className="group/link flex items-center justify-between w-full
                               border-t border-[rgba(212,175,55,0.1)] pt-4
                               text-[0.62rem] font-body font-semibold uppercase tracking-[0.25em]
                               text-text-muted hover:text-accent transition-colors duration-300"
                  >
                    Reserve This Suite
                    <ArrowRight
                      size={12}
                      className="transition-transform duration-300 group-hover/link:translate-x-1.5"
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── View All ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-14"
        >
          <Link href="/rooms" className="btn-luxury text-[0.6rem]">
            <span>View All Accommodations</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
