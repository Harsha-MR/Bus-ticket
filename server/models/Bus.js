import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  isBooked: { type: Boolean, default: false },
});

const segmentSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  seats: [seatSchema], // Each segment has its own set of seat bookings
});

const busSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g., "Volvo AC"
    reg_num: { type: String, required: true, unique: true }, // e.g., "KA-01-1234"
    totalSeats: { type: Number, required: true }, // Total number of seats in the bus
    availableSeats: { type: Number, default: 0 }, // Number of currently available seats
    routeId: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true }, // Link to Route
    route: { type: [String], required: true }, // Array of stop names in order
    segments: [segmentSchema], // Details about each route segment
    seats: { type: Number, required: true }, // Duplicate with `totalSeats`, but included for compatibility
  },
  { timestamps: true }
);

export default mongoose.model("Bus", busSchema);
