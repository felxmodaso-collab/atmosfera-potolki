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
    <div className="hidden lg:flex fixed top-1/2 -translate-y-1/2 right-3 z-30 flex-col gap-2.5">
      <Item href={COMPANY.whatsapp}        bg="#25D366" icon={<WhatsAppIcon size={22} />} label="WhatsApp" />
      <Item href={COMPANY.telegram}        bg="#2AABEE" icon={<TelegramIcon size={22} />} label="Telegram" />
      <Item href={COMPANY.max}             bg="#B8946A" icon={<MaxIcon size={22} />}      label="MAX" />
      <Item href={`tel:${COMPANY.phoneRaw}`} bg="#0E0F11" icon={<PhoneIcon size={20} />}   label="Звонок" />
    </div>
  );
}

function Item({ href, bg, icon, label }: { href: string; bg: string; icon: React.ReactNode; label: string }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      style={{
        background: bg,
        width: hover ? 168 : 48,
        gridTemplateColumns: "1fr 48px",
      }}
      className="grid items-center h-12 text-white rounded-full shadow-deep transition-[width] duration-300 ease-out overflow-hidden will-change-[width] ring-1 ring-white/10"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={label}
    >
      <span
        className={`text-sm font-medium whitespace-nowrap pl-5 min-w-0 overflow-hidden transition-opacity duration-200 ${hover ? "opacity-100 delay-100" : "opacity-0"}`}
      >
        {label}
      </span>
      <span className="w-12 h-12 flex items-center justify-center">
        {icon}
      </span>
    </a>
  );
}
