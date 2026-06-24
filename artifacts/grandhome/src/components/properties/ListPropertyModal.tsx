import { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateProperty, getGetFeaturedPropertiesQueryKey, getListPropertiesQueryKey } from "@workspace/api-client-react";
import { uploadToCloudinary } from "@/lib/cloudinary";

interface ListPropertyModalProps {
  open: boolean;
  onClose: () => void;
}

export function ListPropertyModal({ open, onClose }: ListPropertyModalProps) {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<"details" | "project" | "photos">("details");

  const [addr, setAddr] = useState("");
  const [mode, setMode] = useState("buy");
  const [propType, setPropType] = useState("House");
  const [price, setPrice] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [sqft, setSqft] = useState("");
  const [basement, setBasement] = useState("none");
  const [livableArea, setLivableArea] = useState("");
  const [status, setStatus] = useState("ongoing");
  const [projectStartDate, setProjectStartDate] = useState("");
  const [projectCompletionDate, setProjectCompletionDate] = useState("");
  const [error, setError] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const createProperty = useCreateProperty({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetFeaturedPropertiesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getListPropertiesQueryKey() });
        handleClose();
      },
      onError: () => setError("Failed to create listing. Please try again."),
    },
  });

  const handleClose = () => {
    setAddr(""); setMode("buy"); setPropType("House");
    setPrice(""); setBeds(""); setBaths(""); setSqft("");
    setBasement("none"); setLivableArea(""); setStatus("ongoing");
    setProjectStartDate(""); setProjectCompletionDate("");
    setError(""); setPhotos([]); setTab("details");
    onClose();
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    setUploading(true);
    try {
      const urls = await Promise.all(files.map((f) => uploadToCloudinary(f)));
      setPhotos((prev) => [...prev, ...urls]);
    } catch {
      setError("One or more photos failed to upload. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = () => {
    if (!addr || !price || !beds || !baths || !sqft) {
      setError("Please fill in all required fields on the Details tab.");
      setTab("details");
      return;
    }
    setError("");
    createProperty.mutate({
      data: {
        address: addr,
        price,
        beds: parseInt(beds),
        baths: parseFloat(baths),
        sqft: parseInt(sqft),
        type: propType,
        mode,
        photos,
        status,
        basement: basement !== "none" ? basement : undefined,
        livableArea: livableArea ? parseInt(livableArea) : undefined,
        projectStartDate: projectStartDate || undefined,
        projectCompletionDate: projectCompletionDate || undefined,
      } as never,
    });
  };

  if (!open) return null;

  const inputClass =
    "h-10 border border-blue-200 px-[14px] text-[13px] font-sans text-[#0f2d56] outline-none focus:border-[#1a4a8a] transition-colors bg-white";
  const labelClass =
    "text-[10px] font-sans font-semibold tracking-[.14em] uppercase text-[#3a6199]";

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="bg-white w-full max-w-[560px] mx-4 shadow-2xl" role="dialog" aria-modal="true">
        {/* Header */}
        <div
          className="flex items-center justify-between px-7 py-5 border-b border-blue-100"
          style={{ background: "linear-gradient(90deg, #0f2d56 0%, #1a4a8a 100%)" }}
        >
          <h2 className="font-serif text-[22px] font-semibold text-white">List a property</h2>
          <button onClick={handleClose} className="text-[22px] text-blue-300 leading-none px-1 hover:text-white transition-colors">
            &times;
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-blue-100 px-7 bg-[#f8faff]">
          {(["details", "project", "photos"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`h-11 px-4 border-none bg-transparent text-[11px] font-sans font-semibold tracking-[.12em] uppercase border-b-2 mb-[-1px] transition-colors ${
                tab === t
                  ? "text-[#1a4a8a] border-[#1a4a8a]"
                  : "text-[#6b88aa] border-transparent hover:text-[#1a4a8a]"
              }`}
            >
              {t === "details" ? "Details" : t === "project" ? "Project Info" : "Photos"}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="px-7 py-6 flex flex-col gap-4 max-h-[60vh] overflow-y-auto">

          {tab === "details" && (
            <>
              <div className="flex flex-col gap-[6px]">
                <label className={labelClass}>Street address *</label>
                <input
                  value={addr}
                  onChange={(e) => setAddr(e.target.value)}
                  placeholder="e.g. 42 Elm Street, Piscataway, NJ"
                  className={inputClass + " w-full"}
                />
              </div>

              <div className="grid grid-cols-2 gap-[14px]">
                <div className="flex flex-col gap-[6px]">
                  <label className={labelClass}>Listing type *</label>
                  <select value={mode} onChange={(e) => setMode(e.target.value)} className={inputClass + " w-full"}>
                    <option value="buy">For sale</option>
                    <option value="rent">For rent</option>
                  </select>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className={labelClass}>Property type *</label>
                  <select value={propType} onChange={(e) => setPropType(e.target.value)} className={inputClass + " w-full"}>
                    <option value="House">House</option>
                    <option value="Condo">Condo</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Apartment">Apartment</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className={labelClass}>Price *</label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. $450,000 or $2,200/mo"
                  className={inputClass + " w-full"}
                />
                <span className="text-[11px] font-sans text-blue-400">For rentals include /mo — e.g. $2,200/mo</span>
              </div>

              <div className="grid grid-cols-3 gap-[14px]">
                {[
                  { label: "Bedrooms *", value: beds, set: setBeds, placeholder: "3", step: "1" },
                  { label: "Bathrooms *", value: baths, set: setBaths, placeholder: "2", step: "0.5" },
                  { label: "Sq ft *", value: sqft, set: setSqft, placeholder: "1500", step: "1" },
                ].map((field) => (
                  <div key={field.label} className="flex flex-col gap-[6px]">
                    <label className={labelClass}>{field.label}</label>
                    <input
                      type="number"
                      value={field.value}
                      onChange={(e) => field.set(e.target.value)}
                      placeholder={field.placeholder}
                      min="0"
                      step={field.step}
                      className={inputClass + " w-full"}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-[14px]">
                <div className="flex flex-col gap-[6px]">
                  <label className={labelClass}>Basement</label>
                  <select value={basement} onChange={(e) => setBasement(e.target.value)} className={inputClass + " w-full"}>
                    <option value="none">None</option>
                    <option value="finished">Finished</option>
                    <option value="unfinished">Unfinished</option>
                  </select>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className={labelClass}>Livable area (sq ft)</label>
                  <input
                    type="number"
                    value={livableArea}
                    onChange={(e) => setLivableArea(e.target.value)}
                    placeholder="e.g. 1800"
                    min="0"
                    className={inputClass + " w-full"}
                  />
                </div>
              </div>

              {error && (
                <div className="text-[12px] font-sans text-red-600 bg-red-50 px-3 py-2 border border-red-200">
                  {error}
                </div>
              )}
            </>
          )}

          {tab === "project" && (
            <>
              <div className="flex flex-col gap-[6px]">
                <label className={labelClass}>Project status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass + " w-full"}>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-[14px]">
                <div className="flex flex-col gap-[6px]">
                  <label className={labelClass}>Project start date</label>
                  <input
                    type="date"
                    value={projectStartDate}
                    onChange={(e) => setProjectStartDate(e.target.value)}
                    className={inputClass + " w-full"}
                  />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className={labelClass}>{status === "completed" ? "Completion date" : "Expected completion"}</label>
                  <input
                    type="date"
                    value={projectCompletionDate}
                    onChange={(e) => setProjectCompletionDate(e.target.value)}
                    className={inputClass + " w-full"}
                  />
                </div>
              </div>
            </>
          )}

          {tab === "photos" && (
            <>
              {photos.length < 9 && (
                <div
                  onClick={() => !uploading && fileRef.current?.click()}
                  className={`border-2 border-dashed border-blue-200 p-8 text-center transition-colors ${uploading ? "opacity-60 cursor-wait" : "cursor-pointer hover:border-[#1a4a8a] hover:bg-[#f0f5ff]"}`}
                >
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                  <div className="text-[12px] font-sans font-semibold tracking-[.1em] uppercase text-[#1a4a8a] mb-1">
                    {uploading ? "Uploading…" : "Upload photos"}
                  </div>
                  <div className="text-[11px] font-sans text-blue-400">
                    {uploading ? "Please wait" : "Click to select images (JPG, PNG, WEBP)"}
                  </div>
                </div>
              )}
              {photos.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {photos.map((src, i) => (
                    <div key={i} className="relative aspect-[4/3] border border-blue-100 overflow-hidden">
                      <img src={src} alt={`Property photo ${i + 1}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => setPhotos((prev) => prev.filter((_, j) => j !== i))}
                        className="absolute top-1 right-1 bg-[#1a4a8a]/80 text-white w-[22px] h-[22px] rounded-full text-[13px] flex items-center justify-center leading-none hover:bg-[#0f2d56]"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-7 py-[18px] border-t border-blue-100 flex gap-[10px] justify-end bg-[#f8faff]">
          <button
            onClick={handleClose}
            className="h-[38px] px-[22px] border border-blue-200 bg-transparent text-[#3a6199] text-[11px] font-sans font-medium hover:border-[#1a4a8a] hover:text-[#0f2d56] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={createProperty.isPending}
            className="h-[38px] px-[26px] bg-[#1a4a8a] text-white text-[11px] font-sans font-semibold tracking-[.1em] uppercase hover:bg-[#0f2d56] transition-colors disabled:opacity-60"
          >
            {createProperty.isPending ? "Adding..." : "Add listing"}
          </button>
        </div>
      </div>
    </div>
  );
}
