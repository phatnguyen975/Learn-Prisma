import { prisma } from "../src/configs/prisma.js";

async function main() {
  // Array-style transaction
  // If any query fails, everything is rolled back
  const txResult = await prisma.$transaction([
    prisma.product.update({
      where: { id: 12 },
      data: { quantity: { decrement: 2 } },
    }),
    prisma.product.update({
      where: { id: 13 },
      data: { quantity: { increment: 2 } },
    }),
  ]);
  console.log(txResult);

  // Callback-style transaction
  // Allows dynamic logic inside the transaction
  const result = await prisma.$transaction(async (tx) => {
    const newProduct = await tx.product.create({
      data: {
        name: "Limited Edition Combo",
        description: "Special bundle product",
        price: 150,
        quantity: 50,
        categoryId: 12,
      },
    });

    const tagsToAssign = [11, 12, 13];

    const addedTags = await tx.productTag.createMany({
      data: tagsToAssign.map((tagId) => ({
        productId: newProduct.id,
        tagId,
      })),
    });

    const updatedStock = await tx.product.update({
      where: { id: 12 },
      data: {
        quantity: { decrement: 2 },
      },
    });

    return {
      newProduct,
      addedTags,
      updatedStock,
    };
  });

  console.log(result);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
