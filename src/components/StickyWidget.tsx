"use client";
import { useState, useEffect } from "react";
import { MessageCircle, Send, Phone } from "lucide-react";
import { COMPANY } from "@/lib/data";

export default function StickyWidget() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div className="hidden lg:flex fixed top-1/2 -translate-y-1/2 right-0 z-30 flex-col gap-2 pr-2">
      <Item href={COMPANY.whatsapp} bg="bg-sage" hover="hover:bg-sage/85" icon={<MessageCircle size={18} />} label="WhatsApp" />
      <Item href={COMPANY.telegram} bg="bg-teal" hover="hover:bg-teal/85" icon={<Send size={18} />} label="Telegram" />
      <Item href={`tel:${COMPANY.phoneRaw}`} bg="bg-coral" hover="hover:bg-coralDark" icon={<Phone size={18} />} label="Звонок" />
    </div>
  );
}

function Item({ href, bg, hover, icon, label }: { href: string; bg: string; hover: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      className={`group flex items-center justify-end h-12 ${bg} ${hover} text-white rounded-l-2xl pr-3 pl-3 transition-all overflow-hidden`}
      style={{ width: "48px" }}
      onMouseEnter={(e) => (e.currentTarget.style.width = "180px")}
      onMouseLeave={(e) => (e.currentTarget.style.width = "48px")}
    >
      <span className="text-sm font-medium mr-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">{label}</span>
      {icon}
    </a>
  );
}
