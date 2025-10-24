const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    console.log("Server will continue without database (auth features disabled)");
    // Don't exit - allow server to run for TMDB API features
  }
};

module.exports = connectDB;
