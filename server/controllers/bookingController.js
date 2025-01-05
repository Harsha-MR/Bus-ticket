//route for booking
//create a booking

import Booking from "../models/Booking.js";
import Bus from "../models/Bus.js";

export const createBooking = async (req, res) => {
  try {
    const { busId, seats, totalAmount } = req.body;
    const userId = req.user.id; // Extracted automatically from authMiddleware

    // Check if seats are available
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // Check for seat conflicts (this can be expanded later for real-time updates)
    const existingBookings = await Booking.find({ busId });
    const bookedSeats = existingBookings.flatMap((booking) => booking.seats);
    const isConflict = seats.some((seat) => bookedSeats.includes(seat));

    if (isConflict) {
      return res.status(400).json({ message: "Selected seats are already booked" });
    }

    // Create a new booking
    const newBooking = new Booking({
      userId,
      busId,
      seats,
      totalAmount,
      paymentStatus: "Pending", // This will be updated after payment integration
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Fetching Booking History

export const getBookingHistory = async (req, res) => {
    try {
      const userId = req.user.id; // Extracted from authMiddleware
  
      // Find bookings made by the user
      const bookings = await Booking.find({ userId }).populate("busId");
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  