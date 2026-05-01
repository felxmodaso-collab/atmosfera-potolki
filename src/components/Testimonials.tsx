import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {TESTIMONIALS.map((t, i) => (
        <article key={i} className="card p-8 lg:p-10 relative">
          <div className="flex items-center gap-1 text-accent mb-5">
            {Array.from({ length: t.rating }).map((_, j) => (
              <Star key={j} size={16} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <blockquote className="text-graphite text-lg leading-relaxed mb-6">«{t.text}»</blockquote>
          <footer className="text-sm text-muted pt-5 border-t border-line">{t.name}</footer>
        </article>
      ))}
    </div>
  );
}
