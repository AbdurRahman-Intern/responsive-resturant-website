// One button component used everywhere, so all buttons look and behave the same.
//
// Props:
//   variant: "primary" (filled) | "secondary" (outlined) | "ghost" (text only)
//   href:    if given, renders a link (<a>) that looks like a button
//   to:      if given, renders a React Router link (page navigation, no reload)
//   external: opens href in a new tab (use for WhatsApp / maps)
//
// Examples:
//   <Button onClick={save}>Save</Button>
//   <Button href="tel:+93700000000" variant="secondary">Call</Button>
//   <Button to="/menu">View menu</Button>
import { Link } from "react-router-dom";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold " +
  "transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary: "bg-accent text-white hover:bg-accent-dark",
  secondary: "border border-charcoal/25 bg-transparent text-charcoal hover:border-charcoal hover:bg-charcoal/5",
  ghost: "text-accent-dark hover:bg-accent/10",
  light: "bg-cream text-charcoal hover:bg-white",
};

export default function Button({
  children,
  variant = "primary",
  href,
  to,
  external = false,
  className = "",
  ...rest
}) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    // rel="noopener noreferrer" is a security best practice for new tabs
    const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <a href={href} className={classes} {...externalProps} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
