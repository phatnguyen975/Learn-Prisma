import express from "express";
import ProductController from "../controllers/productController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import {
  ProductCreateSchema,
  ProductIdSchema,
  ProductUpdateSchema,
} from "../schemas/productSchema.js";

const productRouter = express.Router();

productRouter.post(
  "/",
  validate({ body: ProductCreateSchema }),
  ProductController.create
);

productRouter.get("/", ProductController.getAll);

productRouter.get(
  "/:id",
  validate({ params: ProductIdSchema }),
  ProductController.getById
);

productRouter.get(
  "/category/:id",
  validate({ params: ProductIdSchema }),
  ProductController.getByCategoryId
);

productRouter.put(
  "/:id",
  validate({ body: ProductUpdateSchema, params: ProductIdSchema }),
  ProductController.update
);

productRouter.delete(
  "/:id",
  validate({ params: ProductIdSchema }),
  ProductController.delete
);

export default productRouter;
