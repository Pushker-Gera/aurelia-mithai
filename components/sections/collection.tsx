"use client";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { products, formatPrice, type Product } from "@/lib/data";
import { Modal } from "@/components/ui/modal";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { useInquiry } from "@/components/experience-provider";
import { Scene } from "@/components/three/scene";
export function Collection() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [live, setLive] = useState(false);
  const inquire = useInquiry();
  return (
    <section id="collection" className="collection section-pad">
      <div className="collection-heading">
        <div>
          <span className="eyebrow">01 / THE COLLECTION</span>
          <h2>
            Small wonders.
            <br />
            <em>Lasting impressions.</em>
          </h2>
        </div>
        <div className="collection-intro">
          <span className="mini-rule" />
          <p>
            Rooted in memory. Refined for today.
            <br />
            Discover six signatures of the house.
          </p>
          <span className="eyebrow">THE AURELIA COLLECTION</span>
        </div>
      </div>
      <div className="product-grid">
        {products.map((p) => (
          <button
            className="product-card"
            key={p.id}
            onClick={() => {
              setSelected(p);
              setLive(false);
            }}
            aria-label={`View ${p.name}, ${p.subtitle}, ${formatPrice(p.price)}`}
          >
            <div className="product-visual">
              <Image
                src={p.image}
                alt={p.subtitle}
                fill
                sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 31vw"
              />
              <span className="product-index">{p.number} / AURELIA</span>
              <span className="product-view">
                View creation <ArrowUpRight size={17} />
              </span>
              <span className="product-ingredients">
                {p.notes[0]} · {p.notes[1]}
              </span>
            </div>
            <div className="product-info">
              <div>
                <h3>{p.name}</h3>
                <p>{p.subtitle}</p>
              </div>
              <span className="product-price">
                {formatPrice(p.price)}
                <Plus size={15} />
              </span>
            </div>
          </button>
        ))}
      </div>
      <div className="collection-bottom">
        <span>A little heritage. A little unexpected.</span>
        <span className="eyebrow">EACH CREATION, A CONVERSATION.</span>
      </div>
      {selected && (
        <Modal title={`${selected.name} creation`} onClose={() => setSelected(null)} wide>
          <div className="product-detail">
            <div className="detail-visual">
              {live ? (
                <Scene type={selected.type} mode="product" fallback={selected.image} />
              ) : (
                <Image
                  src={selected.image}
                  alt={selected.subtitle}
                  fill
                  sizes="(max-width: 800px) 90vw, 45vw"
                />
              )}
              <button className="view-mode" onClick={() => setLive(!live)}>
                {live ? "View photograph" : "Explore in 3D"}
                <ArrowUpRight size={15} />
              </button>
            </div>
            <div className="detail-content">
              <span className="eyebrow">CREATION {selected.number} / THE AURELIA COLLECTION</span>
              <h2>{selected.name}</h2>
              <p className="detail-subtitle">{selected.subtitle}</p>
              <p>{selected.description}</p>
              <ul className="ingredient-list">
                {selected.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
              <span className="detail-price">
                {formatPrice(selected.price)}
                <small>Concept collection · indicative pricing</small>
              </span>
              <p className="allergen-note">{selected.allergens}</p>
              <MagneticLink
                className="button-dark"
                onClick={() => {
                  setSelected(null);
                  inquire(`Collection — ${selected.name}`);
                }}
              >
                Enquire about this creation
              </MagneticLink>
              <span className="demo-note">
                A fictional collection for a design showcase. No purchase or payment is available.
              </span>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
