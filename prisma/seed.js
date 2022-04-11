const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const db = new PrismaClient();
const quantity = parseInt(process.argv[2]);

async function seed() {
  await db.$executeRawUnsafe("DELETE FROM course");
  await Promise.all(
    getCourses().map((course) => {
      return db.course.create({ data: course });
    })
  );
}

seed();

function getCourses() {
  return [...Array(quantity).keys()].map(() => ({
    name: faker.lorem.words(6),
    description: faker.lorem.words(30),
  }));
}
