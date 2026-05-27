import express from "express";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../controllers/note.controller";

const noteRouter = express.Router();

noteRouter

  .post("/create", createNote)
  .get("/get", getNotes)
  .patch("/update/:noteId", updateNote)
  .delete("/delete/:noteId", deleteNote);

export default noteRouter;
