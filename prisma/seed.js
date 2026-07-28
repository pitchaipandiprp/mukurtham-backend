import { PrismaClient } from '@prisma/client';
import rolesSeeder from './seeders/roles.seeder.js';
import userSeeder from './seeders/users.seeder.js';

const prisma = new PrismaClient();

async function main() {
    await rolesSeeder(prisma);
    await userSeeder(prisma);
    console.log('Seed completed.');
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });