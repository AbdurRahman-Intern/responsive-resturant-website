// Restaurant logo + name. Uses an image if restaurant.logoImage is set,
// otherwise a round badge with a letter. Used in the navbar and footer.
import { Link } from "react-router-dom";
import { restaurant } from "../../data/restaurant";
import { useLanguage } from "../../hooks/useLanguage";

export default function Logo({ light = false }) {
  const { pick } = useLanguage();
  return (
    <Link to="/" className="flex items-center gap-3" aria-label={pick(restaurant.name)}>
      {restaurant.logoImage ? (
        <img src={restaurant.logoImage} alt="" className="h-10 w-10 rounded-full object-cover" />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-display text-lg font-semibold text-white"
        >
          {restaurant.logoLetter}
        </span>
      )}
      <span className={`font-display text-xl font-semibold ${light ? "text-cream" : "text-charcoal"}`}>
        {pick(restaurant.name)}
      </span>
    </Link>
  );
}
