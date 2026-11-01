// Centers page content and keeps consistent side padding on every screen size.
export default function Container({ children, className = "" }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}
