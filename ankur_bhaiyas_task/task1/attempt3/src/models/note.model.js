import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);

const Notes = mongoose.model("notes", noteSchema);

export default Notes;
