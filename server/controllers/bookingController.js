//route for booking
//create a booking

import Booking from "../models/Booking.js";
import Bus from "../models/Bus.js";
import Route from "../models/Route.js"

// export const createBooking = async (req, res) => {
//   try {
//     const { busId, seats, totalAmount } = req.body;
//     const userId = req.user.id; // Extracted automatically from authMiddleware

//     // Check if seats are available
//     const bus = await Bus.findById(busId);
//     if (!bus) {
//       return res.status(404).json({ message: "Bus not found" });
//     }

//     // Check for seat conflicts (this can be expanded later for real-time updates)
//     const existingBookings = await Booking.find({ busId });
//     const bookedSeats = existingBookings.flatMap((booking) => booking.seats);
//     const isConflict = seats.some((seat) => bookedSeats.includes(seat));

//     if (isConflict) {
//       return res.status(400).json({ message: "Selected seats are already booked" });
//     }

//     // Create a new booking
//     const newBooking = new Booking({
//       userId,
//       busId,
//       seats,
//       totalAmount,
//       paymentStatus: "Pending", // This will be updated after payment integration
//     });

//     await newBooking.save();
//     res.status(201).json({ message: "Booking created successfully", booking: newBooking });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


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
  

export const bookSeats = async (req, res) => {
  try {
    const { busId, from, to, seats} = req.body;
    const userId = req.user.id;

    // Validate input
    if (!busId || !from || !to || !seats || !Array.isArray(seats) || !userId) {
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
    if (fromIndex == -1 || toIndex == -1 || fromIndex >= toIndex) {
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
          message: `Seats ${unavailableSeats.join(", ")} are already booked on segment from ${segment.from} to ${segment.to}.`,
        });
      }
    }

    // Book the seats for all segments between "from" and "to"
    for (let i = fromIndex; i < toIndex; i++) {
      const segment = bus.segments.find(
        (seg) => seg.from === bus.route[i] && seg.to === bus.route[i + 1]
      );

      segment.seats.forEach((seat) => {
        if (seats.includes(seat.number)) {
          seat.isBooked = true;
        }
      });

      // Mark the segment as modified so Mongoose saves it correctly
      bus.markModified(`segments.${i}.seats`);
    }
    

    // Decrement available seats only once
    bus.availableSeats -= seats.length;

    // Save the updated bus
    await bus.save();

    // Create a new booking record
    const booking = new Booking({
      userId,
      busId,
      from,
      to,
      seatNumbers: seats,
      journeyStartTime: new Date(), // Add the journey's start time
      journeyEndTime: new Date(), // Add the journey's end time (if applicable)
    });

    await booking.save(); // Save the booking to the database

    res.status(200).json({
      message: "Seats booked successfully.",
      bookedSeats: seats,
      from,
      to,
      bookingId: booking._id, // Return the booking ID
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



  //cancel
  
  // export const cancelBooking = async (req, res) => {
  //   try {
  //     const { bookingId } = req.body;
  
  //     // Validate input
  //     if (!bookingId) {
  //       return res.status(400).json({ message: "Booking ID is required" });
  //     }
  
  //     // Find the booking
  //     const booking = await Booking.findById(bookingId);
  //     if (!booking) {
  //       return res.status(404).json({ message: "Booking not found" });
  //     }
  
  //     // Check if the journey has started
  //     const currentTime = new Date();
  //     if (currentTime >= booking.journeyStartTime) {
  //       return res
  //         .status(400)
  //         .json({ message: "Cancellation not allowed after journey starts" });
  //     }
  
  //     // Update the seat status for the relevant bus
  //     const bus = await Bus.findById(booking.busId);
  //     if (!bus) {
  //       return res.status(404).json({ message: "Bus not found" });
  //     }
  
  //     const { from, to, seatNumbers } = booking;
  
  //     // Update seat status in all relevant segments
  //     bus.segments.forEach((segment) => {
  //       if (segment.from === from || segment.to === to) {
  //         seatNumbers.forEach((seatNumber) => {
  //           const seat = segment.seats.find((s) => s.number === seatNumber);
  //           if (seat) {
  //             seat.isBooked = false;
  //           }
  //         });
  //       }
  //     });
  
  //     await bus.save(); // Save updated bus details
  
  //     // Mark booking as canceled (if soft delete is preferred)
  //     booking.isCanceled = true; // Assuming you have an `isCanceled` field
  //     booking.cancellationTime = new Date();
  //     await booking.save();
  
  //     // Alternatively, remove the booking record (if hard delete is required)
  //     // await booking.remove();
  
  //     res.status(200).json({
  //       message: "Booking canceled successfully",
  //       updatedBus: bus,
  //       updatedBooking: booking,
  //     });
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // };


export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;

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

    // Calculate the difference between the current time and bus departure time
    const currentTime = new Date();
    const startTime = new Date(bus.startTime);
    const timeDifference = (startTime - currentTime) / 1000 / 60 / 60; // Convert to hours

    // Check if the cancellation is allowed (must be at least 24 hours before departure)
    if (timeDifference < 24) {
      return res.status(400).json({ message: "Cancellation allowed only 24 hours before the journey" });
    }

    // Update the seat status for the relevant bus
    const { from, to, seatNumbers } = booking;

    // Update seat status in all relevant segments
    bus.segments.forEach((segment) => {
      if (segment.from === from || segment.to === to) {
        seatNumbers.forEach((seatNumber) => {
          const seat = segment.seats.find((s) => s.number === seatNumber);
          if (seat) {
            seat.isBooked = false;
          }
        });
      }
    });

    await bus.save();

    // Remove the booking record
     booking.isCanceled=true;
    await booking.save();
    
    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  
