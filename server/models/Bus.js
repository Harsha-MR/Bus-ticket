import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  number: { type: Number, required: true },
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
    id: {type :String, required : true},
    name: { type: String, required: true }, // e.g., "Volvo AC"
    type : {type : String, required : true},
    reg_num: { type: String, required: true, unique: true }, // e.g., "KA-01-1234"
    totalSeats: { type: Number, required: true }, // Total number of seats in the bus
    availableSeats: { type: Number}, // Number of currently available seats
    routeId: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true }, // Link to Route
    route: { type: [String], required: true }, // Array of stop names in order
    segments: [segmentSchema], // Details about each route segment
    //seats: { type: Number, required: true }, // Duplicate with `totalSeats`, but included for compatibility
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

// import mongoose from "mongoose";

// const seatSchema = new mongoose.Schema({
//   number: { type: Number, required: true },
//   isBooked: { type: Boolean, default: false },
// });

// const segmentSchema = new mongoose.Schema({
//   from: { type: String, required: true },
//   to: { type: String, required: true },
//   seats: [seatSchema], // Each segment has its own set of seat bookings
// });

// const busSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true }, // e.g., "Sugama Tourist"
//     type: { type: String, required: true }, // e.g., "NON A/C Sleeper (2+1)"
//     reg_num: { type: String, required: true, unique: true }, // e.g., "KA-01-1234"
//     totalSeats: { type: Number, required: true }, // Total number of seats in the bus
//     availableSeats: { type: Number }, // Number of currently available seats
//     windowSeats: { type: Number, default: 0 }, // Number of window seats available
//     ratings: { type: Number, default: 0 }, // Average ratings of the bus
//     reviews: { type: Number, default: 0 }, // Number of reviews
//     price: { type: Number, required: true }, // Ticket price
//     originalPrice: { type: Number }, // Original price before discounts
//     routeId: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true }, // Link to Route
//     route: { type: [String], required: true }, // Array of stop names in order
//     boardingPoints: { type: [String], required: true }, // List of boarding points
//     droppingPoints: { type: [String], required: true }, // List of dropping points
//     segments: [segmentSchema], // Details about each route segment
//     startTime: { type: String, required: true }, // Departure time (e.g., "22:45")
//     endTime: { type: String, required: true }, // Arrival time (e.g., "05:46")
//     duration: { type: String, required: true }, // Duration of the journey (e.g., "07h 01m")
//     from: { type: String, required: true }, // Source location
//     to: { type: String, required: true }, // Destination location
//     date: { type: String, required: true }, // Journey date in YYYY-MM-DD format
//   },
//   { timestamps: true }
// );

// // Automatically set `availableSeats` equal to `totalSeats` when creating a new bus
// busSchema.pre("save", function (next) {
//   if (this.isNew) {
//     this.availableSeats = this.totalSeats;
//   }
//   next();
// });

// export default mongoose.model("Bus", busSchema);
