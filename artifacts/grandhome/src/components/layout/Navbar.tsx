import { useState } from "react";
import { ListPropertyModal } from "@/components/properties/ListPropertyModal";

export function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Top bar — deep navy */}
      <div className="bg-[#0f2d56] text-blue-200 text-[11px] tracking-[.04em] px-10 py-[7px] flex items-center justify-between">
        <div className="flex gap-6">
          <span>CALL US TODAY: +1 800 555 0199</span>
          <a href="mailto:info@grandhomeinvestments.com" className="hover:text-white transition-colors">
            info@grandhomeinvestments.com
          </a>
        </div>
        <div className="flex gap-4 text-sm">
          <a href="#" className="hover:text-white transition-colors">FB</a>
          <a href="#" className="hover:text-white transition-colors">IG</a>
          <a href="#" className="hover:text-white transition-colors">LI</a>
        </div>
      </div>

      {/* Logo bar — white */}
      <div className="bg-white px-10 py-[18px] flex items-center justify-between border-b border-blue-100">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 border-2 border-[#1a4a8a] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="font-serif text-[22px] font-semibold tracking-tight text-[#1a4a8a]">GI</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-[26px] font-semibold tracking-[.06em] uppercase text-[#0f2d56]">Grandhome</span>
            <span className="text-[9px] font-medium tracking-[.22em] uppercase text-blue-400 mt-1">
              Investments &bull; Real Estate Group
            </span>
          </div>
          <div className="w-px h-12 bg-blue-100 mx-2" />
          <span className="font-serif text-[28px] font-normal tracking-[.18em] uppercase text-[#3a7bd5]">Luxury</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="h-9 px-[22px] border border-[#1a4a8a] bg-transparent text-[#1a4a8a] text-[11px] font-semibold tracking-[.12em] uppercase transition-colors hover:bg-[#1a4a8a] hover:text-white"
          >
            + List property
          </button>
          <a
            href="#contact"
            className="h-9 px-[22px] border border-[#1a4a8a] bg-[#1a4a8a] text-white text-[11px] font-semibold tracking-[.12em] uppercase transition-colors hover:bg-[#0f2d56] flex items-center"
          >
            Contact us
          </a>
        </div>
      </div>

      {/* Sticky nav — white with blue accents */}
      <nav className="bg-white border-b border-blue-100 sticky top-0 z-50">
        <ul className="flex justify-center gap-10 list-none px-10 h-11 items-center">
          {[
            { label: "Home", href: "#" },
            { label: "Our listings", href: "#listings" },
            { label: "Buy", href: "#listings" },
            { label: "About us", href: "#about" },
            { label: "Reviews", href: "#" },
            { label: "Contact", href: "#contact" },
          ].map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-[11px] font-semibold tracking-[.14em] uppercase text-[#3a6199] hover:text-[#0f2d56] hover:border-b hover:border-[#1a4a8a] pb-[2px] transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <ListPropertyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
