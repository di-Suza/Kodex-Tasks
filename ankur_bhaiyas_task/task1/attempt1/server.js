import app from "./src/app.js";
import connectToDb from "./src/config/connectToDb.js";

await connectToDb();

app.listen(8080, () => {
  console.log("Server running on 8080");
});
