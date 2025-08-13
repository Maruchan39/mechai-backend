import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  email: string;
  passwordHash: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

export default mongoose.model<User>("User", UserSchema);
