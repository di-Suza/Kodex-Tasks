const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const controller = require("../controller/note.controller");

const noteRouter = express.Router();

//create note route
noteRouter.post("/note", authMiddleware, controller.createNoteController);

module.exports = noteRouter;
