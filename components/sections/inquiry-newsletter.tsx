"use client";
import { useState } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { useInquiry } from "@/components/experience-provider";
import { MagneticLink } from "@/components/ui/magnetic-link";
export function InquiryNewsletter() {
  const inquire = useInquiry();
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("loading");
    setMessage("");
    try {
      const data = new FormData(form);
      const r = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), website: data.get("website") }),
      });
      const result = await r.json();
      if (!r.ok) throw new Error(result.error || "Please try again in a moment.");
      setMessage(
        result.demo
          ? "A lovely choice. This is a preview; your email has not been stored or subscribed."
          : "Welcome to Aurelia. You’re on the list.",
      );
      setState("success");
      form.reset();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
      setState("error");
    }
  }
  return (
    <>
      <section id="contact" className="bespoke section-pad">
        <span className="eyebrow">06 / PERSONALLY YOURS</span>
        <span className="bespoke-star" aria-hidden="true">
          ✳
        </span>
        <h2>
          Something made
          <br />
          <em>only for you.</em>
        </h2>
        <p>
          Private events, weddings, collaborations
          <br />
          and tailored gifting experiences.
        </p>
        <MagneticLink className="button-dark" onClick={() => inquire()}>
          Begin a conversation
        </MagneticLink>
        <span className="bespoke-location">NEW DELHI, INDIA · BY APPOINTMENT, BY IMAGINATION.</span>
      </section>
      <section className="newsletter section-pad">
        <div>
          <span className="eyebrow">LETTERS FROM AURELIA</span>
          <h2>
            A little sweetness,
            <br />
            <em>occasionally.</em>
          </h2>
        </div>
        <div className="newsletter-content">
          <p>Stories, seasonal notes, and things worth savouring.</p>
          <form onSubmit={submit}>
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <div className="newsletter-field">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="Your email address"
                autoComplete="email"
                required
                maxLength={254}
                disabled={state === "loading"}
                aria-describedby="newsletter-status"
              />
              <button disabled={state === "loading"} type="submit">
                {state === "loading" ? (
                  <>
                    <LoaderCircle className="spin" size={17} /> Joining
                  </>
                ) : state === "success" ? (
                  <>
                    <Check size={17} /> Preview complete
                  </>
                ) : (
                  <>
                    Join Aurelia
                    <ArrowRight size={19} />
                  </>
                )}
              </button>
            </div>
            <input
              className="honeypot"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <p
              id="newsletter-status"
              className={`form-status ${state}`}
              role="status"
              aria-live="polite"
            >
              {message || "A concept newsletter. No email is stored in preview mode."}
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
