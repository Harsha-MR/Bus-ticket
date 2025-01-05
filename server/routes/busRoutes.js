// Bus Routes

import express from "express";
//import authMiddleware from "../middlewares/authMiddleware.js";
import { getBusesForRoute } from "../controllers/busController.js";

const router = express.Router();

// Fetch buses for a route
router.get("/",getBusesForRoute);

export default router;
