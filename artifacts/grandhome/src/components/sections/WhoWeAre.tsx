export function WhoWeAre() {
  return (
    <section id="about">
      {/* Two-column intro */}
      <div className="grid grid-cols-2" style={{ minHeight: "400px" }}>
        {/* Left visual panel */}
        <div
          className="relative flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(145deg, #0c2548 0%, #1a4a8a 60%, #2260b4 100%)" }}
        >
          <div className="absolute inset-0 opacity-[0.12]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="bp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
                <pattern id="bp-grid-lg" width="200" height="200" patternUnits="userSpaceOnUse">
                  <rect width="200" height="200" fill="url(#bp-grid)"/>
                  <path d="M 200 0 L 0 0 0 200" fill="none" stroke="white" strokeWidth="1.2"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#bp-grid-lg)" />
            </svg>
          </div>
          <div className="relative z-10 select-none">
            <svg width="240" height="220" viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M120 20L20 100H50V200H190V100H220L120 20Z" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.35" strokeWidth="1.5"/>
              <path d="M120 45L45 112H68V190H172V112H195L120 45Z" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="1"/>
              <rect x="100" y="150" width="40" height="50" fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="1.2"/>
              <rect x="60" y="130" width="30" height="25" fill="white" fillOpacity="0.1" stroke="white" strokeOpacity="0.4" strokeWidth="1.2"/>
              <rect x="150" y="130" width="30" height="25" fill="white" fillOpacity="0.1" stroke="white" strokeOpacity="0.4" strokeWidth="1.2"/>
              <line x1="75" y1="130" x2="75" y2="155" stroke="white" strokeOpacity="0.25" strokeWidth="0.8"/>
              <line x1="60" y1="142" x2="90" y2="142" stroke="white" strokeOpacity="0.25" strokeWidth="0.8"/>
              <line x1="165" y1="130" x2="165" y2="155" stroke="white" strokeOpacity="0.25" strokeWidth="0.8"/>
              <line x1="150" y1="142" x2="180" y2="142" stroke="white" strokeOpacity="0.25" strokeWidth="0.8"/>
              <circle cx="136" cy="177" r="2.5" fill="white" fillOpacity="0.5"/>
              <line x1="20" y1="200" x2="220" y2="200" stroke="white" strokeOpacity="0.3" strokeWidth="1.5"/>
              <circle cx="120" cy="110" r="105" stroke="white" strokeOpacity="0.05" strokeWidth="1" fill="none"/>
            </svg>
          </div>
          <div className="absolute bottom-8 left-8">
            <p className="text-[9px] font-sans font-semibold tracking-[.3em] uppercase text-blue-300 opacity-70">Est. 2009</p>
            <p className="text-[11px] font-sans text-white opacity-50 mt-[2px]">New Jersey &amp; Pennsylvania</p>
          </div>
        </div>

        {/* Right content */}
        <div className="bg-white px-[56px] py-14 flex flex-col justify-center">
          <p className="text-[10px] font-sans font-semibold tracking-[.25em] uppercase text-[#3a7bd5] mb-3">
            Who we are
          </p>
          <h2 className="font-serif text-[34px] font-semibold leading-[1.12] text-[#0f2d56] mb-4">
            Grand Home<br />Investments
          </h2>
          <div className="w-8 h-[2px] bg-[#3a7bd5] mb-6" />
          <p className="text-[13px] font-sans leading-[1.9] text-[#4a6080] mb-4">
            With over 100 completed projects across New Jersey and Pennsylvania, Grand Home Investments has
            cultivated a distinguished reputation built on client referrals and consistently exceptional reviews.
            Our standing in the region reflects an unwavering commitment to delivering homes of the highest standard.
          </p>
          <p className="text-[13px] font-sans leading-[1.9] text-[#4a6080] mb-7">
            Every home we build is engineered to endure — energy-efficient, sustainable, and constructed using
            premium materials and appliances from trusted brands. Our experienced Design Consultants guide each
            client through a fully personalised design journey, from initial concept through to project completion.
          </p>
          <a
            href="#contact-info"
            className="self-start h-10 px-7 bg-[#0f2d56] text-white text-[10px] font-sans font-semibold tracking-[.16em] uppercase hover:bg-[#1a4a8a] transition-colors leading-[40px] inline-block"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Feature cards */}
      <div className="bg-[#f8faff] px-8 md:px-20 py-14">
        <div className="grid grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-white border border-blue-100 p-8 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-full bg-[#e8f0fa] flex items-center justify-center text-[#1a4a8a] mb-5">
                {f.icon}
              </div>
              <h3 className="font-serif text-[19px] font-semibold text-[#0f2d56] mb-3">{f.title}</h3>
              <p className="text-[12px] font-sans leading-[1.85] text-[#4a6080]">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
