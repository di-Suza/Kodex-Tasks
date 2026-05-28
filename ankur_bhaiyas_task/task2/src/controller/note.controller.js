const { createNoteService } = require("../services/note.service");

// create note controller
const createNoteController = async (req, res) => {
  let note = await createNoteService(req.body, req.user);
  return res.status(201).json({
    message: "Note created successfully",
    note,
  });
};

module.exports = {
  createNoteController,
};