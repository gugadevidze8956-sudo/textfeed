"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type User = {
  username: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => boolean;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("foxfeed-current-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const register = (username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("foxfeed-users") || "[]");

    const existingUser = users.find((u: User) => u.username === username);
    if (existingUser) return false;

    const newUser = { username, password };
    users.push(newUser);

    localStorage.setItem("foxfeed-users", JSON.stringify(users));
    return true;
  };

  const login = (username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("foxfeed-users") || "[]");

    const foundUser = users.find(
      (u: User) => u.username === username && u.password === password
    );

    if (!foundUser) return false;

    setUser(foundUser);
    localStorage.setItem("foxfeed-current-user", JSON.stringify(foundUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("foxfeed-current-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be inside AuthProvider");
  return context;
}
