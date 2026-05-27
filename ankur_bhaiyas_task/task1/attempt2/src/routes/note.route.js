import express from "express";
import { createNote, getNotes } from "../controller/note.controller";

const noteRouter = express.Router();

noteRouter

  .post("/create", createNote)
  .get("/get", getNotes)

export default noteRouter;
