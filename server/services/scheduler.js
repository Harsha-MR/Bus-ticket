import cron from "node-cron";
import Booking from "../models/bookingModel.js";
import nodemailer from "nodemailer";

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "process.env.EMAIL_USER",
    pass: "process.env.EMAIL_PASS",
  },
});

// Reminder Job
cron.schedule("*/30 * * * *", async () => {
  try {
    const now = new Date();
    const upcoming = new Date(now.getTime() + 3 * 60 * 60 * 1000); // 3 hours ahead

    // Find bookings for journeys starting in the next 3 hours
    const bookings = await Booking.find({
      startTime: { $gte: now, $lte: upcoming },
      reminderSent: false,
    }).populate("busId"); // Populate bus details if needed

    for (const booking of bookings) {
      const emailBody = `
        <h1>Journey Reminder</h1>
        <p>Hello,</p>
        <p>Your journey is scheduled to start in the next 3 hours. Here are the details:</p>
        <ul>
          <li><b>Bus:</b> ${booking.busId.name}</li>
          <li><b>Boarding Point:</b> ${booking.from}</li>
          <li><b>Destination:</b> ${booking.to}</li>
          <li><b>Seats:</b> ${booking.seatNumbers.join(", ")}</li>
          <li><b>Start Time:</b> ${booking.startTime.toLocaleString()}</li>
        </ul>
        <p>Have a safe journey!</p>
      `;

      // Send email
      await transporter.sendMail({
        from: "process.env.EMAIL_USER",
        to: booking.userEmail,
        subject: "Journey Reminder",
        html: emailBody,
      });

      // Mark reminder as sent
      booking.reminderSent = true;
      await booking.save();
    }

    console.log("Journey reminders sent successfully.");
  } catch (error) {
    console.error("Error in reminder job:", error.message);
  }
});
