import express from 'express'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);


connectDB();
app.listen(3000, () => {
  console.log("Server is running at port 3000");
})
