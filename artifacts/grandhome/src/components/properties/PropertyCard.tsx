import { useQueryClient } from "@tanstack/react-query";
import { useDeleteProperty, getGetFeaturedPropertiesQueryKey, getListPropertiesQueryKey } from "@workspace/api-client-react";

type Property = {
  id: number;
  name: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  mode: string;
  tag: string;
  photos: string[];
};

const TYPE_BG: Record<string, string> = {
  House: "#c9d4d0",
  Condo: "#c9cbd4",
  Townhouse: "#d4d0c9",
  Apartment: "#cdd4d9",
};

function tagLabel(tag: string) {
  if (tag === "Rent") return "For rent";
  if (tag === "New") return "New listing";
  return "For sale";
}

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property: p }: PropertyCardProps) {
  const queryClient = useQueryClient();
  const deleteProperty = useDeleteProperty({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetFeaturedPropertiesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getListPropertiesQueryKey() });
      },
    },
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(`Remove "${p.name}" from listings?`)) return;
    deleteProperty.mutate({ id: p.id });
  };

  return (
    <div className="relative overflow-hidden cursor-pointer group" style={{ aspectRatio: "4/3" }}>
      {p.photos && p.photos.length > 0 ? (
        <img
          src={p.photos[0]}
          alt={p.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
          style={{ background: TYPE_BG[p.type] ?? "#cdd4d9" }}
        />
      )}

      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top,rgba(0,0,0,.65) 0%,transparent 55%)" }}
      />

      <span className="absolute top-[14px] left-[14px] bg-black/55 text-white text-[9px] font-semibold tracking-[.14em] uppercase px-[10px] py-1">
        {tagLabel(p.tag)}
      </span>

      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 bg-red-700/85 text-white text-[10px] font-semibold tracking-[.08em] uppercase px-[10px] py-[5px] opacity-0 group-hover:opacity-100 transition-opacity"
        disabled={deleteProperty.isPending}
      >
        Remove
      </button>

      {p.photos && p.photos.length > 1 && (
        <span className="absolute bottom-[52px] right-3 bg-black/55 text-white text-[10px] font-semibold px-2 py-[3px] tracking-[.06em]">
          {p.photos.length} photos
        </span>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-[18px] text-white">
        <div className="font-serif text-[17px] font-medium mb-[2px]">{p.name}</div>
        <div className="text-[11px] font-medium tracking-[.1em] opacity-90">{p.price}</div>
        <div className="text-[10px] opacity-75 mt-[2px] tracking-[.04em]">
          {p.beds} bd &bull; {p.baths} ba &bull; {p.sqft.toLocaleString()} ft&sup2; &bull; {p.type}
        </div>
      </div>
    </div>
  );
}
