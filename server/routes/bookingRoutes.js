import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createBooking, getBookingHistory } from "../controllers/bookingController.js";

const router = express.Router();

// Create a new booking
router.post("/create", authMiddleware, createBooking);

// Fetch booking history
router.get("/history", authMiddleware, getBookingHistory);

export default router;
