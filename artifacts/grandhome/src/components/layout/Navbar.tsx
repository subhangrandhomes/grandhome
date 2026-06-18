import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ListPropertyModal } from "@/components/properties/ListPropertyModal";
import { useAdmin } from "@/context/AdminContext";

export function Navbar() {
  const { isAdmin, login, logout } = useAdmin();
  const [location] = useLocation();
  const isHome = location === "/" || location === "";
  const h = (anchor: string) => isHome ? anchor : `/${anchor}`;
  const [modalOpen, setModalOpen] = useState(false);
  const [lockOpen, setLockOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const ok = await login(password);
    setLoading(false);
    if (ok) { setPassword(""); setLockOpen(false); }
    else setError("Incorrect password.");
  };

  const navLinks = [
    { label: "Home", href: h("#") },
    { label: "Our Listings", href: h("#listings") },
    { label: "About Us", href: h("#about") },
    { label: "Contact", href: h("#contact-info") },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-[0_1px_8px_rgba(15,45,86,0.07)]">
        <div className="flex items-center px-8 h-[88px] max-w-[1400px] mx-auto">
          {/* Logo */}
          <a href={isHome ? "#" : "/"} className="flex-shrink-0">
            <img
              src="/logo.png"
              alt="Grand Homes — Residential Construction & Investments"
              className="h-[76px] w-auto object-contain"
            />
          </a>

          {/* Nav — centered */}
          <nav className="flex-1 flex justify-center">
            <ul className="flex items-center gap-1 list-none">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="px-4 py-2 text-[11px] font-semibold tracking-[.12em] uppercase text-[#4a6080] hover:text-[#0f2d56] transition-colors rounded"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/investments"
                  className="px-4 py-2 text-[11px] font-semibold tracking-[.12em] uppercase text-[#4a6080] hover:text-[#0f2d56] transition-colors rounded"
                >
                  Investments
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {isAdmin && (
              <button
                onClick={() => setModalOpen(true)}
                className="h-9 px-4 text-[10px] font-semibold tracking-[.1em] uppercase border border-[#1a4a8a] text-[#1a4a8a] hover:bg-[#1a4a8a] hover:text-white transition-colors"
              >
                + List
              </button>
            )}
            <a
              href={h("#contact-info")}
              className="h-9 px-5 text-[10px] font-semibold tracking-[.12em] uppercase bg-[#0f2d56] text-white hover:bg-[#1a4a8a] transition-colors inline-flex items-center"
            >
              Contact Us
            </a>
            <button
              onClick={() => { if (isAdmin) logout(); else { setLockOpen((o) => !o); setError(""); setPassword(""); } }}
              title={isAdmin ? "Sign out of admin" : "Admin login"}
              className={`w-9 h-9 flex items-center justify-center border transition-colors ${
                isAdmin
                  ? "border-green-400 text-green-600 bg-green-50 hover:bg-green-100"
                  : "border-slate-200 text-slate-400 hover:border-[#1a4a8a] hover:text-[#1a4a8a]"
              }`}
            >
              {isAdmin ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[15px] h-[15px]">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[15px] h-[15px]">
                  <path d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Admin password modal */}
      {lockOpen && !isAdmin && (
        <div
          className="fixed inset-0 z-[400] bg-black/50 flex items-center justify-center backdrop-blur-[2px]"
          onClick={(e) => { if (e.target === e.currentTarget) setLockOpen(false); }}
        >
          <div className="bg-white w-[340px] shadow-2xl p-8 flex flex-col gap-5">
            <div>
              <p className="text-[9px] font-sans font-semibold tracking-[.25em] uppercase text-[#3a7bd5] mb-1">Admin access</p>
              <h3 className="font-serif text-[22px] text-[#0f2d56]">Enter admin password</h3>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }}
              placeholder="Password"
              autoFocus
              className="h-10 border border-slate-200 px-3 text-[13px] font-sans text-[#0f2d56] outline-none focus:border-[#1a4a8a] transition-colors w-full rounded"
            />
            {error && <p className="text-[12px] font-sans text-red-600 -mt-2">{error}</p>}
            <div className="flex gap-2">
              <button
                onClick={handleLogin}
                disabled={loading || !password}
                className="flex-1 h-10 bg-[#0f2d56] text-white text-[10px] font-sans font-semibold tracking-[.14em] uppercase hover:bg-[#1a4a8a] transition-colors disabled:opacity-40"
              >
                {loading ? "Checking…" : "Unlock"}
              </button>
              <button
                onClick={() => setLockOpen(false)}
                className="h-10 px-5 border border-slate-200 text-[#4a6080] text-[10px] font-sans font-semibold tracking-[.1em] uppercase hover:border-slate-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ListPropertyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
