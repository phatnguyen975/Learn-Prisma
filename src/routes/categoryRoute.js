import express from "express";
import CategoryController from "../controllers/categoryController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import {
  CategoryCreateSchema,
  CategoryIdSchema,
  CategoryUpdateSchema,
} from "../schemas/categorySchema.js";

const categoryRouter = express.Router();

categoryRouter.post(
  "/",
  validate({ body: CategoryCreateSchema }),
  CategoryController.create
);

categoryRouter.get("/", CategoryController.getAll);

categoryRouter.get(
  "/:id",
  validate({ params: CategoryIdSchema }),
  CategoryController.getById
);

categoryRouter.put(
  "/:id",
  validate({ body: CategoryUpdateSchema, params: CategoryIdSchema }),
  CategoryController.update
);

categoryRouter.delete(
  "/:id",
  validate({ params: CategoryIdSchema }),
  CategoryController.delete
);

export default categoryRouter;
