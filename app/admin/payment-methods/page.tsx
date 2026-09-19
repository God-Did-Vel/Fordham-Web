"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { Loader2, Plus, Trash2, Crown, CreditCard } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const inputClass =
  "w-full bg-surface-dark border border-[rgba(212,175,55,0.1)] text-foreground " +
  "px-4 py-3 font-body text-[0.82rem] font-light placeholder:text-text-muted " +
  "focus:outline-none focus:border-accent transition-colors duration-300";
const labelClass =
  "block font-body text-[0.58rem] font-semibold uppercase tracking-[0.35em] text-text-muted mb-2";

export default function AdminPaymentMethods() {
  const [isAdding,     setIsAdding]     = useState(false);
  const [newProvider,  setNewProvider]  = useState("");
  const [newDetails,   setNewDetails]   = useState("");
  const [isSaving,     setIsSaving]     = useState(false);

  const { data: methods, isLoading, refetch } = useQuery({
    queryKey: ["admin-payment-methods"],
    queryFn: async () => {
      const token = localStorage.getItem("adminToken");
      const { data } = await apiClient.get("/api/payment-methods/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
  });

  const handleAddMethod = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const token = localStorage.getItem("adminToken");
      await apiClient.post("/api/payment-methods", { provider: newProvider, details: newDetails, isActive: true }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Payment method added.");
      setNewProvider(""); setNewDetails(""); setIsAdding(false);
      refetch();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add method.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    try {
      const token = localStorage.getItem("adminToken");
      await apiClient.put(`/api/payment-methods/${id}`, { isActive: !current }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Method ${!current ? "activated" : "deactivated"}.`);
      refetch();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this payment method?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await apiClient.delete(`/api/payment-methods/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Payment method deleted.");
      refetch();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete.");
    }
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
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div className="space-y-1">
          <div className="flex items-center gap-3 mb-2">
            <Crown size={14} className="text-accent" strokeWidth={1.5} />
            <span className="section-label">Daddy Wealth Hotel &amp; Suites</span>
          </div>
          <h1 className="font-display text-[2rem] font-light text-foreground">Payment Methods</h1>
          <p className="font-body text-[0.82rem] font-light text-text-muted">
            Configure how guests can pay for their reservations.
          </p>
        </div>
        <button
          onClick={() => setIsAdding((v) => !v)}
          className={isAdding
            ? "btn-luxury text-[0.6rem] flex items-center gap-2"
            : "btn-luxury-filled text-[0.6rem] flex items-center gap-2"
          }
        >
          {isAdding ? "Cancel" : <><Plus size={13} strokeWidth={2} /> Add Method</>}
        </button>
      </div>

      {/* Add form */}
      {isAdding && (
        <div className="bg-surface-card border border-[rgba(212,175,55,0.12)] p-8">
          <h3 className="font-display text-[1.3rem] font-light text-foreground mb-6">
            Add New Payment Method
          </h3>
          <form onSubmit={handleAddMethod} className="space-y-5">
            <div>
              <label className={labelClass}>Provider Name *</label>
              <input
                type="text"
                required
                value={newProvider}
                onChange={(e) => setNewProvider(e.target.value)}
                className={inputClass}
                placeholder="e.g. Bank Transfer, USDT, Opay"
              />
            </div>
            <div>
              <label className={labelClass}>Payment Details / Instructions *</label>
              <textarea
                required
                rows={4}
                value={newDetails}
                onChange={(e) => setNewDetails(e.target.value)}
                className={`${inputClass} resize-none`}
                placeholder={"Account Name: Daddy Wealth Hotel and Suites\nAccount Number: 0123456789\nBank: First Bank Nigeria"}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="btn-luxury-filled text-[0.6rem] flex items-center gap-2 disabled:opacity-40"
              >
                {isSaving ? <Loader2 size={13} className="animate-spin" /> : "Save Method"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Methods grid */}
      {isLoading ? (
        <div className="flex justify-center py-24">
          <Loader2 size={24} className="text-accent animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {methods?.map((method: any) => (
            <div
              key={method._id}
              className="group relative bg-surface-card border border-[rgba(212,175,55,0.07)]
                         hover:border-[rgba(212,175,55,0.2)] transition-all duration-400 p-7"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5 pb-5 border-b border-[rgba(212,175,55,0.07)]">
                <div className="flex items-center gap-3">
                  <CreditCard size={15} className="text-accent" strokeWidth={1.5} />
                  <h3 className="font-display text-[1.15rem] font-light text-foreground">{method.provider}</h3>
                </div>
                <button
                  onClick={() => handleToggleActive(method._id, method.isActive)}
                  className={`font-body text-[0.58rem] font-semibold uppercase tracking-[0.25em] px-3 py-1.5 transition-colors duration-300 ${
                    method.isActive
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20"
                      : "bg-white/5 text-text-muted border border-white/10 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/20"
                  }`}
                >
                  {method.isActive ? "Active" : "Inactive"}
                </button>
              </div>

              {/* Details */}
              <p className="font-body text-[0.8rem] font-light text-text-muted leading-relaxed whitespace-pre-wrap">
                {method.details}
              </p>

              {/* Delete button */}
              <button
                onClick={() => handleDelete(method._id)}
                title="Delete method"
                className="absolute bottom-5 right-5 text-text-faint hover:text-red-400
                           transition-colors duration-300 opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={14} strokeWidth={1.5} />
              </button>
            </div>
          ))}

          {(!methods || methods.length === 0) && (
            <div className="col-span-full py-16 text-center border border-dashed border-[rgba(212,175,55,0.1)]
                            flex flex-col items-center gap-4">
              <CreditCard size={28} className="text-text-faint" strokeWidth={1} />
              <p className="font-body text-[0.8rem] font-light text-text-muted">
                No payment methods configured yet.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
