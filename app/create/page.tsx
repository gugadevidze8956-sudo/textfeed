"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Create() {
  const [text, setText] = useState("");
  const router = useRouter();

  const handlePost = () => {
    if (!text) return;

    const posts = JSON.parse(localStorage.getItem("posts") || "[]");

    const newPost = {
      id: Date.now(),
      username: "guga",
      content: text,
    };

    localStorage.setItem("posts", JSON.stringify([newPost, ...posts]));
    router.push("/feed");
  };

  return (
    <div className="p-4 text-white">
      <textarea
        className="w-full bg-zinc-900 p-3 rounded"
        placeholder="დაწერე რამე..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handlePost}
        className="mt-3 bg-white text-black px-4 py-2 rounded"
      >
        Post
      </button>
    </div>
  );
}
