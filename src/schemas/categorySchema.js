import { z } from "zod";

export const CategoryIdSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a number").transform(Number),
});

export const CategoryCreateSchema = z.object({
  name: z
    .string("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must be at most 60 characters"),
});

export const CategoryUpdateSchema = CategoryCreateSchema.partial();
