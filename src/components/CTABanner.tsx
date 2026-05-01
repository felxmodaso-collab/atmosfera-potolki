"use client";
import { useContactModal } from "./ContactProvider";

type Props = {
  title: string;
  sub: string;
  button?: string;
  variant?: "measurer" | "lead" | "callback";
};

export default function CTABanner({ title, sub, button = "Вызвать замерщика", variant = "measurer" }: Props) {
  const { open } = useContactModal();
  return (
    <div className="bg-ink text-bg rounded-3xl p-8 md:p-14 grid md:grid-cols-[1fr_auto] gap-6 items-center">
      <div>
        <h3 className="serif text-h1 mb-3">{title}</h3>
        <p className="text-cream/70 max-w-xl leading-relaxed">{sub}</p>
      </div>
      <button onClick={() => open(variant)} className="btn btn-accent !py-4 !px-8 text-base whitespace-nowrap">{button}</button>
    </div>
  );
}
