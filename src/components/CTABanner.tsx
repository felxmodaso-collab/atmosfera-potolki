"use client";
import { ArrowRight } from "lucide-react";
import { useContactModal } from "./ContactProvider";
import Picture from "./Picture";

type Props = {
  title: React.ReactNode;
  sub: string;
  button?: string;
  variant?: "measurer" | "lead" | "callback";
  bg?: string;
  badge?: string;
};

export default function CTABanner({ title, sub, button = "Вызвать замерщика", variant = "measurer", bg = "/images/portfolio/01a-living-matte.jpg", badge }: Props) {
  const { open } = useContactModal();
  return (
    <div className="cta-banner grain p-10 md:p-16 lg:p-20 text-bg">
      <Picture src={bg} alt="" loading="lazy" />
      <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center relative">
        <div>
          {badge && <span className="badge badge-discount mb-5 inline-flex">{badge}</span>}
          <h3 className="serif text-h1 mb-4 max-w-2xl leading-tight">{title}</h3>
          <p className="text-bg/75 max-w-xl leading-relaxed text-lg">{sub}</p>
        </div>
        <button onClick={() => open(variant)} className="btn btn-accent !py-5 !px-9 text-base whitespace-nowrap">
          {button} <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
