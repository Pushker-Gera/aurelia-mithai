import Image from "next/image";
import { MagneticLink } from "@/components/ui/magnetic-link";
export function BrandStory() {
  return (
    <section id="story" className="brand-story section-pad">
      <div className="story-intro">
        <span className="eyebrow">04 / OUR STORY</span>
        <h2>
          Old soul.
          <br />
          <em>New language.</em>
        </h2>
        <span className="story-monogram" aria-hidden="true">
          A
        </span>
      </div>
      <div className="story-image">
        <Image
          src="/images/craft.webp"
          alt="The hand of an artisan carefully applying silver leaf to traditional mithai"
          fill
          sizes="(max-width: 900px) 90vw, 35vw"
        />
        <span>A TRADITION OF TOMORROW.</span>
      </div>
      <div className="story-text">
        <span className="tiny-star">✳</span>
        <p className="story-lead">
          The flavours we inherit deserve the reverence of the world’s finest luxuries.
        </p>
        <p>
          Aurelia began with this simple belief. We preserve the soul of Indian mithai while
          rethinking its form, texture, presentation and ritual.
        </p>
        <p>
          A celebration of where we come from.
          <br />
          An expression of where we can go.
        </p>
        <MagneticLink href="#craft" className="button-outline">
          Step inside our atelier
        </MagneticLink>
      </div>
    </section>
  );
}
