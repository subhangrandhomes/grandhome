import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FeaturedListings } from "@/components/sections/FeaturedListings";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { PropertySearch } from "@/components/sections/PropertySearch";
import { CTAStrip } from "@/components/sections/CTAStrip";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <FeaturedListings />
        <WhoWeAre />
        <PropertySearch />
        <CTAStrip />
      </main>
      <Footer />
    </div>
  );
}
