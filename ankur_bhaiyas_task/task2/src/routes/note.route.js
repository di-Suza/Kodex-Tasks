const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const controller = require("../controller/note.controller");

const noteRouter = express.Router();

//create note 
noteRouter.post("/notes", authMiddleware, controller.createNote);

// get all notes
noteRouter.get("/notes", authMiddleware, controller.getNote);

// update note
noteRouter.patch("/note/:id" , authMiddleware ,  controller.updateNote);


module.exports = noteRouter;
