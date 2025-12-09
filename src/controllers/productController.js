import ProductService from "../services/productService.js";

const ProductController = {
  create: async (req, res) => {
    try {
      const newProduct = await ProductService.createProduct(req.validated.body);
      res.created("Product created successfully", newProduct);
    } catch (error) {
      res.error(error.message);
    }
  },

  getAll: async (req, res) => {
    const products = await ProductService.getProducts();
    res.ok(products, "Get products successfully");
  },

  getById: async (req, res) => {
    try {
      const id = Number(req.validated.params.id);
      const product = await ProductService.getProductById(id);
      res.ok(product, "Get product by id successfully");
    } catch (error) {
      res.error(error.message);
    }
  },

  getByCategoryId: async (req, res) => {
    try {
      const id = Number(req.validated.params.id);
      const products = await ProductService.getProductsByCategoryId(id);
      res.ok(products, "Get products by category id successfully");
    } catch (error) {
      res.error(error.message);
    }
  },

  update: async (req, res) => {
    try {
      const id = Number(req.validated.params.id);
      const data = req.validated.body;
      const updatedProduct = await ProductService.updateProduct(id, data);
      res.ok(updatedProduct, "Product updated successfully");
    } catch (error) {
      res.error(error.message);
    }
  },

  delete: async (req, res) => {
    try {
      const id = Number(req.validated.params.id);
      await ProductService.deleteProduct(id);
      res.ok(null, "Product deleted successfully");
    } catch (error) {
      res.error(error.message);
    }
  },
};

export default ProductController;
