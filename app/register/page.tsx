"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("id", { ascending: false });

    setPosts(data || []);
  }

  async function addPost() {
    if (!text) return;
    await supabase.from("posts").insert({ content: text });
    setText("");
    loadPosts();
  }

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>🦊 FOXFEED</h1>

      {/* composer */}
      <div style={{
        background: "#1a1a1a",
        padding: 16,
        borderRadius: 16,
        marginTop: 20,
        marginBottom: 20
      }}>
        <input
          placeholder="What’s happening?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 12,
            border: "none",
            outline: "none",
            background: "#0f0f0f",
            color: "white"
          }}
        />

        <button
          onClick={addPost}
          style={{
            marginTop: 10,
            background: "#ff6b00",
            border: "none",
            padding: "8px 16px",
            borderRadius: 10,
            color: "white",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Post
        </button>
      </div>

      {/* posts */}
      {posts.map((p) => (
        <div
          key={p.id}
          style={{
            background: "#1a1a1a",
            padding: 16,
            borderRadius: 16,
            marginBottom: 12
          }}
        >
          <div style={{ fontSize: 14, opacity: 0.6 }}>anonymous</div>
          <div style={{ fontSize: 16, marginTop: 6 }}>{p.content}</div>
        </div>
      ))}
    </div>
  );
}
