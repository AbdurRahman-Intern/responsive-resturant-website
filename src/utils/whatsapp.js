// =====================================================================
// WHATSAPP + MAP LINK HELPERS  (pure functions, no React)
// =====================================================================
// HOW THE ORDER FLOW WORKS
//   1. The customer fills the cart and the form (OrderInquiryForm.jsx).
//   2. validateInquiry() checks the fields.
//   3. buildOrderMessage() turns the cart into a readable text message.
//   4. buildWhatsAppLink() wraps it in https://wa.me/<number>?text=<message>
//   5. We open that link. WhatsApp opens with the message ready to send.
// Nothing is sent or stored by this website. The customer must press "send"
// in WhatsApp, and the restaurant confirms the order. That is why the UI
// says "inquiry" and never "order placed".
//
// TODO: When there is a Laravel backend, create the order there first and
// include the order number in the message.

// Keeps digits only: "+93 (70) 000-0000" -> "93700000000"
export function cleanPhoneNumber(value = "") {
  return String(value).replace(/\D/g, "");
}

// Builds a wa.me link. `message` is optional.
export function buildWhatsAppLink(number, message = "") {
  const digits = cleanPhoneNumber(number);
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

// A phone number is "valid enough" if it has 8-15 digits (international format limit)
export function isValidPhone(value) {
  const digits = cleanPhoneNumber(value);
  return digits.length >= 8 && digits.length <= 15;
}

// Returns an object of error KEYS (translated by the form), or {} if all is fine.
// Example result: { name: true, phone: true }
export function validateInquiry({ name, phone, hasItems }) {
  const errors = {};
  if (!name || name.trim().length < 2) errors.name = true;
  if (!isValidPhone(phone)) errors.phone = true;
  if (!hasItems) errors.empty = true;
  return errors;
}

// Builds the plain-text message.
// `lines` = [{ name, quantity, lineTotal }] (already translated + formatted by the caller)
export function buildOrderMessage({ greeting, lines, labels, name, phone, notes, totalText }) {
  const itemLines = lines.map((line) => `- ${line.quantity} x ${line.name} (${line.priceText})`);
  const parts = [
    greeting,
    "",
    ...itemLines,
    "",
    `${labels.total}: ${totalText}`,
    "",
    `${labels.name}: ${name.trim()}`,
    `${labels.phone}: ${phone.trim()}`,
  ];
  if (notes && notes.trim()) parts.push(`${labels.notes}: ${notes.trim()}`);
  parts.push("", labels.footer);
  return parts.join("\n");
}

// ---- Map links -------------------------------------------------------
// These use plain Google Maps URLs, so no API key is needed.
export function buildMapLink(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function buildDirectionsLink(query) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}
