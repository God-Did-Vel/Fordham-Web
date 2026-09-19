"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactDetails = [
  {
    icon:  MapPin,
    label: "Address",
    value: "1 Daddy Wealth Boulevard, Victoria Island, Lagos, Nigeria",
  },
  {
    icon:  Phone,
    label: "Reservations",
    value: "+234 903 126 9748",
    href:  "tel:+2349031269748",
  },
  {
    icon:  Mail,
    label: "Email",
    value: "reservations@daddywealthhotel.com",
    href:  "mailto:reservations@daddywealthhotel.com",
  },
  {
    icon:  Clock,
    label: "Check-in / Check-out",
    value: "Check-in: 2:00 PM  ·  Check-out: 12:00 PM",
  },
];

export default function MapSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-surface-void relative overflow-hidden">
      {/* Top accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 min-h-[500px]">

        {/* ── Info Panel ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="lg:col-span-2 flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16 space-y-8
                     bg-surface-void border-b lg:border-b-0 lg:border-r border-[rgba(212,175,55,0.06)]"
        >
          {/* Header */}
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="gold-divider-left w-10" />
              <span className="section-label">Find Us</span>
            </div>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-light text-foreground leading-[1.1]">
              Visit Daddy Wealth<br />
              <em className="not-italic text-gold-gradient">Hotel &amp; Suites</em>
            </h2>
          </div>

          {/* Contact list */}
          <ul className="space-y-6">
            {contactDetails.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-4">
                <div className="mt-0.5 border border-[rgba(212,175,55,0.15)] p-2 shrink-0">
                  <Icon size={13} className="text-accent" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-text-faint mb-1">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="font-body text-[0.82rem] font-light text-text-secondary
                                 hover:text-accent transition-colors duration-300"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="font-body text-[0.82rem] font-light text-text-secondary">
                      {value}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Gold rule */}
          <div className="gold-divider-left" />

          <p className="font-body text-[0.78rem] font-light text-text-muted leading-relaxed">
            Located in the heart of Victoria Island, Daddy Wealth Hotel and Suites is minutes
            from the city's finest cultural, business and leisure destinations.
          </p>
        </motion.div>

        {/* ── Map ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="lg:col-span-3 relative min-h-[380px]"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7286183310643!2d3.4213!3d6.4281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjUnNDEuMiJOIDPCsDI1JzE2LjciRQ!5e0!3m2!1sen!2sng!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(100%) invert(90%) contrast(85%) brightness(0.4) sepia(20%)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full"
            title="Daddy Wealth Hotel and Suites location"
          />
          {/* Gold overlay tint */}
          <div className="absolute inset-0 bg-accent/[0.04] pointer-events-none" />
          {/* Border */}
          <div className="absolute inset-0 border border-[rgba(212,175,55,0.08)] pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
