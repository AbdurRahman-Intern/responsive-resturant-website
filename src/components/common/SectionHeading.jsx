// Standard heading block for every section: small label + big title + optional text.
// `align="center"` centers it (used on short sections).
export default function SectionHeading({ eyebrow, title, subtitle, align = "start", id }) {
  const alignment = align === "center" ? "mx-auto text-center" : "";
  return (
    <div className={`mb-10 max-w-2xl ${alignment}`}>
      {eyebrow && <p className="text-eyebrow mb-3">{eyebrow}</p>}
      <h2 id={id} className="text-section">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-muted">{subtitle}</p>}
    </div>
  );
}
