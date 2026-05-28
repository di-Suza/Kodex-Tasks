const app = require("./src/app");
const connectToDb = require("./src/configs/connectToDb");
const port = process.env.PORT || 8080;
require("dotenv").config();


connectToDb();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
