import { prisma } from "../src/configs/prisma.js";

async function main() {
  const newCategory = await prisma.category.create({
    data: {
      name: "Office Supplies",
      products: {
        create: [
          { name: "Stapler", price: 5.0, quantity: 100 },
          { name: "Whiteboard Marker", price: 2.0, quantity: 500 },
        ],
      },
    },
    include: { products: true },
  });
  console.log(newCategory);

  const categoryData = await prisma.category.findUnique({
    where: { id: newCategory.id },
    include: {
      products: {
        where: { active: true },
      },
    },
  });
  console.log(categoryData);

  const updatedCategory = await prisma.category.update({
    where: { id: newCategory.id },
    data: {
      products: {
        connect: { id: 12 },
      },
    },
  });
  console.log(updatedCategory);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
