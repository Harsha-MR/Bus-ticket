import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getBookingHistory,bookSeats } from "../controllers/bookingController.js";
import{cancelBooking} from "../controllers/bookingController.js"

const router = express.Router();

// Create a new booking
//router.post("/create", authMiddleware, createBooking);

// Fetch booking history
router.get("/history", authMiddleware, getBookingHistory);

router.post("/:id/book-seats", authMiddleware, bookSeats);// seat availability and segments 

router.post("/cancel", authMiddleware, cancelBooking);


export default router;
