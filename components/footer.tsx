import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
export function Footer() {
  return (
    <footer className="footer section-pad">
      <div className="footer-top">
        <div>
          <span className="eyebrow">TRADITION, SCULPTED INTO LUXURY.</span>
          <p>
            Indian at heart.
            <br />
            Extraordinary by nature.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          {["Collection", "Story", "Craft", "Gifting", "Journal", "Contact"].map((l) => (
            <Link key={l} href={`/#${l.toLowerCase()}`} className="text-link">
              {l}
            </Link>
          ))}
        </nav>
        <div className="footer-contact">
          <span>New Delhi, India</span>
          <a href="mailto:hello@aureliamithai.example" className="text-link">
            hello@aureliamithai.example <ArrowUpRight size={14} />
          </a>
          <div className="footer-socials">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram (platform homepage; concept brand)"
            >
              Instagram
            </a>
            <a
              href="https://www.pinterest.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Pinterest (platform homepage; concept brand)"
            >
              Pinterest
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn (platform homepage; concept brand)"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <Link href="/#top" className="footer-wordmark" aria-label="Aurelia, back to top">
        AURELIA<span>®</span>
      </Link>
      <div className="footer-bottom">
        <div>
          <span>© 2026 Aurelia Mithai.</span>
          <p>
            Concept experience designed to demonstrate Aurelia’s digital identity.
            <br />A premium digital design showcase. Fictional brand, products, and testimonials.
          </p>
        </div>
        <div className="footer-legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="#top">
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
