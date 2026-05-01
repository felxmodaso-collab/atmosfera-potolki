import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {TESTIMONIALS.map((t, i) => (
        <div key={i} className="card p-7">
          <div className="text-accent text-lg mb-4">{"★".repeat(t.rating)}</div>
          <blockquote className="text-graphite leading-relaxed mb-5 serif text-lg italic">«{t.text}»</blockquote>
          <div className="text-sm text-muted">{t.name}</div>
        </div>
      ))}
    </div>
  );
}
