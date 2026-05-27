import express from "express";
import noteRouter from "./routes/note.route.js";

const app = express();
app.use(express.json());

app.use("/api/v1/notes", noteRouter);

export default app;