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
