import jwt from "jsonwebtoken";


const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Add user information to request object
    next(); // Continue to the next middleware or route handler
  } 
  catch (err) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};

export default authMiddleware;
