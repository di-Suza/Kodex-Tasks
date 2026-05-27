import express from "express";
import { createNote } from "../controller/note.controller";

const noteRouter = express.Router();

noteRouter

  .post("/create", createNote)

export default noteRouter;
