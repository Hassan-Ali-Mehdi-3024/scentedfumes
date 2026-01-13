import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  title?: string;
  price?: string;
  imageSrc?: string;
  href?: string;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  title = "MY PRODUCT", 
  price = "$120.00",
  imageSrc = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  href = "#",
  className = "" 
}) => {
  const content = (
    <div 
      className={`group relative ${className}`}
      style={{
        width: "220px",
        height: "360px",
      }}
    >
      {/* Hover Glow Effect */}
      <div 
        className="absolute rounded-2xl bg-[var(--accent-gold)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30"
        style={{
          inset: "-4px",
          zIndex: -1,
        }}
      />

      {/* Main Card Container */}
      <div
        className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[var(--accent-gold)]/20 bg-[var(--bg-surface)] transition-all duration-300 group-hover:border-[var(--accent-gold)]/40 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
        style={{
          boxShadow: "0 14px 50px rgba(0, 0, 0, 0.28)",
        }}
      >
        {/* Image Section */}
        <div 
          className="relative overflow-hidden border-b border-[var(--accent-gold)]/15"
          style={{
            height: "60%",
            width: "100%",
          }}
        >
          <div className="relative h-full w-full">
            <Image 
              src={imageSrc} 
              alt={title} 
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)]/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </div>

        {/* Content Section */}
        <div
          style={{
            height: "40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "clamp(0.75rem, 1.5vh, 1rem)",
            gap: "clamp(0.6rem, 1.2vh, 0.9rem)",
          }}
        >
          {/* Title & Price */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.25rem, 0.5vh, 0.35rem)" }}>
            <h3
              className="text-[var(--text-primary)] uppercase tracking-wider line-clamp-2 leading-tight"
              style={{
                fontSize: "clamp(0.75rem, 0.9vw, 0.85rem)",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              {title}
            </h3>
            <p
              className="text-[var(--accent-gold)] font-semibold"
              style={{
                fontSize: "clamp(0.8rem, 0.95vw, 0.9rem)",
              }}
            >
              {price}
            </p>
          </div>

          {/* View Button */}
          <button
            className="group/btn flex w-full items-center justify-center rounded-lg bg-[var(--accent-gold)] text-[var(--bg-surface)] transition-all hover:bg-[var(--accent-gold)]/90 hover:shadow-[0_0_20px_rgba(253,221,173,0.4)] active:scale-95"
            style={{
              padding: "clamp(0.45rem, 0.9vh, 0.6rem)",
              gap: "0.5rem",
              fontSize: "clamp(0.7rem, 0.85vw, 0.8rem)",
              fontWeight: 700,
              letterSpacing: "0.12em",
            }}
          >
            VIEW
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="transition-transform duration-300 group-hover/btn:translate-x-1"
              style={{ width: "0.85rem", height: "0.85rem" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  if (href && href !== "#") {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};

export default ProductCard;
