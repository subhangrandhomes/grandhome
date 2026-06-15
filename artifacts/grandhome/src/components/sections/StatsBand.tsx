import { useGetPropertyStats } from "@workspace/api-client-react";

export function StatsBand() {
  const { data: stats } = useGetPropertyStats();

  const items = [
    { num: stats ? `${stats.totalListings}+` : "250+", label: "Homes sold" },
    { num: "110%", label: "Sale-to-list price ratio" },
    { num: "11", label: "Avg. days on market" },
    { num: "$250M+", label: "Total volume sold" },
  ];

  return (
    <div className="grid grid-cols-4" style={{ background: "linear-gradient(90deg, #0f2d56 0%, #1a4a8a 100%)" }}>
      {items.map((item, i) => (
        <div
          key={i}
          className="py-12 px-5 text-center border-r border-white/10 last:border-r-0"
        >
          <div className="font-serif text-[44px] font-semibold leading-none mb-2 text-white">{item.num}</div>
          <div className="text-[10px] font-sans font-medium tracking-[.2em] uppercase text-blue-200">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
