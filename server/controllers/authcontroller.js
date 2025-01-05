import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import registerSchema from "../validation/registerValidation.js";
import loginSchema from "../validation/loginValidation.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();

export const registerUser = async (req, res) => {
  try {
    // Validate request data
    const validatedData = registerSchema.parse(req.body);
    const { name, email,phone,password,isAdmin } = validatedData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    const newUser = new User({ name, email,phone, password: hashedPassword,isAdmin });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.errors || error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    // Validate request data
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(400).json({ message: error.errors || error.message });
  }
};

