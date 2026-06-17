import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const WHY_ITEMS = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: "New Construction Focus",
    body: "We specialise in off-market new construction homes, giving investors first access to properties before they hit the public market.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Strong Returns",
    body: "Our portfolio consistently delivers above-market returns. We target properties with strong appreciation potential and rental yield.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Trusted & Transparent",
    body: "Every deal is presented with full financials and clear projections. We believe in complete transparency so you can invest with confidence.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "Exclusive Network",
    body: "Join a private network of investors who receive off-market opportunities, early project previews, and direct access to our acquisition team.",
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
      <div className="grid grid-cols-4 border-b border-blue-100">
        {[
          { num: "$250M+", label: "Total volume" },
          { num: "110%", label: "Avg. sale-to-list ratio" },
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
        <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
          {WHY_ITEMS.map((item, i) => (
            <div key={i} className="bg-white border border-blue-100 p-8 flex gap-6 hover:shadow-md transition-shadow">
              <div className="text-[#1a4a8a] flex-shrink-0 mt-1">{item.icon}</div>
              <div>
                <h3 className="font-serif text-[20px] font-semibold text-[#0f2d56] mb-2">{item.title}</h3>
                <p className="text-[13px] font-sans leading-[1.8] text-[#4a6080]">{item.body}</p>
              </div>
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
