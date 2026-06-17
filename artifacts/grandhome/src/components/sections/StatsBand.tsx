import { useGetPropertyStats } from "@workspace/api-client-react";

export function StatsBand() {
  const { data: stats } = useGetPropertyStats();

  const items = [
    { num: stats ? `${stats.totalListings}+` : "150+", label: "Homes delivered" },
    { num: "110%", label: "Sale-to-list price ratio" },
    { num: "11", label: "Avg. days on market" },
    { num: "$250M+", label: "Total volume sold" },
  ];

  return (
    <div
      className="grid grid-cols-4"
      style={{ background: "linear-gradient(90deg, #0c2548 0%, #1a4a8a 100%)" }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className="relative py-12 px-6 text-center"
        >
          {i < items.length - 1 && (
            <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-white/10" />
          )}
          <div className="font-serif text-[46px] font-semibold leading-none mb-2 text-white">{item.num}</div>
          <div className="text-[9px] font-sans font-semibold tracking-[.22em] uppercase text-blue-300">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
