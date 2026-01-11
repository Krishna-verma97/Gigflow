import Gig from "../models/Gig.js";

// CREATE GIG
export const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    if (!title || !description || !budget) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const gig = await Gig.create({
      title,
      description,
      budget,
      owner: req.user._id,
    });

    res.status(201).json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL OPEN GIGS + SEARCH
export const getGigs = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          title: { $regex: req.query.search, $options: "i" },
        }
      : {};

    const gigs = await Gig.find({
      status: "open",
      ...keyword,
    }).populate("owner", "name email");

    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
