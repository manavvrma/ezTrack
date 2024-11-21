import mongoose from "mongoose";

export default async function connectDB() {
  mongoose.set("strictQuery", true); // Or false, depending on your preference

  const uri = process.env.MONGO_URI;

  try {
    await mongoose.connect(uri);
    console.log("Database connection established");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }

  const db = mongoose.connection;

  db.on("error", (err) => {
    console.error("MongoDB error event:", err);
  });
}
