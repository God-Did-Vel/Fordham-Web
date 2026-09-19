"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Crown } from "lucide-react";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [isClient,  setIsClient]  = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    // Skip splash on admin routes
    if (pathname?.startsWith("/admin")) {
      setShowSplash(false);
      return;
    }
    const timer = setTimeout(() => setShowSplash(false), 3200);
    return () => clearTimeout(timer);
  }, [isClient, pathname]);

  if (!isClient) return <>{children}</>;

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
            className="fixed inset-0 z-[10001] flex flex-col items-center justify-center
                       bg-surface-void overflow-hidden"
          >
            {/* Subtle radial gold glow */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.05]"
              style={{ background: "radial-gradient(ellipse at 50% 60%, #d4af37 0%, transparent 60%)" }}
            />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="flex flex-col items-center gap-5 text-center px-8"
            >
              <Crown
                size={32}
                className="text-accent animate-float"
                strokeWidth={1}
              />

              <div className="space-y-1">
                <p className="font-body text-[0.55rem] font-semibold uppercase tracking-[0.6em] text-accent">
                  Welcome to
                </p>
                <h1
                  className="font-display text-[clamp(1.6rem,5vw,2.8rem)] font-light tracking-[0.08em]
                             text-foreground leading-tight"
                >
                  Daddy Wealth Hotel
                </h1>
                <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.5em] text-accent">
                  &amp; Suites
                </p>
              </div>

              {/* Gold divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1  }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="w-20 h-px bg-gradient-to-r from-transparent via-accent to-transparent origin-center"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="font-body text-[0.72rem] font-light text-text-muted tracking-[0.08em] max-w-[260px] leading-loose"
              >
                Where timeless elegance meets<br />unrivalled luxury
              </motion.p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.8, ease: "easeInOut", delay: 0.2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
