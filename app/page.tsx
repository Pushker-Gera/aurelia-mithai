import { Hero } from "@/components/sections/hero";
import { SignatureStory } from "@/components/sections/signature-story";
import { Collection } from "@/components/sections/collection";
import { HorizontalShowcase } from "@/components/sections/horizontal-showcase";
import { Craft } from "@/components/sections/craft";
import { Marquee } from "@/components/sections/marquee";
import { Gifting } from "@/components/sections/gifting";
import { BrandStory } from "@/components/sections/brand-story";
import { Testimonials } from "@/components/sections/testimonials";
import { Journal } from "@/components/sections/journal";
import { InquiryNewsletter } from "@/components/sections/inquiry-newsletter";
import { Footer } from "@/components/footer";
import { siteUrl } from "@/lib/site";
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Aurelia Mithai",
            url: siteUrl,
            description:
              "A fictional luxury Indian confectionery house. A premium digital design showcase.",
            inLanguage: "en-IN",
          }).replace(/</g, "\\u003c"),
        }}
      />
      <main id="main">
        <Hero />
        <SignatureStory />
        <Collection />
        <HorizontalShowcase />
        <Craft />
        <Marquee />
        <Gifting />
        <BrandStory />
        <Testimonials />
        <Journal />
        <InquiryNewsletter />
      </main>
      <Footer />
    </>
  );
}
