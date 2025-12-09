import { prisma } from "../src/configs/prisma.js";

async function main() {
  // Query Raw (SELECT)
  // Use template literals for safety against SQL Injection
  // Returns an array of raw objects
  const expensiveProducts = await prisma.$queryRaw`
    SELECT * FROM products 
    WHERE price > ${100} 
    ORDER BY price DESC
  `;
  console.log("Raw Query Result:", expensiveProducts);

  // Execute Raw (INSERT/UPDATE/DELETE)
  // Returns the number of affected rows
  const affectedRows = await prisma.$executeRaw`
    UPDATE products 
    SET price = price * 0.9 
    WHERE category_id = ${19}
  `;
  console.log(affectedRows);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
