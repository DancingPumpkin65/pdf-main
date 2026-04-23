import type { ReactNode } from "react";
import { cn } from "../utils";

type NavItem = {
  label: ReactNode;
  href: string;
  hiddenOnMobile?: boolean;
};

export function MarketingNavbar({
  brand = "EV.",
  brandHref = "/",
  items,
  utilitySlot,
  ctaLabel,
  ctaHref,
  scrolled = true,
  transparentWhenTop = false,
  revealBrandOnScroll = false,
}: {
  brand?: ReactNode;
  brandHref?: string;
  items: NavItem[];
  utilitySlot?: ReactNode;
  ctaLabel: ReactNode;
  ctaHref: string;
  scrolled?: boolean;
  transparentWhenTop?: boolean;
  revealBrandOnScroll?: boolean;
}) {
  const inverted = transparentWhenTop && !scrolled;

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 flex w-full items-center justify-between px-6 py-4 transition-all duration-200",
        inverted
          ? "bg-transparent text-[#f0f0e8] drop-shadow-md"
          : "border-b-2 border-[#1a1a1a] bg-[#f0f0e8] text-[#1a1a1a]",
      )}
    >
      <div className="flex items-center gap-4">
        <a
          href={brandHref}
          className={cn(
            "text-xl font-black tracking-tighter transition-opacity duration-200",
            revealBrandOnScroll && inverted ? "opacity-0" : "opacity-100",
          )}
        >
          {brand}
        </a>
      </div>

      <div className="flex items-center gap-6 text-sm font-bold uppercase tracking-wide">
        {items.map((item) => (
          <a
            key={String(item.href)}
            href={item.href}
            className={`${item.hiddenOnMobile ? "hidden sm:block" : ""} hover:underline underline-offset-4`}
          >
            {item.label}
          </a>
        ))}

        {utilitySlot ? <div className="flex items-center">{utilitySlot}</div> : null}

        <a
          href={ctaHref}
          className={cn(
            "border-2 px-4 py-2 transition-colors",
            inverted
              ? "border-[#f0f0e8] hover:bg-[#f0f0e8] hover:text-[#1a1a1a]"
              : "border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f0f0e8]",
          )}
        >
          {ctaLabel}
        </a>
      </div>
    </nav>
  );
}
