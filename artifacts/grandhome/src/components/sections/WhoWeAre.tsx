const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: "Halal & Safe Investments",
    body: "We provide a secure investment environment fully aligned with Islamic values and Sharia-compliant principles. Our projects are strategically located in established central New Jersey communities with strong resale demand. Every investor becomes a named partner in the project LLC, ensuring complete financial transparency from acquisition through to closing.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    title: "A Proven Approach",
    body: "Our methodology is grounded in years of hands-on experience and refined through every project we undertake. Investors receive timely progress updates, streamlined transaction processes, and detailed profit analysis throughout. Full transparency of costs and estimates is accessible in real time, and proceeds can seamlessly roll over into subsequent projects — compounding portfolio growth with each cycle.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
      </svg>
    ),
    title: "Why Us?",
    body: "Our team is dedicated to putting idle capital to work through profitable, Sharia-compliant real estate ventures. Every opportunity is preceded by rigorous market analysis and comparative research to identify the right property at the right time. We model multiple investment scenarios for each acquisition so that every decision is informed, strategic, and aligned with your financial goals. Our track record makes the case.",
  },
];

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
