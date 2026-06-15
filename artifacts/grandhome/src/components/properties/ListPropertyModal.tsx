import { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateProperty, getGetFeaturedPropertiesQueryKey, getListPropertiesQueryKey } from "@workspace/api-client-react";

interface ListPropertyModalProps {
  open: boolean;
  onClose: () => void;
}

export function ListPropertyModal({ open, onClose }: ListPropertyModalProps) {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<"details" | "photos">("details");
  const [addr, setAddr] = useState("");
  const [mode, setMode] = useState("buy");
  const [propType, setPropType] = useState("House");
  const [price, setPrice] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [sqft, setSqft] = useState("");
  const [error, setError] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const createProperty = useCreateProperty({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetFeaturedPropertiesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getListPropertiesQueryKey() });
        handleClose();
      },
    },
  });

  const handleClose = () => {
    setAddr(""); setMode("buy"); setPropType("House");
    setPrice(""); setBeds(""); setBaths(""); setSqft("");
    setError(""); setPhotos([]); setTab("details");
    onClose();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setPhotos((prev) => [...prev, ev.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const handleSubmit = () => {
    if (!addr || !price || !beds || !baths || !sqft) {
      setError("Please fill in all required fields.");
      setTab("details");
      return;
    }
    setError("");
    createProperty.mutate({
      data: {
        address: addr,
        price,
        beds: parseInt(beds),
        baths: parseInt(baths),
        sqft: parseInt(sqft),
        type: propType,
        mode,
        photos,
      },
    });
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/55 flex items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="bg-white w-full max-w-[540px] mx-4" role="dialog" aria-modal="true">
        <div className="flex items-center justify-between px-7 py-5 border-b border-[#e8e8e8]">
          <h2 className="font-serif text-[22px] font-medium tracking-[.04em]">List a property</h2>
          <button onClick={handleClose} className="text-[22px] text-[#999] leading-none px-1 hover:text-[#111]">
            &times;
          </button>
        </div>

        <div className="flex border-b border-[#e8e8e8] px-7">
          {(["details", "photos"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`h-11 px-5 border-none bg-transparent text-[11px] font-semibold tracking-[.12em] uppercase border-b-2 mb-[-1px] transition-colors ${
                tab === t
                  ? "text-[#111] border-[#111]"
                  : "text-[#999] border-transparent hover:text-[#111]"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="px-7 py-7 flex flex-col gap-4 max-h-[68vh] overflow-y-auto">
          {tab === "details" && (
            <>
              <div className="flex flex-col gap-[6px]">
                <label className="text-[10px] font-semibold tracking-[.14em] uppercase text-[#888]">
                  Street address *
                </label>
                <input
                  value={addr}
                  onChange={(e) => setAddr(e.target.value)}
                  placeholder="e.g. 42 Elm Street, Piscataway, NJ"
                  className="h-10 border border-[#ddd] px-[14px] text-[13px] text-[#111] outline-none focus:border-[#111] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-[14px]">
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[10px] font-semibold tracking-[.14em] uppercase text-[#888]">
                    Listing type *
                  </label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="h-10 border border-[#ddd] px-[14px] text-[13px] text-[#111] outline-none focus:border-[#111] transition-colors bg-white"
                  >
                    <option value="buy">For sale</option>
                    <option value="rent">For rent</option>
                  </select>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[10px] font-semibold tracking-[.14em] uppercase text-[#888]">
                    Property type *
                  </label>
                  <select
                    value={propType}
                    onChange={(e) => setPropType(e.target.value)}
                    className="h-10 border border-[#ddd] px-[14px] text-[13px] text-[#111] outline-none focus:border-[#111] transition-colors bg-white"
                  >
                    <option value="House">House</option>
                    <option value="Condo">Condo</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Apartment">Apartment</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="text-[10px] font-semibold tracking-[.14em] uppercase text-[#888]">
                  Price *
                </label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. $450,000 or $2,200/mo"
                  className="h-10 border border-[#ddd] px-[14px] text-[13px] text-[#111] outline-none focus:border-[#111] transition-colors"
                />
                <span className="text-[11px] text-[#aaa]">For rentals include /mo — e.g. $2,200/mo</span>
              </div>

              <div className="grid grid-cols-3 gap-[14px]">
                {[
                  { label: "Bedrooms *", value: beds, set: setBeds, placeholder: "3" },
                  { label: "Bathrooms *", value: baths, set: setBaths, placeholder: "2" },
                  { label: "Sq ft *", value: sqft, set: setSqft, placeholder: "1500" },
                ].map((field) => (
                  <div key={field.label} className="flex flex-col gap-[6px]">
                    <label className="text-[10px] font-semibold tracking-[.14em] uppercase text-[#888]">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      value={field.value}
                      onChange={(e) => field.set(e.target.value)}
                      placeholder={field.placeholder}
                      min="0"
                      className="h-10 border border-[#ddd] px-[14px] text-[13px] text-[#111] outline-none focus:border-[#111] transition-colors"
                    />
                  </div>
                ))}
              </div>

              {error && (
                <div className="text-[12px] text-[#c0392b]">{error}</div>
              )}
            </>
          )}

          {tab === "photos" && (
            <>
              {photos.length < 9 && (
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-[#ddd] p-8 text-center cursor-pointer hover:border-[#111] hover:bg-[#fafafa] transition-colors"
                >
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                  <div className="text-[12px] font-semibold tracking-[.1em] uppercase text-[#555] mb-1">
                    Upload photos
                  </div>
                  <div className="text-[11px] text-[#aaa]">Click to select images (JPG, PNG, WEBP)</div>
                </div>
              )}
              {photos.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {photos.map((src, i) => (
                    <div key={i} className="relative aspect-[4/3] border border-[#e8e8e8] overflow-hidden">
                      <img src={src} alt={`Property photo ${i + 1}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => setPhotos((prev) => prev.filter((_, j) => j !== i))}
                        className="absolute top-1 right-1 bg-black/60 text-white w-[22px] h-[22px] rounded-full text-[13px] flex items-center justify-center leading-none"
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

        <div className="px-7 py-[18px] border-t border-[#e8e8e8] flex gap-[10px] justify-end">
          <button
            onClick={handleClose}
            className="h-[38px] px-[22px] border border-[#ddd] bg-transparent text-[#888] text-[11px] font-medium hover:border-[#999] hover:text-[#111] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={createProperty.isPending}
            className="h-[38px] px-[26px] bg-[#111] text-white text-[11px] font-semibold tracking-[.1em] uppercase hover:bg-[#333] transition-colors disabled:opacity-60"
          >
            {createProperty.isPending ? "Adding..." : "Add listing"}
          </button>
        </div>
      </div>
    </div>
  );
}
