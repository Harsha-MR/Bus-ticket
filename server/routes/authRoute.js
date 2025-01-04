import express from "express";
import { registerUser } from "../controllers/authcontroller.js";
import { loginUser } from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

export default router;
