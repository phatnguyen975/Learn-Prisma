import { prisma } from "../configs/prisma.js";

const ProductService = {
  createProduct: async (data) => {
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    const newProduct = await prisma.product.create({
      data,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      omit: {
        categoryId: true,
      },
    });

    return newProduct;
  },

  getProducts: async () => {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      omit: {
        categoryId: true,
      },
    });

    return products;
  },

  getProductById: async (id) => {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      omit: {
        categoryId: true,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  },

  getProductsByCategoryId: async (id) => {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    const products = await prisma.product.findMany({
      where: {
        categoryId: id,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      omit: {
        categoryId: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return products;
  },

  updateProduct: async (id, data) => {
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    const updatedProduct = await prisma.product.update({
      data,
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      omit: {
        categoryId: true,
      },
    });

    return updatedProduct;
  },

  deleteProduct: async (id) => {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    await prisma.product.delete({
      where: { id },
    });
  },
};

export default ProductService;
