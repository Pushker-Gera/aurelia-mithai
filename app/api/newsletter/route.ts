import { NextRequest } from "next/server";
import { handleForm } from "@/lib/form-handler";
import { newsletterSchema } from "@/lib/validation";
export async function POST(request: NextRequest) {
  return handleForm(request, newsletterSchema, "newsletter");
}
