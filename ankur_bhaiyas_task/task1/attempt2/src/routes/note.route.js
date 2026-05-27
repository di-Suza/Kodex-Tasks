import express from "express";
import { createNote, getNotes, updateNote } from "../controllers/note.controller.js";

const noteRouter = express.Router();

noteRouter

  .post("/create", createNote)
  .get("/get", getNotes)
  .patch("/update/:noteId", updateNote);

export default noteRouter;
