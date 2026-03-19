import { useEffect, useState } from "react";
import "./App.css";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import Header from "./components/Header";

function App() {
  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("posts")) || [],
  );
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handleSubmit = (data) => {
    if (editingPost) {
      setPosts((prev) =>
        prev.map((p) => (p.id === editingPost.id ? { ...p, ...data } : p)),
      );
      setEditingPost(null);
    } else {
      const newPost = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...data,
      };
      setPosts((prev) => [newPost, ...prev]);
    }
    localStorage.setItem("posts", JSON.stringify(posts));
  };

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    if (editingPost?.id === id) setEditingPost(null);
    localStorage.setItem("posts", JSON.stringify(posts));
  };

  return (
    <>
      <div className="app">
        <Header postCount={posts.length} />
        <main className="main">
          <div className="layout">
            <aside className="sidebar">
              <PostForm
                onSubmit={handleSubmit}
                editingPost={editingPost}
                onCancel={() => setEditingPost(null)}
              />
            </aside>
            <section className="feed">
              <PostList
                posts={posts}
                onEdit={setEditingPost}
                onDelete={handleDelete}
              />
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
