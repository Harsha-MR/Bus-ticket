import zod from 'zod'

const userSchema = zod.object({
  username : zod.string(),
  email : zod.string().email(),
  phone : zod.number().min(10).max(10),
  password : zod.string().min(8),
  referalCode : zod.string()
});

const validateUser = (req, res, next) => {
  try {
    userSchema.parse(req.body); // Parse and validate request body
    next(); // Proceed if validation passes
  } catch (error) {
    res.status(400).json({
      error: 'Validation failed',
      details: error.issues // Return detailed validation errors
    });
  }
};

export default validateUser;