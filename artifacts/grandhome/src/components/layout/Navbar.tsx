import { useState } from "react";
import { Link } from "wouter";
import { ListPropertyModal } from "@/components/properties/ListPropertyModal";
import { useAdmin } from "@/context/AdminContext";

export function Navbar() {
  const { isAdmin, login, logout } = useAdmin();
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
    if (ok) {
      setPassword("");
      setLockOpen(false);
    } else {
      setError("Incorrect password.");
    }
  };

  return (
    <>
      {/* Logo bar */}
      <div className="bg-white px-10 py-[18px] flex items-center justify-between border-b border-blue-100">
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Grand Homes — Residential Construction & Investments"
            className="h-[195px] w-auto object-contain"
          />
        </div>
        <div className="flex items-center gap-3">
          {isAdmin && (
            <button
              onClick={() => setModalOpen(true)}
              className="h-9 px-[22px] border border-[#1a4a8a] bg-transparent text-[#1a4a8a] text-[11px] font-semibold tracking-[.12em] uppercase transition-colors hover:bg-[#1a4a8a] hover:text-white"
            >
              + List property
            </button>
          )}
          <a
            href="#contact-info"
            className="h-9 px-[22px] border border-[#1a4a8a] bg-[#1a4a8a] text-white text-[11px] font-semibold tracking-[.12em] uppercase transition-colors hover:bg-[#0f2d56] flex items-center"
          >
            Contact us
          </a>
          {/* Admin lock toggle */}
          <button
            onClick={() => { if (isAdmin) { logout(); } else { setLockOpen((o) => !o); setError(""); setPassword(""); } }}
            title={isAdmin ? "Sign out of admin" : "Admin login"}
            className={`w-9 h-9 flex items-center justify-center border transition-colors ${
              isAdmin
                ? "border-green-400 text-green-600 hover:bg-green-50"
                : "border-blue-200 text-[#6b88aa] hover:border-[#1a4a8a] hover:text-[#1a4a8a]"
            }`}
          >
            {isAdmin ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Admin password popover */}
      {lockOpen && !isAdmin && (
        <div className="fixed inset-0 z-[400] bg-black/40 flex items-center justify-center" onClick={(e) => { if (e.target === e.currentTarget) setLockOpen(false); }}>
          <div className="bg-white w-[320px] shadow-2xl p-6 flex flex-col gap-4">
            <div>
              <p className="text-[10px] font-sans font-semibold tracking-[.2em] uppercase text-[#3a7bd5] mb-1">Admin access</p>
              <h3 className="font-serif text-[18px] text-[#0f2d56]">Enter admin password</h3>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }}
              placeholder="Password"
              autoFocus
              className="h-9 border border-blue-200 px-3 text-[12px] font-sans text-[#0f2d56] outline-none focus:border-[#1a4a8a] transition-colors w-full"
            />
            {error && <p className="text-[12px] font-sans text-red-600">{error}</p>}
            <div className="flex gap-2">
              <button
                onClick={handleLogin}
                disabled={loading || !password}
                className="flex-1 h-9 bg-[#1a4a8a] text-white text-[10px] font-sans font-semibold tracking-[.14em] uppercase hover:bg-[#0f2d56] transition-colors disabled:opacity-50"
              >
                {loading ? "Checking…" : "Unlock"}
              </button>
              <button
                onClick={() => setLockOpen(false)}
                className="h-9 px-4 border border-blue-200 text-[#3a6199] text-[10px] font-sans font-semibold tracking-[.1em] uppercase hover:border-[#1a4a8a] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky nav */}
      <nav className="bg-white border-b border-blue-100 sticky top-0 z-50">
        <ul className="flex justify-center gap-10 list-none px-10 h-11 items-center">
          <li><a href="#" className="text-[11px] font-semibold tracking-[.14em] uppercase text-[#3a6199] hover:text-[#0f2d56] hover:border-b hover:border-[#1a4a8a] pb-[2px] transition-colors">Home</a></li>
          <li><a href="#listings" className="text-[11px] font-semibold tracking-[.14em] uppercase text-[#3a6199] hover:text-[#0f2d56] hover:border-b hover:border-[#1a4a8a] pb-[2px] transition-colors">Our listings</a></li>
          <li><a href="#listings" className="text-[11px] font-semibold tracking-[.14em] uppercase text-[#3a6199] hover:text-[#0f2d56] hover:border-b hover:border-[#1a4a8a] pb-[2px] transition-colors">Buy</a></li>
          <li><a href="#about" className="text-[11px] font-semibold tracking-[.14em] uppercase text-[#3a6199] hover:text-[#0f2d56] hover:border-b hover:border-[#1a4a8a] pb-[2px] transition-colors">About us</a></li>
          <li>
            <Link href="/investments" className="text-[11px] font-semibold tracking-[.14em] uppercase text-[#3a6199] hover:text-[#0f2d56] hover:border-b hover:border-[#1a4a8a] pb-[2px] transition-colors">
              Investments
            </Link>
          </li>
          <li><a href="#contact-info" className="text-[11px] font-semibold tracking-[.14em] uppercase text-[#3a6199] hover:text-[#0f2d56] hover:border-b hover:border-[#1a4a8a] pb-[2px] transition-colors">Contact</a></li>
        </ul>
      </nav>

      <ListPropertyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
