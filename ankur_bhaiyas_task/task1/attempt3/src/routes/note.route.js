import express from "express";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../controllers/note.controller.js";

const noteRouter = express.Router();

noteRouter

  .post("/create", createNote)
  .get("/get", getNotes)
  .patch("/update/:noteId", updateNote)
  .delete("/delete/:noteId", deleteNote);

export default noteRouter;
