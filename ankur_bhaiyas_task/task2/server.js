const app = require("./src/app");
const connectToDb = require("./src/configs/connectToDb");
require("dotenv").config();

const port = process.env.PORT || 8080;

connectToDb();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
