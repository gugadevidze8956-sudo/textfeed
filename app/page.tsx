"use client";
import { useState } from "react";

export default function CreatePost() {
  const [text, setText] = useState("");

  const addPost = () => {
    if (!text) return;

    const old = JSON.parse(localStorage.getItem("posts") || "[]");

    const newPost = {
      text,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem("posts", JSON.stringify([newPost, ...old]));
    window.location.href = "/";
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>🦊 Create Post</h2>

        <textarea
          placeholder="What's happening?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.textarea}
        />

        <button onClick={addPost} style={styles.button}>
          Post 🚀
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#0f172a,#1e293b)",
  },
  card: {
    background: "#020617",
    padding: "30px",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
    border: "1px solid #1e293b",
  },
  title: {
    color: "white",
    marginBottom: "20px",
    textAlign: "center" as const,
  },
  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: "#020617",
    color: "white",
    marginBottom: "15px",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg,#f97316,#ea580c)",
    color: "white",
    fontWeight: "bold" as const,
    cursor: "pointer",
  },
};
