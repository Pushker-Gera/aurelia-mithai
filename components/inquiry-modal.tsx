"use client";
import { useState } from "react";
import { Check, LoaderCircle, ArrowUpRight } from "lucide-react";
import { Modal } from "@/components/ui/modal";
export function InquiryModal({ occasion, onClose }: { occasion: string; onClose: () => void }) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrors({});
    try {
      const values = Object.fromEntries(new FormData(e.currentTarget));
      const r = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await r.json();
      if (!r.ok) {
        setErrors(data.fields || {});
        throw new Error(data.error || "Please try again.");
      }
      setMessage(
        data.demo
          ? "Your details have been validated. This is a concept experience, so your enquiry has not been sent or stored."
          : "Thank you. Your enquiry has reached our atelier. We will be in touch.",
      );
      setState("success");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to submit. Please try again.");
      setState("error");
    }
  }
  return (
    <Modal title="Bespoke enquiry" onClose={onClose}>
      {state === "success" ? (
        <div className="inquiry-success">
          <span className="success-ring">
            <Check size={26} />
          </span>
          <span className="eyebrow">BEAUTIFULLY CONSIDERED</span>
          <h2>
            A lovely
            <br />
            <em>beginning.</em>
          </h2>
          <p>{message}</p>
          <button className="aurelia-button button-dark" onClick={onClose}>
            Return to Aurelia <ArrowUpRight size={17} />
          </button>
        </div>
      ) : (
        <>
          <span className="eyebrow">THE BESPOKE EXPERIENCE</span>
          <h2 className="inquiry-title">
            Let’s make
            <br />
            <em>something memorable.</em>
          </h2>
          <p className="inquiry-intro">Tell us a little about what you have in mind.</p>
          <form className="inquiry-form" onSubmit={submit}>
            <div className="form-row">
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="Name"
                  required
                  minLength={2}
                  maxLength={100}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </label>
              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  maxLength={254}
                  aria-invalid={!!errors.email}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </label>
            </div>
            <div className="form-row">
              <label>
                Phone <span>(optional)</span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91"
                  maxLength={25}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </label>
              <label>
                Occasion
                <select name="occasion" defaultValue={occasion || ""} required>
                  <option value="" disabled>
                    Select an occasion
                  </option>
                  <option>Weddings</option>
                  <option>Festivals</option>
                  <option>Corporate</option>
                  <option>Private Celebrations</option>
                  <option>Bespoke gifting</option>
                  <option>Collaboration</option>
                  <option>Other</option>
                  {occasion &&
                    ![
                      "Weddings",
                      "Festivals",
                      "Corporate",
                      "Private Celebrations",
                      "Bespoke gifting",
                      "Collaboration",
                      "Other",
                    ].includes(occasion) && <option>{occasion}</option>}
                </select>
              </label>
            </div>
            <label>
              Estimated quantity <span>(boxes, optional)</span>
              <input
                name="quantity"
                type="number"
                inputMode="numeric"
                min={1}
                max={100000}
                step={1}
                placeholder="e.g. 50"
                aria-invalid={!!errors.quantity}
              />
              {errors.quantity && <span className="field-error">{errors.quantity}</span>}
            </label>
            <label>
              Your vision
              <textarea
                name="message"
                rows={3}
                placeholder="The occasion, the feeling, the details that matter…"
                required
                minLength={10}
                maxLength={2000}
                aria-invalid={!!errors.message}
              />
              {errors.message && <span className="field-error">{errors.message}</span>}
            </label>
            <input
              className="honeypot"
              name="website"
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
            />
            <p className="form-status error" role="alert">
              {state === "error" ? message : ""}
            </p>
            <button
              className="aurelia-button button-dark"
              disabled={state === "loading"}
              type="submit"
            >
              {state === "loading" ? (
                <>
                  <LoaderCircle className="spin" size={18} /> Sending your enquiry
                </>
              ) : (
                <>
                  Send enquiry
                  <ArrowUpRight size={18} />
                </>
              )}
            </button>
            <p className="demo-note">
              This is a design showcase. In preview mode, enquiries are validated but not sent or
              stored. <a href="/privacy">Privacy details</a>
            </p>
          </form>
        </>
      )}
    </Modal>
  );
}
