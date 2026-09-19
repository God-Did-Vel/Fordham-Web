"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { Loader2, CheckCircle, AlertTriangle, ExternalLink, Crown } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const thClass =
  "px-5 py-4 font-body text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-text-muted text-left";
const tdClass = "px-5 py-4 border-t border-[rgba(212,175,55,0.05)]";

export default function PaymentsManagement() {
  const { data: payments, isLoading, refetch } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: async () => {
      const token = localStorage.getItem("adminToken");
      const { data } = await apiClient.get("/api/payments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      await apiClient.put(`/api/payments/${id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Payment marked as ${newStatus}.`);
      refetch();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update payment.");
    }
  };

  const statusStyle = (s: string) => {
    if (s === "paid")     return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
    if (s === "pending")  return "bg-amber-500/10  text-amber-400  border border-amber-500/20";
    if (s === "flagged")  return "bg-red-500/10    text-red-400    border border-red-500/20";
    return                       "bg-white/5        text-text-muted  border border-white/10";
  };

  return (
    <div className="space-y-8">
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: "#1a1714", color: "#f5f0e6", border: "1px solid rgba(212,175,55,0.2)" },
        }}
      />

      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-3 mb-2">
          <Crown size={14} className="text-accent" strokeWidth={1.5} />
          <span className="section-label">Daddy Wealth Hotel &amp; Suites</span>
        </div>
        <h1 className="font-display text-[2rem] font-light text-foreground">Payment Management</h1>
        <p className="font-body text-[0.82rem] font-light text-text-muted">
          Review receipts and confirm guest payments.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-24">
          <Loader2 size={24} className="text-accent animate-spin" />
        </div>
      ) : (
        <div className="bg-surface-card border border-[rgba(212,175,55,0.07)] overflow-x-auto">
          <table className="w-full min-w-[860px]">
            <thead className="bg-surface-dark border-b border-[rgba(212,175,55,0.07)]">
              <tr>
                {["Guest & Booking", "Amount", "Method", "Receipt", "Status", "Actions"].map((h) => (
                  <th key={h} className={thClass}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments?.map((p: any) => (
                <tr key={p._id} className="hover:bg-surface-dark/50 transition-colors duration-200">
                  <td className={tdClass}>
                    <p className="font-body text-[0.82rem] font-medium text-foreground">
                      {p.booking_id?.user_id?.name || "Unknown Guest"}
                    </p>
                    <p className="font-body text-[0.68rem] font-light text-text-muted mt-0.5 font-mono">
                      Ref: {p.booking_id?._id?.substring(0, 8) || "N/A"}
                    </p>
                  </td>
                  <td className={tdClass}>
                    <span className="font-display text-[1rem] font-light text-accent">
                      ₦{p.amount?.toLocaleString()}
                    </span>
                  </td>
                  <td className={tdClass}>
                    <span className="font-body text-[0.78rem] font-light text-text-muted capitalize">
                      {p.payment_method?.replace("_", " ")}
                    </span>
                  </td>
                  <td className={tdClass}>
                    {p.receipt_url ? (
                      <a
                        href={p.receipt_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-body text-[0.72rem] font-medium
                                   text-accent hover:text-accent-bright transition-colors duration-300"
                      >
                        View <ExternalLink size={11} strokeWidth={2} />
                      </a>
                    ) : (
                      <span className="font-body text-[0.72rem] font-light text-text-faint italic">No receipt</span>
                    )}
                  </td>
                  <td className={tdClass}>
                    <span className={`inline-block font-body text-[0.58rem] font-semibold uppercase tracking-[0.25em] px-3 py-1.5 ${statusStyle(p.status)}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className={tdClass}>
                    {p.status === "pending" && (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleStatusChange(p._id, "paid")}
                          title="Mark as paid"
                          className="text-text-muted hover:text-emerald-400 transition-colors duration-300"
                        >
                          <CheckCircle size={16} strokeWidth={1.5} />
                        </button>
                        <button
                          onClick={() => handleStatusChange(p._id, "flagged")}
                          title="Flag issue"
                          className="text-text-muted hover:text-red-400 transition-colors duration-300"
                        >
                          <AlertTriangle size={16} strokeWidth={1.5} />
                        </button>
                      </div>
                    )}
                    {p.status === "flagged" && (
                      <button
                        onClick={() => handleStatusChange(p._id, "pending")}
                        title="Reset to pending"
                        className="text-text-muted hover:text-amber-400 transition-colors duration-300"
                      >
                        <Loader2 size={16} strokeWidth={1.5} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {(!payments || payments.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center font-body text-[0.8rem] font-light text-text-muted border-t border-[rgba(212,175,55,0.05)]">
                    No payments found.
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
