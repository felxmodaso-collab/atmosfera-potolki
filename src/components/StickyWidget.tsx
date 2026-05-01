"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, Send, Phone } from "lucide-react";
import { COMPANY } from "@/lib/data";

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
      <Item href={COMPANY.whatsapp} bg="#25D366"  icon={<MessageCircle size={18} />} label="WhatsApp" />
      <Item href={COMPANY.telegram} bg="#2AABEE"  icon={<Send size={18} />} label="Telegram" />
      <Item href={`tel:${COMPANY.phoneRaw}`} bg="#0E0F11" icon={<Phone size={18} />} label="Звонок" />
    </div>
  );
}

function Item({ href, bg, icon, label }: { href: string; bg: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      style={{ background: bg, width: "44px" }}
      className="group flex items-center justify-end h-11 text-white rounded-l-xl pr-3 pl-3 transition-all overflow-hidden hover:!w-[170px] shadow-soft"
      onMouseEnter={(e) => (e.currentTarget.style.width = "170px")}
      onMouseLeave={(e) => (e.currentTarget.style.width = "44px")}
    >
      <span className="text-sm font-medium mr-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">{label}</span>
      {icon}
    </a>
  );
}
