import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import connectToDb from "./src/configs/database.js";
import redisClient from "./src/configs/cache.js";

const PORT = process.env.PORT || 8080;

connectToDb();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
