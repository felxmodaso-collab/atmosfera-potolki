"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { COMPANY } from "@/lib/data";
import { WhatsAppIcon, TelegramIcon, MaxIcon, PhoneIcon } from "./BrandIcons";

export default function StickyWidget() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith("/privacy")) { setShow(false); return; }
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (!show) return null;

  return (
    <div className="hidden lg:flex fixed top-1/2 -translate-y-1/2 right-0 z-30 flex-col gap-2">
      <Item href={COMPANY.whatsapp}        bg="#25D366" icon={<WhatsAppIcon size={20} />} label="WhatsApp" />
      <Item href={COMPANY.telegram}        bg="#2AABEE" icon={<TelegramIcon size={20} />} label="Telegram" />
      <Item href={COMPANY.max}             bg="#B8946A" icon={<MaxIcon size={20} />}      label="MAX" />
      <Item href={`tel:${COMPANY.phoneRaw}`} bg="#0E0F11" icon={<PhoneIcon size={20} />}   label="Звонок" />
    </div>
  );
}

function Item({ href, bg, icon, label }: { href: string; bg: string; icon: React.ReactNode; label: string }) {
  const [hover, setHover] = useState(false);
  const expanded = hover;
  return (
    <a
      href={href}
      style={{ background: bg, width: expanded ? 168 : 44 }}
      className="flex items-center h-11 text-white rounded-l-xl shadow-soft transition-[width] duration-300 ease-out overflow-hidden will-change-[width]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={label}
    >
      <span
        className={`flex-1 text-sm font-medium whitespace-nowrap pl-4 transition-opacity duration-200 ${expanded ? "opacity-100 delay-100" : "opacity-0"}`}
      >
        {label}
      </span>
      <span className="shrink-0 w-11 h-11 flex items-center justify-center">
        {icon}
      </span>
    </a>
  );
}
