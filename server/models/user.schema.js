const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: "string",
      required: [true, "Name is required"],
      trim: true,
      maxlength: [25, "Name should not exceed 25 characters"],
    },
    email: {
      type: "string",
      unique: true,
      required: [true, "Email is required"],
      trim: true,
    },
    password: {
      type: "string",
      select: false,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters"],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
