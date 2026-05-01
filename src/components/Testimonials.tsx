import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {TESTIMONIALS.map((t, i) => (
        <article key={i} className="card p-7 lg:p-9 relative overflow-hidden">
          <Quote size={88} strokeWidth={1.2} className="absolute -top-3 -right-3 text-accent/8" />
          <div className="flex items-center gap-1 text-gold mb-4">
            {Array.from({ length: t.rating }).map((_, j) => (
              <Star key={j} size={18} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <blockquote className="serif text-lg md:text-xl text-graphite italic leading-relaxed mb-6 relative z-10">«{t.text}»</blockquote>
          <footer className="flex items-center gap-3 pt-5 border-t border-line">
            <div className="w-11 h-11 rounded-full bg-accent/10 text-accent serif text-xl flex items-center justify-center">
              {t.name.charAt(0)}
            </div>
            <div className="text-sm text-muted">{t.name}</div>
          </footer>
        </article>
      ))}
    </div>
  );
}
