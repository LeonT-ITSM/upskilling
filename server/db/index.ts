import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/upskilling";

export async function connectDB() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to MongoDB");
}
