"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, Bed, Calendar, Image as ImageIcon,
  LogOut, Loader2, CreditCard, Users, Sparkles, Mail,
  Settings, Menu, X, Crown,
} from "lucide-react";

const navItems = [
  { href: "/admin",                  label: "Overview",         icon: LayoutDashboard },
  { href: "/admin/rooms",            label: "Rooms",            icon: Bed             },
  { href: "/admin/bookings",         label: "Bookings",         icon: Calendar        },
  { href: "/admin/payments",         label: "Payments",         icon: CreditCard      },
  { href: "/admin/payment-methods",  label: "Payment Settings", icon: Settings        },
  { href: "/admin/users",            label: "Guests",           icon: Users           },
  { href: "/admin/spa-bookings",     label: "Spa Bookings",     icon: Sparkles        },
  { href: "/admin/newsletter",       label: "Newsletter",       icon: Mail            },
  { href: "/admin/gallery",          label: "Gallery",          icon: ImageIcon       },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router      = useRouter();
  const pathname    = usePathname();
  const [loading,   setLoading]   = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminEmail");
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-void flex flex-col items-center justify-center gap-4">
        <Crown size={28} className="text-accent" strokeWidth={1} />
        <Loader2 size={22} className="text-accent animate-spin" />
        <p className="font-body text-[0.65rem] font-light text-text-muted uppercase tracking-[0.35em]">
          Verifying Access
        </p>
      </div>
    );
  }

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="px-6 py-7 border-b border-[rgba(212,175,55,0.07)]">
        <div className="flex items-center gap-3 mb-1">
          <Crown size={14} className="text-accent" strokeWidth={1.5} />
          <span className="font-body text-[0.55rem] font-semibold uppercase tracking-[0.45em] text-accent">
            Admin Portal
          </span>
        </div>
        <p className="font-display text-[1.05rem] font-light text-foreground tracking-[0.08em] leading-tight">
          Daddy Wealth Hotel
        </p>
        <p className="font-body text-[0.58rem] font-semibold uppercase tracking-[0.4em] text-accent/70 leading-tight">
          &amp; Suites
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 transition-all duration-300 group
                          ${active
                            ? "bg-accent/10 border-l-2 border-accent text-accent"
                            : "text-text-muted hover:text-accent-pale hover:bg-white/[0.03] border-l-2 border-transparent"
                          }`}
            >
              <item.icon
                size={15}
                strokeWidth={active ? 2 : 1.5}
                className={`shrink-0 transition-colors duration-300 ${active ? "text-accent" : "group-hover:text-accent/70"}`}
              />
              <span className="font-body text-[0.72rem] font-light tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[rgba(212,175,55,0.07)]">
        <button
          onClick={handleLogout}
          className="flex items-center w-full gap-3 px-4 py-3
                     text-text-muted hover:text-red-400 hover:bg-red-500/5
                     transition-all duration-300"
        >
          <LogOut size={15} strokeWidth={1.5} />
          <span className="font-body text-[0.72rem] font-light tracking-wide">Sign Out</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-surface-deep flex text-foreground">

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex lg:w-64 flex-col admin-sidebar shrink-0">
        <SidebarContent />
      </aside>

      {/* ── Mobile Sidebar Overlay ── */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-surface-void/70 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 flex flex-col admin-sidebar lg:hidden">
            <SidebarContent />
          </aside>
        </>
      )}

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">

        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center justify-between
                        bg-surface-void border-b border-[rgba(212,175,55,0.07)]
                        px-5 py-4 sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <Crown size={14} className="text-accent" strokeWidth={1.5} />
            <span className="font-display text-[0.95rem] font-light text-foreground tracking-[0.06em]">
              DW Admin
            </span>
          </div>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="text-text-muted hover:text-accent transition-colors p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>

        {/* Page content */}
        <div className="flex-1 p-5 md:p-8 lg:p-10 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
