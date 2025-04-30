import mongoose from "mongoose";
import { number } from "zod";

const routeSchema = new mongoose.Schema(
  {
    source: 
    { 
        type: String,
        required: true 
    }, // e.g., "City A"

    destination: 
    { 
        type: String,
        required: true 
    }, // e.g., "City B"

    stops: 
    [{ 
        type: String 
    }], // Optional list of stops

    duration:
    { 
        type: String,
        required: true 
    }, // e.g., "6h 30m"

    distance: 
    { 
        type: String, 
        required: true 
    }, // e.g., "300km"
    
  },
  { timestamps: true }
);

export default mongoose.model("Route", routeSchema);
