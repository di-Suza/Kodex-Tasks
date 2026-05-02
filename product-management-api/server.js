const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const productRoutes = require("./src/routes/product.routes");
const app = require("./src/app")
dotenv.config();

// Connect to MongoDB
connectDB();



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
