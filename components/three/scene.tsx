"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, useEffect, useRef, useState, type RefObject, type ReactNode } from "react";
import type { Product } from "@/lib/data";
export type SceneProps = {
  type: Product["type"];
  mode?: "signature" | "product" | "gift" | "hero";
  progress?: RefObject<number>;
  fallback: string;
  onReady?: () => void;
};
const SweetCanvas = dynamic(() => import("./sweet-canvas"), { ssr: false });
class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
export function Scene(props: SceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let modalOpen = false;
    const update = () => {
      const allowed = !query.matches && (props.mode === "product" || window.innerWidth >= 900);
      setActive(visible && allowed && !document.hidden && (!modalOpen || props.mode === "product"));
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        update();
      },
      { rootMargin: "120px" },
    );
    observer.observe(node);
    const modal = (e: Event) => {
      modalOpen = !!(e as CustomEvent).detail;
      update();
    };
    document.addEventListener("visibilitychange", update);
    window.addEventListener("aurelia:modal", modal);
    query.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("aurelia:modal", modal);
      observer.disconnect();
      query.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, [props.mode]);
  const fallback = (
    <Image
      src={props.fallback}
      alt="A sculptural view of this Aurelia creation"
      fill
      sizes="(max-width: 900px) 90vw, 50vw"
      className="scene-fallback"
    />
  );
  return (
    <div
      ref={ref}
      className={`scene-shell scene-${props.mode || "product"}`}
      aria-label="Interactive sculptural product view"
    >
      <div className={`scene-poster ${active && ready ? "scene-poster-hidden" : ""}`}>
        {fallback}
      </div>
      {active && (
        <SceneBoundary fallback={fallback}>
          <SweetCanvas {...props} onReady={() => setReady(true)} />
        </SceneBoundary>
      )}
    </div>
  );
}
