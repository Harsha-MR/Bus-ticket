import express from 'express'
import connectDB from './config/db.js';
import router from './routes/userRouter.js';

const app = express();
app.use(express.json());
app.use('/api', router);

connectDB();
app.listen(3000, () => {
  console.log("Server is running at port 3000");
  
})
