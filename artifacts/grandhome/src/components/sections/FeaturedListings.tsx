import { useGetFeaturedProperties } from "@workspace/api-client-react";
import { PropertyCard } from "@/components/properties/PropertyCard";

export function FeaturedListings() {
  const { data: properties, isLoading } = useGetFeaturedProperties();

  return (
    <section id="listings">
      <div className="text-center py-12 pb-8">
        <p className="text-[10px] font-sans font-semibold tracking-[.3em] uppercase text-[#3a7bd5] mb-2">
          Portfolio
        </p>
        <h2 className="font-serif text-[32px] font-semibold text-[#0f2d56]">
          Featured Listings
        </h2>
        <div className="w-10 h-[2px] bg-[#3a7bd5] mx-auto mt-3" />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-3 gap-[3px] pb-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] bg-blue-50 animate-pulse" />
          ))}
        </div>
      ) : properties && properties.length > 0 ? (
        <div className="grid grid-cols-3 gap-[3px] pb-3">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={{ ...p, photos: p.photos as string[] }} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-[13px] text-[#6b88aa] tracking-[.08em]">
          No listings yet. Add the first one!
        </div>
      )}

      <div className="text-center py-4 pb-10">
        <a
          href="#contact"
          className="inline-block h-[38px] px-9 border border-[#1a4a8a] bg-transparent text-[#1a4a8a] text-[10px] font-sans font-semibold tracking-[.2em] uppercase hover:bg-[#1a4a8a] hover:text-white transition-colors leading-[38px]"
        >
          View all
        </a>
      </div>
    </section>
  );
}
