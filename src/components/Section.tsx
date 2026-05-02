export function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, sub, align = "left", as = "h2" }: {
  eyebrow?: string; title: React.ReactNode; sub?: React.ReactNode; align?: "left" | "center"; as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <header className={`mb-10 lg:mb-16 ${align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}`}>
      {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
      <Heading className="serif text-h1 mb-4">{title}</Heading>
      {sub && <p className="text-muted text-lg leading-relaxed">{sub}</p>}
    </header>
  );
}
