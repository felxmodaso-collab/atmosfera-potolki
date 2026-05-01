"use client";
import { useEffect, useRef } from "react";
import { img } from "@/lib/img";

export default function HeroVideo() {
  const v1 = useRef<HTMLVideoElement>(null);
  const v2 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
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
  }, []);

  const src = img("/videos/hero.mp4");
  const poster = img("/images/hero/main.jpg");

  return (
    <>
      <img
        src={poster}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
      />
      <video
        ref={v1}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src={src}
        poster={poster}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        style={{ opacity: 0 }}
      />
      <video
        ref={v2}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src={src}
        poster={poster}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        style={{ opacity: 0 }}
      />
    </>
  );
}
