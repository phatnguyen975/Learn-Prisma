import { prisma } from "../src/configs/prisma.js";

async function main() {
  const grouped = await prisma.product.groupBy({
    by: ["categoryId"],
    _count: { id: true },
    _avg: { price: true },
    _sum: { price: true },
    orderBy: { _count: { id: "desc" } },
  });
  console.log(grouped);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
