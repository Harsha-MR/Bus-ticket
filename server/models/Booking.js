import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
      from: { type: String, required: true },
      to: { type: String, required: true },
      seatNumbers: [{ type: Number, required: true }],
      journeyStartTime: { type: Date, required: true },
      journeyEndTime: { type: Date, required: true },
      isCanceled: { type: Boolean, default: false },
      cancellationTime: { type: Date },
    },
    { timestamps: true }
  );
  
  export default mongoose.model("Booking", bookingSchema);
  
