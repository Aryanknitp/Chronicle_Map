import express from "express";
import auth from "../middleware/auth.middleware.js";
import { getLocations, createLocation } from "../controllers/location.controller.js";

const router = express.Router();

router.get("/", getLocations);
router.post("/", auth, createLocation);

export default router;
