export function WhoWeAre() {
  return (
    <section className="grid grid-cols-2 min-h-[340px]" id="about">
      <div
        className="flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a4a8a 0%, #0f2d56 60%, #071a35 100%)" }}
      >
        <div className="text-center select-none p-8">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 30L20 100H45V175H80V125H120V175H155V100H180L100 30Z" fill="white" fillOpacity="0.15"/>
            <path d="M100 50L40 108H58V170H90V130H110V170H142V108H160L100 50Z" stroke="white" strokeOpacity="0.4" strokeWidth="1" fill="none"/>
            <rect x="82" y="130" width="36" height="40" stroke="white" strokeOpacity="0.3" strokeWidth="1" fill="none"/>
            <circle cx="100" cy="100" r="85" stroke="white" strokeOpacity="0.08" strokeWidth="1" fill="none"/>
          </svg>
        </div>
      </div>
      <div className="bg-[#f0f5ff] px-[52px] py-14 flex flex-col justify-center">
        <div className="text-[10px] font-sans font-semibold tracking-[.22em] uppercase text-[#3a7bd5] mb-3">
          Who we are
        </div>
        <h2 className="font-serif text-[34px] font-semibold leading-[1.15] text-[#0f2d56] mb-4">
          A Team You Can Trust
        </h2>
        <p className="text-[13px] font-sans leading-[1.85] text-[#4a6080] mb-6">
          We specialise in off-market new construction homes that help you find a full list of
          not-yet-listed properties. We treat every purchase and sale with the respect it deserves —
          ensuring that the price negotiated is fair for all parties. Our job is to get to know you,
          to understand your home and your family, and then meet all of your needs and desires.
        </p>
        <a
          href="#contact"
          className="self-start h-[38px] px-7 border border-[#1a4a8a] bg-transparent text-[#1a4a8a] text-[10px] font-sans font-semibold tracking-[.16em] uppercase hover:bg-[#1a4a8a] hover:text-white transition-colors leading-[38px] inline-block"
        >
          Meet our team
        </a>
      </div>
    </section>
  );
}
