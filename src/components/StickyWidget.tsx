"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { COMPANY } from "@/lib/data";
import { WhatsAppIcon, TelegramIcon, MaxIcon, PhoneIcon } from "./BrandIcons";

type Channel = {
  href: string;
  bg: string;
  icon: React.ReactNode;
  label: string;
};

const allChannels: Channel[] = [
  { href: COMPANY.whatsapp,             bg: "#25D366", icon: <WhatsAppIcon />, label: "WhatsApp"  },
  { href: COMPANY.telegram,             bg: "#229ED9", icon: <TelegramIcon />, label: "Telegram"  },
  { href: COMPANY.max,                  bg: "#B8946A", icon: <MaxIcon />,      label: "MAX"       },
  { href: `tel:${COMPANY.phoneRaw}`,    bg: "#0E0F11", icon: <PhoneIcon />,    label: "Позвонить" },
];

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

  // Desktop — вертикальный стек справа со всеми каналами.
  // Mobile — два самых востребованных канала над кнопкой «наверх».
  return (
    <>
      <div className="hidden lg:flex fixed top-1/2 -translate-y-1/2 right-4 z-30 flex-col items-end gap-3">
        {allChannels.map((c) => (
          <Bubble key={c.label} channel={c} />
        ))}
      </div>
      <div className="flex lg:hidden fixed bottom-20 right-3 z-30 flex-col items-end gap-2.5">
        {[allChannels[0], allChannels[3]].map((c) => (
          <Bubble key={c.label} channel={c} />
        ))}
      </div>
    </>
  );
}

function Bubble({ channel }: { channel: Channel }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <a
        href={channel.href}
        target={channel.href.startsWith("http") ? "_blank" : undefined}
        rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
        aria-label={channel.label}
        className="block w-12 h-12 rounded-full text-white ring-1 ring-white/15 flex items-center justify-center transition-transform duration-200 ease-out shadow-deep hover:scale-110"
        style={{ background: channel.bg }}
      >
        {channel.icon}
      </a>
      <span
        className={[
          "pointer-events-none absolute right-[60px] top-1/2 -translate-y-1/2",
          "whitespace-nowrap text-sm font-medium px-3 py-1.5 rounded-full",
          "bg-ink text-bg shadow-deep",
          "transition-all duration-200 ease-out",
          hover ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2",
        ].join(" ")}
        aria-hidden
      >
        {channel.label}
        <span
          className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 rotate-45 bg-ink"
          aria-hidden
        />
      </span>
    </div>
  );
}
