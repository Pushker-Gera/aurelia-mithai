import { NextRequest } from "next/server";
import { handleForm } from "@/lib/form-handler";
import { inquirySchema } from "@/lib/validation";
export async function POST(request: NextRequest) {
  return handleForm(request, inquirySchema, "inquiry");
}
