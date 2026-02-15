"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type Post = {
  id: number;
  content: string;
  created_at: string;
};

export default function Feed() {
  const auth = useAuth();
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [text, setText] = useState("");
  const [ready, setReady] = useState(false); // 👈 hydration fix

  // prevent build crash
  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!auth?.user) router.push("/login");
  }, [ready, auth, router]);

  const loadPosts = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("id", { ascending: false });

    if (data) setPosts(data);
  };

  const addPost = async () => {
    if (!text.trim()) return;

    await supabase.from("posts").insert({ content: text });
    setText("");
    loadPosts();
  };

  useEffect(() => {
    if (!ready) return;
    loadPosts();
  }, [ready]);

  if (!ready) return null; // 👈 prevents prerender crash

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🦊 FOXFEED</h1>

      <button
        onClick={auth?.logout}
        className="mb-3 text-sm text-red-500"
      >
        Logout
      </button>

      <div className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's happening?"
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={addPost}
          className="bg-black text-white px-4 rounded"
        >
          Post
        </button>
      </div>

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
