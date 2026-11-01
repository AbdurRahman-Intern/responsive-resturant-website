// React Router does not scroll automatically when the page changes.
// This tiny component does it:
//   - URL has a hash (/#story)  -> scroll smoothly to the element with id="story"
//   - no hash (new page)        -> scroll to the top
// It renders nothing; it only runs an effect when the location changes.
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // Wait one frame so the new page has rendered before looking for the element
      const frame = requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (target) target.scrollIntoView();
      });
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);

  return null;
}
