"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login, register } = useAuth();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!username || !password) {
      setError("Fill all fields");
      return;
    }

    if (isLogin) {
      const success = login(username, password);
      if (!success) {
        setError("Invalid credentials");
        return;
      }
      router.push("/");
    } else {
      const success = register(username, password);
      if (!success) {
        setError("User already exists");
        return;
      }
      setIsLogin(true);
      setError("Account created! Now login.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-neutral-950 flex items-center justify-center text-white">

      <div className="bg-zinc-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-80 border border-zinc-800">
        
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-500">
          🦊 FOXFEED
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 mb-4"
        />

        {error && (
          <p className="text-red-400 text-sm mb-3">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 hover:bg-orange-600 transition font-semibold p-3 rounded-xl"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
          className="text-center text-sm mt-4 text-zinc-400 cursor-pointer hover:text-white"
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>

      </div>
    </div>
  );
}
