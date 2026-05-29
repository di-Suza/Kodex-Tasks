const mongoose = require("mongoose");

// schema for user
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },

  },
  { timestamps: true },
);


const Users = mongoose.model("users", userSchema);

module.exports = Users;
