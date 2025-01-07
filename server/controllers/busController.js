//Fetch Buses for a Route

import Bus from "../models/Bus.js";
import Route from "../models/Route.js";


export const getBusesForRoute = async (req, res) => {
  try {
    const { source, destination } = req.query;
    // console.log(source);
    // console.log(destination);
    
    if (!source || !destination) {
      return res.status(400).json({ message: "Source and destination are required." });
    }
    // Find the route matching source and destination
    const route = await Route.findOne({ source, destination });
    if (!route) {
      return res.status(404).json({ message: "No route found" });
    }

    // Find buses for the route
    const buses = await Bus.find({ routeId: route._id });
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new bus


export const addBus = async (req, res) => {
  try {
    const {
      name,
      reg_num,
      totalSeats,
      availableSeats,
      routeId,
      route,
      segments,
      seats,
    } = req.body;

    // Validate input
    if (
      !name ||
      !reg_num ||
      !totalSeats ||
      !availableSeats ||
      !routeId ||
      !route ||
      !segments ||
      !seats
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the registration number is unique
    const existingBus = await Bus.findOne({ reg_num });
    console.log(existingBus);
    
    if (existingBus) {
      return res
        .status(400)
        .json({ message: "Bus with this registration number already exists." });
    }

    // Create the new bus
    const newBus = new Bus({
      name,
      reg_num,
      totalSeats,
      availableSeats,
      routeId,
      route,
      segments,
      seats,
    });

    // Save the bus to the database
    await newBus.save();

    res.status(201).json({ message: "Bus added successfully.", bus: newBus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all buses
export const getBuses = async (req, res) => {
  try {
    const buses = await Bus.find().populate("routeId");
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update bus details
export const updateBus = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, reg_num, totalSeats, routeId, route,segments,seats} = req.body;

    const updatedBus = await Bus.findByIdAndUpdate(
      id,
      { name, reg_num, totalSeats, routeId, route,segments,seats },
      { new: true }
    );

    if (!updatedBus) {
      return res.status(404).json({ message: "Bus not found." });
    }

    res.status(200).json({ message: "Bus updated successfully.", bus: updatedBus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a bus
export const deleteBus = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBus = await Bus.findByIdAndDelete(id);

    if (!deletedBus) {
      return res.status(404).json({ message: "Bus not found." });
    }

    res.status(200).json({ message: "Bus deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//booking of bus seat
//seats are locked for the specified segment but remain available for other segments.


// export const bookSeats = async (req, res) => {
//   try {
//     const { busId, from, to, seats } = req.body;

//     // Validate input
//     if (!busId || !from || !to || !seats || !Array.isArray(seats)) {
//       return res.status(400).json({ message: "Invalid input provided." });
//     }

//     // Find the bus
//     const bus = await Bus.findById(busId);
//     if (!bus) {
//       return res.status(404).json({ message: "Bus not found." });
//     }

//     // Check that the route includes both "from" and "to"
//     const fromIndex = bus.route.indexOf(from);
//     const toIndex = bus.route.indexOf(to);
//     if (fromIndex === -1 || toIndex === -1 || fromIndex >= toIndex) {
//       return res.status(400).json({ message: "Invalid route specified." });
//     }

//     // Check seat availability for all segments between "from" and "to"
//     for (let i = fromIndex; i < toIndex; i++) {
//       const segment = bus.segments.find(
//         (seg) => seg.from === bus.route[i] && seg.to === bus.route[i + 1]
//       );

//       if (!segment) {
//         return res.status(400).json({
//           message: `Segment from ${bus.route[i]} to ${bus.route[i + 1]} not found.`,
//         });
//       }

//       const unavailableSeats = seats.filter(
//         (seatNumber) =>
//           segment.seats.find((seat) => seat.number === seatNumber)?.isBooked
//       );

//       if (unavailableSeats.length > 0) {
//         return res.status(400).json({
//           message: `Seats ${unavailableSeats.join(
//             ", "
//           )} are already booked on segment from ${segment.from} to ${segment.to}.`,
//         });
//       }
//     }

//     // Book the seats
//     for (let i = fromIndex; i < toIndex; i++) {
//       const segment = bus.segments.find(
//         (seg) => seg.from === bus.route[i] && seg.to === bus.route[i + 1]
//       );

//       segment.seats.forEach((seat) => {
//         if (seats.includes(seat.number)) {
//           seat.isBooked = true;
//         }
//       });
//     }

//     // Decrement available seats
//     bus.availableSeats -= seats.length;

//     // Save the updated bus
//     await bus.save();

//     res.status(200).json({
//       message: "Seats booked successfully.",
//       bookedSeats: seats,
//       from,
//       to,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const bookSeats = async (req, res) => {
  try {
    const { busId, from, to, seats } = req.body;

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
    }

    // Decrement available seats only once
    bus.availableSeats -= seats.length;

    // Save the updated bus
    await bus.save();

    res.status(200).json({
      message: "Seats booked successfully.",
      bookedSeats: seats,
      from,
      to,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

