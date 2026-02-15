"use client";

import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function FeedPage() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth) return;

    if (!auth.user && !auth.loading) {
      router.replace("/login");
    }
  }, [auth, router]);

  if (!auth || auth.loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">FOXFEED 🔥</h1>
      <p>Welcome, {auth.user?.email}</p>
    </div>
  );
}
