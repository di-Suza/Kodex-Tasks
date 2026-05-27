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
