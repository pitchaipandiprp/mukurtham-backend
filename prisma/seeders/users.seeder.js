import bcrypt from 'bcrypt';

async function userSeeder(prisma) {
    const hashedPassword = await bcrypt.hash('Test@123', 10);
    const roles = await prisma.roles.findMany({
        where: {
            name: {
                in: ['Admin', 'Vendor', 'Customer'],
            },
        },
        select: {
            id: true,
            name: true,
        },
    });

    const roleMap = Object.fromEntries(roles.map((role) => [role.name, role.id]));

    await prisma.users.createMany({
        data: [
            {
                role_id: roleMap.Admin,
                name: 'Admin',
                email: 'admin@mukurtham.com',
                mobile: '9500925655',
                password: hashedPassword,
                status: 1,
                created_by: 1,
                created_at: new Date(),
                updated_by: 1,
                updated_at: new Date(),
            },
            {
                role_id: roleMap.Vendor,
                name: 'Vendor 1',
                email: 'vendor1@mukurtham.com',
                mobile: '9000000002',
                password: hashedPassword,
                status: 1,
                created_by: 1,
                created_at: new Date(),
                updated_by: 1,
                updated_at: new Date(),
            },
            {
                role_id: roleMap.Customer,
                name: 'Customer 1',
                email: 'customer1@mukurtham.com',
                mobile: '9000000003',
                password: hashedPassword,
                status: 1,
                created_by: 1,
                created_at: new Date(),
                updated_by: 1,
                updated_at: new Date(),
            },
        ],
    });

    console.log('User Seeder Completed');
}

export default userSeeder;