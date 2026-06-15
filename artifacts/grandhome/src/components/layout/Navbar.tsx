import { useState } from "react";
import { ListPropertyModal } from "@/components/properties/ListPropertyModal";

export function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Logo bar — white */}
      <div className="bg-white px-10 py-[18px] flex items-center justify-between border-b border-blue-100">
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Grand Homes — Residential Construction & Investments"
            className="h-[90px] w-auto object-contain"
          />
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
