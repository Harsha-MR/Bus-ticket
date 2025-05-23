import Booking from "../models/Booking.js";
import Bus from "../models/Bus.js";
import Route from "../models/Route.js"
import { sendTicketEmail } from "../services/emailservice.js";
import User from "../models/userModel.js"
import { generateTicketPDF } from "../services/pdfgenerator.js";
import {sendEmail} from "../services/emailservice.js"


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
  

//for book 

export const bookSeats = async (req, res) => {
  try {
    const { busId, from, to, seats, email } = req.body;
    const userId = req.user.id;


    // Validate input
    if (!busId || !from || !to || !seats || !Array.isArray(seats)) {
      return res.status(400).json({ message: "Invalid input provided." });
    }

    // Find the bus
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found." });
    }

    // Check that the route includes both "from" and "to"
    const fromIndex = bus.route.indexOf(from);
    const toIndex = bus.route.indexOf(to);
    if (fromIndex === -1 || toIndex === -1 || fromIndex >= toIndex) {
      return res.status(400).json({ message: "Invalid route specified." });
    }

    // Check seat availability for all segments between "from" and "to"
    for (let i = fromIndex; i < toIndex; i++) {
      const segment = bus.segments.find(
        (seg) => seg.from === bus.route[i] && seg.to === bus.route[i + 1]
      );

      if (!segment) {
        return res.status(400).json({
          message: `Segment from ${bus.route[i]} to ${bus.route[i + 1]} not found.`,
        });
      }

      const unavailableSeats = seats.filter(
        (seatNumber) =>
          segment.seats.find((seat) => seat.number === seatNumber)?.isBooked
      );

      if (unavailableSeats.length > 0) {
        return res.status(400).json({
          message: `Seats ${unavailableSeats.join(
            ", "
          )} are already booked on segment from ${segment.from} to ${segment.to}.`,
        });
      }
    }

    // Book the seats for all segments between "from" and "to"
    for (let i = fromIndex; i < toIndex; i++) {
      const segmentIndex = bus.segments.findIndex(
        (seg) => seg.from === bus.route[i] && seg.to === bus.route[i + 1]
      );

      if (segmentIndex === -1) continue;

      seats.forEach(seatNumber => {
        const seatIndex = bus.segments[segmentIndex].seats.findIndex(
          seat => seat.number === seatNumber
        );
        if (seatIndex !== -1) {
          bus.segments[segmentIndex].seats[seatIndex].isBooked = true;
          bus.markModified(`segments.${segmentIndex}.seats`);
        }
      });
    }

    // Update available seats count
    const updatedAvailableSeats = bus.availableSeats - seats.length;
    bus.availableSeats = Math.max(0, updatedAvailableSeats);
    
    await bus.save();

    // Create booking with confirmed status
    const booking = new Booking({
      userId,
      busId,
      from,
      to,
      seatNumbers: seats,
      status: 'confirmed',
      startTime: bus.startTime,
      endTime: bus.endTime
    });

    await booking.save();

    // Generate ticket PDF
    
    const filePath = generateTicketPDF({
      userName: req.user.name,
      userEmail: req.user.email,
      busName: bus.name,
      busRegNumber: bus.reg_num,
      from,
      to,
      seatNumbers: seats,
      journeyStartTime: bus.startTime,
      journeyEndTime: bus.endTime,
      ticketId: booking._id,
    });

    // Send booking confirmation email with ticket attachment
    const emailSubject = "Booking Confirmation";
    const emailText = `Your seats ${seats.join(
      ", "
    )} from ${from} to ${to} have been successfully booked.`;
    const emailHtml = `
      <h2>Booking Confirmation</h2>
      <p>Your seats <strong>${seats.join(
        ", "
      )}</strong> from <strong>${from}</strong> to <strong>${to}</strong> have been successfully booked.</p>
      <p>Please find your ticket attached as a PDF.</p>
    `;
    const b_id=booking._id;
    await sendTicketEmail(email, emailSubject, emailText, emailHtml, filePath,b_id);

    // Send response to client
    res.status(200).json({
      message: `Seats booked successfully. Confirmation email sent to ${email}.`,
      bookedSeats: seats,
      from,
      to,
      bookingId: booking._id,
      ticketPDF: filePath, // Include the ticket PDF path
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



  //cancel
  export const cancelBooking = async (req, res) => {
    try {
      const { bookingId } = req.body;
      const userEmail = req.user.email;
  
      // Validate input
      if (!bookingId) {
        return res.status(400).json({ message: "Booking ID is required" });
      }
  
      // Find the booking
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      // Find the bus associated with the booking
      const bus = await Bus.findById(booking.busId);
      if (!bus) {
        return res.status(404).json({ message: "Bus not found" });
      }
  
      // Check cancellation time limit (24 hours before departure)
      const currentTime = new Date();
      const startTime = new Date(bus.startTime);
      const timeDifference = (startTime - currentTime) / 1000 / 60 / 60;
  
      if (timeDifference < 24) {
        return res.status(400).json({
          message: "Cancellation allowed only 24 hours before the journey",
        });
      }
  
      const { from, to, seatNumbers } = booking;
  
      // Identify affected segments
      const fromIndex = bus.route.indexOf(from);
      const toIndex = bus.route.indexOf(to);
  
      if (fromIndex === -1 || toIndex === -1 || fromIndex >= toIndex) {
        return res.status(400).json({ message: "Invalid route in booking." });
      }
  
      // Track total seats being canceled
      let totalSeatsToIncrement = 0;
  
      // Update the seats for relevant segments
      for (let i = fromIndex; i < toIndex; i++) {
        const segment = bus.segments.find(
          (seg) => seg.from === bus.route[i] && seg.to === bus.route[i + 1]
        );
  
        if (segment) {
          seatNumbers.forEach((seatNumber) => {
            const seat = segment.seats.find((s) => s.number === seatNumber);
            if (seat && seat.isBooked) {
              seat.isBooked = false; // Mark the seat as not booked
            }
          });
        }
      }
  
      // Calculate seats to increment only once for the entire route
      totalSeatsToIncrement += seatNumbers.length;
  
      // Increment available seats for the entire bus
      bus.availableSeats += totalSeatsToIncrement;
  
      // Save updated bus document
      await bus.save();
  
      // Mark the booking as canceled
      booking.isCanceled = true;
      booking.cancellationTime = new Date();
      await booking.save();
  
      // Send cancellation email
      const emailSubject = "Booking Cancellation";
      const emailText = `Your booking for seats ${booking.seatNumbers.join(
        ", "
      )} from ${booking.from} to ${booking.to} has been successfully canceled.`;
      const emailHtml = `
        <h2>Booking Cancellation</h2>
        <p>Your booking for seats <strong>${booking.seatNumbers.join(
          ", "
        )}</strong> from <strong>${booking.from}</strong> to <strong>${
        booking.to
      }</strong> has been successfully canceled.</p>
      `;
  
      await sendEmail(userEmail, emailSubject, emailText, emailHtml);
  
      res.status(200).json({
        message: `Booking canceled successfully. Cancellation email sent to ${userEmail}.`,
        availableSeats: bus.availableSeats,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  

// Add this new endpoint
export const getSeatAvailability = async (req, res) => {
  try {
    const { busId } = req.params;
    const bus = await Bus.findById(busId);
    
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // Get all active bookings for this bus
    const activeBookings = await Booking.find({ 
      busId, 
      status: 'confirmed',
      isCanceled: false 
    });

    // Return the bus segments with seat information
    res.status(200).json({
      availableSeats: bus.availableSeats,
      segments: bus.segments,
      totalSeats: bus.totalSeats,
      activeBookings
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
