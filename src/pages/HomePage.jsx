// Home page = a stack of sections. Each section is its own component in
// src/components/home/, so this file only decides the ORDER.
// To reorder or remove a section, just move or delete a line below.
import Hero from "../components/home/Hero";
import FeaturedDishes from "../components/home/FeaturedDishes";
import StorySection from "../components/home/StorySection";
import GallerySection from "../components/home/GallerySection";
import OffersSection from "../components/home/OffersSection";
import ContactSection from "../components/home/ContactSection";
import LocationSection from "../components/home/LocationSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedDishes />
      <StorySection />
      <GallerySection />
      <OffersSection />
      <LocationSection />
      <ContactSection />
    </>
  );
}
