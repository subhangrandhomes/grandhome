import { useState } from "react";
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
  status?: string;
  basement?: string | null;
  livableArea?: number | null;
  projectCost?: number | null;
  projectStartDate?: string | null;
  projectCompletionDate?: string | null;
  soldPrice?: number | null;
  createdAt?: string;
};

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
}

const TYPE_BG: Record<string, string> = {
  House: "linear-gradient(135deg, #c2d4e8 0%, #8faac8 100%)",
  Condo: "linear-gradient(135deg, #b8c8e0 0%, #7a9abf 100%)",
  Townhouse: "linear-gradient(135deg, #c8d8ec 0%, #90aacf 100%)",
  Apartment: "linear-gradient(135deg, #bdd0e8 0%, #85a5c5 100%)",
};

function fmt(n: number) {
  return n.toLocaleString("en-US");
}
function fmtDollars(n: number) {
  return "$" + n.toLocaleString("en-US");
}
function fmtDate(d: string) {
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
function computeROI(cost: number, sold: number) {
  if (cost === 0) return null;
  return (((sold - cost) / cost) * 100).toFixed(1);
}

export function PropertyDetailModal({ property: p, onClose }: PropertyDetailModalProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const queryClient = useQueryClient();

  const deleteProperty = useDeleteProperty({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetFeaturedPropertiesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getListPropertiesQueryKey() });
        onClose();
      },
    },
  });

  if (!p) return null;

  const hasPhotos = p.photos && p.photos.length > 0;
  const currentPhoto = hasPhotos ? p.photos[photoIndex] : null;
  const isCompleted = p.status === "completed";

  const handleDelete = () => {
    if (!confirm(`Remove "${p.name}" from listings?`)) return;
    deleteProperty.mutate({ id: p.id });
  };

  const roi =
    p.projectCost && p.soldPrice ? computeROI(p.projectCost, p.soldPrice) : null;

  const detailRows = [
    { label: "Property type", value: p.type },
    { label: "Status", value: isCompleted ? "Completed" : "Ongoing" },
    p.basement ? { label: "Basement", value: p.basement.charAt(0).toUpperCase() + p.basement.slice(1) } : null,
    p.livableArea ? { label: "Livable area", value: `${fmt(p.livableArea)} sq ft` } : null,
    p.projectCost ? { label: "Project cost", value: fmtDollars(p.projectCost) } : null,
    p.projectStartDate ? { label: "Start date", value: fmtDate(p.projectStartDate) } : null,
    p.projectCompletionDate
      ? { label: isCompleted ? "Completion date" : "Expected completion", value: fmtDate(p.projectCompletionDate) }
      : null,
    p.soldPrice
      ? { label: isCompleted ? "Sold price" : "Expected list value", value: fmtDollars(p.soldPrice) }
      : null,
    roi !== null
      ? {
          label: "ROI",
          value: `${Number(roi) >= 0 ? "+" : ""}${roi}%`,
          highlight: Number(roi) >= 0 ? "positive" : "negative",
        }
      : null,
  ].filter(Boolean) as { label: string; value: string; highlight?: string }[];

  return (
    <div
      className="fixed inset-0 z-[300] bg-black/60 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white w-full max-w-[900px] max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">

        {/* Header */}
        <div
          className="flex items-center justify-between px-8 py-5 flex-shrink-0"
          style={{ background: "linear-gradient(90deg, #0f2d56 0%, #1a4a8a 100%)" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <p className="text-[10px] font-sans font-semibold tracking-[.25em] uppercase text-blue-300">
                {p.type}
              </p>
              <span
                className={`text-[9px] font-sans font-bold tracking-[.15em] uppercase px-2 py-[2px] ${
                  isCompleted
                    ? "bg-green-500/20 text-green-300 border border-green-500/30"
                    : "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                }`}
              >
                {isCompleted ? "Completed" : "Ongoing"}
              </span>
            </div>
            <h2 className="font-serif text-[24px] font-semibold text-white leading-tight">{p.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-[26px] text-blue-300 hover:text-white transition-colors leading-none px-1"
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col md:flex-row flex-1">

          {/* Left — photo gallery */}
          <div className="md:w-[52%] flex-shrink-0 flex flex-col">
            <div className="relative aspect-[4/3]">
              {currentPhoto ? (
                <img src={currentPhoto} alt={p.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full" style={{ background: TYPE_BG[p.type] ?? TYPE_BG.House }} />
              )}
              {hasPhotos && p.photos.length > 1 && (
                <>
                  <button
                    onClick={() => setPhotoIndex((i) => (i - 1 + p.photos.length) % p.photos.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#0f2d56]/80 text-white flex items-center justify-center hover:bg-[#1a4a8a] transition-colors text-lg"
                  >&#8592;</button>
                  <button
                    onClick={() => setPhotoIndex((i) => (i + 1) % p.photos.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#0f2d56]/80 text-white flex items-center justify-center hover:bg-[#1a4a8a] transition-colors text-lg"
                  >&#8594;</button>
                  <span className="absolute bottom-3 right-3 bg-[#0f2d56]/75 text-white text-[10px] font-sans px-2 py-1 tracking-[.06em]">
                    {photoIndex + 1} / {p.photos.length}
                  </span>
                </>
              )}
            </div>

            {hasPhotos && p.photos.length > 1 && (
              <div className="flex gap-1 p-2 bg-[#f0f5ff] overflow-x-auto">
                {p.photos.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setPhotoIndex(i)}
                    className={`flex-shrink-0 w-16 h-12 border-2 overflow-hidden transition-all ${
                      i === photoIndex ? "border-[#1a4a8a]" : "border-transparent opacity-60 hover:opacity-90"
                    }`}
                  >
                    <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {!hasPhotos && (
              <div className="p-4 bg-[#f0f5ff] text-[11px] font-sans text-blue-400 text-center tracking-[.06em]">
                No photos uploaded
              </div>
            )}
          </div>

          {/* Right — details */}
          <div className="flex-1 flex flex-col px-7 py-6 bg-white overflow-y-auto">

            {/* Price / address */}
            <div className="mb-5 pb-5 border-b border-blue-100">
              <div className="font-serif text-[32px] font-bold text-[#0f2d56] leading-none mb-1">
                {p.price}
              </div>
              <p className="text-[12px] font-sans text-[#4a6080]">{p.address}</p>
            </div>

            {/* Key stats: beds / baths / sqft */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              {[
                { label: "Bedrooms", value: p.beds },
                { label: "Bathrooms", value: p.baths },
                { label: "Sq ft", value: fmt(p.sqft) },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#f0f5ff] border border-blue-100 py-3 px-2 text-center"
                >
                  <div className="font-serif text-[22px] font-semibold text-[#0f2d56] leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[9px] font-sans font-semibold tracking-[.14em] uppercase text-[#3a6199] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* ROI highlight if available */}
            {roi !== null && (
              <div
                className={`mb-4 px-4 py-3 border flex items-center justify-between ${
                  Number(roi) >= 0
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <span className="text-[11px] font-sans font-semibold tracking-[.12em] uppercase text-[#6b88aa]">
                  Return on Investment
                </span>
                <span
                  className={`font-serif text-[24px] font-bold ${
                    Number(roi) >= 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {Number(roi) >= 0 ? "+" : ""}{roi}%
                </span>
              </div>
            )}

            {/* Detail rows */}
            <div className="space-y-[10px] mb-5 pb-5 border-b border-blue-100">
              {detailRows
                .filter((r) => r.label !== "ROI")
                .map((row) => (
                  <div key={row.label} className="flex justify-between items-center">
                    <span className="text-[10px] font-sans font-semibold tracking-[.1em] uppercase text-[#6b88aa]">
                      {row.label}
                    </span>
                    <span className="text-[13px] font-sans text-[#0f2d56] font-medium">{row.value}</span>
                  </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-auto">
              <a
                href="mailto:haroon.grandhomes@gmail.com"
                className="flex-1 h-[40px] bg-[#1a4a8a] text-white text-[10px] font-sans font-semibold tracking-[.14em] uppercase hover:bg-[#0f2d56] transition-colors flex items-center justify-center"
              >
                Enquire
              </a>
              <button
                onClick={handleDelete}
                disabled={deleteProperty.isPending}
                className="h-[40px] px-5 border border-red-200 text-red-500 text-[10px] font-sans font-semibold tracking-[.1em] uppercase hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
