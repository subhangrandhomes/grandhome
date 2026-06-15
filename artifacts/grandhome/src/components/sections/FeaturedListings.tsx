import { useState } from "react";
import { useListProperties } from "@workspace/api-client-react";
import { PropertyCard, type PropertyType } from "@/components/properties/PropertyCard";
import { PropertyDetailModal } from "@/components/properties/PropertyDetailModal";

type StatusFilter = "ongoing" | "completed";

export function FeaturedListings() {
  const [status, setStatus] = useState<StatusFilter>("ongoing");
  const [selected, setSelected] = useState<PropertyType | null>(null);

  const { data: properties, isLoading } = useListProperties({ params: { status } } as never);

  const tabs: { key: StatusFilter; label: string }[] = [
    { key: "ongoing", label: "Ongoing Projects" },
    { key: "completed", label: "Completed Projects" },
  ];

  return (
    <section id="listings">
      <div className="text-center py-12 pb-6">
        <p className="text-[10px] font-sans font-semibold tracking-[.3em] uppercase text-[#3a7bd5] mb-2">
          Portfolio
        </p>
        <h2 className="font-serif text-[32px] font-semibold text-[#0f2d56]">
          Our Projects
        </h2>
        <div className="w-10 h-[2px] bg-[#3a7bd5] mx-auto mt-3 mb-7" />

        <div className="inline-flex border border-blue-200 overflow-hidden">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatus(tab.key)}
              className={`h-9 px-8 text-[10px] font-sans font-semibold tracking-[.14em] uppercase transition-colors border-r border-blue-200 last:border-r-0 ${
                status === tab.key
                  ? "bg-[#1a4a8a] text-white"
                  : "bg-white text-[#3a6199] hover:bg-blue-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
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
            <PropertyCard
              key={p.id}
              property={{ ...p, photos: p.photos as string[] }}
              onClick={setSelected}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-[13px] text-[#6b88aa] tracking-[.08em]">
          {status === "ongoing"
            ? "No ongoing projects yet."
            : "No completed projects yet."}
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

      <PropertyDetailModal property={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
