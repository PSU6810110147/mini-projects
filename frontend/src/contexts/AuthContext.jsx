import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "auth_v1";

/** ตัวอย่าง user ในระบบ (Mock) */
const USERS = [
  { username: "admin", password: "1234", role: "admin", name: "Admin" },
  { username: "user", password: "1234", role: "user", name: "User" },
];

function readAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeAuth(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => readAuth()); // { username, role, name }

  useEffect(() => {
    if (auth) writeAuth(auth);
    else localStorage.removeItem(STORAGE_KEY);
  }, [auth]);

  const login = (username, password) => {
    const found = USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) return { ok: false, message: "Username หรือ Password ไม่ถูกต้อง" };

    setAuth({ username: found.username, role: found.role, name: found.name });
    return { ok: true };
  };

  const logout = () => setAuth(null);

  const value = useMemo(
    () => ({
      user: auth,                // null หรือ {username, role, name}
      isLoggedIn: !!auth,
      role: auth?.role ?? null,
      login,
      logout,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
