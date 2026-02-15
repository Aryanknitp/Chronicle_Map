import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

// Routes
import authRoutes from "./routes/authroute.js";
import userRoutes from "./routes/user.routes.js";
import locationRoutes from "./routes/location.routes.js";
import mediaRoutes from "./routes/media.routes.js";
import collectionRoutes from "./routes/collection.routes.js";
import timelineRoutes from "./routes/timeline.routes.js";

// Middleware
import errorHandler from "./middleware/error.middleware.js";

const app = express();

// ==========================
// Global Middlewares
// ==========================
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// ==========================
// API Routes
// ==========================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/timeline", timelineRoutes);

// ==========================
// Health Check
// ==========================
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "ChronicleMap API is running 🚀",
  });
});

// ==========================
// Error Handler
// ==========================
app.use(errorHandler);

export default app;
