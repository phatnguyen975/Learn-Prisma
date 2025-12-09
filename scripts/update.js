import { prisma } from "../src/configs/prisma.js";

async function main() {
  // Update one record
  const updatedProduct = await prisma.product.update({
    where: { id: 12 },
    data: {
      price: { increment: 50 },
      quantity: { decrement: 50 },
    },
  });
  console.log(updatedProduct);

  // Update many records
  const updatedProducts = await prisma.product.updateMany({
    where: { quantity: { lt: 50 } },
    data: { quantity: 100 },
  });
  console.log(updatedProducts.count);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
