"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState<string[]>([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    setPosts(savedPosts);
  }, []);

  return (
    <main style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>TEXTFEED</h1>

      <Link href="/create">
        <button style={{ margin: "20px" }}>Create Post</button>
      </Link>

      {posts.length === 0 ? (
        <p>No posts yet...</p>
      ) : (
        posts.map((post, index) => (
          <div key={index}>
            <p>{post}</p>
          </div>
        ))
      )}
    </main>
  );
}
