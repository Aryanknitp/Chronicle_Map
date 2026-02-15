import express from "express";
import authMiddleware from "../middleware/auth.js";
import { forgotPasswordLimiter } from "../middleware/limiter.js";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  logout,
  sendResetOtp,
  resetPasswordWithOtp,
} from "../controllers/authcontroller.js";

const router = express.Router();

// --- AUTHENTICATION ---
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);

// --- PASSWORD RECOVERY (Email Link) ---
// Note: Limiter is applied before the controller to block spam
router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);
router.post("/reset-password/:token", resetPassword);

// --- PASSWORD RECOVERY (OTP) ---
router.post("/send-otp", forgotPasswordLimiter, sendResetOtp);
router.post("/reset-password-otp", resetPasswordWithOtp);

// --- UTILITY / PROTECTED ---
// This looks like a testing route or verification check
router.post("/verify-auth", authMiddleware, (req, res) => res.status(200).json(req.user));

export default router;
