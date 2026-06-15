export function WhoWeAre() {
  return (
    <section className="grid grid-cols-2 min-h-[320px]" id="about">
      <div
        className="flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg,#b0bec5,#546e7a)" }}
      >
        <div className="text-center text-white/20 select-none">
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M90 30L20 90H40V155H80V115H100V155H140V90H160L90 30Z" fill="white" fillOpacity="0.25"/>
            <rect x="70" y="115" width="40" height="40" fill="white" fillOpacity="0.1"/>
          </svg>
        </div>
      </div>
      <div className="bg-[#f5f5f5] px-[52px] py-14 flex flex-col justify-center">
        <div className="text-[10px] font-semibold tracking-[.22em] uppercase text-[#888] mb-[14px]">
          Who we are
        </div>
        <h2 className="font-serif text-[34px] font-medium leading-[1.15] mb-4">
          A Team You Can Trust
        </h2>
        <p className="text-[13px] leading-[1.8] text-[#555] mb-6">
          We specialise in off-market new construction homes that help you find a full list of
          not-yet-listed properties. We treat every purchase and sale with the respect it deserves —
          ensuring that the price negotiated is fair for all parties. Our job is to get to know you,
          to understand your home and your family, and then meet all of your needs and desires. Our
          job is to make your dream come true.
        </p>
        <a
          href="#contact"
          className="self-start h-[38px] px-7 border border-[#111] bg-transparent text-[#111] text-[10px] font-semibold tracking-[.16em] uppercase hover:bg-[#111] hover:text-white transition-colors leading-[38px] inline-block"
        >
          Meet our team
        </a>
      </div>
    </section>
  );
}
