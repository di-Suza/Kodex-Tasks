const mongoose = require("mongoose");

// Schema for notes created by users.
const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Note collection model.
const Note = mongoose.model("notes", noteSchema);
module.exports = Note;
