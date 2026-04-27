import { NextResponse } from "next/server";
import {
  buildAdminNotificationHtml,
  buildAdminNotificationText,
  buildSubmitterConfirmationHtml,
  buildSubmitterConfirmationText,
} from "@/lib/contactEmailTemplates";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/** Must use an address on a domain verified in Resend (e.g. abubakar.com). https://resend.com/domains */
const resendFrom =
  process.env.RESEND_FROM ?? "Portfolio Contact <contact@bakar.info>";

/** Inbox that receives contact form notifications (any valid email). */
const contactInbox =
  process.env.CONTACT_EMAIL ?? "contact@bakar.info";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, message, description } = body;
    const bodyTextRaw =
      typeof message === "string" && message.trim() !== ""
        ? message
        : typeof description === "string"
          ? description
          : "";
    const bodyText = bodyTextRaw.trim();

    // Input validation (accept `description` or legacy `message` from clients)
    if (!email || !bodyText || !String(name).trim()) {
      console.error("❌ Missing required fields:", { email, name, description, message });
      return NextResponse.json(
        { error: "All fields (name, email, description) are required" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("❌ Invalid email format:", email);
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 },
      );
    }

    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim();

    console.log("📧 Sending contact form submission:", { name: trimmedName, email: trimmedEmail });

    const adminHtml = buildAdminNotificationHtml({
      name: trimmedName,
      email: trimmedEmail,
      message: bodyText,
    });
    const adminText = buildAdminNotificationText({
      name: trimmedName,
      email: trimmedEmail,
      message: bodyText,
    });

    const { data: adminData, error: adminError } = await resend.emails.send({
      from: resendFrom,
      to: contactInbox,
      replyTo: trimmedEmail,
      subject: `New message from ${trimmedName}`,
      html: adminHtml,
      text: adminText,
    });

    if (adminError) {
      console.error("❌ Resend API error (inbox):", adminError);
      return NextResponse.json(
        {
          error: "Failed to send email. Please try again later.",
          details: adminError.message,
        },
        { status: 500 },
      );
    }

    const confirmHtml = buildSubmitterConfirmationHtml({ name: trimmedName });
    const confirmText = buildSubmitterConfirmationText({ name: trimmedName });

    const { error: confirmError } = await resend.emails.send({
      from: resendFrom,
      to: trimmedEmail,
      subject: "We received your message — thank you",
      html: confirmHtml,
      text: confirmText,
    });

    if (confirmError) {
      console.error("❌ Resend API error (auto-reply):", confirmError);
    }

    const data = { inbox: adminData, autoReplyOk: !confirmError };
    console.log("✅ Contact flow complete:", data);
    return NextResponse.json({
      success: true,
      message: confirmError
        ? "Your message was delivered; confirmation email could not be sent."
        : "Your message was sent. Check your inbox for a confirmation.",
      data,
    });
  } catch (error) {
    console.error("❌ Unexpected error in contact form:", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again later.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
