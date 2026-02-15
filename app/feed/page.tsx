"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/navigation"

type Post = {
  id: number
  content: string
  created_at: string
}

export default function Feed() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  const [posts, setPosts] = useState<Post[]>([])
  const [text, setText] = useState("")

  // 🔐 Auth guard
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading])

  // 🧠 Load posts
  const loadPosts = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("id", { ascending: false })

    if (data) setPosts(data)
  }

  // 🚀 Add post
  const addPost = async () => {
    if (!text.trim()) return

    await supabase.from("posts").insert({
      content: text,
    })

    setText("")
  }

  // ⚡ Realtime
  useEffect(() => {
    if (!user) return

    loadPosts()

    const channel = supabase
      .channel("posts-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        () => loadPosts()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user])

  if (loading) return null

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">FOXFEED 🔥</h1>
        <button
          onClick={() => {
            logout()
            router.push("/login")
          }}
          className="text-sm text-red-500"
        >
          Logout
        </button>
      </div>

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
  )
}
