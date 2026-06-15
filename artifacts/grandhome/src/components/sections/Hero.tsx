export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[420px] overflow-hidden flex items-center justify-center text-center">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(155deg, #1a4a8a 0%, #0f2d56 45%, #071a35 100%)" }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(7,26,53,.25)" }} />

      {/* Subtle geometric watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <svg width="600" height="400" viewBox="0 0 600 400" fill="none">
          <rect x="1" y="1" width="598" height="398" stroke="white" strokeWidth="1" fill="none"/>
          <rect x="30" y="30" width="540" height="340" stroke="white" strokeWidth="0.5" fill="none"/>
        </svg>
      </div>

      <div className="relative z-10 text-white">
        <p className="text-[10px] font-sans font-medium tracking-[.35em] uppercase text-blue-300 mb-4">
          Luxury Real Estate
        </p>
        <h1 className="font-serif text-[54px] font-semibold tracking-[.02em] leading-[1.05] mb-3">
          Grandhome Investments
        </h1>
        <p className="text-[12px] font-sans font-light tracking-[.22em] uppercase text-blue-200 mb-8">
          Your dream home awaits
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => scrollTo("listings")}
            className="h-11 px-8 text-[11px] font-sans font-semibold tracking-[.14em] uppercase bg-white text-[#0f2d56] hover:bg-blue-50 transition-colors"
          >
            All properties
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="h-11 px-8 text-[11px] font-sans font-semibold tracking-[.14em] uppercase border border-white/70 bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
