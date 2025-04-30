import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    seatNumbers: [{ type: Number, required: true }],
    startTime: { type: Date, required: false},
    endTime: { type: Date, required: false },
    isCanceled: { type: Boolean, default: false },
    cancellationTime: { type: Date },
    reminderSent: { type: Boolean, default: false }, // Track if the reminder is sent
    status: { 
      type: String, 
      enum: ['confirmed', 'cancelled', 'pending'],
      default: 'confirmed'
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);

