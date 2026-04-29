import Hero from "@/components/sections/hero";
import AboutTeaser from "@/components/sections/about-teaser";
import Services from "@/components/sections/services";
import FeaturedWork from "@/components/sections/featured-work";
import CTA from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <Services />
      <FeaturedWork />
      <CTA />
    </>
  );
}
