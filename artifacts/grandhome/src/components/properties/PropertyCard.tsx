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
  House: "#c2d4e8",
  Condo: "#b8c8e0",
  Townhouse: "#c8d8ec",
  Apartment: "#bdd0e8",
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
          className="w-full h-full flex items-end transition-transform duration-500 group-hover:scale-105"
          style={{ background: `linear-gradient(135deg, ${TYPE_BG[p.type] ?? "#c2d4e8"} 0%, #8faac8 100%)` }}
        />
      )}

      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(10,28,60,.72) 0%, transparent 55%)" }}
      />

      <span className="absolute top-[14px] left-[14px] bg-[#1a4a8a]/90 text-white text-[9px] font-sans font-semibold tracking-[.14em] uppercase px-[10px] py-1">
        {tagLabel(p.tag)}
      </span>

      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 bg-red-600/85 text-white text-[9px] font-sans font-semibold tracking-[.08em] uppercase px-[10px] py-[5px] opacity-0 group-hover:opacity-100 transition-opacity"
        disabled={deleteProperty.isPending}
      >
        Remove
      </button>

      {p.photos && p.photos.length > 1 && (
        <span className="absolute bottom-[52px] right-3 bg-[#1a4a8a]/80 text-white text-[9px] font-sans font-semibold px-2 py-[3px] tracking-[.06em]">
          {p.photos.length} photos
        </span>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-[18px] text-white">
        <div className="font-serif text-[18px] font-semibold mb-[2px] leading-tight">{p.name}</div>
        <div className="text-[11px] font-sans font-medium tracking-[.1em] opacity-90 text-blue-200">{p.price}</div>
        <div className="text-[10px] font-sans opacity-70 mt-[3px] tracking-[.04em]">
          {p.beds} bd &bull; {p.baths} ba &bull; {p.sqft.toLocaleString()} ft&sup2; &bull; {p.type}
        </div>
      </div>
    </div>
  );
}
