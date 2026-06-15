import { useState, useEffect } from "react";
import { useListProperties, getListPropertiesQueryKey } from "@workspace/api-client-react";
import { PropertyCard } from "@/components/properties/PropertyCard";

export function PropertySearch() {
  const [beds, setBeds] = useState("");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [activeParams, setActiveParams] = useState<{
    beds?: number;
    search?: string;
    type?: string;
    maxPrice?: number;
  }>({});

  const params = {
    ...(activeParams.beds ? { beds: activeParams.beds } : {}),
    ...(activeParams.search ? { search: activeParams.search } : {}),
    ...(activeParams.type ? { type: activeParams.type } : {}),
    ...(activeParams.maxPrice ? { maxPrice: activeParams.maxPrice } : {}),
  };

  const { data: properties, isLoading } = useListProperties(params, {
    query: { queryKey: getListPropertiesQueryKey(params) },
  });

  const handleSearch = () => {
    setActiveParams({
      ...(beds ? { beds: parseInt(beds) } : {}),
      ...(search ? { search } : {}),
      ...(type ? { type } : {}),
      ...(maxPrice ? { maxPrice: parseInt(maxPrice) } : {}),
    });
  };

  useEffect(() => {
    if (!type && !maxPrice) return;
    handleSearch();
  }, [type, maxPrice]);

  return (
    <section className="bg-[#f9f9f9] px-20 py-12" id="contact">
      <h3 className="font-serif text-[22px] font-medium tracking-[.06em] text-center mb-7">
        Find Your Property
      </h3>
      <div className="grid gap-[10px] items-end" style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr auto" }}>
        <div className="flex flex-col gap-[5px]">
          <label className="text-[10px] font-semibold tracking-[.14em] uppercase text-[#888]">
            Bedrooms
          </label>
          <select
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            className="h-[38px] border border-[#ddd] px-3 text-[13px] text-[#111] bg-white outline-none focus:border-[#111] transition-colors"
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>
        <div className="flex flex-col gap-[5px]">
          <label className="text-[10px] font-semibold tracking-[.14em] uppercase text-[#888]">
            Location
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="City or ZIP"
            className="h-[38px] border border-[#ddd] px-3 text-[13px] text-[#111] bg-white outline-none focus:border-[#111] transition-colors"
          />
        </div>
        <div className="flex flex-col gap-[5px]">
          <label className="text-[10px] font-semibold tracking-[.14em] uppercase text-[#888]">
            Property type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="h-[38px] border border-[#ddd] px-3 text-[13px] text-[#111] bg-white outline-none focus:border-[#111] transition-colors"
          >
            <option value="">Any</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Apartment">Apartment</option>
          </select>
        </div>
        <div className="flex flex-col gap-[5px]">
          <label className="text-[10px] font-semibold tracking-[.14em] uppercase text-[#888]">
            Max price
          </label>
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="h-[38px] border border-[#ddd] px-3 text-[13px] text-[#111] bg-white outline-none focus:border-[#111] transition-colors"
          >
            <option value="">Any</option>
            <option value="300">$300K</option>
            <option value="500">$500K</option>
            <option value="800">$800K</option>
            <option value="1200">$1.2M</option>
          </select>
        </div>
        <button
          onClick={handleSearch}
          className="h-[38px] px-7 bg-[#111] text-white text-[10px] font-semibold tracking-[.16em] uppercase whitespace-nowrap hover:bg-[#333] transition-colors"
        >
          Search
        </button>
      </div>

      <div className="mt-8">
        {isLoading ? (
          <div className="grid grid-cols-3 gap-[3px]">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : properties && properties.length > 0 ? (
          <div className="grid grid-cols-3 gap-[3px]">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={{ ...p, photos: p.photos as string[] }} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-[13px] text-[#999] tracking-[.08em]">
            No properties match your search.
          </div>
        )}
      </div>
    </section>
  );
}
