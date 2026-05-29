import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Connect the app to datavase
const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Database");
  } catch (error) {
    console.error("Database connection error", error);
  }
};

export default connectToDb;
