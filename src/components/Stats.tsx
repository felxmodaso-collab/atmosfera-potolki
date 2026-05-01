import { STATS } from "@/lib/data";

export default function Stats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
      {STATS.map((s, i) => (
        <div key={i} className="text-center md:text-left">
          <div className="serif text-5xl md:text-6xl mb-1">{s.value}</div>
          <div className="text-sm text-muted uppercase tracking-[0.14em]">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
