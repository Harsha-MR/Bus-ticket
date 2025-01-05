import mongoose from "mongoose";
import dotenv from "dotenv";
import Bus from "./models/Bus.js";
import Route from "./models/Route.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data
    await Route.deleteMany({});
    await Bus.deleteMany({});

    // Add sample routes
    const route1 = new Route({
      source: "City A",
      destination: "City B",
      stops: ["Stop 1", "Stop 2"],
      duration: "6h 30m",
      distance: "300km",
    });
    const savedRoute1 = await route1.save();

    // Add sample buses
    const bus1 = new Bus({
      name: "Volvo AC",
      number: "KA-01-1234",
      seats: 40,
      routeId: savedRoute1._id,
    });
    await bus1.save();

    console.log("Database seeded successfully!");
    mongoose.connection.close();
  } 
  catch (err) {
    console.error("Seeding failed:", err);
  }
};

seedDatabase();
