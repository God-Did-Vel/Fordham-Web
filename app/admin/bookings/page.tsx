"use client";

import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { Loader2, CheckCircle, XCircle, Crown } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const thClass =
  "px-5 py-4 font-body text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-text-muted text-left";
const tdClass = "px-5 py-4 border-t border-[rgba(212,175,55,0.05)]";

function BookingsContent() {
  const { data: bookings, isLoading, refetch } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const token = localStorage.getItem("adminToken");
      const { data } = await apiClient.get("/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
  });

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      await apiClient.patch(
        `/api/bookings/${id}/status`,
        { booking_status: status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Booking ${status === "confirmed" ? "approved" : "cancelled"}.`);
      refetch();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update booking.");
    }
  };

  const statusStyle = (s: string) => {
    if (s === "confirmed") return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
    if (s === "pending")   return "bg-amber-500/10  text-amber-400  border border-amber-500/20";
    return                        "bg-red-500/10    text-red-400    border border-red-500/20";
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
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3 mb-2">
            <Crown size={14} className="text-accent" strokeWidth={1.5} />
            <span className="section-label">Daddy Wealth Hotel &amp; Suites</span>
          </div>
          <h1 className="font-display text-[2rem] font-light text-foreground">
            Reservation Management
          </h1>
          <p className="font-body text-[0.82rem] font-light text-text-muted">
            Review and manage all guest bookings.
          </p>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-24">
          <Loader2 size={24} className="text-accent animate-spin" />
        </div>
      ) : (
        <div className="bg-surface-card border border-[rgba(212,175,55,0.07)] overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead className="bg-surface-dark border-b border-[rgba(212,175,55,0.07)]">
              <tr>
                <th className={thClass}>Guest Details</th>
                <th className={thClass}>Room &amp; Dates</th>
                <th className={thClass}>Total</th>
                <th className={thClass}>Status</th>
                <th className={thClass}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((b: any) => (
                <tr key={b._id} className="hover:bg-surface-dark/50 transition-colors duration-200">
                  <td className={tdClass}>
                    <p className="font-body text-[0.82rem] font-medium text-foreground">
                      {b.user_id?.name || b.guest_name || "Unknown Guest"}
                    </p>
                    <p className="font-body text-[0.72rem] font-light text-text-muted mt-0.5">
                      {b.user_id?.email || b.guest_email || "N/A"}
                    </p>
                    <p className="font-body text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-accent/60 mt-1">
                      #{b._id.substring(0, 8)}
                    </p>
                  </td>
                  <td className={tdClass}>
                    <p className="font-body text-[0.82rem] font-medium text-foreground">
                      {b.room_id?.name || "Unknown Room"}
                    </p>
                    <p className="font-body text-[0.72rem] font-light text-text-muted mt-0.5">
                      {new Date(b.check_in_date).toLocaleDateString()} &mdash;{" "}
                      {new Date(b.check_out_date).toLocaleDateString()}
                    </p>
                  </td>
                  <td className={tdClass}>
                    <span className="font-display text-[1rem] font-light text-accent">
                      ₦{b.total_amount?.toLocaleString() || 0}
                    </span>
                  </td>
                  <td className={tdClass}>
                    <span className={`inline-block font-body text-[0.58rem] font-semibold uppercase tracking-[0.3em] px-3 py-1.5 ${statusStyle(b.booking_status)}`}>
                      {b.booking_status === "confirmed" ? "Approved" : b.booking_status}
                    </span>
                  </td>
                  <td className={tdClass}>
                    {b.booking_status === "pending" && (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleStatusChange(b._id, "confirmed")}
                          title="Approve booking"
                          className="text-text-muted hover:text-emerald-400 transition-colors duration-300"
                        >
                          <CheckCircle size={17} strokeWidth={1.5} />
                        </button>
                        <button
                          onClick={() => handleStatusChange(b._id, "cancelled")}
                          title="Cancel booking"
                          className="text-text-muted hover:text-red-400 transition-colors duration-300"
                        >
                          <XCircle size={17} strokeWidth={1.5} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {(!bookings || bookings.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center font-body text-[0.8rem] font-light text-text-muted border-t border-[rgba(212,175,55,0.05)]">
                    No reservations found.
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

export default function BookingsManagement() {
  return (
    <Suspense fallback={
      <div className="flex justify-center py-24">
        <Loader2 size={24} className="text-accent animate-spin" />
      </div>
    }>
      <BookingsContent />
    </Suspense>
  );
}
