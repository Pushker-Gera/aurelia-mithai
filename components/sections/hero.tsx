"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, Plus } from "lucide-react";
import { Scene } from "@/components/three/scene";
import { MagneticLink } from "@/components/ui/magnetic-link";
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [sculpture, setSculpture] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 800px)").matches) return;
    const update = () => {
      if (ref.current && window.scrollY < window.innerHeight * 1.5)
        ref.current.style.setProperty("--hero-scroll", String(window.scrollY));
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <section id="top" ref={ref} className={`hero ${sculpture ? "hero-sculpture-active" : ""}`}>
      <div className="hero-image">
        <Image
          src="/images/hero.webp"
          alt="Silver-leaf kaju katli, saffron ladoo, and pistachio barfi on an antique brass platter"
          fill
          sizes="100vw"
          priority
          quality={90}
        />
      </div>
      <div className="hero-shade" />
      {sculpture && (
        <div className="hero-sculpture">
          <Scene type="katli" mode="hero" fallback="/images/noor.webp" />
        </div>
      )}
      <button
        className="hero-view-toggle"
        onClick={() => setSculpture(!sculpture)}
        aria-pressed={sculpture}
      >
        <span className={!sculpture ? "active" : ""}>Still life</span>
        <span>/</span>
        <span className={sculpture ? "active" : ""}>Sculpture</span>
      </button>
      <div className="hero-topline">
        <span className="eyebrow">
          <span className="tiny-star">✳</span> A CONTEMPORARY INDIAN CONFECTIONERY HOUSE
        </span>
        <span className="hero-edition">
          EST. IN TRADITION
          <br />
          REIMAGINED FOR TODAY
        </span>
      </div>
      <div className="hero-copy">
        <h1>
          <span>Tradition,</span>
          <span>sculpted</span>
          <span className="hero-last">
            into <em>luxury.</em>
          </span>
        </h1>
        <div className="hero-description">
          <p>
            An expression of Indian craftsmanship,
            <br className="desktop-break" /> reimagined through flavour, form
            <br className="desktop-break" /> and contemporary indulgence.
          </p>
          <div className="hero-actions">
            <MagneticLink href="#collection" className="button-light">
              Discover the collection
            </MagneticLink>
            <a className="text-link hero-craft-link" href="#craft">
              Our craft
            </a>
          </div>
        </div>
      </div>
      <div className="hero-product-note">
        <Plus size={19} strokeWidth={1} />
        <span>
          THE SIGNATURE COLLECTION
          <br />
          <span>Small wonders. Extraordinary by nature.</span>
        </span>
      </div>
      <div className="hero-bottom">
        <a className="scroll-cue" href="#philosophy">
          <span className="scroll-arrow">
            <ArrowDown size={16} />
          </span>
          <span>SCROLL TO DISCOVER</span>
        </a>
        <span className="hero-bottom-center">HANDCRAFTED IN INDIA. CHERISHED EVERYWHERE.</span>
        <span className="hero-page">01 — 06</span>
      </div>
    </section>
  );
}
