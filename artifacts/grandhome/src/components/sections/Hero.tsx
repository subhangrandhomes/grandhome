export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[380px] overflow-hidden flex items-center justify-center text-center">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg,#c9d8e8 0%,#8fa8bf 40%,#5c7a94 100%)" }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(20,35,50,.38)" }} />
      <div className="relative z-10 text-white">
        <h1 className="font-serif text-[52px] font-medium tracking-[.04em] leading-[1.1] mb-2">
          Grandhome Investments
        </h1>
        <p className="text-[12px] font-normal tracking-[.2em] uppercase opacity-85 mb-7">
          Your dream home awaits
        </p>
        <div className="flex gap-[14px] justify-center">
          <button
            onClick={() => scrollTo("listings")}
            className="h-10 px-7 text-[11px] font-semibold tracking-[.14em] uppercase bg-white text-[#111] border border-white hover:bg-[#e8e8e8] transition-colors"
          >
            All properties
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="h-10 px-7 text-[11px] font-semibold tracking-[.14em] uppercase border border-white/80 bg-white/15 text-white hover:bg-white/30 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
