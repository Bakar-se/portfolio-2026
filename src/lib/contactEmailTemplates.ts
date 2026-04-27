export function buildAdminNotificationHtml(payload: {
  name: string;
  email: string;
  message: string;
}): string {
  const { name, email, message } = payload;
  return `
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Message:</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(message)}</pre>
  `;
}

export function buildAdminNotificationText(payload: {
  name: string;
  email: string;
  message: string;
}): string {
  const { name, email, message } = payload;
  return `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
}

export function buildSubmitterConfirmationHtml(payload: { name: string }): string {
  return `<p>Hi ${escapeHtml(payload.name)},</p><p>Thanks for reaching out. We received your message and will get back to you when we can.</p>`;
}

export function buildSubmitterConfirmationText(payload: { name: string }): string {
  return `Hi ${payload.name},\n\nThanks for reaching out. We received your message and will get back to you when we can.`;
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
