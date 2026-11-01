// Friendly message shown when a list is empty (no search results, empty cart).
// `icon` is a Lucide icon component, `action` is an optional button.
export default function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="flex flex-col items-center rounded-card border border-dashed border-charcoal/20 px-6 py-14 text-center">
      {Icon && <Icon className="mb-4 h-10 w-10 text-accent" aria-hidden="true" />}
      <h3 className="text-card-title">{title}</h3>
      {text && <p className="mt-2 max-w-sm text-sm text-muted">{text}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
