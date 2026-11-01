// "Our Story" section (id="story" so the nav link can scroll to it).
// Layout: two overlapping photos on one side, text and three values on the other.
// To change the copy, edit `story.*` in translations.js. Images: restaurant.js.
import { Leaf, Flame, Heart } from "lucide-react";
import { restaurant } from "../../data/restaurant";
import { useLanguage } from "../../hooks/useLanguage";
import Container from "../common/Container";
import SmartImage from "../common/SmartImage";

// Each value links an icon to a translation key group (story.values.<key>)
const values = [
  { key: "fresh", icon: Leaf },
  { key: "spice", icon: Flame },
  { key: "family", icon: Heart },
];

export default function StorySection() {
  const { t } = useLanguage();

  return (
    <section id="story" aria-labelledby="story-title" className="py-16 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Photo composition */}
        <div className="relative pb-16 pe-10 sm:pe-16">
          <div className="aspect-[4/5] overflow-hidden rounded-card bg-sand shadow-soft">
            <SmartImage
              src={restaurant.images.story}
              alt={t("gallery.groups.preparation")}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 end-0 aspect-square w-1/2 overflow-hidden rounded-card border-4 border-cream bg-sand shadow-soft">
            <SmartImage
              src={restaurant.images.storySecondary}
              alt={t("gallery.groups.interior")}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="text-eyebrow mb-3">{t("story.eyebrow")}</p>
          <h2 id="story-title" className="text-section">
            {t("story.title")}
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            <p>{t("story.p1")}</p>
            <p>{t("story.p2")}</p>
            <p>{t("story.p3")}</p>
          </div>

          <ul className="mt-8 grid gap-5 sm:grid-cols-3">
            {values.map(({ key, icon: Icon }) => (
              <li key={key}>
                <Icon className="mb-2 h-6 w-6 text-accent" aria-hidden="true" />
                <h3 className="font-semibold">{t(`story.values.${key}.title`)}</h3>
                <p className="mt-1 text-sm text-muted">{t(`story.values.${key}.text`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
