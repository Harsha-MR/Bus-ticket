import express from 'express'
import connectDB from './config/db.js';
import cors from "cors";
import authRoutes from './routes/authRoute.js';
import userRoutes from "./routes/userRoutes.js";
import busRoutes from "./routes/busRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);  //user register and login
app.use("/api/users", userRoutes); //user related endpoint
app.use("/api/buses", busRoutes);  //bus related endpoint 
app.use("/api/bookings", bookingRoutes); //for booking and get booking history 



//DataBase Connection
connectDB();

//server Setup
app.listen(3000, () => {
  console.log("Server is running at port 3000");
})



