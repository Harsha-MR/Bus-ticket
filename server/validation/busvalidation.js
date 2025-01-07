import { z } from "zod";

// Define Zod schema for booking seats
export const bookSeatsSchema = z.object({
  from: z.string().nonempty("From location is required."),
  to: z.string().nonempty("To location is required."),
  seats: z.array(z.number().int().positive("Seat numbers must be positive integers."))
    .min(1, "At least one seat must be selected."),
});
