"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [posts, setPosts] = useState<string[]>([]);
  const [text, setText] = useState("");

  // load posts
  useEffect(() => {
    const saved = localStorage.getItem("foxfeed-posts");
    if (saved) setPosts(JSON.parse(saved));
  }, []);

  // save posts
  useEffect(() => {
    localStorage.setItem("foxfeed-posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = () => {
    if (!text.trim()) return;
    setPosts([text, ...posts]);
    setText("");
  };

  return (
    <main style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>🦊 FOXFEED</h1>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a post..."
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={addPost}>Post</button>
      </div>

      <div style={{ marginTop: 20 }}>
        {posts.map((p, i) => (
          <div key={i} style={{ padding: 12, border: "1px solid #ddd", marginBottom: 10 }}>
            {p}
          </div>
        ))}
      </div>
    </main>
  );
}
