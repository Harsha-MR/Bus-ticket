import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "userModel", 
        required: true 
    }, // User who made the booking

    busId: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Bus", 
        required: true 
    }, // Bus for the booking

    seats: 
    [{ 
        type: Number, 
        required: true 
    }], // Selected seat numbers

    totalAmount: 
    { 
        type: Number, 
        required: true 
    }, // Total cost of booking

    paymentStatus: 
    { 
        type: String, 
        enum: ["Pending", "Success", "Failed"], 
        required: true 
    }, // Payment status
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
