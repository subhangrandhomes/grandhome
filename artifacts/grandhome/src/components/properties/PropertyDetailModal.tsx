import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useDeleteProperty,
  useUpdateProperty,
  getGetFeaturedPropertiesQueryKey,
  getListPropertiesQueryKey,
} from "@workspace/api-client-react";
import { useAdmin } from "@/context/AdminContext";

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

interface Props {
  property: Property | null;
  onClose: () => void;
}

const TYPE_BG: Record<string, string> = {
  House: "linear-gradient(135deg, #c2d4e8 0%, #8faac8 100%)",
  Condo: "linear-gradient(135deg, #b8c8e0 0%, #7a9abf 100%)",
  Townhouse: "linear-gradient(135deg, #c8d8ec 0%, #90aacf 100%)",
  Apartment: "linear-gradient(135deg, #bdd0e8 0%, #85a5c5 100%)",
};

function fmt(n: number) { return n.toLocaleString("en-US"); }
function fmtDollars(n: number) { return "$" + n.toLocaleString("en-US"); }
function fmtDate(d: string) {
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
function toDateInput(d: string | null | undefined) {
  if (!d) return "";
  const date = new Date(d);
  if (!isNaN(date.getTime())) return date.toISOString().split("T")[0];
  return d;
}

export function PropertyDetailModal({ property: initialProp, onClose }: Props) {
  const { isAdmin } = useAdmin();
  const [p, setP] = useState<Property | null>(initialProp);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [editing, setEditing] = useState(false);
  const queryClient = useQueryClient();

  // Sync when user opens a different property
  useEffect(() => {
    setP(initialProp);
    setEditing(false);
    setPhotoIndex(0);
  }, [initialProp?.id]);

  // Edit form state
  const [eAddr, setEAddr] = useState("");
  const [ePrice, setEPrice] = useState("");
  const [eBeds, setEBeds] = useState("");
  const [eBaths, setEBaths] = useState("");
  const [eSqft, setESqft] = useState("");
  const [eType, setEType] = useState("");
  const [eMode, setEMode] = useState("");
  const [eStatus, setEStatus] = useState("");
  const [eBasement, setEBasement] = useState("");
  const [eLivableArea, setELivableArea] = useState("");
  const [eStartDate, setEStartDate] = useState("");
  const [eCompletionDate, setECompletionDate] = useState("");
  const [eSaveError, setESaveError] = useState("");

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: getGetFeaturedPropertiesQueryKey() });
    queryClient.invalidateQueries({ queryKey: getListPropertiesQueryKey() });
  };

  const deleteProperty = useDeleteProperty({
    mutation: { onSuccess: () => { invalidate(); onClose(); } },
  });

  const updateProperty = useUpdateProperty({
    mutation: {
      onSuccess: (data) => {
        setP({ ...data, photos: data.photos as string[] });
        invalidate();
        setEditing(false);
      },
      onError: () => setESaveError("Failed to save changes. Please try again."),
    },
  });

  if (!p) return null;

  const hasPhotos = p.photos && p.photos.length > 0;
  const currentPhoto = hasPhotos ? p.photos[photoIndex] : null;
  const isCompleted = p.status === "completed";

  const openEdit = () => {
    setEAddr(p.address);
    setEPrice(p.price);
    setEBeds(String(p.beds));
    setEBaths(String(p.baths));
    setESqft(String(p.sqft));
    setEType(p.type);
    setEMode(p.mode);
    setEStatus(p.status ?? "ongoing");
    setEBasement(p.basement ?? "none");
    setELivableArea(p.livableArea ? String(p.livableArea) : "");
    setEStartDate(toDateInput(p.projectStartDate));
    setECompletionDate(toDateInput(p.projectCompletionDate));
    setESaveError("");
    setEditing(true);
  };

  const handleSave = () => {
    if (!eAddr || !ePrice || !eBeds || !eBaths || !eSqft) {
      setESaveError("Address, price, beds, baths, and sq ft are required.");
      return;
    }
    setESaveError("");
    updateProperty.mutate({
      id: p.id,
      data: {
        address: eAddr,
        price: ePrice,
        beds: parseInt(eBeds),
        baths: parseInt(eBaths),
        sqft: parseInt(eSqft),
        type: eType,
        mode: eMode,
        status: eStatus,
        basement: eBasement !== "none" ? eBasement : undefined,
        livableArea: eLivableArea ? parseInt(eLivableArea) : undefined,
        projectStartDate: eStartDate || undefined,
        projectCompletionDate: eCompletionDate || undefined,
      } as never,
    });
  };

  const handleDelete = () => {
    if (!confirm(`Remove "${p.name}" from listings?`)) return;
    deleteProperty.mutate({ id: p.id });
  };

  const inputCls = "h-9 border border-blue-200 px-3 text-[12px] font-sans text-[#0f2d56] outline-none focus:border-[#1a4a8a] transition-colors bg-white w-full";
  const labelCls = "text-[9px] font-sans font-semibold tracking-[.14em] uppercase text-[#6b88aa] mb-[3px] block";

  return (
    <div
      className="fixed inset-0 z-[300] bg-black/60 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) { setEditing(false); onClose(); } }}
    >
      <div className="bg-white w-full max-w-[920px] max-h-[93vh] overflow-y-auto shadow-2xl flex flex-col">

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
              <span className={`text-[9px] font-sans font-bold tracking-[.15em] uppercase px-2 py-[2px] ${
                isCompleted
                  ? "bg-green-500/20 text-green-300 border border-green-500/30"
                  : "bg-amber-400/20 text-amber-300 border border-amber-400/30"
              }`}>
                {isCompleted ? "Completed" : "Ongoing"}
              </span>
            </div>
            <h2 className="font-serif text-[22px] font-semibold text-white leading-tight">{p.name}</h2>
          </div>
          <div className="flex items-center gap-2">
            {!editing && isAdmin && (
              <button
                onClick={openEdit}
                className="h-8 px-4 border border-blue-400/50 text-blue-200 text-[10px] font-sans font-semibold tracking-[.12em] uppercase hover:bg-white/10 transition-colors"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => { setEditing(false); onClose(); }}
              className="text-[26px] text-blue-300 hover:text-white transition-colors leading-none px-1"
            >
              &times;
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row flex-1">

          {/* Left — photo gallery */}
          <div className="md:w-[48%] flex-shrink-0 flex flex-col">
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
                  <span className="absolute bottom-3 right-3 bg-[#0f2d56]/75 text-white text-[10px] font-sans px-2 py-1">
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
                    className={`flex-shrink-0 w-14 h-10 border-2 overflow-hidden transition-all ${
                      i === photoIndex ? "border-[#1a4a8a]" : "border-transparent opacity-60 hover:opacity-90"
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            {!hasPhotos && (
              <div className="p-3 bg-[#f0f5ff] text-[11px] font-sans text-blue-400 text-center">No photos uploaded</div>
            )}
          </div>

          {/* Right — view or edit */}
          <div className="flex-1 flex flex-col px-7 py-6 bg-white overflow-y-auto">

            {/* ── VIEW MODE ── */}
            {!editing && (
              <>
                <div className="mb-4 pb-4 border-b border-blue-100">
                  <div className="font-serif text-[30px] font-bold text-[#0f2d56] leading-none mb-1">{p.price}</div>
                  <p className="text-[12px] font-sans text-[#4a6080]">{p.address}</p>
                </div>

                {/* Beds / Baths / Sqft */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: "Bedrooms", value: p.beds },
                    { label: "Bathrooms", value: p.baths },
                    { label: "Sq ft", value: fmt(p.sqft) },
                  ].map((s) => (
                    <div key={s.label} className="bg-[#f0f5ff] border border-blue-100 py-3 px-2 text-center">
                      <div className="font-serif text-[20px] font-semibold text-[#0f2d56] leading-none">{s.value}</div>
                      <div className="text-[9px] font-sans font-semibold tracking-[.14em] uppercase text-[#3a6199] mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Detail rows — always show all fields, blank ones show "—" */}
                <div className="space-y-[9px] mb-5 pb-5 border-b border-blue-100">
                  {[
                    { label: "Property type", value: p.type },
                    { label: "Listing type", value: p.mode === "rent" ? "For rent" : "For sale" },
                    { label: "Project status", value: isCompleted ? "Completed" : "Ongoing" },
                    { label: "Basement", value: p.basement ? p.basement.charAt(0).toUpperCase() + p.basement.slice(1) : "—" },
                    { label: "Livable area", value: p.livableArea ? `${fmt(p.livableArea)} sq ft` : "—" },
                    { label: "Start date", value: p.projectStartDate ? fmtDate(p.projectStartDate) : "—" },
                    { label: isCompleted ? "Completion date" : "Expected completion", value: p.projectCompletionDate ? fmtDate(p.projectCompletionDate) : "—" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center">
                      <span className="text-[10px] font-sans font-semibold tracking-[.1em] uppercase text-[#6b88aa]">{row.label}</span>
                      <span className={`text-[13px] font-sans font-medium ${row.value === "—" ? "text-blue-300" : "text-[#0f2d56]"}`}>{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        document.getElementById("contact-info")?.scrollIntoView({ behavior: "smooth" });
                      }, 50);
                    }}
                    className="flex-1 h-[40px] bg-[#1a4a8a] text-white text-[10px] font-sans font-semibold tracking-[.14em] uppercase hover:bg-[#0f2d56] transition-colors flex items-center justify-center"
                  >
                    Enquire
                  </button>
                  {isAdmin && (
                    <button
                      onClick={openEdit}
                      className="h-[40px] px-5 border border-[#1a4a8a] text-[#1a4a8a] text-[10px] font-sans font-semibold tracking-[.1em] uppercase hover:bg-blue-50 transition-colors"
                    >
                      Edit
                    </button>
                  )}
                  {isAdmin && (
                    <button
                      onClick={handleDelete}
                      disabled={deleteProperty.isPending}
                      className="h-[40px] px-5 border border-red-200 text-red-500 text-[10px] font-sans font-semibold tracking-[.1em] uppercase hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </>
            )}

            {/* ── EDIT MODE ── */}
            {editing && (
              <div className="flex flex-col gap-3">
                <p className="text-[10px] font-sans font-semibold tracking-[.2em] uppercase text-[#3a7bd5] mb-1">Edit property</p>

                <div className="flex flex-col">
                  <label className={labelCls}>Address</label>
                  <input value={eAddr} onChange={(e) => setEAddr(e.target.value)} className={inputCls} placeholder="Street address" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <label className={labelCls}>Price</label>
                    <input value={ePrice} onChange={(e) => setEPrice(e.target.value)} className={inputCls} placeholder="$450,000" />
                  </div>
                  <div className="flex flex-col">
                    <label className={labelCls}>Project status</label>
                    <select value={eStatus} onChange={(e) => setEStatus(e.target.value)} className={inputCls}>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <label className={labelCls}>Property type</label>
                    <select value={eType} onChange={(e) => setEType(e.target.value)} className={inputCls}>
                      <option value="House">House</option>
                      <option value="Condo">Condo</option>
                      <option value="Townhouse">Townhouse</option>
                      <option value="Apartment">Apartment</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className={labelCls}>Listing type</label>
                    <select value={eMode} onChange={(e) => setEMode(e.target.value)} className={inputCls}>
                      <option value="buy">For sale</option>
                      <option value="rent">For rent</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col">
                    <label className={labelCls}>Bedrooms</label>
                    <input type="number" value={eBeds} onChange={(e) => setEBeds(e.target.value)} min="0" className={inputCls} />
                  </div>
                  <div className="flex flex-col">
                    <label className={labelCls}>Bathrooms</label>
                    <input type="number" value={eBaths} onChange={(e) => setEBaths(e.target.value)} min="0" className={inputCls} />
                  </div>
                  <div className="flex flex-col">
                    <label className={labelCls}>Sq ft</label>
                    <input type="number" value={eSqft} onChange={(e) => setESqft(e.target.value)} min="0" className={inputCls} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <label className={labelCls}>Basement</label>
                    <select value={eBasement} onChange={(e) => setEBasement(e.target.value)} className={inputCls}>
                      <option value="none">None</option>
                      <option value="finished">Finished</option>
                      <option value="unfinished">Unfinished</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className={labelCls}>Livable area (sq ft)</label>
                    <input type="number" value={eLivableArea} onChange={(e) => setELivableArea(e.target.value)} min="0" className={inputCls} placeholder="e.g. 1800" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <label className={labelCls}>Start date</label>
                    <input type="date" value={eStartDate} onChange={(e) => setEStartDate(e.target.value)} className={inputCls} />
                  </div>
                  <div className="flex flex-col">
                    <label className={labelCls}>{eStatus === "completed" ? "Completion date" : "Expected completion"}</label>
                    <input type="date" value={eCompletionDate} onChange={(e) => setECompletionDate(e.target.value)} className={inputCls} />
                  </div>
                </div>

                {eSaveError && (
                  <div className="text-[12px] font-sans text-red-600 bg-red-50 px-3 py-2 border border-red-200">{eSaveError}</div>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    onClick={handleSave}
                    disabled={updateProperty.isPending}
                    className="flex-1 h-[38px] bg-[#1a4a8a] text-white text-[10px] font-sans font-semibold tracking-[.14em] uppercase hover:bg-[#0f2d56] transition-colors disabled:opacity-60"
                  >
                    {updateProperty.isPending ? "Saving…" : "Save changes"}
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="h-[38px] px-5 border border-blue-200 text-[#3a6199] text-[10px] font-sans font-semibold tracking-[.1em] uppercase hover:border-[#1a4a8a] hover:text-[#0f2d56] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
