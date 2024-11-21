import mongoose from "mongoose";

export default async function connectDB() {
  // Get MongoDB connection URL from env file
  const uri = process.env.MONGO_URI;

  try {
    // Connect to MongoDB without deprecated options
    await mongoose.connect(uri);
    console.log("Database connection established");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process if there's a connection error
  }

  // Get the default connection
  const db = mongoose.connection;

  // Bind connection to error event (to get notification of connection errors)
  db.on("error", (err) => {
    console.error("MongoDB error event:", err);
  });
}
