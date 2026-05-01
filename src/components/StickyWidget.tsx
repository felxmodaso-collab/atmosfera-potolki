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
      <Item href={COMPANY.whatsapp}        bg="#25D366" icon={<WhatsAppIcon />} label="WhatsApp" />
      <Item href={COMPANY.telegram}        bg="#2AABEE" icon={<TelegramIcon />} label="Telegram" />
      <Item href={COMPANY.max}             bg="#B8946A" icon={<MaxIcon />}      label="MAX" />
      <Item href={`tel:${COMPANY.phoneRaw}`} bg="#0E0F11" icon={<PhoneIcon />}   label="Звонок" />
    </div>
  );
}

function Item({ href, bg, icon, label }: { href: string; bg: string; icon: React.ReactNode; label: string }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      style={{ background: bg, width: hover ? "168px" : "44px" }}
      className="group flex items-center justify-end h-11 text-white rounded-l-xl pr-3 transition-all duration-300 overflow-hidden shadow-soft will-change-[width]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={label}
    >
      <span className={`text-sm font-medium mr-3 whitespace-nowrap transition-opacity duration-200 ${hover ? "opacity-100 delay-100" : "opacity-0"}`}>
        {label}
      </span>
      <span className="shrink-0 w-11 h-11 flex items-center justify-center">{icon}</span>
    </a>
  );
}
