import express from "express";
import { createGig, getGigs } from "../controllers/gigController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// Client posts gig
router.post("/", protect, createGig);

// Anyone can view gigs
router.get("/", getGigs);

export default router;
