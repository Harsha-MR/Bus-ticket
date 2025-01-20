import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  number: { type: String, required: true },
  type: {
    type: String,
    enum: ["regular", "female", "handicap"],
    default: "regular", // Seat type: regular, female, or handicap
  },
  isBooked: { type: Boolean, default: false },
});

const boardingSchema = new mongoose.Schema({
  bpName : {type : String, required : true}
})

const dropingSchema = new mongoose.Schema({
  dpName : {type : String, required : true}
})

const segmentSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  seats: [seatSchema], // Each segment has its own set of seat bookings
});

const busSchema = new mongoose.Schema(
  {
    // id: {type :String, required : true},
    name: { type: String, required: true }, // e.g., "Volvo AC"
    type : {type : String, required : true},
    reg_num: { type: String, required: true, unique: true }, // e.g., "KA-01-1234"
    totalSeats: { type: Number, required: true }, // Total number of seats in the bus
    availableSeats: { type: Number}, // Number of currently available seats
    routeId: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true }, // Link to Route
    route: { type: [String], required: true }, // Array of stop names in order
    segments: [segmentSchema], // Details about each route segment
    startTime: { type: Date, required: true }, // Arrival time of the bus
    endTime: { type: Date, required: true }, // Departure time of the bus
    duration : {type : String, required:true},
    reviews : {type : String, required:true},
    price : {type : String, required:true},
    originalPrice : {type : String, required:true},
    boardingPoints :[boardingSchema],
    dropingPoints : [dropingSchema],
    distance : {type : String, required : true},
    ratings : {type : String, required : true}

  },
  { timestamps: true }
);

// Automatically set `availableSeats` equal to `totalSeats` when creating a new bus
busSchema.pre("save", function (next) {
  if (this.isNew) {
    this.availableSeats = this.totalSeats;
  }
  next();
});

export default mongoose.model("Bus", busSchema);
