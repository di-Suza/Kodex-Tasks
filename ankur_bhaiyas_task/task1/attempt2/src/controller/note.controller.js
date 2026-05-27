import Notes from "../models/note.model.js";

export const createNote = async (req, res) => {
  const { title, description } = req.body;
  // validation
  if (
    !title ||
    !description ||
    title.trim().length < 3 ||
    description.trim().length < 10
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid note data" });
  }

  // create note in database
  const note = await Notes.create({ title, description });

  return res.status(201).json({
    success: true,
    message: "Note created successfully",
    note,
  });
};

export const getNotes = async (req, res) => {
  const notes = await Notes.find();

  return res.status(200).json({
    success: true,
    message: "Notes fetched successfully",
    notes,
  });
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const { description } = req.body;

  // validation
  if (!description || description.trim().length < 10) {
    return res
      .status(400)
      .json({ success: false, message: "Description is required!" });
  }

  const note = await Notes.findById(noteId);

  if (!note) {
    return res.status(404).json({ success: false, message: "Note not found" });
  }

  note.description = description;
  await note.save();

  return res.status(200).json({
    success: true,
    message: "Note updated successfully",
    note,
  });
};
