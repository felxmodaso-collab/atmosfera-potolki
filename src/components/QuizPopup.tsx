"use client";
import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { X, Sparkles, ChevronUp } from "lucide-react";
import Quiz from "./Quiz";

/**
 * Поведение (по образцу Marquiz у centr-otdelka):
 *
 * Состояния:
 *   "hidden"     — не показывать вообще (закрыто на 7 дней / disabled на странице)
 *   "teaser"     — компактная карточка-приглашение справа-снизу (первый показ)
 *   "open"       — развёрнутый чат-окошко с квизом
 *   "minimized"  — маленькая таблетка-кнопка справа-снизу (после сворачивания)
 *
 * Хранилища:
 *   localStorage atm_quiz_v2:
 *     { dismissedAt }     — пользователь нажал X → не показывать 7 дней
 *   sessionStorage atm_quiz_session:
 *     { teaserShownAt, lastState, lastQuizStep }
 *     — внутри одной сессии: если тизер уже появлялся, повторно не появляется при навигации
 *     — если пользователь открывал и сворачивал — состояние сохраняется при переходах
 *     — если начал отвечать в квизе и закрыл, при mount можно показать «продолжить»
 *
 * Триггеры в одной сессии (только если ещё не показывали):
 *   1. Timer 25s после первого визита
 *   2. Scroll > 55% любой страницы
 *   3. Exit-intent (только desktop)
 *
 * НЕ показывать:
 *   /privacy, /calculator (там уже встроен квиз)
 *
 * При смене страницы:
 *   — тизер заново НЕ появляется (sessionStorage хранит lastState)
 *   — minimized-таблетка остаётся, если была минимизирована
 *   — open-окошко ЗАКРЫВАЕТСЯ (как Marquiz), но lastState=minimized — следующая страница откроет таблетку
 */

const LS_KEY = "atm_quiz_v2";
const SS_KEY = "atm_quiz_session";
const DISMISS_DAYS = 7;
const TIMER_MS = 25_000;
const SCROLL_THRESHOLD = 0.55;

type Visibility = "hidden" | "teaser" | "open" | "minimized";

function readDismissed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return false;
    const { dismissedAt } = JSON.parse(raw);
    if (!dismissedAt) return false;
    return Date.now() - dismissedAt < DISMISS_DAYS * 86400_000;
  } catch {
    return false;
  }
}

function readSession(): { teaserShownAt?: number; lastState?: Visibility } {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(SS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeSession(patch: Partial<ReturnType<typeof readSession>>) {
  try {
    const cur = readSession();
    sessionStorage.setItem(SS_KEY, JSON.stringify({ ...cur, ...patch }));
  } catch {}
}

export default function QuizPopup() {
  const pathname = usePathname();
  const [state, setState] = useState<Visibility>("hidden");

  const enabled =
    !pathname?.startsWith("/privacy") &&
    !pathname?.startsWith("/calculator");

  // Initial mount: восстановить состояние из sessionStorage и решить — что показать
  useEffect(() => {
    if (!enabled) {
      setState("hidden");
      return;
    }
    if (readDismissed()) {
      setState("hidden");
      return;
    }
    const sess = readSession();
    // Любое из состояний после первого появления → minimized-таблетка
    // (не теряем доступ к квизу, но не навязываемся повторно)
    if (sess.lastState === "minimized" || sess.lastState === "open" || sess.lastState === "teaser") {
      setState("minimized");
      writeSession({ lastState: "minimized" });
      return;
    }
    // Первый раз в сессии — armed для показа по триггеру
    setState("hidden");
  }, [enabled, pathname]);

  // Триггеры показа тизера (только если sessionStorage чист)
  useEffect(() => {
    if (!enabled) return;
    if (readDismissed()) return;
    const sess = readSession();
    if (sess.teaserShownAt || sess.lastState) return; // уже показывали

    let triggered = false;
    const showTeaser = () => {
      if (triggered) return;
      triggered = true;
      setState("teaser");
      writeSession({ teaserShownAt: Date.now(), lastState: "teaser" });
    };

    const timer = setTimeout(showTeaser, TIMER_MS);

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= SCROLL_THRESHOLD) showTeaser();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) showTeaser();
    };
    if (window.matchMedia("(min-width: 1024px)").matches) {
      document.addEventListener("mouseout", onMouseOut);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [enabled, pathname]);

  // ESC только сворачивает (не закрывает навсегда — это требует явного X)
  useEffect(() => {
    if (state !== "open") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setState("minimized");
        writeSession({ lastState: "minimized" });
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [state]);

  const open = useCallback(() => {
    setState("open");
    writeSession({ lastState: "open" });
  }, []);

  const minimize = useCallback(() => {
    setState("minimized");
    writeSession({ lastState: "minimized" });
  }, []);

  const dismiss = useCallback(() => {
    setState("hidden");
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ dismissedAt: Date.now() }));
    } catch {}
    writeSession({ lastState: "minimized" }); // на всякий случай SS перезатирается LS-проверкой
  }, []);

  if (state === "hidden" || !enabled) return null;

  if (state === "minimized") {
    return (
      <button
        onClick={open}
        data-floating="quiz"
        className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-[80] flex items-center gap-2 pl-3.5 pr-5 py-3 rounded-full bg-ink text-bg shadow-deep hover:bg-graphite transition-all fade-up"
      >
        <span className="w-7 h-7 rounded-full bg-gold text-ink flex items-center justify-center">
          <Sparkles size={14} strokeWidth={2} />
        </span>
        <span className="text-sm font-medium">Расчёт + 10%</span>
        <ChevronUp size={14} className="text-bg/60" />
      </button>
    );
  }

  if (state === "teaser") {
    return (
      <div
        role="dialog"
        aria-label="Расчёт со скидкой"
        data-floating="quiz"
        className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-[80] w-[min(360px,calc(100vw-2rem))] rounded-2xl bg-ink text-bg shadow-deep overflow-hidden fade-up"
      >
        <div
          className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(212,168,87,.4), transparent 70%)", filter: "blur(28px)" }}
        />
        <div className="relative p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className="badge badge-discount"><Sparkles size={12} /> Скидка 10%</span>
            <button onClick={minimize} aria-label="Свернуть" className="text-bg/60 hover:text-bg transition w-7 h-7 flex items-center justify-center -mt-1 -mr-1">
              <X size={16} />
            </button>
          </div>
          <div className="serif text-xl leading-tight mb-2">Получите расчёт за 30 секунд</div>
          <p className="text-sm text-bg/70 leading-relaxed mb-4">
            6 вопросов о помещении — менеджер пришлёт спецификацию с зафиксированной скидкой.
          </p>
          <button onClick={open} className="btn btn-gold w-full !py-2.5 text-sm">
            Начать квиз
          </button>
        </div>
      </div>
    );
  }

  // open
  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Квиз — расчёт со скидкой 10%"
      data-floating="quiz"
      className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-[80] w-[min(420px,calc(100vw-2rem))] max-h-[min(640px,100dvh-7rem)] flex flex-col rounded-2xl bg-bg shadow-deep overflow-hidden border border-line fade-up"
    >
      <div className="flex items-center justify-between gap-3 px-5 py-3.5 bg-ink text-bg">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-8 h-8 rounded-full bg-gold text-ink flex items-center justify-center shrink-0">
            <Sparkles size={14} strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <div className="text-sm font-medium leading-tight truncate">Расчёт со скидкой 10%</div>
            <div className="text-[11px] text-bg/60 leading-tight">Менеджер на связи</div>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={minimize} aria-label="Свернуть" title="Свернуть в таблетку" className="w-8 h-8 rounded-full hover:bg-bg/10 flex items-center justify-center transition">
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 lg:p-4 bg-bg">
        <div className="quiz-popup-scope">
          <Quiz />
        </div>
      </div>
    </div>
  );
}
