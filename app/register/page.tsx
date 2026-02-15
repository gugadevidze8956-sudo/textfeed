"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return alert(error.message);

    alert("Registered!");
    router.push("/login");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Register</h1>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
