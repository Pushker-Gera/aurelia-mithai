import { z } from "zod";
const cleanText = (min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min, `Please enter at least ${min} characters.`)
    .max(max, `Please use ${max} characters or fewer.`);
export const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  website: z.string().max(0).optional().default(""),
});
export const inquirySchema = z.object({
  name: cleanText(2, 100),
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  phone: z
    .string()
    .trim()
    .refine(
      (v) => !v || (/^[+0-9() .-]{7,25}$/.test(v) && v.replace(/\D/g, "").length >= 7),
      "Please enter a valid phone number.",
    )
    .optional()
    .default(""),
  occasion: cleanText(2, 120),
  quantity: z
    .union([z.literal(""), z.coerce.number().int().min(1).max(100000)])
    .optional()
    .default(""),
  message: cleanText(10, 2000),
  website: z.string().max(0).optional().default(""),
});
