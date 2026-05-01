"use client";
import { useState } from "react";
import { MessageCircle, Send, Phone, X, Plus } from "lucide-react";
import { COMPANY } from "@/lib/data";
import { useContactModal } from "./ContactProvider";

export default function FloatingContact() {
  const { open } = useContactModal();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {expanded && (
        <div className="flex flex-col items-end gap-2 fade-up">
          <a href={COMPANY.whatsapp} className="btn btn-primary !py-2.5 shadow-soft text-sm"><MessageCircle size={16} /> WhatsApp</a>
          <a href={COMPANY.telegram} className="btn btn-primary !py-2.5 shadow-soft text-sm"><Send size={16} /> Telegram</a>
          <a href={COMPANY.max} className="btn btn-primary !py-2.5 shadow-soft text-sm">MAX</a>
          <button onClick={() => { setExpanded(false); open("callback"); }} className="btn btn-primary !py-2.5 shadow-soft text-sm">Заказать звонок</button>
          <a href={`tel:${COMPANY.phoneRaw}`} className="btn btn-primary !py-2.5 shadow-soft text-sm"><Phone size={16} /> Позвонить</a>
        </div>
      )}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="btn btn-accent shadow-deep !w-14 !h-14 !p-0 !rounded-full"
        aria-label={expanded ? "Закрыть контакты" : "Связаться"}
      >
        {expanded ? <X size={22} /> : <Plus size={22} />}
      </button>
    </div>
  );
}
