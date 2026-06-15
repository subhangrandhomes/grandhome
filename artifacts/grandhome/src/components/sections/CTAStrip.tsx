import { useState } from "react";
import { ListPropertyModal } from "@/components/properties/ListPropertyModal";

export function CTAStrip() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className="text-white flex items-center justify-between px-20 py-6"
        style={{ background: "linear-gradient(90deg, #1a4a8a 0%, #3a7bd5 100%)" }}
      >
        <div>
          <div className="font-serif text-[28px] font-semibold tracking-[.02em]">
            Want to list or buy a property?
          </div>
          <div className="text-[12px] font-sans font-medium tracking-[.08em] text-blue-100 mt-1">
            Get in touch with our team today
          </div>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="h-[40px] px-7 border border-white/70 bg-transparent text-white text-[10px] font-sans font-semibold tracking-[.16em] uppercase hover:bg-white/20 transition-colors"
        >
          List a property
        </button>
      </div>

      <ListPropertyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
