const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      typeof: "string",
      trim: true,
      require: [true, "Name is required"],
      maxlength: [25, "Name should not exceed 25 characters"],
    },
    email: {
      type: "string",
      unique: true,
      trim: true,
      required: [true, "Email is required"],
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

const UserModel = mongoose.Model("User", userSchema);
module.exports = UserModel;
