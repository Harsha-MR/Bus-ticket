import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Example of a secured route
router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Access granted", user: req.user });
});

export default router;
