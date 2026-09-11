import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { articles } from "@/lib/data";
import { Footer } from "@/components/footer";
import { siteUrl } from "@/lib/site";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.intro,
    alternates: { canonical: `/journal/${slug}` },
    openGraph: {
      title: a.title,
      description: a.intro,
      type: "article",
      url: `/journal/${slug}`,
      images: [{ url: a.image, alt: a.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: a.title,
      description: a.intro,
      images: [a.image],
    },
  };
}
export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = articles.findIndex((a) => a.slug === slug);
  if (index < 0) notFound();
  const a = articles[index],
    next = articles[(index + 1) % articles.length];
  return (
    <>
      <main id="main" className="editorial-page">
        <Link className="back-link" href="/#journal">
          <ArrowLeft size={16} /> Back to the journal
        </Link>
        <header className="article-heading">
          <span className="eyebrow">{a.category}</span>
          <h1>{a.title}</h1>
          <p>
            {a.date} · {a.readTime} · THE AURELIA JOURNAL
          </p>
        </header>
        <div className="article-hero">
          <Image src={a.image} alt={a.alt} fill sizes="90vw" priority />
        </div>
        <article className="article-body">
          <p className="article-intro">{a.intro}</p>
          {a.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="demo-note">
            An original editorial written for Aurelia, a fictional confectionery house and digital
            design showcase.
          </p>
        </article>
        <Link href={`/journal/${next.slug}`} className="article-next">
          <div>
            <span className="eyebrow">CONTINUE READING</span>
            <h2>{next.title}</h2>
          </div>
          <ArrowUpRight size={29} />
        </Link>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: a.title,
              description: a.intro,
              image: new URL(a.image, siteUrl).href,
              author: { "@type": "Organization", name: "The Aurelia Journal" },
              mainEntityOfPage: `${siteUrl}/journal/${a.slug}`,
            }).replace(/</g, "\\u003c"),
          }}
        />
      </main>
      <Footer />
    </>
  );
}
