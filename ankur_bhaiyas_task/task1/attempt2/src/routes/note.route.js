import express from "express";
import { createNote, getNotes } from "../controller/note.controller";

const noteRouter = express.Router();

noteRouter

  .post("/create", createNote)
  .get("/get", getNotes)
  .patch("/update/:noteId", updateNote);

export default noteRouter;
