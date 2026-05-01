"use client";
import { useState } from "react";

type Variant = "lead" | "callback" | "measurer";
const TITLES: Record<Variant, { title: string; sub: string; cta: string }> = {
  lead:     { title: "Оставить заявку",          sub: "Перезвоним за 15 минут, расскажем по делу. Без спама и навязывания.", cta: "Отправить заявку" },
  callback: { title: "Заказать звонок",          sub: "Перезвоним в ближайшие 15 минут в рабочее время.",                      cta: "Заказать звонок" },
  measurer: { title: "Вызвать замерщика",        sub: "Замерщик приедет в удобное время. Услуга бесплатная, без обязательств.", cta: "Вызвать замерщика" },
};

export default function ContactModal({ variant, onClose }: { variant: Variant; onClose: () => void }) {
  const cfg = TITLES[variant];
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [agree, setAgree] = useState(true);
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !agree) return;
    setSent(true);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(14,15,17,.55)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="card w-full max-w-md p-8 fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {sent ? (
          <div className="text-center py-6">
            <div className="text-6xl mb-4">✓</div>
            <h3 className="serif text-h2 mb-3">Заявка принята</h3>
            <p className="text-muted mb-6">Перезвоним в ближайшие 15 минут.</p>
            <button className="btn btn-primary w-full" onClick={onClose}>Закрыть</button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mb-2">
              <span className="eyebrow">АТМОСФЕРА</span>
              <button onClick={onClose} aria-label="Закрыть" className="text-muted hover:text-ink text-2xl leading-none">×</button>
            </div>
            <h3 className="serif text-h2 mb-2">{cfg.title}</h3>
            <p className="text-muted mb-6 text-sm">{cfg.sub}</p>
            <form onSubmit={submit} className="space-y-3">
              <input type="text" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="tel" placeholder="+7 (___) ___-__-__" required value={phone} onChange={(e) => setPhone(e.target.value)} />
              <label className="flex items-start gap-3 text-sm text-muted py-2">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-1 w-auto"
                  style={{ width: "18px", height: "18px", flexShrink: 0 }}
                />
                <span>
                  Согласен на обработку персональных данных в соответствии с{" "}
                  <a href="/privacy" className="underline hover:text-ink">Политикой конфиденциальности</a>
                </span>
              </label>
              <button type="submit" className="btn btn-primary w-full" disabled={!phone || !agree}>{cfg.cta}</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
