// import User from "../models/User.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import crypto from "crypto";
// import sendEmail from "../utils/email.js";

// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name?.trim() || !email?.trim() || !password?.trim()) {
//       return res.status(400).json({
//         message: "Name, email and password are required",
//       });
//     }
//     if (password.length < 6) {
//       return res.status(400).json({
//         message: "Password must be at least 6 characters",
//       });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       name: name.trim(),
//       email: email.trim().toLowerCase(),
//       password: hashedPassword,
//     });

//     res.status(201).json({
//       success: true,
//       message: "User registered",
//     });
//   } catch (err) {
//     console.error("Register error:", err);
//     if (err.code === 11000) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     if (err.name === "ValidationError") {
//       return res.status(400).json({
//         message: err.message || "Validation failed",
//       });
//     }
//     res.status(500).json({
//       message: err.message || "Server error",
//     });
//   }
// };

// // login logic -----------------------------------------
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email: email.trim().toLowerCase() });
//     if (!user) {
//       return res.status(400).json({ success: false, message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_EXPIRES_IN || "4d" },
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       maxAge: 4 * 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({
//       success: true,
//       user: {
//         token,
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         college: user.college,
//         department: user.department,
//         semester: user.semester,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };


// export const forgotPassword = async (req, res) => {
//   try {
//     console.log("forgot password api hit");

//     const { email } = req.body;
//     console.log("Email received:", email);

//     const user = await User.findOne({ email });

//     // Security: same response always
//     if (!user) {
//       return res.status(200).json({
//         message: "If user exists, reset link will be sent",
//       });
//     }

//     const resetToken = crypto.randomBytes(32).toString("hex");
//     console.log("Reset token (raw):", resetToken);

//     const hashedToken = crypto
//       .createHash("sha256")
//       .update(resetToken)
//       .digest("hex");

//     console.log("Reset token (hashed):", hashedToken);

//     user.resetPasswordToken = hashedToken;
//     user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

//     await user.save();

//     const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

//     await sendEmail({
//       to: email,
//       subject: "Reset your password",
//       html: `
//         <p>You requested a password reset.</p>
//         <p>Click the link below:</p>
//         <a href="${resetUrl}">${resetUrl}</a>
//         <p>This link expires in 15 minutes.</p>
//       `,
//     });

//     console.log("Reset link:", resetUrl);

//     res.status(200).json({
//       message: "Password reset link sent to email",
//     });
//   } catch (error) {
//     console.error("Forgot password error:", error);
//     res.status(500).json({
//       message: "Forgot password failed",
//     });
//   }
// };

// // ================= RESET PASSWORD =================
// export const resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;

//     if (!password || password.length < 6) {
//       return res.status(400).json({
//         message: "Password must be at least 6 characters",
//       });
//     }

//     const hashedToken = crypto
//       .createHash("sha256")
//       .update(token)
//       .digest("hex");

//     const user = await User.findOne({
//       resetPasswordToken: hashedToken,
//       resetPasswordExpire: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({
//         message: "Invalid or expired token",
//       });
//     }

//     user.password = await bcrypt.hash(password, 10);
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;

//     await user.save({ validateBeforeSave: false });

//     res.status(200).json({
//       message: "Password reset successful",
//     });
//   } catch (error) {
//     console.error("Reset password error:", error);
//     res.status(500).json({
//       message: "Reset password failed",
//     });
//   }
// };

// //getprofile
// export const getProfile = async (req, res) => {
//   try {
//     // req.user.id comes from authMiddleware (JWT)
//     const user = await User.findById(req.user.id).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };



// //logout controll flow in backend
// //just delete token from the user localStroage or delete the token from teh cookies
// export const logout = (req,res)=>{
//   try{
//       return res.status(200).json({
//        message: "Logout successful. Please delete token on client side.",
//       })
//   }
//   catch(error){
//     res.status(500).json({message:"Logout failed"});
//   }
// }

// //send reset otp constoller
// export const sendResetOtp = async (req, res) => {
//   const { email } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) return res.json({ message: "If user exists, OTP sent" });

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();

//   user.resetOtp = crypto.createHash("sha256").update(otp).digest("hex");
//   user.resetOtpExpire = Date.now() + 10 * 60 * 1000;
//   await user.save();

//   await sendEmail({
//     to: email,
//     subject: "Your OTP",
//     html: `<h2>Your OTP: ${otp}</h2><p>Valid for 10 minutes</p>`,
//   });

//   res.json({ message: "OTP sent" });
// };

// // reset password with otp
// export const resetPasswordWithOtp = async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

//   const user = await User.findOne({
//     email,
//     resetOtp: hashedOtp,
//     resetOtpExpire: { $gt: Date.now() },
//   });

//   if (!user) {
//     return res.status(400).json({ message: "Invalid or expired OTP" });
//   }

//   user.password = await bcrypt.hash(newPassword, 10);
//   user.resetOtp = undefined;
//   user.resetOtpExpire = undefined;

//   await user.save();

//   res.json({ message: "Password reset successful" });
// };





import User from "../models/User.model.js";
import generateToken from "../utils/generateToken.js";

export const login = async (req, res) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (role && role !== user.role) {
    return res.status(403).json({ message: "Role mismatch" });
  }

  res.json({
    token: generateToken(user._id),
    user,
  });
};

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role: role === "admin" ? "user" : role,
  });

  res.status(201).json({
    token: generateToken(user._id),
    user,
  });
};

export const me = async (req, res) => {
  res.json(req.user);
};
