"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flower2, Wind, Droplet, Sparkles, Loader2, CheckCircle2, X, Crown, ArrowRight } from "lucide-react";
import { apiClient } from "@/lib/api";

const services = [
  { icon: Flower2,   title: "Aromatherapy",   desc: "Ancient essential oil rituals to restore harmony and calm the nervous system." },
  { icon: Wind,      title: "Steam Room",     desc: "Purify, detoxify and open the skin with our premium eucalyptus steam chambers." },
  { icon: Droplet,   title: "Hydrotherapy",  desc: "Restorative water-based therapies designed to relieve tension and revive tired muscles." },
  { icon: Sparkles,  title: "Signature Facials", desc: "Radiance-boosting treatments using organic, clinically proven actives for every skin type." },
];

const inputUnderline =
  "w-full bg-transparent border-b border-[rgba(212,175,55,0.2)] pb-3 text-foreground " +
  "font-body text-[0.82rem] font-light placeholder:text-text-muted " +
  "focus:outline-none focus:border-accent transition-colors duration-300";

export default function SpaPage() {
  const [isBooking, setIsBooking] = useState(false);
  const [formData,  setFormData]  = useState({
    guest_name:   "",
    guest_email:  "",
    guest_phone:  "",
    booking_date: "",
    service_type: "Swedish Massage",
  });
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message?: string;
    code?: string;
  }>({ type: "idle" });

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading" });
    try {
      const { data } = await apiClient.post("/api/spa/book", formData);
      setStatus({ type: "success", message: "Your appointment has been confirmed.", code: data.tracking_code });
      setIsBooking(false);
    } catch (error: any) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Failed to book appointment. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-surface-deep">

      {/* ── Hero Banner ── */}
      <div className="relative h-[52vh] min-h-[420px] overflow-hidden flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=85&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 container-luxury pb-16 pt-32">
          <div className="flex items-center gap-4 mb-4">
            <div className="gold-divider-left w-10" />
            <span className="section-label">Serenity &amp; Wellness</span>
          </div>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light text-foreground">
            The Oasis{" "}
            <em className="not-italic text-gold-gradient">Spa</em>
          </h1>
          <p className="font-body font-light text-white/60 text-[0.88rem] mt-4 max-w-xl leading-loose">
            Rejuvenate body and soul in our world-class wellness sanctuary, crafted for
            the guests of Daddy Wealth Hotel and Suites.
          </p>
        </div>
      </div>

      {/* ── Service Cards ── */}
      <div className="container-luxury py-20">
        <div className="text-center mb-14 space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="gold-divider" />
            <span className="section-label">Our Treatments</span>
            <div className="gold-divider" />
          </div>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light text-foreground">
            Curated Wellness Experiences
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {services.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="group bg-surface-card border border-[rgba(212,175,55,0.07)]
                         hover:border-[rgba(212,175,55,0.25)] p-8 text-center
                         transition-all duration-500"
            >
              <div className="border border-[rgba(212,175,55,0.15)] group-hover:border-accent/40
                              p-4 inline-flex items-center justify-center mb-5 transition-colors duration-400">
                <item.icon size={22} className="text-accent" strokeWidth={1} />
              </div>
              <h4 className="font-display text-[1.1rem] font-light text-foreground mb-3">{item.title}</h4>
              <p className="font-body text-[0.78rem] font-light text-text-muted leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Main Feature Split ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative overflow-hidden aspect-[4/5] group"
          >
            <img
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=85&w=800&auto=format&fit=crop"
              alt="The Oasis Spa at Daddy Wealth Hotel and Suites"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-104"
            />
            <div className="absolute inset-0 bg-surface-void/20 group-hover:bg-surface-void/5 transition-all duration-700" />
            {/* Border accent */}
            <div className="absolute -bottom-4 -right-4 w-4/5 h-4/5 border border-accent/12 pointer-events-none z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="gold-divider-left w-10" />
              <span className="section-label">A Sanctuary for the Senses</span>
            </div>

            <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-light text-foreground leading-[1.1]">
              Surrender to{" "}
              <em className="not-italic text-gold-gradient">Total</em>{" "}
              Renewal
            </h2>

            <div className="gold-divider-left" />

            <p className="font-body font-light text-text-secondary text-[0.88rem] leading-[1.95]">
              Escape the bustle of the city and step into a sanctuary where healing begins the
              moment you arrive. Our expert therapists — trained in both traditional and modern
              techniques — offer a comprehensive menu of treatments tailored to your individual
              wellness journey.
            </p>

            <p className="font-body font-light text-text-muted text-[0.85rem] leading-[1.95]">
              From deep tissue massages and hot stone therapies to bespoke facials and
              hydrotherapy circuits, every detail is considered and every session is designed
              exclusively for you.
            </p>

            {status.type !== "success" && (
              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={() => setIsBooking(true)}
                  className="btn-luxury text-[0.6rem]"
                >
                  <span>Book a Treatment</span>
                </button>
                <span className="font-body text-[0.7rem] font-light text-text-muted">
                  Complimentary consultation included
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Booking Modal ── */}
      <AnimatePresence>
        {isBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center
                       bg-surface-void/90 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1,    y: 0  }}
              exit={{    scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-surface-card border border-[rgba(212,175,55,0.15)]
                         p-8 md:p-12 w-full max-w-xl relative"
            >
              <button
                onClick={() => setIsBooking(false)}
                aria-label="Close"
                className="absolute top-5 right-5 text-text-muted hover:text-accent transition-colors duration-300"
              >
                <X size={16} strokeWidth={2} />
              </button>

              <div className="text-center mb-8">
                <Crown size={24} className="text-accent mx-auto mb-3" strokeWidth={1} />
                <h3 className="font-display text-[1.6rem] font-light text-foreground mb-1">
                  Schedule a Treatment
                </h3>
                <p className="font-body text-[0.78rem] font-light text-text-muted">
                  Daddy Wealth Hotel &amp; Suites — The Oasis Spa
                </p>
              </div>

              {status.type === "error" && (
                <div className="mb-6 border border-red-500/30 bg-red-500/8 text-red-400
                                font-body text-[0.78rem] font-light p-4 text-center">
                  {status.message}
                </div>
              )}

              <form onSubmit={handleBook} className="space-y-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-body text-[0.58rem] font-semibold uppercase tracking-[0.35em] text-text-muted mb-3">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className={inputUnderline}
                      placeholder="Your full name"
                      value={formData.guest_name}
                      onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block font-body text-[0.58rem] font-semibold uppercase tracking-[0.35em] text-text-muted mb-3">
                      Phone
                    </label>
                    <input
                      type="tel"
                      required
                      className={inputUnderline}
                      placeholder="+234 000 000 0000"
                      value={formData.guest_phone}
                      onChange={(e) => setFormData({ ...formData, guest_phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-[0.58rem] font-semibold uppercase tracking-[0.35em] text-text-muted mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className={inputUnderline}
                    placeholder="your@email.com"
                    value={formData.guest_email}
                    onChange={(e) => setFormData({ ...formData, guest_email: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-body text-[0.58rem] font-semibold uppercase tracking-[0.35em] text-text-muted mb-3">
                      Date &amp; Time
                    </label>
                    <input
                      type="datetime-local"
                      required
                      className={inputUnderline}
                      value={formData.booking_date}
                      style={{ colorScheme: "dark" }}
                      onChange={(e) => setFormData({ ...formData, booking_date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block font-body text-[0.58rem] font-semibold uppercase tracking-[0.35em] text-text-muted mb-3">
                      Treatment
                    </label>
                    <select
                      className={`${inputUnderline} appearance-none`}
                      value={formData.service_type}
                      onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                    >
                      <option value="Swedish Massage">Swedish Massage</option>
                      <option value="Deep Tissue">Deep Tissue Massage</option>
                      <option value="Aromatherapy">Aromatherapy</option>
                      <option value="Facial Therapy">Facial Therapy</option>
                      <option value="Hot Stone">Hot Stone Treatment</option>
                      <option value="Hydrotherapy">Hydrotherapy</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status.type === "loading"}
                  className="btn-luxury-filled w-full py-4 text-[0.63rem] flex items-center justify-center gap-3
                             disabled:opacity-40 disabled:cursor-not-allowed mt-4"
                >
                  {status.type === "loading" ? (
                    <><Loader2 size={14} className="animate-spin" /> Processing…</>
                  ) : (
                    <><span>Confirm Appointment</span><ArrowRight size={12} /></>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Success Overlay ── */}
      <AnimatePresence>
        {status.type === "success" && status.code && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center
                       bg-surface-void/97 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1,    y: 0  }}
              transition={{ duration: 0.4 }}
              className="text-center p-10 max-w-md"
            >
              <CheckCircle2 size={52} className="text-accent mx-auto mb-6" strokeWidth={1} />
              <h3 className="font-display text-[2rem] font-light text-foreground mb-3">
                Appointment Confirmed
              </h3>
              <div className="gold-divider mb-6" />
              <p className="font-body text-[0.82rem] font-light text-text-muted leading-relaxed mb-8">
                Thank you for booking at The Oasis Spa, Daddy Wealth Hotel and Suites. Please
                retain your tracking code for reference.
              </p>

              <div className="border border-[rgba(212,175,55,0.25)] bg-surface-card px-8 py-5 inline-block mb-8">
                <p className="font-body text-[0.58rem] font-semibold uppercase tracking-[0.4em] text-text-muted mb-2">
                  Tracking Code
                </p>
                <p className="font-display text-[1.8rem] font-light text-accent tracking-wider">
                  {status.code}
                </p>
              </div>

              <div>
                <button
                  onClick={() => setStatus({ type: "idle" })}
                  className="font-body text-[0.62rem] font-semibold uppercase tracking-[0.3em]
                             text-text-muted hover:text-accent transition-colors duration-300"
                >
                  Return to Spa Page
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
