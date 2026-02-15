"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FeedPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div style={{ padding: 20 }}>
      <h1>FOXFEED 🔥</h1>
      <p>{user.email}</p>
      <button
        onClick={async () => {
          await logout();
          router.push("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
