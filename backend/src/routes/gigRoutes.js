import express from "express";
import mongoose from "mongoose";
import Gig from "../models/Gig.js"; // 🔥 THIS WAS MISSING
import { createGig, getGigs } from "../controllers/gigController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// Client posts gig
router.post("/", protect, createGig);

// Anyone can view gigs
router.get("/", getGigs);

// 🔥 SINGLE GIG (SAFE & PROFESSIONAL)
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid gig ID" });
    }

    const gig = await Gig.findById(req.params.id)
      .populate("owner", "name email");

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.json(gig);
  } catch (error) {
    console.error("❌ Single gig error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
