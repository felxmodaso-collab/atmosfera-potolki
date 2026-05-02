"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";

export default function FloatingContact() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith("/privacy")) { setShow(false); return; }
    const onScroll = () => setShow(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      data-floating="back-to-top"
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-ink text-bg shadow-deep hover:bg-graphite transition flex items-center justify-center"
      aria-label="Наверх"
    >
      <ArrowUp size={18} />
    </button>
  );
}
