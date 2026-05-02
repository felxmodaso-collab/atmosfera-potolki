"use client";
import { useEffect, useRef, useState } from "react";
import { img } from "@/lib/img";
import Picture from "./Picture";

export default function HeroVideo() {
  const v1 = useRef<HTMLVideoElement>(null);
  const v2 = useRef<HTMLVideoElement>(null);
  const [enableVideo, setEnableVideo] = useState(false);

  // Видео грузим только на десктопе (>=1024px) — на mobile poster через Picture (webp+jpg).
  // Reduced-motion и Save-Data также отключают видео.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData =
      // @ts-expect-error connection.saveData not in lib.dom yet
      typeof navigator !== "undefined" && navigator.connection?.saveData === true;
    const lg = window.matchMedia("(min-width: 1024px)").matches;
    setEnableVideo(lg && !reducedMotion && !saveData);
  }, []);

  useEffect(() => {
    if (!enableVideo) return;
    const a = v1.current;
    const b = v2.current;
    if (!a || !b) return;

    let raf = 0;
    const start = async () => {
      try { a.currentTime = 0; await a.play(); } catch {}
      try { b.currentTime = 0; await b.play(); b.currentTime = b.duration ? b.duration / 2 : 4; } catch {}
    };
    start();

    const tick = () => {
      const dur = a.duration || 8;
      if (dur > 0 && !isNaN(dur)) {
        const ta = a.currentTime % dur;
        const tb = b.currentTime % dur;
        const phaseA = ta / dur;
        const phaseB = tb / dur;
        const fade = (p: number) => {
          const w = 0.18;
          if (p < w) return p / w;
          if (p > 1 - w) return (1 - p) / w;
          return 1;
        };
        a.style.opacity = String(fade(phaseA));
        b.style.opacity = String(fade(phaseB));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enableVideo]);

  const src = img("/videos/hero.mp4");

  return (
    <>
      <Picture
        src="/images/hero/main.jpg"
        alt=""
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {enableVideo && (
        <>
          <video
            ref={v1}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            src={src}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
            style={{ opacity: 0 }}
          />
          <video
            ref={v2}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            src={src}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
            style={{ opacity: 0 }}
          />
        </>
      )}
    </>
  );
}
