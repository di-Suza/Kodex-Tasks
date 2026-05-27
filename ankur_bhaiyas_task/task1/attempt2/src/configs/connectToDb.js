import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Database");
  } catch (err) {
    console.error("Error connecting to Database", err);
  }
}

export default connectToDB;
