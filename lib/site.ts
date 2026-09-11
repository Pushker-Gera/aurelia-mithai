const configured =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
export const siteUrl = configured.replace(/\/$/, "");
export const isPublished = !siteUrl.includes("localhost");
export const siteTitle = "Aurelia Mithai — Tradition, Sculpted Into Luxury";
export const siteDescription =
  "A digital exploration of contemporary Indian mithai, handcrafted through tradition, flavour and modern luxury. A premium concept experience.";
