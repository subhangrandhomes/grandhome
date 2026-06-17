import { useState } from "react";
import { ListPropertyModal } from "@/components/properties/ListPropertyModal";
import { useAdmin } from "@/context/AdminContext";

export function CTAStrip() {
  const [modalOpen, setModalOpen] = useState(false);
  const { isAdmin } = useAdmin();

  return (
    <>
      <div
        className="relative overflow-hidden text-white px-8 md:px-20 py-14 flex flex-col md:flex-row items-center justify-between gap-8"
        style={{ background: "linear-gradient(100deg, #0c2548 0%, #1a4a8a 60%, #2563b8 100%)" }}
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.06]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </div>

        <div className="relative z-10">
          <p className="text-[10px] font-sans font-semibold tracking-[.3em] uppercase text-blue-300 mb-2">
            Ready to move forward?
          </p>
          <h2 className="font-serif text-[30px] font-semibold leading-[1.2]">
            Want to list or buy a property?
          </h2>
          <p className="text-[13px] font-sans text-blue-200 mt-2">
            Our team is here to help — from first inquiry to closing.
          </p>
        </div>

        <div className="relative z-10 flex gap-3 flex-shrink-0">
          <a
            href="#contact-info"
            className="h-11 px-7 border border-white/50 text-white text-[10px] font-sans font-semibold tracking-[.14em] uppercase hover:bg-white/10 transition-colors leading-[44px] inline-block"
          >
            Contact us
          </a>
          {isAdmin && (
            <button
              onClick={() => setModalOpen(true)}
              className="h-11 px-7 bg-white text-[#0f2d56] text-[10px] font-sans font-semibold tracking-[.14em] uppercase hover:bg-blue-50 transition-colors"
            >
              List a property
            </button>
          )}
        </div>
      </div>

      <ListPropertyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
