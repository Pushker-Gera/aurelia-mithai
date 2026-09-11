import assert from "node:assert/strict";
const base = process.argv[2] || "http://127.0.0.1:3000";
const pages = [
  "/",
  "/journal/the-ritual-of-saffron",
  "/journal/a-new-language-for-indian-gifting",
  "/journal/why-craft-still-matters",
  "/privacy",
  "/terms",
  "/robots.txt",
  "/sitemap.xml",
  "/icon.svg",
];
for (const path of pages) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  if (path === "/") {
    const html = await response.text();
    assert.match(html, /Tradition/);
    assert.match(html, /og:image/);
    assert.match(html, /application\/ld\+json/);
    assert.match(html, /rel="canonical"/);
    for (const id of ["collection", "craft", "gifting", "story", "journal", "contact"])
      assert.match(html, new RegExp(`id="${id}"`));
  }
}
for (const name of [
  "hero",
  "craft",
  "gifting",
  "og",
  "noor",
  "gul",
  "ziya",
  "mehr",
  "sona",
  "box",
]) {
  const response = await fetch(`${base}/images/${name}.webp`);
  assert.equal(response.status, 200, name);
  assert.match(response.headers.get("content-type"), /image\/webp/);
}
assert.equal((await fetch(base + "/page-that-does-not-exist")).status, 404);
const post = (route, body, extra = {}) =>
  fetch(base + route, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: new URL(base).origin, ...extra },
    body: JSON.stringify(body),
  });
const inquiry = {
  name: "Test Guest",
  email: "guest@example.com",
  occasion: "Weddings",
  message: "A demonstration enquiry for fifty gift boxes.",
  quantity: "50",
};
for (const [route, payload] of [
  ["/api/inquiry", inquiry],
  ["/api/newsletter", { email: "guest@example.com" }],
]) {
  const success = await post(route, payload);
  assert.equal(success.status, 200);
  assert.equal((await success.json()).ok, true);
  assert.equal((await post(route, { ...payload, email: "invalid" })).status, 422);
  assert.equal((await post(route, payload, { Origin: "https://unrelated.example" })).status, 403);
  assert.equal((await post(route, payload, { "Content-Type": "text/plain" })).status, 415);
  assert.equal((await post(route, { ...payload, message: "x".repeat(13000) })).status, 413);
}
console.log(
  "PASS: 9 routes, 10 images, 404, metadata, section anchors, and both form success/error paths.",
);
