import Link from "next/link";
import { Bed, Wifi, Coffee, Wine, BedDouble, Maximize2, Users, ArrowRight, Crown } from "lucide-react";
import ExtendedLuxuryText from "@/components/sections/ExtendedLuxuryText";

const rooms = [
  {
    _id: "69b2e1484f4211ddc6d25796",
    name: "Deluxe Room",
    price_per_night: 250,
    description:
      "A beautifully appointed room blending modern sophistication with timeless comfort, perfect for couples seeking a refined getaway.",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop",
    bed_type: "1 King Bed",
    size: "45 m²",
    guests: 2,
    amenities: ["Free Wi-Fi", "Smart TV", "Rain Shower", "Minibar"],
    category: "Deluxe",
  },
  {
    _id: "69b2e1484f4211ddc6d25797",
    name: "Executive Suite",
    price_per_night: 450,
    description:
      "Expansive living space with panoramic city views, a private lounge area and premium amenities for the discerning traveller.",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop",
    bed_type: "1 King + Sofa",
    size: "75 m²",
    guests: 3,
    amenities: ["Butler Service", "Nespresso Machine", "Walk-in Wardrobe", "Soaking Tub"],
    category: "Suite",
  },
  {
    _id: "69b2e1484f4211ddc6d25798",
    name: "Presidential Suite",
    price_per_night: 950,
    description:
      "The pinnacle of luxury accommodation at Daddy Wealth Hotel and Suites. Private balcony, butler service and unparalleled 5-star experience.",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
    bed_type: "2 King Beds",
    size: "130 m²",
    guests: 4,
    amenities: ["24hr Butler", "Private Jacuzzi", "Dining Room", "Premium Minibar"],
    category: "Presidential",
  },
  {
    _id: "69b2e1484f4211ddc6d25799",
    name: "Family Suite",
    price_per_night: 350,
    description:
      "Thoughtfully designed for families, featuring interconnected rooms, child-friendly amenities and generous living spaces.",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
    bed_type: "2 Double Beds",
    size: "90 m²",
    guests: 5,
    amenities: ["Free Wi-Fi", "Kids' Amenities", "Kitchenette", "Two Bathrooms"],
    category: "Family",
  },
  {
    _id: "69b2e1484f4211ddc6d2579a",
    name: "Superior Room",
    price_per_night: 180,
    description:
      "A cozy, elegant retreat designed for shorter stays, offering all essential luxury touches in a refined compact setting.",
    image:
      "https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=2070&auto=format&fit=crop",
    bed_type: "1 Queen Bed",
    size: "32 m²",
    guests: 2,
    amenities: ["Free Wi-Fi", "Coffee Maker", "Smart TV", "Ensuite Shower"],
    category: "Superior",
  },
  {
    _id: "69b2e1484f4211ddc6d2579b",
    name: "Honeymoon Suite",
    price_per_night: 600,
    description:
      "A romantic escape featuring a heart-shaped jacuzzi, complimentary champagne, rose petal décor and intimate private dining.",
    image:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop",
    bed_type: "1 King Bed",
    size: "80 m²",
    guests: 2,
    amenities: ["Champagne on Arrival", "Heart Jacuzzi", "Rose Petal Décor", "Private Dining"],
    category: "Romance",
  },
];

export default function RoomsPage() {
  return (
    <div className="min-h-screen bg-surface-deep">

      {/* ── Hero Banner ── */}
      <div className="relative h-[50vh] min-h-[380px] overflow-hidden flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=85&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-hero-overlay" />

        <div className="relative z-10 container-luxury pb-16 pt-32">
          <div className="flex items-center gap-4 mb-4">
            <div className="gold-divider-left w-10" />
            <span className="section-label">Daddy Wealth Hotel &amp; Suites</span>
          </div>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light text-foreground leading-tight">
            Rooms &amp;{" "}
            <em className="not-italic text-gold-gradient">Suites</em>
          </h1>
          <p className="font-body font-light text-white/60 text-[0.88rem] mt-4 max-w-xl leading-loose">
            Each space at Daddy Wealth Hotel and Suites is a private sanctuary — a meticulous
            union of heritage craft and contemporary comfort.
          </p>
        </div>
      </div>

      {/* ── Rooms Grid ── */}
      <div className="container-luxury py-20">

        {/* Filter bar */}
        <div className="flex items-center justify-between mb-12 pb-6 border-b border-[rgba(212,175,55,0.08)]">
          <div className="flex items-center gap-3">
            <Crown size={14} className="text-accent" strokeWidth={1.5} />
            <span className="font-body text-[0.72rem] font-light text-text-muted">
              Showing {rooms.length} accommodations
            </span>
          </div>
          <Link
            href="/book"
            className="btn-luxury text-[0.58rem] px-6 py-2.5"
          >
            <span>Make a Reservation</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="group flex flex-col bg-surface-card border border-[rgba(212,175,55,0.07)]
                         hover:border-[rgba(212,175,55,0.25)] transition-all duration-600 overflow-hidden"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-surface-void/0 group-hover:bg-surface-void/20 transition-all duration-500" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="font-body text-[0.55rem] font-semibold uppercase tracking-[0.3em]
                                   text-surface-deep bg-accent px-3 py-1.5">
                    {room.category}
                  </span>
                </div>

                {/* Price */}
                <div className="absolute bottom-4 right-4 text-right">
                  <p className="font-display text-xl font-light text-white leading-none">
                    ₦{room.price_per_night.toLocaleString()}
                  </p>
                  <p className="font-body text-[0.6rem] text-white/60 tracking-wide mt-0.5">per night</p>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 space-y-4">
                <div>
                  <h2 className="font-display text-[1.3rem] font-light text-foreground leading-tight mb-2">
                    {room.name}
                  </h2>
                  {/* Meta row */}
                  <div className="flex items-center flex-wrap gap-4 text-text-muted">
                    <span className="flex items-center gap-1.5 text-[0.72rem] font-body">
                      <Maximize2 size={11} strokeWidth={1.5} />
                      {room.size}
                    </span>
                    <span className="flex items-center gap-1.5 text-[0.72rem] font-body">
                      <Users size={11} strokeWidth={1.5} />
                      {room.guests} Guests
                    </span>
                    <span className="flex items-center gap-1.5 text-[0.72rem] font-body">
                      <BedDouble size={11} strokeWidth={1.5} />
                      {room.bed_type}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-[rgba(212,175,55,0.07)]" />

                <p className="font-body font-light text-text-muted text-[0.8rem] leading-relaxed line-clamp-2">
                  {room.description}
                </p>

                {/* Amenities */}
                <ul className="grid grid-cols-2 gap-y-1.5 gap-x-3">
                  {room.amenities.map((a) => (
                    <li key={a} className="flex items-center gap-1.5 text-[0.72rem] font-body font-light text-text-muted">
                      <span className="w-1 h-1 bg-accent shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-auto pt-3 border-t border-[rgba(212,175,55,0.08)]">
                  <Link
                    href={`/book?roomId=${room._id}`}
                    className="group/link flex items-center justify-between w-full
                               text-[0.62rem] font-body font-semibold uppercase tracking-[0.25em]
                               text-text-muted hover:text-accent transition-colors duration-300"
                  >
                    Reserve This Room
                    <ArrowRight
                      size={12}
                      className="transition-transform duration-300 group-hover/link:translate-x-1.5"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ExtendedLuxuryText />
    </div>
  );
}
