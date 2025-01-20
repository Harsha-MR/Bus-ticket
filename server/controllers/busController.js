import Bus from "../models/Bus.js";
import Route from "../models/Route.js";

// Get buses for a specific route and date
export const getBusesForRoute = async (req, res) => {
  try {
    const { from, to, date } = req.query; // Using query parameters

    if (!from || !to || !date) {
      return res
        .status(400)
        .json({ message: "Source, destination, and date are required." });
    }

    // Find the route matching source and destination
    const route = await Route.findOne({ source: from, destination: to });

    if (!route) {
      return res.status(404).json({ message: "No route found." });
    }

    // Find buses for the route and date
    const startDate = new Date(`${date}T00:00:00.000+00:00`);
    const endDate = new Date(`${date}T23:59:59.999+00:00`);

    const buses = await Bus.find({
      routeId: route._id,
      startTime: { $gte: startDate, $lt: endDate },
    });

    if (!buses || buses.length === 0) {
      return res
        .status(404)
        .json({ message: "No buses found for the given criteria." });
    }

    res.status(200).json(buses);
  } catch (error) {
    console.error("Error fetching buses:", error);
    res.status(500).json({
      message: "An error occurred while fetching buses. Please try again later.",
    });
  }
};

// Add a new bus
export const addBus = async (req, res) => {
  try {
    const {
      // busId,
      name,
      type,
      reg_num,
      totalSeats,
      // availableSeats,
      routeId,
      route,
      segments,
      startTime,
      endTime,
      duration,
      reviews,
      price,
      originalPrice,
      boardingPoints,
      dropingPoints,
      distance,
      ratings
    } = req.body;

    // Validate input
    if (
      // !busId ||
      !name ||
      !type ||
      !reg_num ||
      !totalSeats ||
      // !availableSeats ||
      !routeId ||
      !route ||
      !segments ||
      !startTime ||
      !endTime ||
      !duration ||
      !reviews ||
      !price ||
      !originalPrice ||
      !boardingPoints ||
      !dropingPoints ||
      !distance ||
      !ratings
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the registration number is unique
    const existingBus = await Bus.findOne({ reg_num });
    if (existingBus) {
      return res
        .status(400)
        .json({ message: "Bus with this registration number already exists." });
    }

    // Validate the route
    const existingRoute = await Route.findById(routeId);
    if (!existingRoute) {
      return res.status(400).json({ message: "This route does not exist." });
    }

    // Validate date objects
    const start = new Date(startTime);
    const end = new Date(endTime);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res
        .status(400)
        .json({ message: "Invalid start time or end time." });
    }

    // Create the new bus
    const newBus = new Bus({
      // busId,
      name,
      reg_num,
      type,
      totalSeats,
      availableSeats: totalSeats, // Initial available seats are equal to total seats
      routeId,
      route,
      segments,
      startTime: start,
      endTime: end,
      duration,
      reviews,
      price,
      originalPrice,
      boardingPoints,
      dropingPoints,
      distance,
      duration,
      ratings
    });

    // Save the bus to the database
    await newBus.save();

    res.status(201).json({ message: "Bus added successfully.", bus: newBus });
  } catch (error) {
    console.error("Error adding bus:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update bus details
export const updateBus = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      reg_num,
      totalSeats,
      availableSeats,
      routeId,
      route,
      segments,
      startTime,
      endTime,
      duration,
      reviews,
      price,
      originalPrice,
      boardingPoints,
      dropingPoints,
      distance,
      ratings
    } = req.body;

    const updatedBus = await Bus.findByIdAndUpdate(
      id,
      {
        name,
        reg_num,
        totalSeats,
        availableSeats,
        routeId,
        route,
        segments,
        startTime,
        endTime,
        duration,
        reviews,
        price,
        originalPrice,
        boardingPoints,
        dropingPoints,
        distance,
        ratings
      },
      { new: true }
    );

    if (!updatedBus) {
      return res.status(404).json({ message: "Bus not found." });
    }

    res
      .status(200)
      .json({ message: "Bus updated successfully.", bus: updatedBus });
  } catch (error) {
    console.error("Error updating bus:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all buses
export const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    if (buses.length === 0) {
      return res
        .status(404)
        .json({ message: "No buses found in the database." });
    }
    res.status(200).json({
      message: "Buses fetched successfully.",
      buses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Fetch bus by it's ID
export const getBusById = async (req, res) => {
  try {
    const { busId } = req.params; // assuming busId is passed in the URL params
    const bus = await Bus.findById(busId);

    if (!bus) {
      return res
        .status(404)
        .json({ message: `Bus with ID ${busId} not found.` });
    }

    res.status(200).json({
      message: "Bus fetched successfully.",
      bus,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Fetch bus by its ID
// Fetch bus by any unique attribute
// export const getBusByAttribute = async (req, res) => {
//   try {
//     const { attribute, value } = req.params; // Expecting attribute and value in the route params

//     if (!attribute || !value) {
//       return res.status(400).json({ message: "Attribute and value are required." });
//     }

//     Dynamic query construction
    // const query = { [attribute]: value };

//     // Fetch the bus based on the unique attribute
//     const bus = await Bus.findOne(query);

//     if (!bus) {
//       return res
//         .status(404)
//         .json({ message: `Bus with ${attribute} '${value}' not found.` });
//     }

//     return res.status(200).json({
//       message: `Bus fetched successfully by ${attribute}.`,
//       bus,
//     });
//   } catch (error) {
//     // Handle errors, such as invalid attribute or database issues
//     if (error.name === "CastError" || error.codeName === "BadValue") {
//       return res.status(400).json({ message: "Invalid query format or attribute." });
//     }
//     return res.status(500).json({ message: error.message });
//   }
// };





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

// Add a route
export const addRoute = async (req, res) => {
  try {
    const { source, destination, stops, duration, distance } = req.body;

    if (!source || !destination || !duration || !distance) {
      return res.status(400).json({
        message: "Source, destination, duration, and distance are required.",
      });
    }

    const newRoute = new Route({
      source,
      destination,
      stops: stops || [],
      duration,
      distance,
    });

    await newRoute.save();

    res
      .status(201)
      .json({ message: "Route added successfully.", route: newRoute });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
