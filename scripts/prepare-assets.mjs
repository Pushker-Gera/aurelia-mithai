// One-time local image processing; supply the directory containing generated PNGs.
// The production project already includes every optimized asset.
import sharp from "sharp";
import { join } from "node:path";
const source = process.argv[2];
if (!source)
  throw new Error("Usage: node scripts/prepare-assets.mjs /absolute/generated-assets-directory");
const files = {
  hero: "exec-480ee475-fb52-4deb-9259-824bdca81b0c.png",
  craft: "exec-1dc446f5-604d-4f73-85a3-1da66a82c892.png",
  gifting: "exec-da11f5f7-c03c-4c6d-987c-121e955be46e.png",
  og: "exec-9e4c566e-e787-4cc1-90d4-4e813d5ac760.png",
};
for (const [name, file] of Object.entries(files))
  await sharp(join(source, file))
    .resize({
      width: name === "og" ? 1200 : name === "craft" ? 900 : 1536,
      withoutEnlargement: true,
    })
    .webp({ quality: name === "hero" ? 89 : 85 })
    .toFile(`public/images/${name}.webp`);
const names = ["noor", "gul", "ziya", "mehr", "sona", "box"];
for (const [i, name] of names.entries())
  await sharp(join(source, "exec-ad41c1b8-a0b1-4702-9f53-3bb1bbb05352.png"))
    .extract({ left: (i % 3) * 512, top: Math.floor(i / 3) * 512, width: 512, height: 512 })
    .webp({ quality: 89 })
    .toFile(`public/images/${name}.webp`);
console.log("Ten optimized image assets created.");
