import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { getSiteData } from "@/lib/get-site-data";

const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  businessName: z.string().trim().min(2),
  service: z.string().min(1),
  budget: z.string().min(1),
  message: z.string().trim().min(10),
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Sends the contact form submission via Resend. Validates the payload
// server-side, then emails the studio inbox (RESEND_TO_EMAIL, falling back
// to the address in mock.json) with the submitted details.
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Validation failed.", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { name, email, businessName, service, budget, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set. Add it to your environment to enable email delivery."
    );
    return NextResponse.json(
      { success: false, error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const contact = getSiteData().contact;
  const toEmail = process.env.RESEND_TO_EMAIL || contact.email;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: `Soni Web Solutions <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `New project inquiry from ${name} (${businessName})`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Business:</strong> ${escapeHtml(businessName)}</p>
        <p><strong>Service:</strong> ${escapeHtml(service)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(budget)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send email." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Resend request failed:", err);
    return NextResponse.json(
      { success: false, error: "Failed to send email." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}

