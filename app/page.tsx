"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (user) {
      router.replace("/feed");
    } else {
      router.replace("/login");
    }
  }, [user, loading]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Loading...
    </div>
  );
}
