import dotenv from "dotenv";
import app from "../app"
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 6000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ ChronicleMap server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
