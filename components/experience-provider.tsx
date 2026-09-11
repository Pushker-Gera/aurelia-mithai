"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";
const InquiryModal = dynamic(() =>
  import("@/components/inquiry-modal").then((m) => m.InquiryModal),
);
const InquiryContext = createContext<(occasion?: string) => void>(() => {});
export const useInquiry = () => useContext(InquiryContext);
export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const [inquiry, setInquiry] = useState<string | null>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!motionQuery.matches) {
      try {
        if (!sessionStorage.getItem("aurelia-visited")) {
          queueMicrotask(() => setLoader(true));
          sessionStorage.setItem("aurelia-visited", "1");
        }
      } catch {
        /* Storage is optional. */
      }
    }
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            revealObserver.unobserve(entry.target);
            if (!motionQuery.matches)
              entry.target.animate(
                [
                  { opacity: 0, transform: "translateY(26px)", clipPath: "inset(5% 0 0 0)" },
                  { opacity: 1, transform: "translateY(0)", clipPath: "inset(0 0 0 0)" },
                ],
                { duration: 1050, easing: "cubic-bezier(.16,1,.3,1)", fill: "none" },
              );
          }
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(
        ".collection-heading,.product-card,.craft-image,.story-image,.story-text,.journal-card,.bespoke h2,.newsletter h2",
      )
      .forEach((el) => revealObserver.observe(el));
    const timer = setTimeout(() => setLoader(false), 1650);
    const scroll = () => {
      if (progress.current)
        progress.current.style.transform = `scaleX(${window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)})`;
    };
    window.addEventListener("scroll", scroll, { passive: true });
    let lenis: import("lenis").default | undefined;
    let disposed = false;
    if (
      !motionQuery.matches &&
      window.matchMedia("(pointer: fine) and (min-width: 900px)").matches
    ) {
      import("lenis").then(({ default: Lenis }) => {
        if (!disposed)
          lenis = new Lenis({
            autoRaf: true,
            duration: 1.15,
            smoothWheel: true,
            anchors: { offset: -80 },
          });
      });
    }
    const modal = (event: Event) => {
      if ((event as CustomEvent).detail) lenis?.stop();
      else lenis?.start();
    };
    const mediaChange = () => {
      if (motionQuery.matches) {
        lenis?.destroy();
        lenis = undefined;
        setLoader(false);
      }
    };
    window.addEventListener("aurelia:modal", modal);
    motionQuery.addEventListener("change", mediaChange);
    const pointer = (e: PointerEvent) => {
      if (cursor.current && e.pointerType === "mouse") {
        cursor.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
        cursor.current.classList.add("cursor-visible");
        cursor.current.classList.toggle(
          "cursor-active",
          !!(e.target as HTMLElement).closest("a,button,[data-cursor]"),
        );
      }
    };
    const hide = () => cursor.current?.classList.remove("cursor-visible");
    window.addEventListener("pointermove", pointer, { passive: true });
    document.addEventListener("pointerleave", hide);
    return () => {
      disposed = true;
      revealObserver.disconnect();
      clearTimeout(timer);
      lenis?.destroy();
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("pointermove", pointer);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("aurelia:modal", modal);
      motionQuery.removeEventListener("change", mediaChange);
    };
  }, []);
  return (
    <MotionConfig reducedMotion="user">
      <InquiryContext.Provider value={(occasion = "") => setInquiry(occasion)}>
        {children}
        <div ref={progress} className="scroll-progress" aria-hidden="true" />
        <div ref={cursor} className="custom-cursor" aria-hidden="true">
          <span />
        </div>
        {loader && (
          <div className="preloader" aria-hidden="true">
            <span className="eyebrow">CRAFTING EXPERIENCE</span>
            <span className="loader-word">AURELIA</span>
            <span className="loader-track" />
            <span className="loader-number">0 — 100</span>
          </div>
        )}
        {inquiry !== null && <InquiryModal occasion={inquiry} onClose={() => setInquiry(null)} />}
      </InquiryContext.Provider>
    </MotionConfig>
  );
}
