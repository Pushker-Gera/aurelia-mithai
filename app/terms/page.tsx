import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
export const metadata: Metadata = {
  title: "Terms of the concept",
  description: "About the fictional Aurelia Mithai design showcase.",
  alternates: { canonical: "/terms" },
};
export default function Terms() {
  return (
    <>
      <main id="main" className="legal-page">
        <span className="eyebrow">THE DETAILS / SEPTEMBER 2026</span>
        <h1>
          A note on
          <br />
          <em>the experience.</em>
        </h1>
        <h2>A fictional house</h2>
        <p>
          Aurelia Mithai is an original design concept created to explore a contemporary digital
          identity for luxury Indian confectionery. The products, pricing, brand story, statistics,
          and testimonials are illustrative. They are not claims about an existing business.
        </p>
        <h2>No transactions</h2>
        <p>
          This website does not accept orders, payments, or bookings. Product enquiries and the
          newsletter are demonstrations unless a separate form delivery service is explicitly
          configured. No purchase contract is formed by interacting with this site.
        </p>
        <h2>Images and product representations</h2>
        <p>
          Campaign photography was created with generative image tools for this fictional brand.
          Interactive products are procedural 3D interpretations. Ingredients and allergen details
          are sample content and must not be used to make dietary or purchasing decisions.
        </p>
        <h2>External destinations</h2>
        <p>
          Social links lead to the respective platform homepages. Aurelia does not claim an account,
          endorsement, or association with those services.
        </p>
        <h2>Using the showcase</h2>
        <p>
          Explore, share the website, and use the interface to understand the design. If adapting
          the code for a real business, replace all fictional content, confirm image and font
          licensing, configure appropriate form handling, and review the published policies.
        </p>
        <p>
          <Link href="/">Return to Aurelia</Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
