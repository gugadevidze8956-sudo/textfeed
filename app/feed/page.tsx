"use client";

import { useEffect, useState } from "react";

type Post = {
  id: number;
  username: string;
  content: string;
};

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("posts");
    if (stored) {
      setPosts(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">FOXFEED 🔥</h1>

      {posts.length === 0 && (
        <p className="text-center text-gray-400">No posts yet...</p>
      )}

      <div className="space-y-3 max-w-md mx-auto">
        {posts.map((p) => (
          <div key={p.id} className="bg-zinc-900 p-3 rounded-xl shadow">
            <b className="text-orange-400">@{p.username}</b>
            <p className="mt-1">{p.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}