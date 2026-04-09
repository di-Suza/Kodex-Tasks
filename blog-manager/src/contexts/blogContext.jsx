import { createContext, useState, useEffect, useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
const initialBlogs = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    title: "Getting Started with React Hooks",
    excerpt:
      "Learn how React Hooks can simplify your component logic and make your code more reusable.",
    content: `React Hooks revolutionized the way we write React components. Introduced in React 16.8, Hooks allow you to use state and other React features without writing a class component.

## Why Hooks?
Before Hooks, if you wanted to use state in a component, you had to use a class component. This led to complex lifecycle methods and hard-to-follow code.

## The useState Hook
The most basic Hook is useState. It lets you add state to functional components:

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`
`,

    authorName: "Sarah Chen",
    authorEmail: "sarah@example.com",
    tags: ["React", "JavaScript", "Web Development"],
    published: true,
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-01-15T10:00:00.000Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    title: "Building Scalable APIs with Node.js",
    excerpt:
      "Explore best practices for creating robust and scalable REST APIs using Node.js and Express.",
    content: `Node.js is a powerful tool for building backend services. When building APIs, scalability and performance are key factors to consider.

## Key Principles
1. **Statelessness**: Ensure your API doesn't store user session data on the server.
2. **Error Handling**: Use a centralized error handling middleware.
3. **Validation**: Always validate incoming data using libraries like Joi or Zod.

## Example Express Route
\`\`\`javascript
app.get('/api/data', (req, res) => {
  res.json({ success: true, message: "API is working!" });
});
\`\`\``,
    authorName: "Sarah Chen",
    authorEmail: "sarah@example.com",
    tags: ["Node.js", "API", "Backend"],
    published: true,
    createdAt: "2024-01-20T14:30:00.000Z",
    updatedAt: "2024-01-20T14:30:00.000Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    title: "The Art of Clean Code",
    excerpt:
      "Discover the principles and practices that separate good code from great code.",
    content: `Writing code is easy, but writing clean code is an art. Clean code is code that is easy to read, easy to understand, and easy to maintain.

## Meaningful Names
Variables and functions should have names that reveal their intent. 

\`\`\`javascript
// Bad
const d = 5; 

// Good
const daysUntilExpiration = 5;
\`\`\`

## Small Functions
Functions should do one thing and do it well. If a function is too long, it's likely doing too much.`,
    authorName: "Marcus Johnson",
    authorEmail: "marcus@example.com",
    tags: ["Programming", "Best Practices", "Software Engineering"],
    published: true,
    createdAt: "2024-02-01T09:15:00.000Z",
    updatedAt: "2024-02-01T09:15:00.000Z",
  },
];

const BlogContext = createContext();
export default BlogContext;
export const BlogProvider = ({ children }) => {
  const { user } = useAuth();

  const [blogs, setBlogs] = useState(() => {
    const savedBlogs = localStorage.getItem("inkwell_blogs");
    if (savedBlogs) {
      return JSON.parse(savedBlogs);
    }

    return initialBlogs;
  });

  useEffect(() => {
    localStorage.setItem("inkwell_blogs", JSON.stringify(blogs));
  }, [blogs]);

  const stats = useMemo(() => {
    const userBlogs = blogs.filter((b) => b.authorEmail === user?.email);
    return {
      total: userBlogs.length,
      published: userBlogs.filter((b) => b.published).length,
      drafts: userBlogs.filter((b) => !b.published).length,
      userBlogs: userBlogs,
    };
  }, [blogs, user]);

  const publishedBlogs = blogs.filter((b) => b.published);

  const addBlog = (blogData, status) => {
    const isPublished = status === "publish" ? true : false;
    const newBlog = {
      ...blogData,
      id: crypto.randomUUID(),
      authorEmail: user.email,
      authorName: user.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: blogData.tags || [],
      published: isPublished,
    };
    setBlogs((prev) => [newBlog, ...prev]);
    return { success: true };
  };

  const updateBlog = (id, updatedData) => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === id
          ? { ...blog, ...updatedData, updatedAt: new Date().toISOString() }
          : blog,
      ),
    );
  };

  const deleteBlog = (id) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
  };

  const getBlogById = (id) => {
    return blogs.find((blog) => blog.id === id);
  };

  const publishBlog = (id) => {
    updateBlog(id, { published: true });
  };

  const unpublishBlog = (id) => {
    updateBlog(id, { published: false });
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        publishedBlogs,
        userBlogs: stats.userBlogs,
        stats,
        addBlog,
        publishBlog,
        unpublishBlog,
        updateBlog,
        deleteBlog,
        getBlogById,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
