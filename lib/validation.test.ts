import { test } from "node:test";
import assert from "node:assert/strict";
import { inquirySchema, newsletterSchema } from "./validation.ts";
const valid = {
  name: "Aurelia Guest",
  email: "guest@example.com",
  occasion: "Weddings",
  message: "A summer wedding with fifty gift boxes.",
  phone: "+91 98765 43210",
  quantity: "50",
  website: "",
};
test("valid inquiry coerces whole box quantity and trims fields", () => {
  const r = inquirySchema.parse({ ...valid, name: "  Aurelia Guest  " });
  assert.equal(r.name, "Aurelia Guest");
  assert.equal(r.quantity, 50);
});
test("optional quantity and phone can be empty", () => {
  assert.equal(inquirySchema.safeParse({ ...valid, quantity: "", phone: "" }).success, true);
});
test("invalid addresses, phone numbers, quantities, and long messages are rejected", () => {
  for (const v of [
    { email: "broken" },
    { phone: "abcdefghi" },
    { quantity: "-1" },
    { quantity: "1.5" },
    { quantity: "100001" },
    { message: "a".repeat(2001) },
  ])
    assert.equal(inquirySchema.safeParse({ ...valid, ...v }).success, false);
});
test("newsletter validates email and rejects filled spam field", () => {
  assert.equal(newsletterSchema.safeParse({ email: "guest@example.com" }).success, true);
  assert.equal(newsletterSchema.safeParse({ email: "broken" }).success, false);
  assert.equal(
    newsletterSchema.safeParse({ email: "guest@example.com", website: "spam" }).success,
    false,
  );
});
