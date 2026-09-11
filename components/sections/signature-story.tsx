"use client";
import { useEffect, useRef, useState } from "react";
import { Scene } from "@/components/three/scene";
const chapters = [
  {
    title: "Born from",
    italic: "tradition.",
    copy: "Familiar flavours. Generations of knowledge. A story that began long before us.",
  },
  {
    title: "Refined by",
    italic: "obsession.",
    copy: "The finest cashew. The first bloom of saffron. Every choice, entirely considered.",
  },
  {
    title: "Finished",
    italic: "by hand.",
    copy: "A delicate veil of silver. An instinct for perfection. The unmistakable touch of a maker.",
  },
  {
    title: "Made to be",
    italic: "remembered.",
    copy: "A small indulgence that becomes a beautiful memory. This is the Aurelia way.",
  },
];
export function SignatureStory() {
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    import("gsap").then(async ({ gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const match = gsap.matchMedia();
      match.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            progress.current = self.progress;
            setActive(Math.min(3, Math.floor(self.progress * 4)));
            el.style.setProperty("--story-progress", String(self.progress));
          },
        });
        return () => trigger.kill();
      });
      cleanup = () => match.revert();
    });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);
  return (
    <section ref={section} id="philosophy" className="signature-story">
      <div className="signature-sticky">
        <div className="section-topline">
          <span className="eyebrow">THE AURELIA PHILOSOPHY</span>
          <span className="eyebrow">A FAMILIAR FLAVOUR. AN UNFAMILIAR FEELING.</span>
        </div>
        <div className="signature-composition">
          <div className="signature-copy" key={active}>
            <span className="chapter-number">
              0{active + 1} <span>/ 04</span>
            </span>
            <h2>
              {chapters[active].title}
              <br />
              <em>{chapters[active].italic}</em>
            </h2>
            <p>{chapters[active].copy}</p>
          </div>
          <div className="signature-object">
            <span className="object-orbit orbit-one" />
            <span className="object-orbit orbit-two" />
            <Scene type="katli" mode="signature" progress={progress} fallback="/images/noor.webp" />
            <span className="object-caption">NOOR · SAFFRON KAJU KATLI</span>
          </div>
        </div>
        <div className="story-chapters">
          {chapters.map((c, i) => (
            <button
              key={c.italic}
              className={active === i ? "active" : ""}
              onClick={() => {
                setActive(i);
                progress.current = i / 3;
                const el = section.current;
                if (
                  el &&
                  window.innerWidth >= 900 &&
                  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
                )
                  window.scrollTo({
                    top:
                      window.scrollY +
                      el.getBoundingClientRect().top +
                      (el.offsetHeight - window.innerHeight) * (i / 4 + 0.04),
                    behavior: "smooth",
                  });
              }}
            >
              <span>0{i + 1}</span>
              {c.title} {c.italic}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
