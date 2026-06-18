export function Footer() {
  return (
    <footer id="contact-info" className="bg-[#060f1e] text-blue-200">
      {/* Top band */}
      <div
        className="px-8 md:px-20 py-12"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="grid grid-cols-3 gap-12 max-w-[1200px] mx-auto">
          {/* Brand */}
          <div>
            <img
              src="/logo.png"
              alt="Grand Homes"
              className="h-[72px] w-auto object-contain brightness-0 invert opacity-75 mb-5"
            />
            <p className="text-[12px] font-sans leading-[1.95] text-slate-400 mb-5">
              Your trusted residential construction and investments partner in New Jersey. We build, list, and deliver premium homes with unmatched dedication.
            </p>
            <div className="flex gap-4">
              {["FB", "IG", "LI"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 border border-white/10 flex items-center justify-center text-[10px] font-sans font-semibold text-slate-400 hover:border-white/30 hover:text-white transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-[10px] font-sans font-semibold tracking-[.22em] uppercase text-white mb-5">
              Location
            </h4>
            <address className="text-[12px] font-sans leading-[2] text-slate-400 not-italic">
              53 Knightsbridge Rd<br />
              Piscataway, NJ 08854<br />
              Suite 245
            </address>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-sans font-semibold tracking-[.22em] uppercase text-white mb-5">
              Get in Touch
            </h4>
            <div className="text-[12px] font-sans leading-[2] text-slate-400 space-y-0">
              <div>
                <a href="mailto:grandhomeinvestments@gmail.com" className="hover:text-white transition-colors">
                  grandhomeinvestments@gmail.com
                </a>
              </div>
              <div>
                <a href="tel:9083120636" className="hover:text-white transition-colors">
                  908-312-0636
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-8 md:px-20 py-5 max-w-[1200px] mx-auto flex justify-between items-center">
        <span className="text-[11px] font-sans text-slate-600">
          &copy; 2026 Grand Homes. All rights reserved.
        </span>
        <div className="flex gap-6">
          <a href="#" className="text-[11px] font-sans text-slate-600 hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="#" className="text-[11px] font-sans text-slate-600 hover:text-slate-300 transition-colors">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}
