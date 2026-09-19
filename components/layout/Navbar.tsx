"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Crown } from "lucide-react";

const navLinks = [
  { href: "/",          label: "Home"          },
  { href: "/rooms",     label: "Rooms & Suites" },
  { href: "/spa",       label: "Wellness & Spa"  },
  { href: "/gallery",   label: "Gallery"         },
  { href: "/login",     label: "Sign In"          },
];

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <nav
      className={`fixed w-full z-[500] transition-all duration-700 ${
        scrolled
          ? "bg-[rgba(5,4,3,0.97)] backdrop-blur-xl py-3 shadow-nav border-b border-[rgba(212,175,55,0.06)]"
          : "bg-gradient-to-b from-[rgba(3,3,2,0.7)] to-transparent py-6"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-16 flex items-center justify-between">

        {/* ── Logo / Brand ── */}
        <Link href="/" className="group flex flex-col items-start leading-none select-none">
          <span className="flex items-center gap-2">
            <Crown
              size={14}
              className="text-accent mb-0.5 group-hover:text-accent-bright transition-colors duration-300"
              strokeWidth={1.5}
            />
            <span
              className="text-[0.6rem] font-body font-semibold tracking-[0.45em] uppercase text-accent
                         group-hover:text-accent-bright transition-colors duration-300"
            >
              Est. 2024
            </span>
          </span>
          <span
            className="font-display text-[1.15rem] md:text-[1.3rem] font-light tracking-[0.12em] text-foreground
                       group-hover:text-accent-pale transition-colors duration-500 leading-tight mt-0.5 whitespace-nowrap"
          >
            Daddy Wealth Hotel
          </span>
          <span
            className="font-display text-[0.7rem] md:text-[0.75rem] font-light tracking-[0.35em] uppercase
                       text-accent group-hover:text-accent-bright transition-colors duration-500 leading-tight"
          >
            &amp; Suites
          </span>
        </Link>

        {/* ── Desktop Links ── */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[0.62rem] font-body font-semibold uppercase tracking-[0.22em]
                            transition-colors duration-300 whitespace-nowrap
                            after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-accent
                            after:transition-all after:duration-400
                            ${active
                              ? "text-accent after:w-full"
                              : "text-white/75 hover:text-accent after:w-0 hover:after:w-full"
                            }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Divider */}
          <div className="h-5 w-px bg-accent/20" />

          {/* Book Now CTA */}
          <Link
            href="/book"
            className="btn-luxury text-[0.6rem] px-6 py-2.5"
          >
            <span>Book Now</span>
          </Link>
        </div>

        {/* ── Mobile Toggle ── */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden text-white/80 hover:text-accent transition-colors duration-300 focus:outline-none p-1"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      <div
        className={`md:hidden absolute top-full left-0 w-full
                    bg-[rgba(5,4,3,0.98)] backdrop-blur-2xl border-t border-[rgba(212,175,55,0.08)]
                    flex flex-col items-center py-12 gap-8
                    transition-all duration-500 ease-luxury
                    ${isOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-3 pointer-events-none"
                    }`}
      >
        {/* Mobile Brand */}
        <div className="flex flex-col items-center gap-1">
          <Crown size={20} className="text-accent" strokeWidth={1} />
          <p className="font-display text-xl font-light tracking-[0.15em] text-foreground mt-1">
            Daddy Wealth Hotel
          </p>
          <p className="font-body text-[0.65rem] font-semibold tracking-[0.45em] uppercase text-accent">
            &amp; Suites
          </p>
        </div>

        {/* Gold thin line */}
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

        {/* Links */}
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-[0.7rem] font-body font-semibold uppercase tracking-[0.35em]
                       text-white/70 hover:text-accent transition-colors duration-300"
          >
            {link.label}
          </Link>
        ))}

        {/* Book CTA */}
        <Link
          href="/book"
          onClick={() => setIsOpen(false)}
          className="btn-luxury text-[0.65rem] px-10 py-3 mt-2"
        >
          <span>Reserve Now</span>
        </Link>
      </div>
    </nav>
  );
}
