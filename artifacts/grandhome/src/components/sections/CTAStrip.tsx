import { useState } from "react";
import { ListPropertyModal } from "@/components/properties/ListPropertyModal";

export function CTAStrip() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="bg-[#c0392b] text-white flex items-center justify-between px-20 py-[22px]">
        <div>
          <div className="text-[13px] font-medium tracking-[.06em]">Want to list or buy a property?</div>
          <div className="font-serif text-[26px] font-semibold tracking-[.02em]">+1 800 555 0199</div>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="h-[38px] px-[26px] border border-white/70 bg-transparent text-white text-[10px] font-semibold tracking-[.16em] uppercase hover:bg-white/20 transition-colors"
        >
          List a property
        </button>
      </div>

      <ListPropertyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
