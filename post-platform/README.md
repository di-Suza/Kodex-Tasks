# KindaPost — React Posting Platform

A clean React application where users can create, edit, delete, and display posts with image support.

---

## 🚀 Getting Started

```bash
# 1. Unzip the project
unzip posting-platform.zip
cd posting-platform

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

App will open at `http://localhost:5173`

---

## ✅ Features

- **Create** a post with title, content, and an optional image
- **Edit** any existing post — form pre-fills with current data
- **Delete** a post from the feed
- **Image upload** — select a local image, preview shows instantly
- **Form validation** — title and content are required fields
- **Responsive** — sidebar + feed layout on desktop, stacked on mobile

---

## 🗂️ Project Structure

```
src/
├── App.js                  # Root component — holds all state
├── App.css                 # Global styles
├── index.js                # React entry point
└── components/
    ├── Header.jsx           # Top navbar with post count
    ├── PostForm.jsx         # Create / Edit form (sidebar)
    ├── PostList.jsx         # Renders all PostCards
    └── PostCard.jsx         # Individual post display card
```

---

## 🧠 How State Works

State lives entirely in `App.js`. Two `useState` hooks manage everything:

```js
const [posts, setPosts] = useState([]);        // Array of all post objects
const [editingPost, setEditingPost] = useState(null); // Currently editing post (or null)
```

Posts are stored as an **array of objects**. Each post object looks like:

```js
{
  id: "uuid-generated-by-crypto.randomUUID()",
  title: "My First Post",
  content: "Hello world!",
  image: "data:image/png;base64,...",  // base64 string or null
  createdAt: "2024-01-15T10:30:00.000Z"
}
```

---

## ⚙️ Core Logic

### Creating a Post
When the form is submitted with no `editingPost`, a new post object is created using `crypto.randomUUID()` for a unique ID, then **prepended** to the array:

```js
const newPost = {
  id: crypto.randomUUID(),
  createdAt: new Date().toISOString(),
  ...data,
};
setPosts((prev) => [newPost, ...prev]);
```

### Editing a Post
When Edit is clicked on a card, `setEditingPost(post)` is called. This passes the post object down to `PostForm`, which uses `setValue()` to pre-fill the fields. On submit, the array is **mapped** — matching post is replaced, others stay unchanged:

```js
setPosts((prev) =>
  prev.map((p) => (p.id === editingPost.id ? { ...p, ...data } : p))
);
```

### Deleting a Post
Uses `Array.filter()` to return a new array without the deleted post:

```js
setPosts((prev) => prev.filter((p) => p.id !== id));
```

If the deleted post was being edited, `editingPost` is also cleared.

### Image Handling
`FileReader` converts the selected image file into a **base64 string** stored in local state (`preview`). This base64 string is then saved inside the post object — no server or storage needed.

```js
const reader = new FileReader();
reader.onloadend = () => setPreview(reader.result);
reader.readAsDataURL(file);
```

---

## 📋 Form — react-hook-form

`PostForm.jsx` uses `react-hook-form` with `register`, `handleSubmit`, `reset`, `setValue`, and `formState.errors`.

Key pattern for edit mode — `useEffect` watches `editingPost` and pre-fills the form:

```js
useEffect(() => {
  if (editingPost) {
    setValue("title", editingPost.title);
    setValue("content", editingPost.content);
    setPreview(editingPost.image || null);
  } else {
    reset();
    setPreview(null);
  }
}, [editingPost, setValue, reset]);
```

Validation rules are passed directly into `register`:

```js
{...register("title", { required: "Title is required" })}
```

---

## 🎨 UI & Styling

- **Font:** DM Sans + Playfair Display (Google Fonts)
- **Theme:** Light — warm white surface on beige background
- **Layout:** Sticky sidebar (form) on the left, scrollable feed on the right
- **Color accent:** Blue `#2D5BE3`
- All styles are in `App.css` using CSS custom properties (variables)

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `react` | UI library |
| `react-dom` | DOM rendering |
| `react-hook-form` | Form state & validation |

---

## 🔑 Key React Concepts Used

- `useState` — managing posts array and editing state
- `useEffect` — syncing form fields when editing post changes
- `useRef` — accessing the file input element directly
- Props & prop drilling — passing handlers from App → PostForm / PostCard
- Conditional rendering — showing Cancel button only in edit mode
- Array methods — `map`, `filter` for CRUD operations