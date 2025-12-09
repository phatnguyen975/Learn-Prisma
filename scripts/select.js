import { prisma } from "../src/configs/prisma.js";

async function main() {
  // findUnique: Get one record by Unique Identifier (ID or Unique Field)
  const category = await prisma.category.findUnique({
    where: {
      name: "Electronics",
    },
    include: { products: true },
  });
  console.log("Found Unique Category:", category);

  // findFirst: Get the first record matching a condition
  const latestProduct = await prisma.product.findFirst({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });
  console.log("Latest Product:", latestProduct);

  // findMany: Get a list of records
  const lowStockProducts = await prisma.product.findMany({
    where: {
      quantity: { lt: 10 },
      active: true,
    },
    select: { name: true, quantity: true },
  });
  console.log("Low Stock Products:", lowStockProducts);

  const products = await prisma.product.findMany({
    // WHERE: Filter conditions
    where: {
      active: true,
      price: {
        gte: 100,
        lte: 500,
      },
      name: {
        contains: "Smart",
        mode: "insensitive",
      },
    },
    // ORDER BY: Sorting results
    orderBy: [{ price: "desc" }, { createdAt: "asc" }],
    // PAGINATION
    take: 10,
    skip: 0,
    // EAGER LOADING (Fetch related data)
    include: {
      category: true,
    },
  });
  console.log(products);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
