const express = require("express");
const noteRouter = require("./routes/note.route");
const authRouter = require("./routes/auth.route");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());

// set routes
app.use("api/notes", noteRouter);
app.use("api/auth", authRouter);

app.use(cookieParser());

module.exports = app;
