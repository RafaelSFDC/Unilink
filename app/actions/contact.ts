"use server";

import { validateRequired } from "@/lib/form-utils";

const RESEND_API_URL = "https://api.resend.com/emails";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildMailtoUrl(data: ContactFormData, supportEmail: string) {
  const body = [
    `Nome: ${data.name}`,
    `Email: ${data.email}`,
    "",
    data.message,
  ].join("\n");

  return `mailto:${encodeURIComponent(supportEmail)}?subject=${encodeURIComponent(
    data.subject,
  )}&body=${encodeURIComponent(body)}`;
}

export async function submitContactForm(data: ContactFormData) {
  const payload = {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    subject: data.subject.trim(),
    message: data.message.trim(),
  };

  const nameError = validateRequired(payload.name, "Nome é obrigatório");
  if (nameError) {
    return { success: false, error: nameError };
  }

  const emailError = validateRequired(payload.email, "Email é obrigatório");
  if (emailError) {
    return { success: false, error: emailError };
  }

  if (!isValidEmail(payload.email)) {
    return { success: false, error: "Email inválido" };
  }

  const subjectError = validateRequired(payload.subject, "Assunto é obrigatório");
  if (subjectError) {
    return { success: false, error: subjectError };
  }

  const messageError = validateRequired(payload.message, "Mensagem é obrigatória");
  if (messageError) {
    return { success: false, error: messageError };
  }

  const supportEmail =
    process.env.SUPPORT_EMAIL ||
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL ||
    "contato@unilink.io";

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !fromEmail) {
    return {
      success: true,
      delivery: "mailto" as const,
      mailtoUrl: buildMailtoUrl(payload, supportEmail),
    };
  }

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [supportEmail],
        reply_to: payload.email,
        subject: `[Contato Unilink] ${payload.subject}`,
        text: [
          `Nome: ${payload.name}`,
          `Email: ${payload.email}`,
          "",
          payload.message,
        ].join("\n"),
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("contact_delivery_failed");
    }

    return { success: true, delivery: "email" as const };
  } catch (error) {
    console.error("[CONTACT_FORM_ERROR]", error);
    return {
      success: true,
      delivery: "mailto" as const,
      mailtoUrl: buildMailtoUrl(payload, supportEmail),
    };
  }
}
