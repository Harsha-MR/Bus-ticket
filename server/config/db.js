import mongoose from 'mongoose';

const connectDB = async ()=> {
  try {
    await mongoose.connect('mongodb+srv://nishanthm621:n@cluster0.4zpaw.mongodb.net/bus')
    console.log("Database is connected"); 
  }
  catch(error) {
   console.log(`${error}`)
  }
}

export default connectDB;