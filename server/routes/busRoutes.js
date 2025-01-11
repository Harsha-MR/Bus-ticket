// Bus Routes

import express from "express";
//import authMiddleware from "../middlewares/authMiddleware.js";
import { getBusesForRoute } from "../controllers/busController.js";
import { addBus, getBuses, updateBus, deleteBus,addRoute } from "../controllers/busController.js";
import { authMiddleware, adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Fetch buses for a route
router.get("/",getBusesForRoute);

// Routes for managing buses
router.post("/", authMiddleware, adminMiddleware, addBus); // Add a new bus
router.get("/", authMiddleware, getBuses); // Get all buses
router.put("/:id", authMiddleware, adminMiddleware, updateBus); // Update bus details
router.delete("/:id", authMiddleware, adminMiddleware, deleteBus); // Delete a bus

router.post("/addroute",authMiddleware, adminMiddleware,addRoute);



export default router;
