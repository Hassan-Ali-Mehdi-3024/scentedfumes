import Link from "next/link";

export const CategoryButton = ({ label, href }: { label: string; href: string }) => (
  <Link href={href}>
    <button 
      className="group relative rounded-full border border-[var(--accent-gold)] text-[var(--accent-gold)] uppercase tracking-widest text-sm font-semibold transition-all duration-300 ease-out hover:bg-[var(--accent-gold)] hover:text-[var(--bg-main)]"
      style={{
        paddingTop: "clamp(0.65rem, 1.2vh, 0.85rem)",
        paddingBottom: "clamp(0.65rem, 1.2vh, 0.85rem)",
        paddingLeft: "clamp(1.75rem, 3vw, 2.25rem)",
        paddingRight: "clamp(1.75rem, 3vw, 2.25rem)",
        fontFamily: "var(--font-poppins), sans-serif",
      }}
    >
      {label}
    </button>
  </Link>
);
