"use client";
import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, Sparkles, Gift } from "lucide-react";

const STEPS = [
  { key: "room",       title: "Какое помещение?",
    options: ["Кухня", "Спальня", "Гостиная", "Детская", "Ванная", "Прихожая/Холл", "Кабинет", "Open-space"] },
  { key: "area",       title: "Какая площадь?",
    options: ["до 10 м²", "10–20 м²", "20–35 м²", "35–60 м²", "более 60 м²"] },
  { key: "height",     title: "Высота потолка?",
    options: ["до 2,6 м", "2,6–2,8 м", "2,8–3,2 м", "более 3,2 м"] },
  { key: "type",       title: "Какой тип потолка интересует?",
    options: ["Матовый", "Глянцевый", "Сатиновый", "С фотопечатью", "Двухуровневый", "Парящий контур", "Звёздное небо", "Не определились"] },
  { key: "extra",      title: "Что добавить?",
    options: ["LED-карниз по периметру", "Парящая подсветка", "Точечные светильники", "Центральная люстра", "Без дополнительных опций"], multi: true },
  { key: "when",       title: "Когда планируете монтаж?",
    options: ["В ближайшие 2 недели", "В этом месяце", "В течение 2–3 месяцев", "Просто прицениваюсь"] },
];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [agree, setAgree] = useState(true);
  const [done, setDone] = useState(false);

  const cur = STEPS[step];
  const total = STEPS.length;
  const progress = Math.round(((step + 1) / (total + 1)) * 100);
  const isContact = step === STEPS.length;

  const pick = (opt: string) => {
    if (cur.multi) {
      const prev = (answers[cur.key] as string[]) ?? [];
      const next = prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt];
      setAnswers({ ...answers, [cur.key]: next });
    } else {
      setAnswers({ ...answers, [cur.key]: opt });
      setTimeout(() => setStep((s) => s + 1), 180);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !agree) return;
    setDone(true);
  };

  if (done) {
    return (
      <div className="card !rounded-3xl p-10 lg:p-14 max-w-2xl mx-auto text-center fade-up relative overflow-hidden">
        <div className="absolute -top-24 right-0 w-72 h-72 glow-gold opacity-50 pointer-events-none" />
        <div className="w-20 h-20 rounded-full bg-sage/15 text-sage flex items-center justify-center mx-auto mb-6">
          <Check size={36} strokeWidth={2} />
        </div>
        <h3 className="serif text-h2 mb-3">Заявка принята</h3>
        <p className="text-muted mb-2">Замерщик перезвонит за 15 минут и уточнит время визита.</p>
        <div className="badge badge-discount mt-4 inline-flex"><Sparkles size={12} /> Скидка 10% зафиксирована</div>
      </div>
    );
  }

  return (
    <div id="quiz" className="card !rounded-3xl p-6 md:p-10 max-w-3xl mx-auto fade-up relative overflow-hidden">
      <div className="absolute -top-20 -right-10 w-64 h-64 glow-gold opacity-40 pointer-events-none" />

      <div className="flex items-center justify-between mb-5 relative">
        <div className="flex items-center gap-2">
          <span className="badge badge-discount"><Gift size={12} /> Скидка 10%</span>
          <span className="eyebrow !mb-0">Квиз</span>
        </div>
        <div className="text-sm text-muted">{Math.min(step + 1, total)} / {total}{isContact && " · Контакт"}</div>
      </div>

      <div className="progress mb-8"><span style={{ width: `${progress}%` }} /></div>

      {!isContact ? (
        <>
          <h3 className="serif text-h2 mb-6">{cur.title}</h3>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {cur.options.map((opt) => {
              const val = answers[cur.key];
              const active = cur.multi
                ? Array.isArray(val) && val.includes(opt)
                : val === opt;
              return (
                <button
                  key={opt}
                  onClick={() => pick(opt)}
                  className={`text-left px-5 py-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${active ? "bg-ink text-bg border-ink shadow-soft" : "border-line hover:border-ink/40 bg-bg"}`}
                >
                  <span>{opt}</span>
                  {active && <Check size={16} strokeWidth={2.5} />}
                </button>
              );
            })}
          </div>
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="btn btn-outline disabled:opacity-30 disabled:cursor-not-allowed"
            ><ArrowLeft size={16} /> Назад</button>
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={cur.multi ? !((answers[cur.key] as string[])?.length) : !answers[cur.key]}
              className="btn btn-primary disabled:opacity-30 disabled:cursor-not-allowed"
            >Далее <ArrowRight size={16} /></button>
          </div>
        </>
      ) : (
        <form onSubmit={submit}>
          <h3 className="serif text-h2 mb-2">Куда выслать расчёт?</h3>
          <p className="text-muted mb-6">Зафиксируем скидку 10%, перезвоним за 15 минут.</p>
          <div className="space-y-3">
            <input type="text" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="tel" placeholder="+7 (___) ___-__-__" required value={phone} onChange={(e) => setPhone(e.target.value)} />
            <label className="flex items-start gap-3 text-sm text-muted py-2">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                style={{ width: "18px", height: "18px", flexShrink: 0, marginTop: "2px" }}
              />
              <span>Согласен на обработку персональных данных в соответствии с <a href="/privacy" className="underline hover:text-ink">Политикой конфиденциальности</a></span>
            </label>
          </div>
          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => setStep((s) => s - 1)} className="btn btn-outline"><ArrowLeft size={16} /> Назад</button>
            <button type="submit" disabled={!phone || !agree} className="btn btn-gold disabled:opacity-30">Получить расчёт <ArrowRight size={16} /></button>
          </div>
        </form>
      )}
    </div>
  );
}
