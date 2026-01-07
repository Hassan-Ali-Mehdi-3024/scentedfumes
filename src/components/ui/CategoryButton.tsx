import Link from "next/link";

export const CategoryButton = ({ label, href }: { label: string; href: string }) => (
  <Link href={href}>
    <button className="
      group relative px-8 py-3 
      rounded-full 
      border border-[#D4AF37] 
      text-[#D4AF37] 
      uppercase tracking-widest text-sm font-semibold
      transition-all duration-300 ease-out
      hover:bg-[#D4AF37] hover:text-black
      font-[family-name:var(--font-montserrat)]
    ">
      {label}
    </button>
  </Link>
);
