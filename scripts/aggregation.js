import { prisma } from "../src/configs/prisma.js";

async function main() {
  const count = await prisma.product.count({
    where: { quantity: { gt: 100 } },
  });
  console.log(count);

  const agg = await prisma.product.aggregate({
    _count: { id: true },
    _avg: { price: true },
    _sum: { price: true },
    _min: { price: true },
    _max: { price: true },
    where: { active: true },
  });
  console.log(agg);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
