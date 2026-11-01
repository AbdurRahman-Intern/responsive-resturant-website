// The "send order inquiry" form inside the cart.
//
// FLOW (state changes):
//   typing            -> name / phone / notes state updates (controlled inputs)
//   press the button  -> handleSubmit runs:
//        1. validateInquiry() checks name, phone and that the cart is not empty
//        2. if there are errors -> we store them in `errors` and show messages
//        3. if OK -> buildOrderMessage() + buildWhatsAppLink() -> open WhatsApp
//        4. we set `opened` = true to show a calm "WhatsApp should be open" note
//
// IMPORTANT (honesty): we only OPEN WhatsApp. We never say "order placed" or
// "paid". The disclaimer text explains the restaurant must confirm.
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { restaurant } from "../../data/restaurant";
import { useLanguage, translate } from "../../hooks/useLanguage";
import { buildOrderMessage, buildWhatsAppLink, validateInquiry } from "../../utils/whatsapp";
import Button from "../common/Button";

const fieldClass = "mt-1 w-full rounded-lg border border-charcoal/25 bg-white px-3 py-2.5 text-base";

export default function OrderInquiryForm({ lines, total }) {
  const { t, pick, price, language } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});
  const [opened, setOpened] = useState(false);

  function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page
    const foundErrors = validateInquiry({ name, phone, hasItems: lines.length > 0 });
    setErrors(foundErrors);
    setOpened(false);
    if (Object.keys(foundErrors).length > 0) return; // stop: show the errors

    // Build one text line per dish. The restaurant staff may not read Dari or
    // Pashto, so we add the English name too when the site is not in English.
    const messageLines = lines.map((line) => {
      const localName = pick(line.item.name);
      const englishName = line.item.name.en;
      return {
        name: language === "en" || localName === englishName ? localName : `${localName} / ${englishName}`,
        quantity: line.quantity,
        priceText: price(line.lineTotal),
      };
    });

    const message = buildOrderMessage({
      greeting: t("order.whatsappGreeting", { restaurant: pick(restaurant.name) }),
      lines: messageLines,
      labels: {
        total: t("order.msgTotal"),
        name: t("order.msgName"),
        phone: t("order.msgPhone"),
        notes: t("order.msgNotes"),
        // The footer is always sent in English too, as a safety net for the staff
        footer: `${t("order.msgFooter")}${language === "en" ? "" : `\n${translate("en", "order.msgFooter")}`}`,
      },
      name,
      phone,
      notes,
      totalText: price(total),
    });

    const link = buildWhatsAppLink(restaurant.whatsappNumber, message);
    window.open(link, "_blank", "noopener,noreferrer");
    setOpened(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <h3 className="text-card-title">{t("order.formTitle")}</h3>

      <div>
        <label htmlFor="order-name" className="text-sm font-medium">
          {t("order.name")}
        </label>
        <input
          id="order-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "order-name-error" : undefined}
          className={fieldClass}
        />
        {errors.name && (
          <p id="order-name-error" role="alert" className="mt-1 text-sm text-red-700">
            {t("order.errors.name")}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="order-phone" className="text-sm font-medium">
          {t("order.phone")}
        </label>
        {/* dir="ltr": phone numbers always read left-to-right, even in RTL pages */}
        <input
          id="order-phone"
          type="tel"
          dir="ltr"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+93 70 000 0000"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "order-phone-error" : "order-phone-hint"}
          className={`${fieldClass} text-start`}
        />
        <p id="order-phone-hint" className="mt-1 text-xs text-muted">
          {t("order.phoneHint")}
        </p>
        {errors.phone && (
          <p id="order-phone-error" role="alert" className="mt-1 text-sm text-red-700">
            {t("order.errors.phone")}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="order-notes" className="text-sm font-medium">
          {t("order.notes")}
        </label>
        <textarea
          id="order-notes"
          rows={3}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder={t("order.notesPlaceholder")}
          className={fieldClass}
        />
      </div>

      {errors.empty && (
        <p role="alert" className="text-sm text-red-700">
          {t("order.errors.empty")}
        </p>
      )}

      <Button type="submit" className="w-full">
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        {t("order.submit")}
      </Button>

      <p className="text-xs leading-relaxed text-muted">{t("order.disclaimer")}</p>

      {opened && (
        <div role="status" className="rounded-lg bg-olive/10 p-3 text-sm">
          <p className="font-semibold">{t("order.sentTitle")}</p>
          <p className="mt-1 text-muted">{t("order.sentText")}</p>
        </div>
      )}
    </form>
  );
}
