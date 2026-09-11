"use client";
import { useEffect, type RefObject } from "react";
export function useSceneProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const r = node.getBoundingClientRect();
      node.style.setProperty(
        "--section-progress",
        String(
          query.matches
            ? 0.5
            : Math.max(
                0,
                Math.min(1, (window.innerHeight - r.top) / (r.height + window.innerHeight)),
              ),
        ),
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [ref]);
}
