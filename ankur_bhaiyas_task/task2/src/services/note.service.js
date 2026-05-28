const Notes = require("../models/note.model");
const AppError = require("../utils/appError");

// validate data and create a note only for logged in users
const createNoteService = async ({ title, description }, user) => {
  // validation
  if (!title) {
    throw new AppError(400, "Title is required");
  }

  if (!description) {
    throw new AppError(400, "Description is required");
  }

  if (title.trim().length < 3) {
    throw new AppError(400, "Title must be at least 3 characters long");
  }

  if (description.trim().length < 10) {
    throw new AppError(400, "Description must be at least 10 characters long");
  }

  // create note
  const note = await Notes.create({
    title,
    description,
    user: user.email,
  });

  return note;
};

// get all notes from the db
const getNoteService = async () => {
  let notes = await Notes.find();
  return notes;
};

// validate and update data by id
const updateNoteService = async ({ title, description }, id) => {
  if (!id) {
    throw new AppError(400, "Note id is required");
  }

  if (!title && !description) {
    throw new AppError(400, "Title or description is required");
  }

  const updateData = {};

  if (title) {
    if (title.trim().length < 3) {
      throw new AppError(400, "Title must be at least 3 characters long");
    }

    updateData.title = title;
  }

  if (description) {
    if (description.trim().length < 10) {
      throw new AppError(
        400,
        "Description must be at least 10 characters long",
      );
    }

    updateData.description = description;
  }

  const updatedNote = await Notes.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!updatedNote) {
    throw new AppError(404, "Note not found");
  }

  return updatedNote;
};



// delete note by id
const deleteNoteService = async (id)=>{
  if (!id) {
    throw new AppError(400, "Note id is required");
  }

  const deletedNote = await Notes.findByIdAndDelete(id);

  if (!deletedNote) {
    throw new AppError(404, "Note not found");
  }

  return deletedNote;
}

module.exports = {
  createNoteService,
  getNoteService,
  updateNoteService,
  deleteNoteService
};
