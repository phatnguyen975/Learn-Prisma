import { prisma } from "../src/configs/prisma.js";

async function main() {
  // SELECT c.*, p.*
  // FROM categories c
  // JOIN products p ON c.id = p.category_id
  // WHERE p.id IS NOT NULL;
  const innerJoinResult = await prisma.category.findMany({
    where: {
      products: {
        some: {},
      },
    },
    include: {
      products: true,
    },
  });
  console.log(innerJoinResult);

  // SELECT c.*, p.*
  // FROM categories c
  // LEFT JOIN products p ON c.id = p.category_id;
  const leftJoinResult = await prisma.category.findMany({
    include: {
      products: true,
    },
  });
  console.log(leftJoinResult);

  // SELECT p.id AS product_id, p.name AS product_name,
  //        pt.product_id, pt.tag_id,
  //        t.id AS tag_id, t.name AS tag_name
  // FROM products AS p
  // LEFT JOIN product_tag AS pt ON p.id = pt.product_id
  // LEFT JOIN tags AS t ON pt.tag_id = t.id;
  const multipleJoinResult = await prisma.product.findMany({
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });
  console.log(multipleJoinResult);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
