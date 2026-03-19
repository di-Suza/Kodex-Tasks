import PostCard from "./PostCard";

export default function PostList({ posts, onEdit, onDelete }) {
  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">✏️</div>
        <p>No posts yet. Create your first post!</p>
      </div>
    );
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
