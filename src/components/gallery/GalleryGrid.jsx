// Editorial photo grid + lightbox.
// State: `activeIndex` is null (closed) or the number of the open photo.
// Each tile is a <button>, so it works with keyboard (Tab + Enter/Space).
// Tile sizes come from `span` in gallery.js: "tall" = 2 rows, "wide" = 2 columns.
import { useState } from "react";
import { galleryItems } from "../../data/gallery";
import { useLanguage } from "../../hooks/useLanguage";
import SmartImage from "../common/SmartImage";
import Lightbox from "./Lightbox";

const spanClasses = {
  tall: "row-span-2",
  wide: "col-span-2",
  normal: "",
};

export default function GalleryGrid() {
  const { t, pick } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <>
      {/* grid-flow-dense fills gaps so tall/wide tiles pack neatly */}
      <ul className="grid auto-rows-[150px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[190px] md:grid-cols-4">
        {galleryItems.map((item, index) => {
          const alt = pick(item.alt);
          return (
            <li key={item.id} className={spanClasses[item.span] || ""}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={t("gallery.open", { alt })}
                className="group relative block h-full w-full overflow-hidden rounded-card bg-sand"
              >
                <SmartImage
                  src={item.image}
                  alt={alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/70 to-transparent px-3 pb-2 pt-8 text-start text-xs font-medium text-white">
                  {t(`gallery.groups.${item.group}`)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <Lightbox items={galleryItems} index={activeIndex} onClose={() => setActiveIndex(null)} onChange={setActiveIndex} />
    </>
  );
}
