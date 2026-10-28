import { useCallback, useMemo, useState, type ReactNode } from "react";
import { AuthContext, type AuthContextValue } from "./AuthContext";
import * as authApi from "../api/authApi";
import { authStorage } from "../utils/authStorage";
import type { RegisterRequest, User } from "../types/auth";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => authStorage.getToken());
  const [user, setUser] = useState<User | null>(() => authStorage.getUser());

  const login = useCallback(async (email: string, password: string) => {
    const data = await authApi.login({ email, password });
    authStorage.save(data.token, data.user);
    setToken(data.token);
    setUser(data.user);
  }, []);

  const register = useCallback((payload: RegisterRequest) => authApi.register(payload), []);

  const logout = useCallback(() => {
    authStorage.clear();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ token, user, isAuthenticated: token !== null, login, register, logout }),
    [token, user, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
