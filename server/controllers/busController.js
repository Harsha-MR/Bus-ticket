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
    const { name, routeId, seats, departureTime, arrivalTime,reg_num } = req.body;

    // Validate input
    if (!name || !routeId || !seats || !departureTime || !arrivalTime) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newBus = new Bus({ name, routeId, seats, departureTime, arrivalTime,reg_num });
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
    const { name, routeId, seats, departureTime, arrivalTime,reg_num} = req.body;

    const updatedBus = await Bus.findByIdAndUpdate(
      id,
      { name, routeId, seats, departureTime, arrivalTime,reg_num },
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

