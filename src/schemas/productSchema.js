import { z } from "zod";

export const ProductIdSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a number").transform(Number),
});

export const ProductCreateSchema = z.object({
  name: z
    .string("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(120, "Name must be at most 120 characters"),

  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .optional(),

  price: z
    .number("Price is required")
    .positive("Price must be greater than 0"),

  currency: z
    .string()
    .length(3, "Currency must be a 3-letter code")
    .default("USD"),

  quantity: z
    .number()
    .int()
    .nonnegative("Quantity must be >= 0")
    .default(0),

  active: z.boolean().default(true),

  categoryId: z
    .number("Category ID is required")
    .int()
    .positive("Category ID must be positive"),
});

export const ProductUpdateSchema = ProductCreateSchema.partial();
