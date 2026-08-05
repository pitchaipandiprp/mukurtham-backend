import { PrismaClient } from '@prisma/client';
import rolesSeeder from './seeders/roles.seeder.js';
import userSeeder from './seeders/users.seeder.js';
import categorySeeder from './seeders/category.seeder.js';
import locationSeeder from './seeders/location.seeder.js';
import categoryServiceSeeder from './seeders/category-service.seeder.js';
const prisma = new PrismaClient();

async function main() {
    await prisma.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 0");
    await prisma.$executeRawUnsafe("TRUNCATE TABLE users");
    await prisma.$executeRawUnsafe("TRUNCATE TABLE otp_request");
    await prisma.$executeRawUnsafe("TRUNCATE TABLE roles");
    await prisma.$executeRawUnsafe("TRUNCATE TABLE categories");
    await prisma.$executeRawUnsafe("TRUNCATE TABLE category_services");
    await prisma.$executeRawUnsafe("TRUNCATE TABLE states");
    await prisma.$executeRawUnsafe("TRUNCATE TABLE cities");
    await prisma.$executeRawUnsafe("TRUNCATE TABLE localities");
    await prisma.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 1");

    await rolesSeeder(prisma);
    await userSeeder(prisma);
    await categorySeeder(prisma);
    await locationSeeder(prisma);
    await categoryServiceSeeder(prisma);

    console.log('Seed completed.');
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });