"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
const quotes = [
  {
    quote: "Aurelia made mithai feel like opening a piece of jewellery.",
    name: "Anika Mehra",
    role: "PRIVATE CLIENT",
  },
  {
    quote: "Rarely does packaging, flavour and storytelling feel this considered.",
    name: "The Edit",
    role: "CULTURE JOURNAL",
  },
];
function Stat({ number, suffix, label }: { number: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let raf = 0;
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      observer.disconnect();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      let start = 0;
      const tick = (now: number) => {
        if (!start) start = now;
        const p = Math.min(1, (now - start) / 1300);
        node.textContent = String(Math.round(number * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [number]);
  return (
    <div className="stat">
      <span className="stat-number">
        <span ref={ref}>{number}</span>
        {suffix}
      </span>
      <span>{label}</span>
    </div>
  );
}
export function Testimonials() {
  const [active, setActive] = useState(0);
  const q = quotes[active];
  return (
    <>
      <section className="stats section-pad" aria-label="The house in numbers">
        <Stat number={24} label="Signature creations" />
        <Stat number={12} label="Regions of inspiration" />
        <Stat number={48} suffix="hr" label="Small-batch freshness" />
        <Stat number={100} suffix="%" label="Crafted by hand" />
        <span className="stats-footnote">AN IMAGINED HOUSE. AN ENDURING PHILOSOPHY.</span>
      </section>
      <section className="testimonials section-pad">
        <span className="eyebrow">WORDS TO SAVOUR</span>
        <span className="quote-mark" aria-hidden="true">
          “
        </span>
        <div className="quote-content" key={active} aria-live="polite">
          <blockquote>“{q.quote}”</blockquote>
          <p>
            {q.name}
            <span>{q.role}</span>
          </p>
        </div>
        <div className="testimonial-controls">
          <button onClick={() => setActive((active + 1) % 2)} aria-label="Previous testimonial">
            <ArrowLeft size={21} strokeWidth={1.3} />
          </button>
          <span>0{active + 1} / 02</span>
          <button onClick={() => setActive((active + 1) % 2)} aria-label="Next testimonial">
            <ArrowRight size={21} strokeWidth={1.3} />
          </button>
        </div>
        <span className="testimonial-disclaimer">
          Fictional voices, created for this concept experience.
        </span>
      </section>
    </>
  );
}
