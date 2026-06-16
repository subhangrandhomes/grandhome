export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden flex items-center justify-center text-center" style={{ minHeight: "560px" }}>
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #1a4a8a 0%, #0c2548 40%, #060f1e 100%)" }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.06]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Glow accent */}
      <div
        className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-[0.12] blur-[80px]"
        style={{ background: "radial-gradient(circle, #4a90d9 0%, transparent 70%)" }}
      />

      {/* Content */}
      <div className="relative z-10 text-white px-6 max-w-3xl mx-auto py-24">
        <p className="text-[10px] font-sans font-semibold tracking-[.4em] uppercase text-blue-300 mb-5">
          Residential Construction &amp; Investments
        </p>
        <h1 className="font-serif text-[58px] font-semibold tracking-[.01em] leading-[1.03] mb-5">
          Grand Homes
        </h1>
        <p className="text-[15px] font-sans font-light leading-[1.75] text-blue-200 mb-10 max-w-xl mx-auto">
          New Jersey's premier residential developer. We build, list, and sell exceptional homes with unmatched expertise and dedication.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => scrollTo("listings")}
            className="h-12 px-9 text-[11px] font-sans font-semibold tracking-[.15em] uppercase bg-white text-[#0f2d56] hover:bg-blue-50 transition-colors shadow-lg"
          >
            Explore Properties
          </button>
          <button
            onClick={() => scrollTo("contact-info")}
            className="h-12 px-9 text-[11px] font-sans font-semibold tracking-[.15em] uppercase border border-white/50 text-white hover:bg-white/10 transition-colors"
          >
            Contact Us
          </button>
        </div>

        {/* Trust indicators */}
        <div className="flex justify-center gap-10 mt-14 pt-10 border-t border-white/10">
          {[
            { num: "250+", label: "Homes delivered" },
            { num: "$250M+", label: "Total volume" },
            { num: "15+", label: "Years experience" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-serif text-[26px] font-semibold text-white leading-none mb-1">{s.num}</div>
              <div className="text-[9px] font-sans tracking-[.18em] uppercase text-blue-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
