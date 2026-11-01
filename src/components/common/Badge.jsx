// Small label used for "Bestseller", dietary tags (Vegan, Halal...) etc.
// tone: "accent" (strong) | "neutral" (soft) | "green" (dietary)
const tones = {
  accent: "bg-accent text-white",
  neutral: "bg-sand text-charcoal",
  green: "bg-olive/15 text-olive",
};

export default function Badge({ children, tone = "neutral", className = "" }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}
