import express from "express";
import Notes from "./models/note.model.js";

const app = express();
app.use(express.json());

// create note
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;
  fg;
  // validation
  if (
    !title ||
    !description ||
    title.trim().length < 3 ||
    description.trim().length < 10
  ) {
    return res.status(400).json({ error: "Invalid note data" });
  }

  // create note in database
  const note = await Notes.create({ title, description });

  return res.status(201).json({
    success: true,
    message: "Note created successfully",
    note,
  });
});

export default app;
