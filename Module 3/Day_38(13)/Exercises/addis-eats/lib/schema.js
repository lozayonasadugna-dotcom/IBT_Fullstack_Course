import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().regex(/^(09|\+2519)\d{8}$/, "Use 09... or +2519..."),
  dishId: z.string().min(1, "Dish is required"),
});