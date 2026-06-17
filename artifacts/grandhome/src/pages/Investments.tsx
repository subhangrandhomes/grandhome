import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const WHY_ITEMS = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: "Halal & Safe Investments",
    body: "We provide a secure investment environment fully aligned with Islamic values and Sharia-compliant principles. Our projects are strategically located in established central New Jersey communities with strong resale demand. Every investor becomes a named partner in the project LLC, ensuring complete financial transparency from acquisition through to closing.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    title: "A Proven Approach",
    body: "Our methodology is grounded in years of hands-on experience and refined through every project we undertake. Investors receive timely progress updates, streamlined transaction processes, and detailed profit analysis throughout. Full transparency of costs and estimates is accessible in real time, and proceeds can seamlessly roll over into subsequent projects — compounding portfolio growth with each cycle.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
      </svg>
    ),
    title: "Why Us?",
    body: "Our team is dedicated to putting idle capital to work through profitable, Sharia-compliant real estate ventures. Every opportunity is preceded by rigorous market analysis and comparative research to identify the right property at the right time. We model multiple investment scenarios for each acquisition so that every decision is informed, strategic, and aligned with your financial goals. Our track record makes the case.",
  },
];

const HOW_STEPS = [
  { num: "01", title: "Express Interest", body: "Reach out to our investment team by phone or email. We'll schedule a personal consultation to learn your goals." },
  { num: "02", title: "Review Opportunities", body: "We'll share current projects that match your investment profile — with full details, locations, and projected returns." },
  { num: "03", title: "Commit & Close", body: "Once you've selected a project, our team handles all paperwork and guides you through a smooth closing process." },
  { num: "04", title: "Grow Your Portfolio", body: "As a Grand Homes investor, you'll receive ongoing updates and first access to future off-market opportunities." },
];

export default function Investments() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative py-24 flex items-center justify-center text-center overflow-hidden"
        style={{ background: "linear-gradient(155deg, #1a4a8a 0%, #0f2d56 50%, #071a35 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-8">
          <p className="text-[10px] font-sans font-semibold tracking-[.35em] uppercase text-blue-300 mb-4">Investment Opportunities</p>
          <h1 className="font-serif text-[52px] font-semibold text-white leading-[1.05] mb-5">
            Build Wealth Through Real Estate
          </h1>
          <p className="text-[14px] font-sans text-blue-200 leading-[1.85] mb-9 max-w-lg mx-auto">
            Grand Homes partners with private investors to acquire and develop premium residential
            properties across New Jersey. Join our exclusive network and grow your portfolio with confidence.
          </p>
          <a
            href="#contact-info"
            className="inline-block h-12 px-10 bg-white text-[#0f2d56] text-[11px] font-sans font-semibold tracking-[.16em] uppercase hover:bg-blue-50 transition-colors leading-[48px]"
          >
            Contact our team
          </a>
        </div>
      </section>

      {/* Stats row */}
      <div className="grid grid-cols-2 border-b border-blue-100">
        {[
          { num: "15+", label: "Years experience" },
          { num: "150+", label: "Homes delivered" },
        ].map((s, i) => (
          <div key={i} className="py-10 text-center border-r border-blue-100 last:border-r-0">
            <div className="font-serif text-[38px] font-semibold text-[#0f2d56] leading-none mb-1">{s.num}</div>
            <div className="text-[10px] font-sans font-medium tracking-[.18em] uppercase text-[#6b88aa]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Why invest */}
      <section className="py-20 px-20 bg-[#f8faff]">
        <div className="text-center mb-14">
          <p className="text-[10px] font-sans font-semibold tracking-[.3em] uppercase text-[#3a7bd5] mb-2">The Grand Homes Edge</p>
          <h2 className="font-serif text-[34px] font-semibold text-[#0f2d56]">Why Invest With Us</h2>
          <div className="w-10 h-[2px] bg-[#3a7bd5] mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
          {WHY_ITEMS.map((item, i) => (
            <div key={i} className="bg-white border border-blue-100 p-8 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-full bg-[#e8f0fa] flex items-center justify-center text-[#1a4a8a] mb-5">
                {item.icon}
              </div>
              <h3 className="font-serif text-[19px] font-semibold text-[#0f2d56] mb-3">{item.title}</h3>
              <p className="text-[12px] font-sans leading-[1.85] text-[#4a6080]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-20 bg-white">
        <div className="text-center mb-14">
          <p className="text-[10px] font-sans font-semibold tracking-[.3em] uppercase text-[#3a7bd5] mb-2">Simple Process</p>
          <h2 className="font-serif text-[34px] font-semibold text-[#0f2d56]">How It Works</h2>
          <div className="w-10 h-[2px] bg-[#3a7bd5] mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-4 gap-6 max-w-5xl mx-auto">
          {HOW_STEPS.map((step, i) => (
            <div key={i} className="text-center relative">
              {i < HOW_STEPS.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-[1px] bg-blue-200" />
              )}
              <div className="w-12 h-12 rounded-full border-2 border-[#1a4a8a] flex items-center justify-center mx-auto mb-5 bg-white relative z-10">
                <span className="font-sans text-[11px] font-bold text-[#1a4a8a] tracking-[.04em]">{step.num}</span>
              </div>
              <h3 className="font-serif text-[17px] font-semibold text-[#0f2d56] mb-2">{step.title}</h3>
              <p className="text-[12px] font-sans leading-[1.8] text-[#6b88aa]">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section
        className="py-16 px-20 text-white text-center"
        style={{ background: "linear-gradient(90deg, #0f2d56 0%, #1a4a8a 100%)" }}
      >
        <p className="text-[10px] font-sans font-semibold tracking-[.3em] uppercase text-blue-300 mb-3">Ready to invest?</p>
        <h2 className="font-serif text-[34px] font-semibold mb-4">Let's Talk About Your Goals</h2>
        <p className="text-[13px] font-sans text-blue-200 leading-[1.8] max-w-xl mx-auto mb-8">
          Our investment team is available to walk you through current opportunities
          and answer any questions you have. No obligation — just a conversation.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="mailto:haroon.grandhomes@gmail.com"
            className="h-11 px-9 border border-white/70 bg-white/10 text-white text-[11px] font-sans font-semibold tracking-[.14em] uppercase hover:bg-white/20 transition-colors leading-[44px] inline-block"
          >
            Email us
          </a>
          <a
            href="tel:7325265695"
            className="h-11 px-9 bg-white text-[#0f2d56] text-[11px] font-sans font-semibold tracking-[.14em] uppercase hover:bg-blue-50 transition-colors leading-[44px] inline-block"
          >
            Call 732-526-5695
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
