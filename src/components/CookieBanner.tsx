"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "atm_cookie_consent_v1";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const accepted = localStorage.getItem(STORAGE_KEY);
    if (!accepted) {
      const t = setTimeout(() => setShow(true), 4500);
      return () => clearTimeout(t);
    }
  }, []);

  if (!show) return null;

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: true, ts: Date.now() }));
    setShow(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Согласие на использование cookies"
      className="fixed bottom-3 left-3 right-3 lg:left-auto lg:right-6 lg:bottom-6 lg:max-w-sm z-[80] float-tile rounded-2xl p-4 lg:p-5 fade-up"
    >
      <p className="text-xs leading-relaxed text-ink/85 mb-3">
        Cookies для аналитики. Продолжая, вы соглашаетесь с{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-accent">
          обработкой персональных данных
        </Link>{" "}
        (152-ФЗ).
      </p>
      <div className="flex gap-2">
        <button onClick={accept} className="btn btn-primary !py-2 text-xs flex-1">
          Принять
        </button>
        <Link href="/privacy" className="btn btn-outline !py-2 text-xs">
          Политика
        </Link>
      </div>
    </div>
  );
}
