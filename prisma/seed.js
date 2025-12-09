import { prisma } from "../src/configs/prisma.js";

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Seed Categories
  await prisma.category.createMany({
    data: [
      { name: "Electronics" },
      { name: "Clothing" },
      { name: "Books" },
      { name: "Furniture" },
      { name: "Sports" }
    ],
  });
  console.log("✔ Categories seeded");

  const categoryList = await prisma.category.findMany();

  // 2. Seed Tags
  await prisma.tag.createMany({
    data: [
      { name: "New" },
      { name: "Sale" },
      { name: "Popular" },
      { name: "Limited" },
      { name: "Trending" }
    ],
  });
  console.log("✔ Tags seeded");

  const tagList = await prisma.tag.findMany();

  // 3. Seed Products
  const productsData = [
    {
      name: "Smartphone X100",
      description: "High-end smartphone with excellent performance",
      price: 699.99,
      quantity: 50,
      categoryId: categoryList[0].id,
    },
    {
      name: "Men T-shirt Premium",
      description: "Soft cotton premium T-shirt",
      price: 19.99,
      quantity: 200,
      categoryId: categoryList[1].id,
    },
    {
      name: "Wooden Desk",
      description: "Durable wooden desk for home office",
      price: 150.00,
      quantity: 20,
      categoryId: categoryList[3].id,
    },
    {
      name: "Fantasy Novel - Dragon Realm",
      description: "Best-selling fantasy fiction novel",
      price: 12.50,
      quantity: 100,
      categoryId: categoryList[2].id,
    },
    {
      name: "Football Ball Pro",
      description: "Professional level football",
      price: 30.00,
      quantity: 80,
      categoryId: categoryList[4].id,
    },
  ];

  const createdProducts = [];
  for (const p of productsData) {
    const product = await prisma.product.create({ data: p });
    createdProducts.push(product);
  }
  console.log("✔ Products seeded");

  // 4. Seed Product-Tag relations
  const productTagData = [
    { productId: createdProducts[0].id, tagId: tagList[0].id },
    { productId: createdProducts[0].id, tagId: tagList[2].id },

    { productId: createdProducts[1].id, tagId: tagList[1].id },
    { productId: createdProducts[1].id, tagId: tagList[4].id },

    { productId: createdProducts[2].id, tagId: tagList[3].id },

    { productId: createdProducts[3].id, tagId: tagList[2].id },
    { productId: createdProducts[3].id, tagId: tagList[0].id },

    { productId: createdProducts[4].id, tagId: tagList[4].id },
  ];

  await prisma.productTag.createMany({
    data: productTagData,
  });

  console.log("✔ ProductTag seeded");
  console.log("🌱 Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
