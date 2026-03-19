import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function PostForm({ onSubmit, editingPost, onCancel }) {
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = (data) => {
    onSubmit({ ...data, image: preview });
    reset();
    setPreview(null);
  };

  const removeImage = () => {
    setPreview(null);
    fileRef.current.value = "";
  };

  return (
    <div className="form-card">
      <h2 className="form-title">
        {editingPost ? "Edit Post" : "Create a Post"}
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <div className="field">
          <label className="label">Title</label>
          <input
            className={`input ${errors.title ? "input-error" : ""}`}
            placeholder="What's on your mind?"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <span className="error-msg">{errors.title.message}</span>
          )}
        </div>

        <div className="field">
          <label className="label">Content</label>
          <textarea
            className={`textarea ${errors.content ? "input-error" : ""}`}
            placeholder="Write something..."
            rows={4}
            {...register("content", { required: "Content is required" })}
          />
          {errors.content && (
            <span className="error-msg">{errors.content.message}</span>
          )}
        </div>

        <div className="field">
          <label className="label">Image</label>
          {preview ? (
            <div className="img-preview-wrap">
              <img src={preview} alt="preview" className="img-preview" />
              <button
                type="button"
                className="remove-img"
                onClick={removeImage}
              >
                ✕ Remove
              </button>
            </div>
          ) : (
            <label className="upload-zone">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileRef}
                style={{ display: "none" }}
              />
              <span className="upload-icon">↑</span>
              <span className="upload-text">Click to select an image</span>
            </label>
          )}
        </div>

        <div className="form-actions">
          {editingPost && (
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button type="submit" className="btn-submit">
            {editingPost ? "Save Changes" : "Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
