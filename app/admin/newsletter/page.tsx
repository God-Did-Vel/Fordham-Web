"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { Loader2, Mail, Crown } from "lucide-react";

const thClass =
  "px-5 py-4 font-body text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-text-muted text-left";
const tdClass = "px-5 py-4 border-t border-[rgba(212,175,55,0.05)]";

export default function NewsletterManagement() {
  const { data: subscribers, isLoading } = useQuery({
    queryKey: ["admin-newsletter"],
    queryFn: async () => {
      const token = localStorage.getItem("adminToken");
      const { data } = await apiClient.get("/api/newsletter", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-3 mb-2">
          <Crown size={14} className="text-accent" strokeWidth={1.5} />
          <span className="section-label">Daddy Wealth Hotel &amp; Suites</span>
        </div>
        <h1 className="font-display text-[2rem] font-light text-foreground">Newsletter Subscribers</h1>
        <p className="font-body text-[0.82rem] font-light text-text-muted">
          View all email subscribers for Daddy Wealth Hotel and Suites communications.
        </p>
      </div>

      {/* Subscriber count badge */}
      {subscribers && (
        <div className="inline-flex items-center gap-3 border border-[rgba(212,175,55,0.15)] bg-accent/5 px-5 py-3">
          <Mail size={13} className="text-accent" strokeWidth={1.5} />
          <span className="font-body text-[0.72rem] font-light text-text-secondary">
            <strong className="text-accent font-semibold">{subscribers.length}</strong> active subscriber{subscribers.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-24">
          <Loader2 size={24} className="text-accent animate-spin" />
        </div>
      ) : (
        <div className="bg-surface-card border border-[rgba(212,175,55,0.07)] overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead className="bg-surface-dark border-b border-[rgba(212,175,55,0.07)]">
              <tr>
                <th className={thClass}>Email Address</th>
                <th className={thClass}>Subscribed</th>
              </tr>
            </thead>
            <tbody>
              {subscribers?.map((sub: any) => (
                <tr key={sub._id} className="hover:bg-surface-dark/50 transition-colors duration-200">
                  <td className={tdClass}>
                    <div className="flex items-center gap-3">
                      <Mail size={12} className="text-accent/50 shrink-0" strokeWidth={1.5} />
                      <span className="font-body text-[0.82rem] font-light text-foreground">
                        {sub.email}
                      </span>
                    </div>
                  </td>
                  <td className={tdClass}>
                    <span className="font-body text-[0.75rem] font-light text-text-muted">
                      {new Date(sub.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric", month: "long", year: "numeric",
                      })}
                    </span>
                  </td>
                </tr>
              ))}
              {(!subscribers || subscribers.length === 0) && (
                <tr>
                  <td colSpan={2} className="px-6 py-16 text-center font-body text-[0.8rem] font-light text-text-muted border-t border-[rgba(212,175,55,0.05)]">
                    No subscribers yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
