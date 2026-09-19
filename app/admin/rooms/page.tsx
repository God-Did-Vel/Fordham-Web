"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { Loader2, Plus, Trash2, X, Crown, BedDouble } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const inputClass =
  "w-full bg-surface-dark border border-[rgba(212,175,55,0.1)] text-foreground " +
  "px-4 py-3 font-body text-[0.82rem] font-light placeholder:text-text-muted " +
  "focus:outline-none focus:border-accent transition-colors duration-300";

const labelClass =
  "block font-body text-[0.58rem] font-semibold uppercase tracking-[0.35em] text-text-muted mb-2";

export default function RoomsManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting,   setIsSubmitting]   = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    name:            "",
    slug:            "",
    description:     "",
    price_per_night: 0,
    max_guests:      1,
    room_size:       "",
    bed_type:        "",
    images:          [] as string[],
  });

  const { data: rooms, isLoading, refetch } = useQuery({
    queryKey: ["admin-rooms"],
    queryFn: async () => {
      const { data } = await apiClient.get("/api/rooms");
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this room? This action cannot be undone.")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await apiClient.delete(`/api/rooms/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Room deleted successfully.");
      refetch();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete room.");
    }
  };

  const handleAddRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("adminToken");
      await apiClient.post("/api/rooms", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Room created successfully!");
      setIsAddModalOpen(false);
      setFormData({ name: "", slug: "", description: "", price_per_night: 0, max_guests: 1, room_size: "", bed_type: "", images: [] });
      refetch();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create room.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formDataFile = new FormData();
    formDataFile.append("image", file);
    setUploadingImage(true);
    try {
      const token = localStorage.getItem("adminToken");
      const { data } = await apiClient.post("/api/upload", formDataFile, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });
      setFormData((prev) => ({ ...prev, images: [...prev.images, data] }));
      toast.success("Image uploaded.");
    } catch {
      toast.error("Image upload failed.");
    } finally {
      setUploadingImage(false);
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
          <h1 className="font-display text-[2rem] font-light text-foreground">Room Management</h1>
          <p className="font-body text-[0.82rem] font-light text-text-muted">
            Manage hotel suites and accommodations.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-luxury-filled text-[0.6rem] flex items-center gap-2"
        >
          <Plus size={13} strokeWidth={2} />
          Add Room
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-24">
          <Loader2 size={24} className="text-accent animate-spin" />
        </div>
      ) : (
        <div className="bg-surface-card border border-[rgba(212,175,55,0.07)] overflow-x-auto">
          <table className="w-full min-w-[680px]">
            <thead className="bg-surface-dark border-b border-[rgba(212,175,55,0.07)]">
              <tr>
                {["Room Name", "Price / Night", "Capacity", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-4 font-body text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-text-muted text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rooms?.map((room: any) => (
                <tr key={room._id} className="hover:bg-surface-dark/50 transition-colors duration-200">
                  <td className="px-5 py-4 border-t border-[rgba(212,175,55,0.05)]">
                    <p className="font-body text-[0.82rem] font-medium text-foreground">{room.name}</p>
                    <p className="font-body text-[0.7rem] font-light text-text-muted mt-0.5">
                      {room.room_size} &bull; {room.bed_type}
                    </p>
                  </td>
                  <td className="px-5 py-4 border-t border-[rgba(212,175,55,0.05)]">
                    <span className="font-display text-[1rem] font-light text-accent">
                      ₦{Number(room.price_per_night).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-5 py-4 border-t border-[rgba(212,175,55,0.05)]">
                    <span className="font-body text-[0.8rem] font-light text-text-muted flex items-center gap-1.5">
                      <BedDouble size={12} strokeWidth={1.5} className="text-accent" />
                      Up to {room.max_guests} guests
                    </span>
                  </td>
                  <td className="px-5 py-4 border-t border-[rgba(212,175,55,0.05)]">
                    <span className={`inline-block font-body text-[0.58rem] font-semibold uppercase tracking-[0.25em] px-3 py-1.5 ${
                      room.availability_status
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}>
                      {room.availability_status ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="px-5 py-4 border-t border-[rgba(212,175,55,0.05)]">
                    <button
                      onClick={() => handleDelete(room._id)}
                      title="Delete room"
                      className="text-text-muted hover:text-red-400 transition-colors duration-300"
                    >
                      <Trash2 size={15} strokeWidth={1.5} />
                    </button>
                  </td>
                </tr>
              ))}
              {(!rooms || rooms.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center font-body text-[0.8rem] font-light text-text-muted border-t border-[rgba(212,175,55,0.05)]">
                    No rooms found. Add your first room to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Room Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-surface-void/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-card border border-[rgba(212,175,55,0.15)] p-8 md:p-10
                          w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-text-muted hover:text-accent transition-colors"
              aria-label="Close"
            >
              <X size={16} strokeWidth={2} />
            </button>

            <div className="mb-7">
              <h3 className="font-display text-[1.6rem] font-light text-foreground mb-1">Add New Room</h3>
              <p className="font-body text-[0.78rem] font-light text-text-muted">
                Daddy Wealth Hotel and Suites
              </p>
            </div>

            <form onSubmit={handleAddRoom} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Room Name *</label>
                  <input type="text" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass} placeholder="e.g. Royal Presidential Suite" />
                </div>
                <div>
                  <label className={labelClass}>URL Slug *</label>
                  <input type="text" required value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className={inputClass} placeholder="e.g. royal-presidential-suite" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Description *</label>
                <textarea required rows={3} value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`${inputClass} resize-none`}
                  placeholder="Describe this room or suite…" />
              </div>

              <div>
                <label className={labelClass}>Room Image</label>
                <input type="file" onChange={uploadFileHandler}
                  className={`${inputClass} file:mr-4 file:py-1.5 file:px-4 file:border-0
                              file:font-body file:text-[0.65rem] file:font-semibold file:uppercase file:tracking-wider
                              file:bg-accent file:text-surface-deep hover:file:bg-accent-bright cursor-pointer`} />
                {uploadingImage && (
                  <div className="flex items-center gap-2 mt-2 text-accent">
                    <Loader2 size={12} className="animate-spin" />
                    <span className="font-body text-[0.7rem]">Uploading…</span>
                  </div>
                )}
                {formData.images.length > 0 && (
                  <p className="mt-1.5 font-body text-[0.7rem] text-emerald-400">
                    {formData.images.length} image(s) attached
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Price Per Night (₦) *</label>
                  <input type="number" required min="0" value={formData.price_per_night}
                    onChange={(e) => setFormData({ ...formData, price_per_night: Number(e.target.value) })}
                    className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Max Guests *</label>
                  <input type="number" required min="1" value={formData.max_guests}
                    onChange={(e) => setFormData({ ...formData, max_guests: Number(e.target.value) })}
                    className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Room Size *</label>
                  <input type="text" required value={formData.room_size}
                    onChange={(e) => setFormData({ ...formData, room_size: e.target.value })}
                    className={inputClass} placeholder="e.g. 120 m²" />
                </div>
                <div>
                  <label className={labelClass}>Bed Type *</label>
                  <input type="text" required value={formData.bed_type}
                    onChange={(e) => setFormData({ ...formData, bed_type: e.target.value })}
                    className={inputClass} placeholder="e.g. King Bed" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-luxury-filled w-full py-4 text-[0.62rem] flex items-center justify-center gap-2
                           disabled:opacity-40 disabled:cursor-not-allowed mt-3"
              >
                {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : "Save Room"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
