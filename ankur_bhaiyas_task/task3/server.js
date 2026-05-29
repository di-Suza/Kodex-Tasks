import app from "./src/app.js";
import connectToDb from "./src/configs/database.js";

const PORT = process.env.PORT || 8080;

connectToDb();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
