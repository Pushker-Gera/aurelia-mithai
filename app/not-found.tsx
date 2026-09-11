import { MagneticLink } from "@/components/ui/magnetic-link";
export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <span className="eyebrow">404 / A SMALL DETOUR</span>
      <h1>
        Lost in
        <br />
        <em>indulgence.</em>
      </h1>
      <p>This page isn’t part of the collection.</p>
      <MagneticLink href="/" className="button-dark">
        Return to Aurelia
      </MagneticLink>
    </main>
  );
}
