"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [name, setName] = useState("");
  const router = useRouter();

  const login = () => {
    if (!name) return;

    localStorage.setItem("user", name);
    router.push("/feed");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>

      <input
        placeholder="Enter username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={login}>Enter</button>
    </div>
  );
}
