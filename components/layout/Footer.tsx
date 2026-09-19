"use client";

import { useState } from "react";
import Link from "next/link";
import { Crown, Instagram, Facebook, Twitter, Loader2, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { apiClient } from "@/lib/api";

const exploreLinks = [
  { href: "/",          label: "Home"              },
  { href: "/rooms",     label: "Rooms & Suites"    },
  { href: "/spa",       label: "Wellness & Spa"    },
  { href: "/gallery",   label: "Gallery"           },
  { href: "/book",      label: "Reservations"      },
];

const serviceLinks = [
  { href: "/restaurant", label: "Restaurant & Bar"  },
  { href: "/spa",        label: "The Oasis Spa"     },
  { href: "/events",     label: "Events & Meetings" },
  { href: "/book",       label: "Book a Room"       },
];

export default function Footer() {
  const [email,  setEmail]  = useState("");
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus({ type: "loading" });
    try {
      await apiClient.post("/api/newsletter/subscribe", { email });
      setStatus({ type: "success", message: "Thank you for subscribing." });
      setEmail("");
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.response?.data?.message ?? "Subscription failed. Please try again.",
      });
    }
  };

  return (
    <footer className="relative bg-surface-void text-foreground overflow-hidden">

      {/* Top gold accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.018] bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url%28%23noise%29%22%2F%3E%3C%2Fsvg%3E')] pointer-events-none" />

      {/* Main grid */}
      <div className="container-luxury py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">

        {/* ── Brand Column ── */}
        <div className="space-y-6 lg:col-span-1">
          <Link href="/" className="group inline-flex flex-col gap-1">
            <span className="flex items-center gap-2">
              <Crown size={13} className="text-accent" strokeWidth={1.5} />
              <span className="text-[0.58rem] font-body font-semibold tracking-[0.45em] uppercase text-accent">
                Est. 2024
              </span>
            </span>
            <span className="font-display text-[1.3rem] font-light tracking-[0.1em] text-foreground leading-tight group-hover:text-accent-pale transition-colors duration-500">
              Daddy Wealth Hotel
            </span>
            <span className="font-body text-[0.62rem] font-semibold tracking-[0.4em] uppercase text-accent leading-tight group-hover:text-accent-bright transition-colors duration-500">
              &amp; Suites
            </span>
          </Link>

          {/* Gold divider */}
          <div className="gold-divider-left" />

          <p className="text-text-muted font-body font-light text-[0.82rem] leading-relaxed max-w-[260px]">
            Where timeless elegance meets modern luxury. Every stay at Daddy Wealth Hotel and Suites is
            an unforgettable chapter of refined hospitality.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5 pt-2">
            {[
              { icon: Instagram, href: "#", label: "Instagram" },
              { icon: Facebook,  href: "#", label: "Facebook"  },
              { icon: Twitter,   href: "#", label: "Twitter"   },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-text-muted hover:text-accent transition-colors duration-300
                           border border-[rgba(212,175,55,0.1)] p-2 hover:border-accent/40"
              >
                <Icon size={14} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* ── Explore Column ── */}
        <div>
          <h5 className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-accent mb-7">
            Explore
          </h5>
          <ul className="space-y-4">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-2 text-[0.8rem] font-body font-light
                             text-text-muted hover:text-accent-pale transition-colors duration-300"
                >
                  <ArrowRight
                    size={10}
                    className="text-accent/0 group-hover:text-accent transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                  />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Contact Column ── */}
        <div>
          <h5 className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-accent mb-7">
            Contact Us
          </h5>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={13} className="text-accent mt-0.5 shrink-0" strokeWidth={1.5} />
              <span className="text-[0.8rem] font-body font-light text-text-muted leading-relaxed">
                1 Daddy Wealth Boulevard,<br />Victoria Island, Lagos, Nigeria
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={13} className="text-accent shrink-0" strokeWidth={1.5} />
              <a
                href="tel:+2349031269748"
                className="text-[0.8rem] font-body font-light text-text-muted hover:text-accent transition-colors duration-300"
              >
                +234 903 126 9748
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={13} className="text-accent shrink-0" strokeWidth={1.5} />
              <a
                href="mailto:reservations@daddywealthhotel.com"
                className="text-[0.8rem] font-body font-light text-text-muted hover:text-accent transition-colors duration-300 break-all"
              >
                reservations@daddywealthhotel.com
              </a>
            </li>
          </ul>
        </div>

        {/* ── Newsletter Column ── */}
        <div>
          <h5 className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-accent mb-7">
            Newsletter
          </h5>
          <p className="text-[0.8rem] font-body font-light text-text-muted mb-6 leading-relaxed">
            Subscribe for exclusive offers, seasonal packages, and curated luxury experiences.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-3">
            <div className="flex border-b border-[rgba(212,175,55,0.2)] focus-within:border-accent transition-colors duration-300">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-transparent py-2.5 text-[0.78rem] font-body font-light text-foreground
                           placeholder:text-text-muted focus:outline-none"
              />
              <button
                type="submit"
                disabled={status.type === "loading"}
                aria-label="Subscribe"
                className="text-accent hover:text-accent-bright transition-colors duration-300 pl-4 disabled:opacity-40"
              >
                {status.type === "loading"
                  ? <Loader2 size={14} className="animate-spin" />
                  : <ArrowRight size={14} strokeWidth={2} />
                }
              </button>
            </div>

            {status.message && (
              <p className={`text-[0.72rem] font-body ${status.type === "success" ? "text-emerald-400" : "text-red-400"}`}>
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-[rgba(212,175,55,0.06)]">
        <div className="container-luxury py-7 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[0.7rem] font-body font-light text-text-faint text-center md:text-left">
            &copy; {new Date().getFullYear()} Daddy Wealth Hotel and Suites. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[0.68rem] font-body font-light text-text-faint hover:text-accent
                           transition-colors duration-300 tracking-wide"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
