import { PROCESS } from "@/lib/data";

export default function Process() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
      {PROCESS.map((p) => (
        <div key={p.n} className="relative">
          <div className="serif text-6xl text-accent/40 mb-3">{p.n}</div>
          <h3 className="serif text-2xl mb-2">{p.title}</h3>
          <p className="text-muted text-sm leading-relaxed">{p.text}</p>
        </div>
      ))}
    </div>
  );
}
