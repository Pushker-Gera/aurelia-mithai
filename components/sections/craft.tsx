"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
const stages = [
  {
    name: "Source",
    detail: "Only the extraordinary.",
    copy: "Saffron with a lingering warmth. Pistachios with character. Ingredients selected as carefully as gemstones.",
    image: "/images/hero.webp",
    alt: "Saffron, pistachios, and silver-leaf mithai on an aged brass platter",
  },
  {
    name: "Compose",
    detail: "A delicate balance.",
    copy: "A little sweetness. A little texture. We bring ingredients together with restraint, allowing each flavour room to speak.",
    image: "/images/sona.webp",
    alt: "Pistachio barfi with silver leaf and finely chopped pistachios",
  },
  {
    name: "Craft",
    detail: "Time is an ingredient.",
    copy: "Slowly reduced. Carefully shaped. Small batches give every creation the attention it deserves.",
    image: "/images/craft.webp",
    alt: "Artisan hands carefully finishing mithai",
  },
  {
    name: "Finish",
    detail: "The human signature.",
    copy: "A hand-laid veil of silver. A rose petal placed just so. The final details are always personal.",
    image: "/images/noor.webp",
    alt: "Hand-finished silver-leaf kaju katli",
  },
];
export function Craft() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => {
      if (!query.matches || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      if (r.top < 120 && r.bottom > window.innerHeight * 0.7) {
        const p = Math.max(
          0,
          Math.min(0.999, (120 - r.top) / Math.max(1, r.height - window.innerHeight + 120)),
        );
        setActive(Math.floor(p * 4));
      }
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <section ref={ref} id="craft" className="craft section-pad">
      <div className="craft-visual">
        <div className="craft-image">
          {stages.map((s, i) => (
            <Image
              key={s.name}
              src={s.image}
              alt={s.alt}
              aria-hidden={i !== active}
              fill
              sizes="(max-width: 900px) 90vw, 44vw"
              className={i === active ? "active" : ""}
            />
          ))}
        </div>
        <div className="craft-image-caption">
          <span>THE ATELIER / NEW DELHI</span>
          <span>0{active + 1} — 04</span>
        </div>
        <span className="craft-script">Good things take time.</span>
      </div>
      <div className="craft-content">
        <span className="eyebrow">02 / OUR CRAFT</span>
        <h2>
          The art of
          <br />
          <em>patience.</em>
        </h2>
        <p className="craft-intro">
          Luxury cannot be rushed. Every Aurelia creation is shaped in small batches, finished by
          hand and composed with ingredients selected as carefully as gemstones.
        </p>
        <div className="craft-stages">
          {stages.map((s, i) => (
            <div key={s.name} className={`craft-stage ${active === i ? "active" : ""}`}>
              <button
                aria-expanded={active === i}
                aria-controls={`craft-${i}`}
                onClick={() => setActive(i)}
              >
                <span>0{i + 1}</span>
                <h3>{s.name}</h3>
                <ArrowUpRight size={20} />
              </button>
              <div id={`craft-${i}`} className="craft-stage-body" hidden={active !== i}>
                <strong>{s.detail}</strong>
                <p>{s.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
