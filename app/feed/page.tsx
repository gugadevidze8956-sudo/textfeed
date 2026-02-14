"use client";
import { useEffect, useState } from "react";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("posts") || "[]");
    setPosts(data);
  }, []);

  return (
    <div className="p-4 text-white">
      <h1>Feed</h1>

      {posts.map((p) => (
        <div key={p.id} className="bg-zinc-900 p-3 rounded mt-2">
          <b>@{p.username}</b>
          <p>{p.content}</p>
        </div>
      ))}
    </div>
  );
}
