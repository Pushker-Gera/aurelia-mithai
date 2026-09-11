"use client";
import { useRef, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
export function MagneticLink({
  children,
  href,
  onClick,
  className = "",
  arrow = true,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  arrow?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const r = e.currentTarget.getBoundingClientRect();
    if (ref.current)
      ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.13}px, ${(e.clientY - r.top - r.height / 2) * 0.18}px)`;
  };
  const content = (
    <span className="button-content" ref={ref}>
      <span className="button-label">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {arrow && <ArrowUpRight size={17} strokeWidth={1.4} />}
    </span>
  );
  const props = {
    className: `aurelia-button ${className}`,
    onPointerMove: move,
    onPointerLeave: () => {
      if (ref.current) ref.current.style.transform = "translate(0,0)";
    },
  };
  return href ? (
    <a href={href} {...props}>
      {content}
    </a>
  ) : (
    <button type="button" onClick={onClick} {...props}>
      {content}
    </button>
  );
}
