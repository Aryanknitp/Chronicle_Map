import express from "express";
import auth from "../middleware/auth.middleware.js";
import role from "../middleware/role.middleware.js";
import { uploadMedia, approveMedia } from "../controllers/media.controller.js";

const router = express.Router();

router.post("/", auth, uploadMedia);
router.put("/:id/approve", auth, role("admin"), approveMedia);

export default router;
