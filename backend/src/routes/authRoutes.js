import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import protect from "../middlewares/authMiddleware.js";
import { logoutUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login",loginUser);
router.post("/logout", logoutUser);

router.get("/me", protect, (req, res)=>{
    res.json(req.user);
})

export default router;
