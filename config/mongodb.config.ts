import mongoose from "mongoose";
import { requireEnv } from "../utils/env";

const MONGODB_URI = requireEnv("MONGODB_URI");

export const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Local MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
