import { useGetFeaturedProperties } from "@workspace/api-client-react";
import { PropertyCard } from "@/components/properties/PropertyCard";

export function FeaturedListings() {
  const { data: properties, isLoading } = useGetFeaturedProperties();

  return (
    <section id="listings">
      <div className="text-center py-12 pb-8">
        <h2 className="font-serif text-[13px] font-semibold tracking-[.28em] uppercase text-[#111]">
          Featured Listings
        </h2>
        <div className="w-10 h-px bg-[#111] mx-auto mt-[10px]" />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-3 gap-[3px] pb-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : properties && properties.length > 0 ? (
        <div className="grid grid-cols-3 gap-[3px] pb-3">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={{ ...p, photos: p.photos as string[] }} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-[13px] text-[#999] tracking-[.08em]">
          No listings yet. Add the first one!
        </div>
      )}

      <div className="text-center py-4 pb-10">
        <a
          href="#contact"
          className="inline-block h-[38px] px-9 border border-[#111] bg-transparent text-[#111] text-[10px] font-semibold tracking-[.2em] uppercase hover:bg-[#111] hover:text-white transition-colors leading-[38px]"
        >
          View all
        </a>
      </div>
    </section>
  );
}
