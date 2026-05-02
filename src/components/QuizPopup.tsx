"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import Quiz from "./Quiz";

const STORAGE_KEY = "atm_quiz_popup_v1";
const DISMISS_DAYS = 7;
const TIMER_MS = 25_000;
const SCROLL_THRESHOLD = 0.6;

function shouldShow(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;
    const { ts } = JSON.parse(raw);
    return Date.now() - ts > DISMISS_DAYS * 86400_000;
  } catch {
    return true;
  }
}

export default function QuizPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [armed, setArmed] = useState(false);

  // Не показывать на /privacy и /calculator (там квиз и так есть)
  const enabled = !pathname?.startsWith("/privacy") && !pathname?.startsWith("/calculator");

  useEffect(() => {
    if (!enabled) return;
    if (!shouldShow()) return;
    setArmed(true);
  }, [enabled]);

  useEffect(() => {
    if (!armed || open) return;

    let opened = false;
    const trigger = () => {
      if (opened) return;
      opened = true;
      setOpen(true);
    };

    // 1) Timer
    const timer = setTimeout(trigger, TIMER_MS);

    // 2) Scroll threshold
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      if (window.scrollY / max >= SCROLL_THRESHOLD) trigger();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // 3) Exit-intent (desktop only)
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) trigger();
    };
    if (window.matchMedia("(min-width: 1024px)").matches) {
      document.addEventListener("mouseout", onMouseOut);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [armed, open]);

  // ESC закрытие
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now() }));
    } catch {}
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Получите расчёт со скидкой 10%"
      className="fixed inset-0 z-[90] flex items-end lg:items-center justify-center p-0 lg:p-6 fade-up"
    >
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={close}
        aria-hidden
      />
      <div className="relative w-full lg:max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-3xl lg:rounded-3xl bg-bg shadow-deep">
        <button
          onClick={close}
          aria-label="Закрыть"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-bg/80 hover:bg-bg flex items-center justify-center text-muted hover:text-ink transition shadow-soft"
        >
          <X size={20} />
        </button>
        <div className="p-1 lg:p-2">
          <Quiz />
        </div>
      </div>
    </div>
  );
}
