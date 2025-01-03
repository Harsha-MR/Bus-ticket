import mongoose from 'mongoose';

const connectDB = async ()=> {
  try {
    await mongoose.connect('mongodb+srv://harshakumarmr88:CQY4rofR61aZizTv@cluster0.ptnia.mongodb.net/UsersData')
    console.log("Database is connected"); 
  }
  catch(error) {
   console.log(`${error}`)
  }
}

export default connectDB;

