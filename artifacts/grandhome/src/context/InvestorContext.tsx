import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

interface InvestorUser { id: number; username: string; }

interface InvestorContextValue {
  investor: InvestorUser | null;
  login: (username: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (username: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

const InvestorContext = createContext<InvestorContextValue>({
  investor: null,
  login: async () => ({ ok: false }),
  register: async () => ({ ok: false }),
  logout: () => {},
});

const TOKEN_KEY = "investor_token";

export function InvestorProvider({ children }: { children: ReactNode }) {
  const [investor, setInvestor] = useState<InvestorUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return;
    fetch("/api/investors/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.ok ? r.json() : null)
      .then((data: { id: number; username: string } | null) => { if (data) setInvestor(data); else localStorage.removeItem(TOKEN_KEY); })
      .catch(() => localStorage.removeItem(TOKEN_KEY));
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const res = await fetch("/api/investors/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json() as { token?: string; investor?: InvestorUser; error?: string };
    if (res.ok && data.token && data.investor) {
      localStorage.setItem(TOKEN_KEY, data.token);
      setInvestor(data.investor);
      return { ok: true };
    }
    return { ok: false, error: data.error ?? "Login failed." };
  }, []);

  const register = useCallback(async (username: string, password: string) => {
    const res = await fetch("/api/investors/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json() as { error?: string };
    if (res.ok) return { ok: true };
    return { ok: false, error: data.error ?? "Registration failed." };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setInvestor(null);
  }, []);

  return (
    <InvestorContext.Provider value={{ investor, login, register, logout }}>
      {children}
    </InvestorContext.Provider>
  );
}

export function useInvestor() {
  return useContext(InvestorContext);
}
