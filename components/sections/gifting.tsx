"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { useInquiry } from "@/components/experience-provider";
import { Scene } from "@/components/three/scene";
export function Gifting() {
  const inquire = useInquiry();
  const section = useRef<HTMLElement>(null),
    progress = useRef(0);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const update = () => {
      const r = section.current?.getBoundingClientRect();
      if (r)
        progress.current = Math.max(
          0,
          Math.min(1, (window.innerHeight - r.top) / (r.height + window.innerHeight)),
        );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <section id="gifting" ref={section} className="gifting section-pad">
      <div className="section-topline">
        <span className="eyebrow">03 / THE ART OF GIVING</span>
        <span className="eyebrow">BEAUTIFULLY GIVEN. FONDLY REMEMBERED.</span>
      </div>
      <div className="gifting-main">
        <div className="gifting-copy">
          <h2>
            Made for moments
            <br />
            worth <em>remembering.</em>
          </h2>
          <p>
            From intimate gestures to unforgettable celebrations, Aurelia gifting transforms
            tradition into an experience.
          </p>
          <MagneticLink className="button-light" onClick={() => setLive(!live)}>
            {live ? "View the signature box" : "Explore gifting in 3D"}
          </MagneticLink>
          <button className="text-link bespoke-link" onClick={() => inquire("Bespoke gifting")}>
            Enquire for bespoke gifting
          </button>
        </div>
        <div className="gifting-visual">
          {live ? (
            <Scene type="box" mode="gift" progress={progress} fallback="/images/gifting.webp" />
          ) : (
            <Image
              src="/images/gifting.webp"
              alt="An open embossed Aurelia gift box with an assortment of hand-finished mithai"
              fill
              sizes="(max-width: 900px) 100vw, 60vw"
            />
          )}
          <span className="gift-note">A GESTURE, ELEVATED.</span>
        </div>
      </div>
      <div className="gifting-categories">
        {["Weddings", "Festivals", "Corporate", "Private Celebrations"].map((category, i) => (
          <button key={category} onClick={() => inquire(category)}>
            <span>0{i + 1}</span>
            {category}
            <span>↗</span>
          </button>
        ))}
      </div>
    </section>
  );
}
