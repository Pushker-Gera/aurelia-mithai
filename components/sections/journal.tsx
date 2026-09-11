import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articles } from "@/lib/data";
export function Journal() {
  return (
    <section id="journal" className="journal section-pad">
      <div className="journal-heading">
        <div>
          <span className="eyebrow">05 / THE JOURNAL</span>
          <h2>
            A world, <em>considered.</em>
          </h2>
        </div>
        <p>
          Notes on craft, culture
          <br />
          and the beauty of small things.
        </p>
      </div>
      <div className="journal-grid">
        {articles.map((a, i) => (
          <Link href={`/journal/${a.slug}`} className="journal-card" key={a.slug}>
            <div className={`journal-image journal-image-${i}`}>
              <Image src={a.image} alt={a.alt} fill sizes="(max-width: 650px) 90vw, 32vw" />
              <span className="journal-arrow">
                <ArrowUpRight size={24} strokeWidth={1} />
              </span>
            </div>
            <div className="journal-meta">
              <span>{a.category}</span>
              <span>{a.readTime}</span>
            </div>
            <h3>{a.title}</h3>
            <span className="text-link">Read the story</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
