export function Footer() {
  return (
    <footer className="bg-[#222] text-[#aaa] px-20 pt-12 pb-8">
      <div className="grid grid-cols-3 gap-12 mb-9">
        <div>
          <h4 className="text-[10px] font-semibold tracking-[.2em] uppercase text-white mb-4">
            Grandhome Investments
          </h4>
          <p className="text-[12px] leading-[1.9] text-[#888]">
            Your trusted luxury real estate partner. We find, list, and sell premium properties with
            unmatched dedication to our clients.
          </p>
          <div className="flex gap-4 mt-[14px]">
            <a href="#" className="text-[13px] text-[#888] hover:text-white transition-colors">FB</a>
            <a href="#" className="text-[13px] text-[#888] hover:text-white transition-colors">IG</a>
            <a href="#" className="text-[13px] text-[#888] hover:text-white transition-colors">LI</a>
          </div>
        </div>
        <div>
          <h4 className="text-[10px] font-semibold tracking-[.2em] uppercase text-white mb-4">Location</h4>
          <address className="text-[12px] leading-[1.9] text-[#888] not-italic">
            Suite 245<br />
            53 Knightsbridge Rd<br />
            Piscataway, NJ 08854
          </address>
        </div>
        <div>
          <h4 className="text-[10px] font-semibold tracking-[.2em] uppercase text-white mb-4">Contact</h4>
          <div className="text-[12px] leading-[1.9] text-[#888] space-y-1">
            <div>
              <a href="mailto:haroon.grandhomes@gmail.com" className="hover:text-white transition-colors">
                haroon.grandhomes@gmail.com
              </a>
            </div>
            <div>
              <a href="tel:7325265695" className="hover:text-white transition-colors">732-526-5695</a>
            </div>
            <div className="pt-2">
              <a href="mailto:aamirali@hotmail.com" className="hover:text-white transition-colors">
                aamirali@hotmail.com
              </a>
            </div>
            <div>
              <a href="tel:7322334744" className="hover:text-white transition-colors">732-233-4744</a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-[#333] pt-5 text-[11px] text-[#555] flex justify-between">
        <span>&copy; 2026 Grandhome Investments. All rights reserved.</span>
        <div className="flex gap-5">
          <a href="#" className="hover:text-[#aaa] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#aaa] transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
