"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks } from "@/lib/data";
import { Modal } from "@/components/ui/modal";
export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 45);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <>
      <header className={`navigation ${scrolled || pathname !== "/" ? "nav-scrolled" : ""}`}>
        <Link className="wordmark" href="/" aria-label="Aurelia Mithai home">
          AURELIA<span>M I T H A I</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link className="text-link" key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className="nav-cta" href="/#collection">
          Explore collection
          <ArrowUpRight size={15} />
        </Link>
        <button
          className="menu-button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={open}
        >
          <Menu size={25} strokeWidth={1.3} />
        </button>
      </header>
      {open && (
        <Modal title="Navigation menu" onClose={() => setOpen(false)}>
          <nav className="mobile-menu" aria-label="Mobile navigation">
            <span className="eyebrow">THE HOUSE OF AURELIA</span>
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span>0{i + 1}</span>
                {link.label}
                <ArrowUpRight size={24} />
              </Link>
            ))}
            <p>
              Tradition, sculpted into luxury.
              <br />
              <span>NEW DELHI, INDIA</span>
            </p>
            <button className="mobile-menu-close" onClick={() => setOpen(false)}>
              <X size={17} /> Close menu
            </button>
          </nav>
        </Modal>
      )}
    </>
  );
}
