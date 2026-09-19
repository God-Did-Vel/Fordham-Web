"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";
import { toast, Toaster } from "react-hot-toast";
import { Loader2, Crown, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function ClientLogin() {
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [showPass,  setShowPass]  = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await apiClient.post("/api/users/login", { email, password });
      localStorage.setItem("userToken", data.token);
      toast.success("Welcome back!");
      setTimeout(() => router.push("/dashboard"), 900);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid email or password");
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-24 relative bg-surface-void bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=85&w=1800&auto=format&fit=crop')",
      }}
    >
      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: "#1a1714", color: "#f5f0e6", border: "1px solid rgba(212,175,55,0.2)" },
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-surface-void/85 backdrop-blur-[2px]" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-[420px]
                      bg-surface-card/95 border border-[rgba(212,175,55,0.12)]
                      backdrop-blur-xl p-10 md:p-12 shadow-luxury">

        {/* Brand */}
        <div className="text-center mb-10">
          <Crown size={28} className="text-accent mx-auto mb-4" strokeWidth={1} />
          <h1 className="font-display text-[1.5rem] font-light text-foreground tracking-[0.08em] mb-1">
            Daddy Wealth Hotel
          </h1>
          <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.45em] text-accent mb-4">
            &amp; Suites
          </p>
          <div className="gold-divider mb-4" />
          <p className="font-body text-[0.78rem] font-light text-text-muted leading-relaxed">
            Guest Portal — Sign in to manage your bookings and profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block font-body text-[0.58rem] font-semibold uppercase tracking-[0.35em] text-text-muted mb-2">
              Email or Phone
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full bg-surface-dark border border-[rgba(212,175,55,0.1)] text-foreground
                         px-4 py-3.5 font-body text-[0.82rem] font-light placeholder:text-text-muted
                         focus:outline-none focus:border-accent transition-colors duration-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-body text-[0.58rem] font-semibold uppercase tracking-[0.35em] text-text-muted mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full bg-surface-dark border border-[rgba(212,175,55,0.1)] text-foreground
                           px-4 py-3.5 pr-11 font-body text-[0.82rem] font-light placeholder:text-text-muted
                           focus:outline-none focus:border-accent transition-colors duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPass ? <EyeOff size={14} strokeWidth={1.5} /> : <Eye size={14} strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          {/* Remember / Forgot */}
          <div className="flex items-center justify-between text-[0.7rem] font-body">
            <label className="flex items-center gap-2 cursor-pointer text-text-muted hover:text-accent-pale transition-colors">
              <input type="checkbox" className="accent-accent w-3 h-3" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-text-muted hover:text-accent transition-colors duration-300">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-luxury-filled w-full py-4 text-[0.63rem] flex items-center justify-center gap-3
                       disabled:opacity-40 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? (
              <><Loader2 size={14} className="animate-spin" /> Signing in…</>
            ) : (
              <><span>Sign In</span><ArrowRight size={12} /></>
            )}
          </button>

          {/* Divider */}
          <div className="h-px bg-[rgba(212,175,55,0.07)] my-2" />

          {/* Register link */}
          <p className="text-center font-body text-[0.75rem] font-light text-text-muted">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-accent hover:text-accent-bright transition-colors duration-300 font-medium"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>

      {/* Bottom brand note */}
      <p className="absolute bottom-8 inset-x-0 text-center font-body text-[0.65rem] font-light text-white/20 tracking-wide">
        &copy; {new Date().getFullYear()} Daddy Wealth Hotel and Suites. All rights reserved.
      </p>
    </div>
  );
}
