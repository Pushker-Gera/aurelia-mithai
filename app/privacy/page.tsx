import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy information for the Aurelia Mithai concept experience.",
  alternates: { canonical: "/privacy" },
};
export default function Privacy() {
  return (
    <>
      <main id="main" className="legal-page">
        <span className="eyebrow">THE DETAILS / SEPTEMBER 2026</span>
        <h1>
          Your privacy,
          <br />
          <em>considered.</em>
        </h1>
        <p>
          Aurelia Mithai is a fictional brand. This website is a portfolio and design demonstration,
          not an operating confectionery business.
        </p>
        <h2>Forms in preview mode</h2>
        <p>
          By default, enquiries and newsletter entries are checked for valid formatting and returned
          to your browser with an explicit preview confirmation. They are not saved to a database,
          subscribed to a mailing list, or emailed. Please use sample details when exploring this
          demo.
        </p>
        <h2>Optional connected forms</h2>
        <p>
          If the site operator configures a form delivery service, a successful submission is sent
          to that service. The confirmation will state that the enquiry was received. The operator
          is responsible for providing service-specific privacy information and consent before
          enabling collection for real customers.
        </p>
        <h2>Local preferences</h2>
        <p>
          Session storage remembers whether the opening animation has already played in the current
          tab. It does not identify you, contain contact details, or track activity across websites.
          The animation works without this preference when browser storage is unavailable.
        </p>
        <h2>Hosting and external links</h2>
        <p>
          The hosting provider may process standard request data to serve and protect the website.
          No advertising pixels or analytics are added by this project. External social links lead
          to platform homepages; they do not represent real Aurelia accounts.
        </p>
        <h2>Contact</h2>
        <p>
          The address hello@aureliamithai.example is intentionally fictional and cannot receive
          enquiries. For questions about this showcase, contact the developer or portfolio owner who
          shared it with you.
        </p>
        <p>
          <Link href="/">Return to Aurelia</Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
