"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function Feed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [text, setText] = useState("");
  const router = useRouter();

  // load posts
  const loadPosts = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    setPosts(data || []);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // add post
  const addPost = async () => {
    if (!text) return;

    await supabase.from("posts").insert({ content: text });
    setText("");
    loadPosts();
  };

  // logout
  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>FOXFEED</h1>

      <button onClick={logout}>Logout</button>

      <div style={{ marginTop: 20 }}>
        <input
          placeholder="write post..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addPost}>Post</button>
      </div>

      <div style={{ marginTop: 30 }}>
        {posts.map((p) => (
          <div key={p.id} style={{ borderBottom: "1px solid #ccc", padding: 10 }}>
            {p.content}
          </div>
        ))}
      </div>
    </div>
  );
}
