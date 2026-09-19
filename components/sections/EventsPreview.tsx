"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Users } from "lucide-react";

const events = [
  {
    title:    "Gala & Black-Tie Dinners",
    category: "Private Events",
    capacity: "Up to 300 guests",
    image:
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=85&w=800&auto=format&fit=crop",
    desc:     "Host an unforgettable black-tie evening in our Grand Ballroom — draped in gold and candlelight, attended by our white-glove service team.",
  },
  {
    title:    "Corporate Conferences",
    category: "Business Events",
    capacity: "Up to 150 delegates",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=85&w=800&auto=format&fit=crop",
    desc:     "State-of-the-art AV equipment, high-speed connectivity, and dedicated event managers ensure every conference exceeds expectations.",
  },
  {
    title:    "Luxury Weddings",
    category: "Celebrations",
    capacity: "Up to 500 guests",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=85&w=800&auto=format&fit=crop",
    desc:     "Your dream wedding, brought to life by our expert planners across our breathtaking indoor and outdoor ceremony venues.",
  },
  {
    title:    "Intimate Celebrations",
    category: "Special Occasions",
    capacity: "Up to 40 guests",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=85&w=800&auto=format&fit=crop",
    desc:     "Birthdays, anniversaries, and milestones celebrated in style within our private dining rooms — tailored entirely to your vision.",
  },
];

export default function EventsPreview() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(headRef, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + events.length) % events.length);
  const next = () => setActive((a) => (a + 1) % events.length);

  return (
    <section className="section-padding bg-surface-void relative overflow-hidden">

      {/* Background number decoration */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[22rem] font-light
                   leading-none text-white/[0.015] select-none pointer-events-none"
      >
        {String(active + 1).padStart(2, "0")}
      </div>

      <div className="container-luxury">

        {/* ── Header ── */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.9 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14"
        >
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="gold-divider-left w-10" />
              <span className="section-label">Events &amp; Occasions</span>
            </div>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-foreground leading-[1.1]">
              Plan Your Perfect{" "}
              <em className="not-italic text-gold-gradient">Occasion</em>
            </h2>
            <p className="font-body font-light text-text-muted text-[0.88rem] max-w-[460px] leading-loose">
              From intimate gatherings to grand celebrations, Daddy Wealth Hotel and Suites
              provides the perfect canvas for every extraordinary event.
            </p>
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={prev}
              aria-label="Previous event"
              className="border border-[rgba(212,175,55,0.2)] hover:border-accent text-text-muted
                         hover:text-accent p-3 transition-all duration-300"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
            </button>
            <button
              onClick={next}
              aria-label="Next event"
              className="border border-[rgba(212,175,55,0.2)] hover:border-accent text-text-muted
                         hover:text-accent p-3 transition-all duration-300"
            >
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
            <span className="font-body text-[0.7rem] text-text-faint tracking-[0.2em] ml-2">
              <span className="text-accent font-medium">{String(active + 1).padStart(2, "0")}</span>
              {" / "}
              {String(events.length).padStart(2, "0")}
            </span>
          </div>
        </motion.div>

        {/* ── Cards Row ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {events.map((ev, i) => (
            <motion.div
              key={ev.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, delay: i * 0.1 }}
              onClick={() => setActive(i)}
              className={`group cursor-pointer flex flex-col overflow-hidden transition-all duration-500
                          border ${i === active
                            ? "border-accent/40 shadow-gold-sm"
                            : "border-[rgba(212,175,55,0.07)] hover:border-[rgba(212,175,55,0.2)]"
                          }`}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[3/4]">
                <div
                  className={`w-full h-full bg-cover bg-center transition-transform duration-700
                               ${i === active ? "scale-105" : "group-hover:scale-105"}`}
                  style={{ backgroundImage: `url('${ev.image}')` }}
                />
                <div className={`absolute inset-0 transition-all duration-500
                                 ${i === active ? "bg-surface-void/30" : "bg-surface-void/50 group-hover:bg-surface-void/30"}`} />

                {/* Category */}
                <div className="absolute top-4 left-4">
                  <span className="font-body text-[0.55rem] font-semibold uppercase tracking-[0.3em]
                                   text-accent/80 border border-accent/30 px-2.5 py-1 backdrop-blur-sm bg-surface-void/50">
                    {ev.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className={`p-5 space-y-3 flex-1 transition-colors duration-400
                               ${i === active ? "bg-surface-card" : "bg-surface-rich group-hover:bg-surface-card"}`}>
                <h3 className="font-display text-[1.1rem] font-light text-foreground leading-snug">
                  {ev.title}
                </h3>
                <p className="font-body text-[0.78rem] font-light text-text-muted leading-relaxed line-clamp-3">
                  {ev.desc}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <Users size={11} className="text-accent" strokeWidth={1.5} />
                  <span className="font-body text-[0.7rem] font-light text-text-muted">{ev.capacity}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-14
                     pt-10 border-t border-[rgba(212,175,55,0.08)]"
        >
          <div className="flex items-center gap-3 text-text-muted">
            <Calendar size={14} className="text-accent" strokeWidth={1.5} />
            <span className="font-body text-[0.8rem] font-light">
              Contact our events team for a personalised proposal
            </span>
          </div>
          <Link href="/book" className="btn-luxury text-[0.6rem]">
            <span>Plan Your Event</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
