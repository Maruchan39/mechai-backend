import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    required: true,
    unique: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  password: {
    required: false,
    type: String,
  },
  authSource: {
    enum: ["self", "google"],
    default: "self",
  },
});

const User = model("User", userSchema);

export default User;
