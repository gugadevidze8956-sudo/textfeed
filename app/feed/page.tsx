"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "../context/AuthContext";

type Post = {
  id: number;
  content: string;
  created_at: string;
};

export default function Feed() {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [text, setText] = useState("");

  const loadPosts = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("id", { ascending: false });

    if (data) setPosts(data);
  };

  const addPost = async () => {
    if (!text.trim()) return;

    await supabase.from("posts").insert({
      content: text,
    });

    setText("");
    loadPosts();
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">🦊 FOXFEED</h1>
          <button
            onClick={logout}
            className="text-sm bg-black text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-xl mx-auto p-4">
        {/* CREATE POST */}
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's happening?"
            className="w-full resize-none outline-none text-sm"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={addPost}
              className="bg-black text-white px-4 py-1 rounded-lg text-sm"
            >
              Post
            </button>
          </div>
        </div>

        {/* POSTS */}
        <div className="space-y-3">
          {posts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow p-4 hover:shadow-md transition"
            >
              <p className="text-sm">{p.content}</p>
              <span className="text-xs text-gray-400">
                {new Date(p.created_at).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
