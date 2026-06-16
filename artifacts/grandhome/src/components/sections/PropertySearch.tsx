import { useState } from "react";
import { useListProperties, getListPropertiesQueryKey } from "@workspace/api-client-react";
import { PropertyCard, type PropertyType } from "@/components/properties/PropertyCard";
import { PropertyDetailModal } from "@/components/properties/PropertyDetailModal";

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
  const [selected, setSelected] = useState<PropertyType | null>(null);

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

  const inputClass =
    "h-11 border border-slate-200 px-4 text-[13px] font-sans text-[#0f2d56] bg-white outline-none focus:border-[#1a4a8a] focus:ring-1 focus:ring-[#1a4a8a]/20 transition-all rounded placeholder:text-slate-300 w-full";

  return (
    <section className="bg-[#f8faff] px-8 md:px-20 py-16" id="contact">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-[10px] font-sans font-semibold tracking-[.3em] uppercase text-[#3a7bd5] mb-2">
          Search
        </p>
        <h3 className="font-serif text-[32px] font-semibold text-[#0f2d56]">
          Find Your Property
        </h3>
        <div className="w-10 h-[2px] bg-[#3a7bd5] mx-auto mt-4" />
      </div>

      {/* Search bar card */}
      <div className="bg-white border border-slate-200 shadow-sm rounded p-6 mb-8">
        <div className="grid gap-4 items-end" style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr auto" }}>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[10px] font-sans font-semibold tracking-[.14em] uppercase text-[#4a6080]">
              Bedrooms
            </label>
            <select value={beds} onChange={(e) => setBeds(e.target.value)} className={inputClass}>
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[10px] font-sans font-semibold tracking-[.14em] uppercase text-[#4a6080]">
              Location
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="City or ZIP"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[10px] font-sans font-semibold tracking-[.14em] uppercase text-[#4a6080]">
              Property type
            </label>
            <select value={type} onChange={(e) => setType(e.target.value)} className={inputClass}>
              <option value="">Any</option>
              <option value="House">House</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Apartment">Apartment</option>
            </select>
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[10px] font-sans font-semibold tracking-[.14em] uppercase text-[#4a6080]">
              Max price
            </label>
            <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className={inputClass}>
              <option value="">Any</option>
              <option value="300">$300K</option>
              <option value="500">$500K</option>
              <option value="800">$800K</option>
              <option value="1200">$1.2M</option>
            </select>
          </div>
          <button
            onClick={handleSearch}
            className="h-11 px-8 bg-[#0f2d56] text-white text-[10px] font-sans font-semibold tracking-[.16em] uppercase whitespace-nowrap hover:bg-[#1a4a8a] transition-colors rounded"
          >
            Search
          </button>
        </div>
      </div>

      {/* Results */}
      <div>
        {isLoading ? (
          <div className="grid grid-cols-3 gap-[2px]">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : properties && properties.length > 0 ? (
          <div className="grid grid-cols-3 gap-[2px]">
            {properties.map((p) => (
              <PropertyCard
                key={p.id}
                property={{ ...p, photos: p.photos as string[] }}
                onClick={setSelected}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-[14px] font-sans text-[#6b88aa]">
            No properties match your search.
          </div>
        )}
      </div>

      <PropertyDetailModal property={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
