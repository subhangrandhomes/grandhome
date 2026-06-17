import { useState } from "react";
import { useListProperties } from "@workspace/api-client-react";
import { PropertyCard, type PropertyType } from "@/components/properties/PropertyCard";
import { PropertyDetailModal } from "@/components/properties/PropertyDetailModal";

type StatusFilter = "ongoing" | "completed";

export function FeaturedListings() {
  const [status, setStatus] = useState<StatusFilter>("ongoing");
  const [selected, setSelected] = useState<PropertyType | null>(null);

  const { data: properties, isLoading } = useListProperties({ status });

  const tabs: { key: StatusFilter; label: string }[] = [
    { key: "ongoing", label: "Ongoing Projects" },
    { key: "completed", label: "Completed Projects" },
  ];

  return (
    <section id="listings" className="py-4 bg-white">
      {/* Section header */}
      <div className="text-center pt-14 pb-8 px-8">
        <p className="text-[10px] font-sans font-semibold tracking-[.3em] uppercase text-[#3a7bd5] mb-2">
          Portfolio
        </p>
        <h2 className="font-serif text-[34px] font-semibold text-[#0f2d56]">
          Our Projects
        </h2>
        <div className="w-10 h-[2px] bg-[#3a7bd5] mx-auto mt-4 mb-8" />

        {/* Pill tabs */}
        <div className="inline-flex bg-[#f0f5ff] p-1 gap-1 rounded">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatus(tab.key)}
              className={`h-9 px-7 rounded text-[10px] font-sans font-semibold tracking-[.12em] uppercase transition-all ${
                status === tab.key
                  ? "bg-[#0f2d56] text-white shadow-sm"
                  : "text-[#4a6080] hover:text-[#0f2d56]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-3 gap-[2px]">
          {Array.from({ length: 6 }).map((_, i) => (
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
        <div className="text-center py-20 text-[14px] text-[#6b88aa] font-sans">
          {status === "ongoing"
            ? "No ongoing projects yet."
            : "No completed projects yet."}
        </div>
      )}

      {/* Footer link */}
      <div className="text-center py-10">
        <a
          href="#contact"
          className="inline-block h-10 px-9 border border-[#0f2d56] text-[#0f2d56] text-[10px] font-sans font-semibold tracking-[.18em] uppercase hover:bg-[#0f2d56] hover:text-white transition-colors leading-[40px]"
        >
          View all projects
        </a>
      </div>

      <PropertyDetailModal property={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
