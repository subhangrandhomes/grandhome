import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface AdminContextValue {
  isAdmin: boolean;
  adminPassword: string;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  adminFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

const AdminContext = createContext<AdminContextValue>({
  isAdmin: false,
  adminPassword: "",
  login: async () => false,
  logout: () => {},
  adminFetch: (url) => fetch(url),
});

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  const login = useCallback(async (password: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const data = await res.json() as { ok: boolean };
        if (data.ok) { setIsAdmin(true); setAdminPassword(password); return true; }
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  const logout = useCallback(() => { setIsAdmin(false); setAdminPassword(""); }, []);

  const adminFetch = useCallback((url: string, options: RequestInit = {}) => {
    return fetch(url, {
      ...options,
      headers: { ...(options.headers ?? {}), "x-admin-password": adminPassword },
    });
  }, [adminPassword]);

  return (
    <AdminContext.Provider value={{ isAdmin, adminPassword, login, logout, adminFetch }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
