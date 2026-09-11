"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
export function HorizontalShowcase() {
  const section = useRef<HTMLElement>(null),
    track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    import("gsap").then(async ({ gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to(track.current, {
          xPercent: (-100 * (products.length - 1)) / products.length,
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${window.innerWidth * 3.5}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setCurrent(Math.min(5, Math.round(self.progress * 5))),
          },
        });
        return () => tween.kill();
      });
      cleanup = () => mm.revert();
    });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);
  const move = (direction: number) => {
    if (track.current)
      track.current.scrollBy({
        left: direction * track.current.clientWidth,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  };
  return (
    <section
      ref={section}
      className="horizontal-showcase"
      aria-label="Six creations, one philosophy"
    >
      <div className="showcase-heading">
        <span className="eyebrow">A STUDY IN FLAVOUR & FORM</span>
        <h2>
          Six creations.
          <br />
          <em>One philosophy.</em>
        </h2>
      </div>
      <div className="showcase-window">
        <div
          ref={track}
          className="showcase-track"
          onScroll={(e) => {
            if (
              window.innerWidth < 900 ||
              window.matchMedia("(prefers-reduced-motion: reduce)").matches
            )
              setCurrent(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth));
          }}
        >
          {products.map((p, i) => (
            <article className="showcase-slide" key={p.id}>
              <span className="showcase-word" aria-hidden="true">
                {["SAFFRON", "ROSE", "GOLDEN", "CACAO", "SILVER", "ALMOND"][i]}
              </span>
              <div className="showcase-product">
                <Image src={p.image} alt={p.subtitle} fill sizes="(max-width: 900px) 75vw, 39vw" />
              </div>
              <div className="showcase-caption">
                <span>{p.number} / SIX EXPRESSIONS</span>
                <h3>{p.name}</h3>
                <p>{p.notes.join(" · ")}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="showcase-controls">
        <span>
          0{current + 1} <span>/ 06</span>
        </span>
        <div className="showcase-progress">
          <span style={{ transform: `translateX(${current * 100}%)` }} />
        </div>
        <div className="swipe-controls">
          <button onClick={() => move(-1)} aria-label="Previous creation">
            <ArrowLeft size={21} />
          </button>
          <button onClick={() => move(1)} aria-label="Next creation">
            <ArrowRight size={21} />
          </button>
        </div>
        <span className="showcase-scroll-hint">KEEP SCROLLING TO EXPLORE</span>
      </div>
    </section>
  );
}
