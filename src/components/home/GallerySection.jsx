// Gallery section wrapper (id="gallery"): heading + the GalleryGrid component.
import { useLanguage } from "../../hooks/useLanguage";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import GalleryGrid from "../gallery/GalleryGrid";

export default function GallerySection() {
  const { t } = useLanguage();
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-sand/50 py-16 sm:py-24">
      <Container>
        <SectionHeading
          id="gallery-title"
          eyebrow={t("gallery.eyebrow")}
          title={t("gallery.title")}
          subtitle={t("gallery.subtitle")}
        />
        <GalleryGrid />
      </Container>
    </section>
  );
}
