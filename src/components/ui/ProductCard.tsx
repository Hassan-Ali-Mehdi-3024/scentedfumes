import React from "react";
import Link from "next/link";

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
    <div className={`group relative h-[320px] w-[220px] ${className}`}>
      
      {/* 1. The Glow Effect 
          - Uses accent-gold variable
          - Fades out on hover (opacity-0) to mimic your original effect
      */}
      <div className="absolute -inset-0.5 -z-10 rounded-2xl bg-[var(--accent-gold)] opacity-40 blur-[15px] transition-opacity duration-500 group-hover:opacity-0" />

      {/* 2. The Main Card Container 
          - Background: bg-surface (Deep Brown)
          - Border: accent-gold
      */}
      <div className="relative z-10 flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[var(--accent-gold)] bg-[var(--bg-surface)] shadow-xl">
        
        {/* 3. Image Section (65% height) */}
        <div className="relative h-[65%] w-full overflow-hidden border-b border-[var(--accent-gold)]/20">
            {/* Image hover effect: subtle zoom */}
            <img 
              src={imageSrc} 
              alt={title} 
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
        </div>

        {/* 4. Content Section */}
        <div className="flex h-[35%] flex-col justify-between p-3">
          
          {/* Title & Price */}
          <div>
            <h3 className="truncate text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">
              {title}
            </h3>
            <p className="mt-1 text-xs font-medium text-[var(--text-secondary)]/90">
              {price}
            </p>
          </div>

          {/* Button 
              - Primary Color: accent-gold
              - Text Color: bg-surface (for contrast)
              - Hover: bg-white with text-surface
          */}
          <button className="group/btn flex w-full items-center justify-center gap-2 rounded-md bg-[var(--accent-gold)] py-1.5 text-xs font-bold text-[var(--bg-surface)] transition-all hover:bg-white active:scale-95">
            VIEW
            {/* SVG Arrow */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1"
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
