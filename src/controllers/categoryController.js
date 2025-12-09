import CategoryService from "../services/categoryService.js";

const CategoryController = {
  create: async (req, res) => {
    try {
      const newCategory = await CategoryService.createCategory(
        req.validated.body
      );
      res.created("Category created successfully", newCategory);
    } catch (error) {
      res.error(error.message);
    }
  },

  getAll: async (req, res) => {
    const categories = await CategoryService.getCategories();
    res.ok(categories, "Get categories successfully");
  },

  getById: async (req, res) => {
    try {
      const id = Number(req.validated.params.id);
      const category = await CategoryService.getCategoryById(id);
      res.ok(category, "Get category by id successfully");
    } catch (error) {
      res.error(error.message);
    }
  },

  update: async (req, res) => {
    try {
      const id = Number(req.validated.params.id);
      const name = req.validated.body.name;
      const updatedCategory = await CategoryService.updateCategory(id, name);
      res.ok(updatedCategory, "Category updated successfully");
    } catch (error) {
      res.error(error.message);
    }
  },

  async delete(req, res) {
    try {
      const id = Number(req.validated.params.id);
      await CategoryService.deleteCategory(id);
      res.ok(null, "Category deleted successfully");
    } catch (error) {
      res.error(error.message);
    }
  },
};

export default CategoryController;
