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
    <div className="bg-[#3a3a3a] text-white grid grid-cols-4">
      {items.map((item, i) => (
        <div
          key={i}
          className="py-11 px-5 text-center border-r border-white/10 last:border-r-0"
        >
          <div className="font-serif text-[42px] font-medium leading-none mb-2">{item.num}</div>
          <div className="text-[10px] font-medium tracking-[.18em] uppercase text-[#aaa]">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
