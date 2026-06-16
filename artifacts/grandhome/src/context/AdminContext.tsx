import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface AdminContextValue {
  isAdmin: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextValue>({
  isAdmin: false,
  login: async () => false,
  logout: () => {},
});

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const login = useCallback(async (password: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const data = await res.json() as { ok: boolean };
        if (data.ok) { setIsAdmin(true); return true; }
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  const logout = useCallback(() => setIsAdmin(false), []);

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
