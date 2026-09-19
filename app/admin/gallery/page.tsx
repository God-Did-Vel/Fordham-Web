"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { Loader2, Plus, Trash2, X, Crown, ImageIcon } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const inputClass =
  "w-full bg-surface-dark border border-[rgba(212,175,55,0.1)] text-foreground " +
  "px-4 py-3 font-body text-[0.82rem] font-light placeholder:text-text-muted " +
  "focus:outline-none focus:border-accent transition-colors duration-300";

const labelClass =
  "block font-body text-[0.58rem] font-semibold uppercase tracking-[0.35em] text-text-muted mb-2";

export default function GalleryManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting,   setIsSubmitting]   = useState(false);
  const [formData, setFormData] = useState({
    image_url: "",
    category:  "exterior",
    caption:   "",
  });

  const { data: images, isLoading, refetch } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: async () => {
      const { data } = await apiClient.get("/api/gallery");
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image? This cannot be undone.")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await apiClient.delete(`/api/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Image removed from gallery.");
      refetch();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete image.");
    }
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("adminToken");
      await apiClient.post("/api/gallery", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Image added to gallery.");
      setIsAddModalOpen(false);
      setFormData({ image_url: "", category: "exterior", caption: "" });
      refetch();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add image.");
    } finally {
      setIsSubmitting(false);
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
          <h1 className="font-display text-[2rem] font-light text-foreground">Gallery Management</h1>
          <p className="font-body text-[0.82rem] font-light text-text-muted">
            Manage the visual showcase of Daddy Wealth Hotel and Suites.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-luxury-filled text-[0.6rem] flex items-center gap-2"
        >
          <Plus size={13} strokeWidth={2} />
          Upload Image
        </button>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex justify-center py-24">
          <Loader2 size={24} className="text-accent animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images?.map((img: any) => (
            <div
              key={img._id}
              className="group relative aspect-square overflow-hidden
                         border border-[rgba(212,175,55,0.07)] hover:border-[rgba(212,175,55,0.25)]
                         transition-all duration-400 bg-surface-card"
            >
              <img
                src={img.image_url}
                alt={img.caption || img.category}
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-surface-void/0 group-hover:bg-surface-void/70
                              transition-all duration-400 flex flex-col items-center justify-center gap-3 p-4 text-center">
                <p className="text-foreground font-display text-[0.9rem] font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate w-full">
                  {img.caption}
                </p>
                <p className="font-body text-[0.58rem] font-semibold uppercase tracking-[0.35em] text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.category}
                </p>
                <button
                  onClick={() => handleDelete(img._id)}
                  title="Delete image"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300
                             border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white
                             p-2.5 transition-colors"
                >
                  <Trash2 size={13} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}

          {(!images || images.length === 0) && (
            <div className="col-span-full py-20 text-center border border-dashed border-[rgba(212,175,55,0.12)]
                            flex flex-col items-center gap-4">
              <ImageIcon size={32} className="text-text-faint" strokeWidth={1} />
              <p className="font-body text-[0.8rem] font-light text-text-muted">
                No gallery images yet.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-surface-void/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-card border border-[rgba(212,175,55,0.15)] p-8 md:p-10 w-full max-w-md relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-text-muted hover:text-accent transition-colors"
              aria-label="Close"
            >
              <X size={16} strokeWidth={2} />
            </button>

            <div className="mb-7">
              <h3 className="font-display text-[1.5rem] font-light text-foreground mb-1">Add Gallery Image</h3>
              <p className="font-body text-[0.78rem] font-light text-text-muted">
                Daddy Wealth Hotel and Suites — Gallery
              </p>
            </div>

            <form onSubmit={handleAddImage} className="space-y-5">
              <div>
                <label className={labelClass}>Image URL *</label>
                <input
                  type="url"
                  required
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className={inputClass}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className={labelClass}>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={`${inputClass} appearance-none`}
                >
                  <option value="exterior">Exterior</option>
                  <option value="interior">Interior</option>
                  <option value="room">Room</option>
                  <option value="dining">Dining</option>
                  <option value="spa">Spa</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Caption <span className="text-text-faint normal-case tracking-normal">(optional)</span></label>
                <input
                  type="text"
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  className={inputClass}
                  placeholder="e.g. Infinity Pool at sunset"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-luxury-filled w-full py-3.5 text-[0.62rem] flex items-center justify-center gap-2
                           disabled:opacity-40 disabled:cursor-not-allowed mt-3"
              >
                {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : "Add to Gallery"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
