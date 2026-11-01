// =====================================================================
// SHARED BEHAVIOUR FOR POP-UP PANELS (mobile menu, cart drawer, lightbox)
// =====================================================================
// Keeps these three accessibility rules in ONE place instead of copying them:
//   1. Escape key closes the panel.
//   2. Tab / Shift+Tab stay inside the panel (focus trap), and the page
//      behind it cannot scroll.
//   3. When it closes, focus returns to the button that opened it.
//
// Usage inside a component:
//   const panelRef = useRef(null);
//   useModal(isOpen, onClose, panelRef);
//   <div ref={panelRef} role="dialog" aria-modal="true"> ... </div>
// Put data-autofocus on the element that should get focus first (optional).
import { useEffect, useRef } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useModal(isOpen, onClose, panelRef) {
  // Keep the latest onClose in a ref so the effect below does not restart
  // (and steal focus) every time the parent re-renders.
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!isOpen || !panelRef.current) return undefined;

    const panel = panelRef.current;
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the panel
    const first = panel.querySelector("[data-autofocus]") || panel.querySelector(FOCUSABLE);
    if (first) first.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const items = Array.from(panel.querySelectorAll(FOCUSABLE));
      if (items.length === 0) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
    };
  }, [isOpen, panelRef]);
}
