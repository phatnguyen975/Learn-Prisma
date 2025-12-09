import { prisma } from "../src/configs/prisma.js";

async function main() {
  const productWithTags = await prisma.product.create({
    data: {
      name: "Limited Edition Sneaker",
      price: 120.0,
      categoryId: 12,
      tags: {
        create: [
          { tag: { connect: { id: 11 } } },
          { tag: { connect: { id: 12 } } },
        ],
      },
    },
    include: { tags: true },
  });
  console.log(productWithTags);

  const productRead = await prisma.product.findUnique({
    where: { id: 23 },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });
  console.log(productRead);

  await prisma.productTag.create({
    data: {
      productId: 12,
      tagId: 13,
    },
  });

  await prisma.productTag.delete({
    where: {
      productId_tagId: {
        productId: 14,
        tagId: 11,
      },
    },
  });

  await prisma.productTag.deleteMany({
    where: {
      productId: 12,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
