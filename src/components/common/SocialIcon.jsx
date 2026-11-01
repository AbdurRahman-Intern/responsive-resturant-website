// Tiny inline SVG icons for social networks.
// (Lucide removed brand logos in recent versions, so we draw them ourselves.)
// To add a network: add an entry below and a link in restaurant.js -> social.
const icons = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </>
  ),
  facebook: (
    <path
      d="M14 8.5V7c0-.8.5-1 1-1h2V3h-3c-3 0-4 2-4 4v1.5H7V12h3v9h4v-9h2.7l.5-3.5H14z"
      fill="currentColor"
    />
  ),
};

export default function SocialIcon({ name, className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {icons[name]}
    </svg>
  );
}
