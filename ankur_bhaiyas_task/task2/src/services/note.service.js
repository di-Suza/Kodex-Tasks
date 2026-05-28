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

module.exports = {
  createNoteService,
  getNoteService,
};
