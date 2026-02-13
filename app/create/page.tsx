"use client"

import { useState, useEffect } from "react"

type PostType = {
  text: string
  likes: number
}

export default function CreatePage() {
  const [text, setText] = useState("")
  const [posts, setPosts] = useState<PostType[]>([])

  // 🔥 ჩაიტვირთოს localStorage-დან როცა გვერდი იხსნება
  useEffect(() => {
    const savedPosts = localStorage.getItem("posts")
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts))
    }
  }, [])

  // 🔥 ყოველ ცვლილებაზე შეინახოს
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts))
  }, [posts])

  const handlePost = () => {
    if (text.trim() === "") return

    const newPost: PostType = {
      text,
      likes: 0
    }

    setPosts([newPost, ...posts])
    setText("")
  }

  const handleLike = (index: number) => {
    const updatedPosts = [...posts]
    updatedPosts[index].likes += 1
    setPosts(updatedPosts)
  }

  const handleDelete = (index: number) => {
    const updatedPosts = posts.filter((_, i) => i !== index)
    setPosts(updatedPosts)
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      display: "flex",
      justifyContent: "center",
      paddingTop: "40px"
    }}>
      <div style={{ width: "400px" }}>

        <h2 style={{ textAlign: "center" }}>TEXTFEED</h2>

        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
          <textarea
            placeholder="What's happening?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              width: "100%",
              height: "80px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              padding: "10px",
              resize: "none"
            }}
          />

          <button
            onClick={handlePost}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "10px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Post
          </button>
        </div>

        <div style={{ marginTop: "20px" }}>
          {posts.map((post, index) => (
            <div
              key={index}
              style={{
                background: "white",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "15px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
              }}
            >
              <p style={{ marginBottom: "10px" }}>{post.text}</p>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  onClick={() => handleLike(index)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px"
                  }}
                >
                  ❤️ {post.likes}
                </button>

                <button
                  onClick={() => handleDelete(index)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "red"
                  }}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
