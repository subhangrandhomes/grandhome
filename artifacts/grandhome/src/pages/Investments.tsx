import { useState, useEffect, useCallback } from "react";
import { useAdmin } from "@/context/AdminContext";
import { useInvestor } from "@/context/InvestorContext";

type Property = {
  id: number; name: string; address: string; price: string;
  beds: number; baths: number; sqft: number; type: string;
  mode: string; status: string; photos: string[];
  projectStartDate?: string | null; projectCompletionDate?: string | null;
};
type InvestorRecord = { id: number; username: string; status: string; createdAt: string };

const TYPE_BG: Record<string, string> = {
  House: "linear-gradient(135deg, #c2d4e8 0%, #8faac8 100%)",
  Condo: "linear-gradient(135deg, #b8c8e0 0%, #7a9abf 100%)",
  Townhouse: "linear-gradient(135deg, #c8d8ec 0%, #90aacf 100%)",
  Apartment: "linear-gradient(135deg, #bdd0e8 0%, #85a5c5 100%)",
};

function fmt(n: number) { return n.toLocaleString("en-US"); }

function PropertyCard({ p }: { p: Property }) {
  const photo = p.photos?.[0] ?? null;
  const isCompleted = p.status === "completed";
  return (
    <div className="bg-white border border-blue-100 flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] relative">
        {photo
          ? <img src={photo} alt={p.name} className="w-full h-full object-cover" />
          : <div className="w-full h-full" style={{ background: TYPE_BG[p.type] ?? TYPE_BG.House }} />}
        <span className={`absolute top-2 right-2 text-[9px] font-sans font-bold tracking-[.15em] uppercase px-2 py-[2px] ${isCompleted ? "bg-green-500/90 text-white" : "bg-amber-400/90 text-white"}`}>
          {isCompleted ? "Completed" : "Ongoing"}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-1">
        <p className="font-serif text-[18px] font-semibold text-[#0f2d56] leading-tight">{p.name}</p>
        <p className="text-[11px] font-sans text-[#6b88aa]">{p.address}</p>
        <p className="font-serif text-[20px] font-bold text-[#1a4a8a] mt-1">{p.price}</p>
        <div className="flex gap-4 mt-1">
          {[{ v: p.beds, l: "Beds" }, { v: p.baths, l: "Baths" }, { v: fmt(p.sqft), l: "Sq ft" }].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-serif text-[15px] font-semibold text-[#0f2d56]">{s.v}</div>
              <div className="text-[9px] font-sans uppercase tracking-[.1em] text-[#6b88aa]">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Admin Panel ─────────────────────────────────────────────────────────────
function AdminPanel() {
  const { adminFetch } = useAdmin();
  const [investors, setInvestors] = useState<InvestorRecord[]>([]);
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [assignedMap, setAssignedMap] = useState<Record<number, number[]>>({});
  const [expanded, setExpanded] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [invRes, propRes] = await Promise.all([
      adminFetch("/api/admin/investors"),
      fetch("/api/properties"),
    ]);
    const invs = await invRes.json() as InvestorRecord[];
    const props = await propRes.json() as { properties: Property[] };
    setInvestors(invs);
    setAllProperties(props.properties ?? []);
    setLoading(false);
  }, [adminFetch]);

  useEffect(() => { void loadData(); }, [loadData]);

  const loadAssigned = useCallback(async (investorId: number) => {
    const res = await adminFetch(`/api/admin/investors/${investorId}/properties`);
    const ids = await res.json() as number[];
    setAssignedMap((m) => ({ ...m, [investorId]: ids }));
  }, [adminFetch]);

  const handleExpand = async (id: number) => {
    if (expanded === id) { setExpanded(null); return; }
    setExpanded(id);
    await loadAssigned(id);
  };

  const handleApprove = async (id: number) => {
    await adminFetch(`/api/admin/investors/${id}/approve`, { method: "PUT" });
    await loadData();
  };

  const handleReject = async (id: number) => {
    await adminFetch(`/api/admin/investors/${id}/reject`, { method: "PUT" });
    await loadData();
  };

  const toggleProperty = async (investorId: number, propertyId: number) => {
    const assigned = assignedMap[investorId] ?? [];
    if (assigned.includes(propertyId)) {
      await adminFetch(`/api/admin/investors/${investorId}/properties/${propertyId}`, { method: "DELETE" });
    } else {
      await adminFetch(`/api/admin/investors/${investorId}/properties`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId }),
      });
    }
    await loadAssigned(investorId);
  };

  const pending = investors.filter((i) => i.status === "pending");
  const approved = investors.filter((i) => i.status === "approved");
  const rejected = investors.filter((i) => i.status === "rejected");

  if (loading) return <div className="text-center py-16 text-[#6b88aa] font-sans text-[13px]">Loading…</div>;

  return (
    <div className="max-w-[860px] mx-auto px-6 py-10 flex flex-col gap-10">
      <div>
        <p className="text-[10px] font-sans font-semibold tracking-[.2em] uppercase text-[#3a7bd5] mb-1">Admin</p>
        <h2 className="font-serif text-[28px] text-[#0f2d56]">Investor Management</h2>
      </div>

      {/* Pending */}
      <section>
        <h3 className="font-serif text-[18px] text-[#0f2d56] mb-3 flex items-center gap-2">
          Pending Requests
          {pending.length > 0 && <span className="bg-amber-400 text-white text-[10px] font-sans font-bold px-2 py-[1px] rounded-full">{pending.length}</span>}
        </h3>
        {pending.length === 0
          ? <p className="text-[13px] font-sans text-[#6b88aa]">No pending requests.</p>
          : <div className="flex flex-col gap-2">
              {pending.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between bg-amber-50 border border-amber-200 px-4 py-3">
                  <div>
                    <span className="font-sans font-semibold text-[14px] text-[#0f2d56]">{inv.username}</span>
                    <span className="ml-3 text-[11px] font-sans text-[#6b88aa]">{new Date(inv.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleApprove(inv.id)} className="h-8 px-4 bg-green-600 text-white text-[10px] font-sans font-semibold tracking-[.1em] uppercase hover:bg-green-700 transition-colors">Approve</button>
                    <button onClick={() => handleReject(inv.id)} className="h-8 px-4 border border-red-300 text-red-600 text-[10px] font-sans font-semibold tracking-[.1em] uppercase hover:bg-red-50 transition-colors">Reject</button>
                  </div>
                </div>
              ))}
            </div>}
      </section>

      {/* Approved — property assignment */}
      <section>
        <h3 className="font-serif text-[18px] text-[#0f2d56] mb-3">Approved Investors</h3>
        {approved.length === 0
          ? <p className="text-[13px] font-sans text-[#6b88aa]">No approved investors yet.</p>
          : <div className="flex flex-col gap-2">
              {approved.map((inv) => (
                <div key={inv.id} className="border border-blue-100 overflow-hidden">
                  <button
                    onClick={() => handleExpand(inv.id)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-[#f0f5ff] hover:bg-[#e8effe] transition-colors"
                  >
                    <span className="font-sans font-semibold text-[14px] text-[#0f2d56]">{inv.username}</span>
                    <span className="text-[11px] font-sans text-[#6b88aa]">{expanded === inv.id ? "▲ Close" : "▼ Manage properties"}</span>
                  </button>
                  {expanded === inv.id && (
                    <div className="p-4 bg-white">
                      <p className="text-[10px] font-sans font-semibold tracking-[.15em] uppercase text-[#6b88aa] mb-3">Assign properties — check to include</p>
                      {allProperties.length === 0
                        ? <p className="text-[13px] font-sans text-[#6b88aa]">No properties in the system yet.</p>
                        : <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {allProperties.map((p) => {
                              const checked = (assignedMap[inv.id] ?? []).includes(p.id);
                              return (
                                <label key={p.id} className={`flex items-center gap-3 px-3 py-2 border cursor-pointer transition-colors ${checked ? "border-[#1a4a8a] bg-blue-50" : "border-blue-100 hover:bg-[#f8faff]"}`}>
                                  <input type="checkbox" checked={checked} onChange={() => toggleProperty(inv.id, p.id)} className="accent-[#1a4a8a] w-4 h-4 flex-shrink-0" />
                                  <div className="min-w-0">
                                    <p className="font-sans font-semibold text-[12px] text-[#0f2d56] truncate">{p.name}</p>
                                    <p className="font-sans text-[11px] text-[#6b88aa] truncate">{p.address}</p>
                                  </div>
                                </label>
                              );
                            })}
                          </div>}
                    </div>
                  )}
                </div>
              ))}
            </div>}
      </section>

      {/* Rejected */}
      {rejected.length > 0 && (
        <section>
          <h3 className="font-serif text-[18px] text-[#0f2d56] mb-3">Rejected</h3>
          <div className="flex flex-col gap-2">
            {rejected.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between bg-red-50 border border-red-100 px-4 py-3">
                <span className="font-sans font-semibold text-[14px] text-[#0f2d56]">{inv.username}</span>
                <button onClick={() => handleApprove(inv.id)} className="h-8 px-4 border border-green-400 text-green-700 text-[10px] font-sans font-semibold tracking-[.1em] uppercase hover:bg-green-50 transition-colors">Re-approve</button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ── Investor Portal ──────────────────────────────────────────────────────────
function InvestorPortal() {
  const { investor, login, register, logout } = useInvestor();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loadingProps, setLoadingProps] = useState(false);

  useEffect(() => {
    if (!investor) return;
    setLoadingProps(true);
    const token = localStorage.getItem("investor_token") ?? "";
    fetch("/api/investors/me/properties", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data: Property[]) => setProperties(data))
      .finally(() => setLoadingProps(false));
  }, [investor]);

  const handleSubmit = async () => {
    if (!username || !password) { setMsg({ text: "Please fill in all fields.", ok: false }); return; }
    setLoading(true); setMsg(null);
    if (tab === "login") {
      const res = await login(username, password);
      if (!res.ok) setMsg({ text: res.error ?? "Login failed.", ok: false });
    } else {
      const res = await register(username, password);
      if (res.ok) { setMsg({ text: "Request submitted! An admin will review your account.", ok: true }); setUsername(""); setPassword(""); }
      else setMsg({ text: res.error ?? "Registration failed.", ok: false });
    }
    setLoading(false);
  };

  if (investor) {
    return (
      <div className="max-w-[900px] mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[10px] font-sans font-semibold tracking-[.2em] uppercase text-[#3a7bd5] mb-1">Investment Portal</p>
            <h2 className="font-serif text-[28px] text-[#0f2d56]">Welcome, {investor.username}</h2>
          </div>
          <button onClick={logout} className="h-9 px-4 border border-blue-200 text-[#3a6199] text-[10px] font-sans font-semibold tracking-[.12em] uppercase hover:border-[#0f2d56] hover:text-[#0f2d56] transition-colors">Sign out</button>
        </div>
        {loadingProps
          ? <p className="text-center text-[13px] font-sans text-[#6b88aa] py-10">Loading your properties…</p>
          : properties.length === 0
            ? <div className="text-center py-16 border border-dashed border-blue-200">
                <p className="font-serif text-[20px] text-[#0f2d56] mb-2">No properties assigned yet</p>
                <p className="text-[13px] font-sans text-[#6b88aa]">Contact the admin to have your properties linked to your account.</p>
              </div>
            : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {properties.map((p) => <PropertyCard key={p.id} p={p} />)}
              </div>}
      </div>
    );
  }

  return (
    <div className="max-w-[420px] mx-auto px-6 py-16">
      <div className="mb-8 text-center">
        <p className="text-[10px] font-sans font-semibold tracking-[.2em] uppercase text-[#3a7bd5] mb-2">Investor Portal</p>
        <h2 className="font-serif text-[28px] text-[#0f2d56] mb-2">Your Investments</h2>
        <p className="text-[13px] font-sans text-[#6b88aa]">Log in to view the properties linked to your account, or request access.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-blue-100 mb-6">
        {(["login", "register"] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setMsg(null); }}
            className={`flex-1 pb-3 text-[11px] font-sans font-semibold tracking-[.14em] uppercase transition-colors border-b-2 -mb-[1px] ${tab === t ? "border-[#1a4a8a] text-[#1a4a8a]" : "border-transparent text-[#6b88aa] hover:text-[#3a6199]"}`}
          >
            {t === "login" ? "Sign In" : "Request Access"}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-[9px] font-sans font-semibold tracking-[.14em] uppercase text-[#6b88aa]">Username</label>
          <input
            value={username} onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="your username"
            className="h-9 border border-blue-200 px-3 text-[12px] font-sans text-[#0f2d56] outline-none focus:border-[#1a4a8a] transition-colors w-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[9px] font-sans font-semibold tracking-[.14em] uppercase text-[#6b88aa]">Password</label>
          <input
            type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="••••••••"
            className="h-9 border border-blue-200 px-3 text-[12px] font-sans text-[#0f2d56] outline-none focus:border-[#1a4a8a] transition-colors w-full"
          />
        </div>
        {tab === "register" && (
          <p className="text-[11px] font-sans text-[#6b88aa] leading-relaxed">Your request will be reviewed by an admin before you can log in.</p>
        )}
        {msg && (
          <p className={`text-[12px] font-sans px-3 py-2 border ${msg.ok ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-600"}`}>{msg.text}</p>
        )}
        <button
          onClick={handleSubmit} disabled={loading}
          className="h-10 bg-[#1a4a8a] text-white text-[11px] font-sans font-semibold tracking-[.14em] uppercase hover:bg-[#0f2d56] transition-colors disabled:opacity-50"
        >
          {loading ? "Please wait…" : tab === "login" ? "Sign In" : "Request Access"}
        </button>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Investments() {
  const { isAdmin } = useAdmin();

  return (
    <div className="min-h-[60vh] bg-[#f8faff]">
      <div style={{ background: "linear-gradient(90deg, #0f2d56 0%, #1a4a8a 100%)" }} className="px-10 py-10">
        <p className="text-[10px] font-sans font-semibold tracking-[.3em] uppercase text-blue-300 mb-2">Grand Homes</p>
        <h1 className="font-serif text-[38px] font-semibold text-white leading-tight">Investments</h1>
        <p className="text-[13px] font-sans text-blue-200 mt-2">Private portal for Grand Homes investors.</p>
      </div>
      <div>
        {isAdmin ? <AdminPanel /> : <InvestorPortal />}
      </div>
    </div>
  );
}
