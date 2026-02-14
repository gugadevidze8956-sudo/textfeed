"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  // 🔥 Service Worker რეგისტრაცია (PWA)
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-white flex justify-center">
      <div className="w-full max-w-md border-x border-gray-800 min-h-screen relative">

        {/* HEADER */}
        <div className="sticky top-0 bg-black p-4 text-center font-bold text-lg border-b border-gray-800">
          FOXFEED 🦊🔥
        </div>

        {/* FEED PREVIEW */}
        <div className="p-4 space-y-4 pb-24">
          <div className="bg-zinc-900 rounded-xl p-4">
            <p className="text-sm text-gray-400">@guga</p>
            <p className="text-lg mt-1">FOXFEED უკვე აპია 📱🔥</p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-4">
            <p className="text-sm text-gray-400">@fox</p>
            <p className="text-lg mt-1">Install me on your phone 🚀</p>
          </div>
        </div>

        {/* 🔥 BOTTOM NAVBAR */}
        <div className="fixed bottom-0 w-full max-w-md bg-black border-t border-gray-800 flex justify-around py-3 text-xl">
          <Link href="/feed" className="hover:scale-110 transition">
            🏠
          </Link>

          <Link href="/create" className="hover:scale-110 transition">
            ➕
          </Link>

          <Link href="/profile" className="hover:scale-110 transition">
            👤
          </Link>
        </div>

      </div>
    </main>
  );
}
