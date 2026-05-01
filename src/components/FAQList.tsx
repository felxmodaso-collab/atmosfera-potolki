"use client";
import { useState } from "react";
import { Plus, MessageCircleQuestion } from "lucide-react";
import { FAQ } from "@/lib/data";

export default function FAQList({ limit }: { limit?: number }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const items = limit ? FAQ.slice(0, limit) : FAQ;

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={i} className="group">
            <button
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className="w-full text-left py-6 flex items-center justify-between gap-6 group-hover:[&>span:first-child]:text-accent"
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-4 transition-colors">
                <MessageCircleQuestion size={20} className={`shrink-0 ${isOpen ? "text-accent" : "text-muted"} transition-colors`} />
                <span className="serif text-lg md:text-xl">{f.q}</span>
              </span>
              <span className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? "bg-accent border-accent text-white rotate-45" : "bg-bg border-line text-graphite"}`}>
                <Plus size={16} />
              </span>
            </button>
            {isOpen && (
              <div className="pb-6 pl-9 text-muted leading-relaxed max-w-3xl fade-up">{f.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
