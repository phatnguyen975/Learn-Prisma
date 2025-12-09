import { prisma } from "../configs/prisma.js";

const CategoryService = {
  createCategory: async (category) => {
    const existingCategory = await prisma.category.findUnique({
      where: { name: category.name },
    });

    if (existingCategory) {
      throw new Error(`${category.name} already exists`);
    }

    const newCategory = await prisma.category.create({
      data: { name: category.name },
    });

    return newCategory;
  },

  getCategories: async () => {
    const categories = await prisma.category.findMany();
    return categories;
  },

  getCategoryById: async (id) => {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  },

  updateCategory: async (id, name) => {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });

    if (existingCategory) {
      throw new Error(`${category.name} already exists`);
    }

    const updatedCategory = await prisma.category.update({
      data: { name },
      where: { id },
    });

    return updatedCategory;
  },

  deleteCategory: async (id) => {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    const productCount = await prisma.product.count({
      where: { categoryId: id },
    });

    if (productCount > 0) {
      throw new Error(
        `Category ${id} is being used in ${productCount} product(s)`
      );
    }

    await prisma.category.delete({
      where: { id },
    });
  },
};

export default CategoryService;
