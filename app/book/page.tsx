"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, Users, MapPin, CheckCircle, Loader2, Crown, ArrowRight, BedDouble } from "lucide-react";
import ExtendedLuxuryText from "@/components/sections/ExtendedLuxuryText";
import { motion, AnimatePresence } from "framer-motion";
import { apiClient } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";

interface Room {
  _id: string;
  name: string;
  price_per_night: number;
  max_guests: number;
  description?: string;
}

const inputClass =
  "w-full bg-surface-dark border border-[rgba(212,175,55,0.1)] text-foreground px-4 py-3.5 " +
  "font-body text-[0.82rem] font-light placeholder:text-text-muted " +
  "focus:outline-none focus:border-accent transition-colors duration-300";

const labelClass =
  "block font-body text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-text-muted mb-2";

export default function BookPage() {
  const router = useRouter();
  const [success,        setSuccess]        = useState(false);
  const [loading,        setLoading]        = useState(false);
  const [rooms,          setRooms]          = useState<Room[]>([]);
  const [error,          setError]          = useState("");
  const [isLoggedIn,     setIsLoggedIn]     = useState(false);
  const [user,           setUser]           = useState<any>(null);
  const [firstName,      setFirstName]      = useState("");
  const [lastName,       setLastName]       = useState("");
  const [email,          setEmail]          = useState("");
  const [phone,          setPhone]          = useState("");
  const [checkIn,        setCheckIn]        = useState("");
  const [checkOut,       setCheckOut]       = useState("");
  const [guests,         setGuests]         = useState(1);
  const [roomId,         setRoomId]         = useState("");
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (token) {
          setIsLoggedIn(true);
          try {
            const userRes = await apiClient.get("/api/users/profile", {
              headers: { Authorization: `Bearer ${token}` },
            });
            setUser(userRes.data);
            const parts = userRes.data.name.split(" ");
            setFirstName(parts[0] || "");
            setLastName(parts.slice(1).join(" ") || "");
            setEmail(userRes.data.email);
            setPhone(userRes.data.phoneNumber || "");
          } catch { /* silent */ }
        }
        const roomRes = await apiClient.get("/api/rooms");
        setRooms(roomRes.data || []);
        if (roomRes.data?.length) setRoomId(roomRes.data[0]._id);
      } catch {
        setError("Failed to load booking information. Please try again.");
      }
    };
    fetchData();
  }, []);

  const calculateTotal = (rid: string, inDate: string, outDate: string) => {
    if (!rid || !inDate || !outDate) return 0;
    const room = rooms.find((r) => r._id === rid);
    if (!room) return 0;
    const days = Math.ceil(
      (new Date(outDate).getTime() - new Date(inDate).getTime()) / 86400000
    );
    return days > 0 ? days * room.price_per_night : room.price_per_night;
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!firstName || !lastName || !email || !phone) {
        setError("Please fill in all required fields.");
        return;
      }
      if (!roomId) { setError("Please select a room."); return; }
      if (!checkIn || !checkOut) { setError("Please select check-in and check-out dates."); return; }
      if (new Date(checkOut) <= new Date(checkIn)) {
        setError("Check-out date must be after check-in date.");
        return;
      }
      const totalAmount = calculateTotal(roomId, checkIn, checkOut);
      if (totalAmount <= 0) { setError("Please select valid dates."); return; }

      const bookingData = {
        guest_name:       `${firstName} ${lastName}`,
        guest_email:      email,
        guest_phone:      phone,
        room_id:          roomId,
        check_in_date:    checkIn,
        check_out_date:   checkOut,
        number_of_guests: guests,
        total_amount:     totalAmount,
      };
      const token  = localStorage.getItem("userToken");
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const response = await apiClient.post("/api/bookings", bookingData, config);
      if (response.data?.paymentDetails) setPaymentDetails(response.data.paymentDetails);
      toast.success("Reservation created successfully!");
      setSuccess(true);
      if (isLoggedIn) setTimeout(() => router.push("/dashboard"), 4000);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to create reservation. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const total = calculateTotal(roomId, checkIn, checkOut);

  return (
    <div className="min-h-screen bg-surface-deep">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: "#1a1714", color: "#f5f0e6", border: "1px solid rgba(212,175,55,0.2)" },
        }}
      />

      {/* ── Hero Banner ── */}
      <div className="relative h-[42vh] min-h-[320px] overflow-hidden flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1582719508461-905c673771fd?q=85&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 container-luxury pb-14 pt-32">
          <div className="flex items-center gap-4 mb-4">
            <div className="gold-divider-left w-10" />
            <span className="section-label">Daddy Wealth Hotel &amp; Suites</span>
          </div>
          <h1 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-light text-foreground">
            Make a{" "}
            <em className="not-italic text-gold-gradient">Reservation</em>
          </h1>
        </div>
      </div>

      {/* ── Form Section ── */}
      <div className="container-luxury py-16 max-w-4xl relative">

        {/* Success Overlay */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface-card border border-[rgba(212,175,55,0.2)] p-10 md:p-14
                         flex flex-col items-center text-center mb-10 shadow-luxury"
            >
              <Crown size={44} className="text-accent mb-5" strokeWidth={1} />
              <h2 className="font-display text-[2rem] font-light text-foreground mb-3">
                Reservation Confirmed
              </h2>
              <div className="gold-divider mb-5" />
              <p className="font-body font-light text-text-muted text-[0.85rem] max-w-md leading-loose mb-8">
                Thank you for choosing <strong className="text-accent font-medium">Daddy Wealth Hotel and Suites</strong>.
                Your reservation has been received. Please complete your payment to confirm your booking.
              </p>

              {paymentDetails && (
                <div className="w-full max-w-md bg-surface-dark border border-[rgba(212,175,55,0.12)]
                                p-7 mb-8 text-left space-y-5">
                  <h3 className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-accent
                                 border-b border-[rgba(212,175,55,0.1)] pb-3 mb-5">
                    Payment Instructions
                  </h3>
                  <p className="font-body text-[0.78rem] font-light text-text-muted leading-relaxed">
                    Please transfer the total amount to the account below to secure your booking.
                    Your reservation will be confirmed once payment is verified.
                  </p>
                  {[
                    { label: "Bank Name",       value: paymentDetails.bankName       },
                    { label: "Account Number",  value: paymentDetails.accountNumber  },
                    { label: "Account Name",    value: paymentDetails.accountName    },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="font-body text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-text-faint mb-1">
                        {label}
                      </p>
                      <p className="font-display text-[1.1rem] font-light text-foreground">{value}</p>
                    </div>
                  ))}
                  {paymentDetails.instructions && (
                    <p className="font-body text-[0.75rem] font-light text-text-muted leading-relaxed
                                  border-t border-[rgba(212,175,55,0.08)] pt-4 whitespace-pre-line">
                      {paymentDetails.instructions}
                    </p>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                {isLoggedIn ? (
                  <Link href="/dashboard" className="btn-luxury-filled text-[0.6rem]">
                    View Dashboard
                  </Link>
                ) : (
                  <Link href="/login" className="btn-luxury-filled text-[0.6rem]">
                    Sign In to View
                  </Link>
                )}
                <Link href="/rooms" className="btn-luxury text-[0.6rem]">
                  <span>Browse More Rooms</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Banner */}
        {error && (
          <div className="border border-red-500/30 bg-red-500/8 text-red-400
                          font-body text-[0.78rem] font-light px-5 py-4 mb-7 text-center">
            {error}
          </div>
        )}

        {/* Logged-in notice */}
        {isLoggedIn && user && !success && (
          <div className="border border-[rgba(212,175,55,0.2)] bg-accent/5
                          text-accent font-body text-[0.78rem] font-light px-5 py-4 mb-7 text-center">
            Signed in as <strong>{user.name}</strong>. Your booking will be linked to your account.
          </div>
        )}

        {!success && (
          <div className="bg-surface-card border border-[rgba(212,175,55,0.08)] p-8 md:p-12">

            <form className="space-y-8" onSubmit={handleBooking}>

              {/* ── Dates ── */}
              <div>
                <h3 className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-accent mb-5">
                  Stay Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Check-in Date *</label>
                    <div className="relative">
                      <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" strokeWidth={1.5} />
                      <input
                        type="date"
                        required
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className={`${inputClass} pl-10`}
                        style={{ colorScheme: "dark" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Check-out Date *</label>
                    <div className="relative">
                      <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" strokeWidth={1.5} />
                      <input
                        type="date"
                        required
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className={`${inputClass} pl-10`}
                        style={{ colorScheme: "dark" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Number of Guests *</label>
                    <div className="relative">
                      <Users size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" strokeWidth={1.5} />
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className={`${inputClass} pl-10 appearance-none`}
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Room Type *</label>
                    <div className="relative">
                      <BedDouble size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" strokeWidth={1.5} />
                      <select
                        required
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        className={`${inputClass} pl-10 appearance-none`}
                      >
                        <option value="">Select a room...</option>
                        {rooms.map((room) => (
                          <option key={room._id} value={room._id}>
                            {room.name} — ₦{room.price_per_night.toLocaleString()}/night
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Divider ── */}
              <div className="h-px bg-[rgba(212,175,55,0.08)]" />

              {/* ── Guest Details ── */}
              <div>
                <h3 className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-accent mb-5">
                  Your Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>First Name *</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name *</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234 000 000 0000"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* ── Total ── */}
              {roomId && checkIn && checkOut && total > 0 && (
                <div className="flex items-center justify-between bg-surface-dark
                                border border-[rgba(212,175,55,0.15)] px-7 py-5">
                  <div>
                    <p className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-text-muted mb-1">
                      Estimated Total
                    </p>
                    <p className="font-body text-[0.72rem] font-light text-text-muted">
                      {Math.ceil(
                        (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000
                      )}{" "}
                      night(s) × ₦{rooms.find((r) => r._id === roomId)?.price_per_night.toLocaleString()}
                    </p>
                  </div>
                  <p className="font-display text-[1.8rem] font-light text-accent">
                    ₦{total.toLocaleString()}
                  </p>
                </div>
              )}

              {/* ── Submit ── */}
              <button
                type="submit"
                disabled={loading || !roomId || rooms.length === 0}
                className="btn-luxury-filled w-full py-4 text-[0.65rem] disabled:opacity-40 disabled:cursor-not-allowed
                           flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Processing Reservation…
                  </>
                ) : (
                  <>
                    Confirm Reservation
                    <ArrowRight size={13} strokeWidth={2} />
                  </>
                )}
              </button>

              <p className="font-body text-[0.68rem] font-light text-text-faint text-center">
                Fields marked with * are required. Your data is handled securely.
              </p>
            </form>
          </div>
        )}
      </div>

      <ExtendedLuxuryText />
    </div>
  );
}
