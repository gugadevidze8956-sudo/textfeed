"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Post = {
  id: number;
  content: string;
  created_at: string;
};

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [text, setText] = useState("");

  // 🧠 Load posts
  const loadPosts = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("id", { ascending: false });

    if (data) setPosts(data);
  };

  // 🚀 Add post
  const addPost = async () => {
    if (!text.trim()) return;

    await supabase.from("posts").insert({
      content: text,
    });

    setText("");
  };

  // ⚡ Live updates
  useEffect(() => {
    loadPosts();

    const channel = supabase
      .channel("posts-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        (payload) => {
          console.log("LIVE:", payload);
          loadPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">FOXFEED 🔥</h1>

      {/* Create post */}
      <div className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write something..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={addPost}
          className="bg-black text-white px-4 rounded"
        >
          Post
        </button>
      </div>

      {/* Feed */}
      <div className="space-y-3">
        {posts.map((p) => (
          <div key={p.id} className="border rounded p-3">
            <p>{p.content}</p>
            <span className="text-xs text-gray-500">
              {new Date(p.created_at).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
