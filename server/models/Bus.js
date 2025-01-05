import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
  {
    name: 
    { 
        type: String, 
        required: true 
    }, // e.g., "Volvo AC"

    number: 
    { 
        type: String,
        required: true, 
        unique: true 
    }, // e.g., "KA-01-1234"

    seats: 
    { 
        type: Number,
        required: true 
    }, // Total seats

    routeId: 
    { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Route", required: true 
    }, // Link to Route
  },
  { timestamps: true }
);

export default mongoose.model("Bus", busSchema);
