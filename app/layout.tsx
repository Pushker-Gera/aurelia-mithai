import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
const editorial = localFont({
  src: [
    { path: "../public/fonts/cormorant-regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/cormorant-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-editorial",
  display: "swap",
});
const sans = localFont({
  src: "../public/fonts/manrope-regular.woff2",
  variable: "--font-body",
  display: "swap",
});
import { siteUrl, siteTitle, siteDescription } from "@/lib/site";
import { ExperienceProvider } from "@/components/experience-provider";
import { Navigation } from "@/components/navigation";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: "%s — Aurelia Mithai" },
  description: siteDescription,
  applicationName: "Aurelia Mithai",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Aurelia Mithai",
    title: siteTitle,
    description: siteDescription,
    url: "/",
    images: [
      {
        url: "/images/og.webp",
        width: 1200,
        height: 628,
        alt: "Aurelia Mithai — Tradition, Sculpted Into Luxury",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/og.webp"],
  },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  robots: { index: true, follow: true },
  category: "design",
  keywords: [
    "Aurelia Mithai",
    "luxury Indian sweets",
    "mithai",
    "premium gifting",
    "digital design showcase",
  ],
};
export const viewport: Viewport = { themeColor: "#190F0B", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${editorial.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ExperienceProvider>
          <Navigation />
          {children}
        </ExperienceProvider>
      </body>
    </html>
  );
}
