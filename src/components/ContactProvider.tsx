"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import ContactModal from "./ContactModal";

type Variant = "lead" | "callback" | "measurer";
type Ctx = { open: (v?: Variant) => void; close: () => void };
const C = createContext<Ctx | null>(null);

export const useContactModal = () => {
  const v = useContext(C);
  if (!v) throw new Error("useContactModal outside ContactProvider");
  return v;
};

export default function ContactProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<Variant | null>(null);
  const open = useCallback((v: Variant = "lead") => setActive(v), []);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", !!active);
    return () => document.body.classList.remove("no-scroll");
  }, [active]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <C.Provider value={{ open, close }}>
      {children}
      {active && <ContactModal variant={active} onClose={close} />}
    </C.Provider>
  );
}
