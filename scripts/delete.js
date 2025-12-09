import { prisma } from "../src/configs/prisma.js";

async function main() {
  // Delete one record
  // Note: This will fail if there are foreign key constraints
  try {
    const deletedTag = await prisma.tag.delete({
      where: { id: 20 },
    });
    console.log(deletedTag);
  } catch (error) {
    console.error(error);
  }

  // Delete multiple records
  const deletedCount = await prisma.productTag.deleteMany({
    where: {
      productId: 11,
    },
  });
  console.log(deletedCount.count);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
