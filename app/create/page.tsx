"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const [text, setText] = useState("");
  const router = useRouter();

  function handleSubmit() {
    if (!text) return;

    const existingPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    existingPosts.push(text);
    localStorage.setItem("posts", JSON.stringify(existingPosts));

    router.push("/");
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Create Post</h2>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something..."
      />

      <br /><br />

      <button onClick={handleSubmit}>Post</button>
    </div>
  );
}
