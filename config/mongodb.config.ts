import mongoose from "mongoose";
import { requireEnv } from "../utils/env";

const MONGODB_URI = requireEnv("MONGODB_URI");

const connectDatabase = () => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));
};
export default connectDatabase;
