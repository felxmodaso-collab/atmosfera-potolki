import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { PRICE_TIERS } from "@/lib/data";

export default function PriceTiers() {
  return (
    <div className="grid md:grid-cols-3 gap-5 lg:items-stretch">
      {PRICE_TIERS.map((tier, i) => {
        const featured = i === 1;
        return (
          <div
            key={tier.name}
            className={`relative rounded-2xl p-8 lg:p-10 flex flex-col transition-all ${
              featured
                ? "bg-ink text-bg shadow-deep lg:scale-[1.04] lg:my-[-1rem]"
                : "bg-bg border border-line"
            }`}
          >
            {featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge badge-discount whitespace-nowrap">
                ★ популярный
              </span>
            )}
            <div className={`text-xs uppercase tracking-[0.22em] mb-5 ${featured ? "text-gold" : "text-muted"}`}>
              {tier.name}
            </div>
            <div className="flex items-baseline gap-1.5 mb-1">
              <span className={`text-5xl lg:text-6xl font-light tabular ${featured ? "text-bg" : "text-ink"}`}>{tier.from}</span>
              <span className={`text-2xl ${featured ? "text-gold" : "text-accent"}`}>₽</span>
            </div>
            <div className={`text-sm mb-7 ${featured ? "text-bg/55" : "text-muted"}`}>за м² с монтажом</div>
            <ul className={`space-y-3 mb-9 flex-1 text-sm ${featured ? "text-bg/85" : "text-graphite"}`}>
              {tier.includes.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check size={16} strokeWidth={2.2} className={`mt-0.5 shrink-0 ${featured ? "text-gold" : "text-accent"}`} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link href="/calculator" className={`btn w-full ${featured ? "btn-gold" : "btn-outline"}`}>
              Заказать <ArrowRight size={16} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
