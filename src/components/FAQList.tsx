"use client";
import { useState } from "react";
import { FAQ } from "@/lib/data";

export default function FAQList({ limit }: { limit?: number }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const items = limit ? FAQ.slice(0, limit) : FAQ;

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className="w-full text-left py-6 flex items-center justify-between gap-6"
              aria-expanded={isOpen}
            >
              <span className="serif text-lg md:text-xl">{f.q}</span>
              <span className={`text-2xl text-accent transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
            </button>
            {isOpen && (
              <div className="pb-6 text-muted leading-relaxed max-w-3xl fade-up">{f.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
