const roleSeeds = [
    {
        name: 'Admin',
        code: 'ADMIN',
    },
    {
        name: 'Vendor',
        code: 'VENDOR',
    },
    {
        name: 'Customer',
        code: 'CUSTOMER',
    },
];

async function rolesSeeder(prisma) {

    await prisma.roles.createMany({
        data: roleSeeds.map((role) => ({
            ...role,
            is_active: 1,
            created_at: new Date(),
            updated_at: new Date(),
        })),
        skipDuplicates: true,
    });

    console.log('Roles Seeder Completed');
}

export default rolesSeeder;
