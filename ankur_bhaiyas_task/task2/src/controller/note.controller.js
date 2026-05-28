const {
  createNoteService,
  getNoteService,
  updateNoteService,
} = require("../services/note.service");

// create note
const createNote = async (req, res) => {
  let note = await createNoteService(req.body, req.user);
  return res.status(201).json({
    message: "Note created successfully",
    note,
  });
};

// fetch all notes.
const getNote = async (req, res) => {
  let notes = await getNoteService();
  return res.status(200).json({
    message: "Notes fetched successfully",
    notes,
  });
};


// update note using user id
const updateNote = async (req , res) =>{
    let updatedNote = await  updateNoteService(req.body , req.params.id);
    return res.status(200).json({
        message:"Note updated successfully",
        updatedNote
    })
}


module.exports = {
  createNote,
  getNote,
  updateNote
};
