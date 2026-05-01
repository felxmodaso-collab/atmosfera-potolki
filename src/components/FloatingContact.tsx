"use client";
import { useState } from "react";
import { COMPANY } from "@/lib/data";
import { useContactModal } from "./ContactProvider";

export default function FloatingContact() {
  const { open } = useContactModal();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {expanded && (
        <div className="flex flex-col items-end gap-2 fade-up">
          <a href={COMPANY.whatsapp} className="btn btn-primary !py-3 shadow-soft text-sm">WhatsApp</a>
          <a href={COMPANY.telegram} className="btn btn-primary !py-3 shadow-soft text-sm">Telegram</a>
          <a href={COMPANY.max} className="btn btn-primary !py-3 shadow-soft text-sm">MAX</a>
          <button onClick={() => { setExpanded(false); open("callback"); }} className="btn btn-primary !py-3 shadow-soft text-sm">Заказать звонок</button>
          <a href={`tel:${COMPANY.phoneRaw}`} className="btn btn-primary !py-3 shadow-soft text-sm">Позвонить</a>
        </div>
      )}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="btn btn-accent shadow-soft !w-14 !h-14 !p-0 !rounded-full text-2xl"
        aria-label={expanded ? "Закрыть контакты" : "Связаться"}
      >
        {expanded ? "×" : "✦"}
      </button>
    </div>
  );
}
