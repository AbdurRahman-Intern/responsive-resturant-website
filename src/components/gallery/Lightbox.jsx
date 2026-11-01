// Full-screen photo viewer.
// Keyboard: Escape closes (via useModal), Left/Right arrows change photo.
// In RTL languages the arrows are swapped so "next" is on the left, which
// feels natural for right-to-left readers.
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { useModal } from "../../hooks/useModal";
import SmartImage from "../common/SmartImage";

export default function Lightbox({ items, index, onClose, onChange }) {
  const { t, pick, isRtl } = useLanguage();
  const panelRef = useRef(null);
  const isOpen = index !== null;
  useModal(isOpen, onClose, panelRef);

  const total = items.length;
  const goNext = () => onChange((index + 1) % total); // wraps from last to first
  const goPrevious = () => onChange((index - 1 + total) % total);

  // Left/Right arrow keys
  useEffect(() => {
    if (!isOpen) return undefined;
    function handleKey(event) {
      const nextKey = isRtl ? "ArrowLeft" : "ArrowRight";
      const previousKey = isRtl ? "ArrowRight" : "ArrowLeft";
      if (event.key === nextKey) onChange((index + 1) % total);
      if (event.key === previousKey) onChange((index - 1 + total) % total);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, isRtl, index, total, onChange]);

  if (!isOpen) return null;

  const item = items[index];
  const alt = pick(item.alt);
  // Chevron icons: "previous" points toward the start side of the screen
  const PreviousIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;
  const navButton =
    "absolute top-1/2 -translate-y-1/2 rounded-full bg-cream/90 p-3 text-charcoal shadow-soft hover:bg-white";

  return (
    <div ref={panelRef} role="dialog" aria-modal="true" aria-label={t("gallery.dialog")} className="fixed inset-0 z-50 bg-charcoal/95">
      {/* Clicking the dark area closes the viewer */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <figure className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-12">
        <SmartImage
          src={item.image}
          alt={alt}
          priority
          className="pointer-events-auto max-h-[75vh] max-w-full rounded-lg object-contain"
        />
        <figcaption className="mt-4 max-w-xl text-center text-sm text-cream">
          <span className="font-semibold">{t(`gallery.groups.${item.group}`)}</span>
          <span className="block text-cream/80">{alt}</span>
          <span className="mt-1 block text-xs text-cream/60">
            {index + 1} / {total}
          </span>
        </figcaption>
      </figure>

      <button type="button" data-autofocus onClick={onClose} aria-label={t("gallery.close")} className="absolute end-4 top-4 rounded-full bg-cream/90 p-3 text-charcoal hover:bg-white">
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
      <button type="button" onClick={goPrevious} aria-label={t("gallery.previous")} className={`${navButton} start-3`}>
        <PreviousIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button type="button" onClick={goNext} aria-label={t("gallery.next")} className={`${navButton} end-3`}>
        <NextIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
