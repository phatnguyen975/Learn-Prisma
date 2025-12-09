import { prisma } from "../src/configs/prisma.js";

async function main() {
  // Insert one record
  const newProduct = await prisma.product.create({
    data: {
      name: "Wireless Headphones",
      description: "Noise cancelling",
      price: 129.99,
      quantity: 40,
      categoryId: 12,
    },
  });
  console.log(newProduct);

  // Insert multiple records
  const createdTags = await prisma.tag.createMany({
    data: [
      { name: "Wireless" },
      { name: "Bluetooth" },
      { name: "Office" },
      { name: "Gaming" },
    ],
    skipDuplicates: true,
  });
  console.log(createdTags.count);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
