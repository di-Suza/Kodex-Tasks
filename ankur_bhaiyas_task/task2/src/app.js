const express = require("express");
const noteRouter = require("./routes/note.route");
const authRouter = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const globalErrorHandler = require("./middlewares/globalErrorHandler.middleware");

const app = express();
app.use(express.json());
app.use(cookieParser());

// set routes
app.use("/api/notes", noteRouter);
app.use("/api/auth", authRouter);

// global error handler
app.use(globalErrorHandler);

module.exports = app;
