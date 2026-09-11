# Verification record

Verified 12 September 2026 using Node.js 22.19 and the optimized Next.js production server.

## Automated checks

- `npm run lint`: passes.
- `npm run typecheck`: passes.
- `npm test`: four meaningful validation tests pass.
- `npm run build`: passes; homepage, journal articles, privacy, terms, robots, and sitemap are pre-rendered. The two form endpoints are server routes.
- `node scripts/check-routes.mjs http://127.0.0.1:3001`: passes. Checks nine routes, ten image assets, custom 404, canonical/social/structured metadata, required section anchors, and success/invalid-input/cross-origin/wrong-content-type/oversize paths for both forms.
- Dependency installation audit: zero reported vulnerabilities.

## Browser checks

Used the available Chromium-based in-app browser against the production build.

- 320, 390, 768, 1440, and 1920 pixel viewport widths: document width matches viewport; no page overflow.
- Mobile and tablet main page: no WebGL canvases loaded.
- Desktop hero photograph/sculpture toggle renders its procedural product without console errors.
- Section navigation lands 80 pixels below the viewport top on desktop.
- Product modal shows content and hands the selected creation into the enquiry form.
- Enquiry submits valid sample details and explicitly reports that this demo does not send/store them.
- Newsletter returns the equivalent explicit demo confirmation.
- Fullscreen mobile menu opens, navigates, and dismisses.
- Craft controls expand the selected stage; testimonial navigation changes the quote.
- Gift exploration switches from its photograph to the animated box.
- Modal behavior uses native focus containment, Escape dismissal, and focus restoration.
- Production console checked after loading and 3D interactions; no captured warnings/errors.

## Performance characteristics

- Original WebP hero about 216 KB; ten images approximately 1 MB total before responsive image negotiation.
- Three WOFF2 fonts approximately 60 KB total, locally hosted and preloaded by Next Font.
- Dynamic renderer, viewport gating, bounded pixel ratio, local light sources/environment, and explicit cleanup.
- Native phone/tablet scrolling and photograph fallbacks. Reduced-motion handling is implemented through media queries in JS/CSS and matching GSAP contexts; no forced camera or smooth scroll in that mode.

No Lighthouse score is asserted. Native Safari and physical-device testing were unavailable; the implementation uses broadly supported CSS, native dialog, WebGL, and reduced-motion features with fallbacks.

## Published deployment

The public repository is [Pushker-Gera/aurelia-mithai](https://github.com/Pushker-Gera/aurelia-mithai). Vercel imports that repository as a Next.js project and serves [aurelia-mithai.vercel.app](https://aurelia-mithai.vercel.app).

- The Vercel deployment completed successfully.
- `node scripts/check-routes.mjs https://aurelia-mithai.vercel.app`: all route, image, metadata, and both form-endpoint checks pass.
- The public canonical origin resolves correctly to the Vercel production domain.
- Live desktop and 390px phone layouts were visually inspected. The phone document measures exactly 390px wide, with no WebGL canvases on initial load.
- Live mobile navigation and collection details open and work correctly.
- A live product enquiry submitted successfully and displayed the explicit demo confirmation; no details were sent or stored.
- The public desktop gift-box scene rendered with its separated lid and all six sweets. No console warnings or errors were captured after the interaction.
- Desktop and phone opening screenshots in this repository were captured from the published site.
