import bcrypt from "bcrypt";

async function userSeeder(prisma) {
    const hashedPassword = await bcrypt.hash("Test@123", 10);

    const roles = await prisma.roles.findMany({
        where: {
            name: {
                in: ["Admin", "Vendor", "Customer"],
            },
        },
        select: {
            id: true,
            name: true,
        },
    });

    const roleMap = Object.fromEntries(
        roles.map((role) => [role.name, role.id])
    );

    const users = [
        // Admin
        {
            role_id: roleMap.Admin,
            name: "Admin",
            email: "admin@mukurtham.com",
            mobile: "9500925655",
            password: hashedPassword,
            status: 1,
            created_by: 1,
            created_at: new Date(),
            updated_by: 1,
            updated_at: new Date(),
        },
    ];

    // 20 Vendors
    for (let i = 1; i <= 20; i++) {
        users.push({
            role_id: roleMap.Vendor,
            name: `Vendor ${i}`,
            email: `vendor${i}@mukurtham.com`,
            mobile: `900000${String(i).padStart(4, "0")}`,
            password: hashedPassword,
            status: i % 10 === 0 ? 0 : 1,
            created_by: 1,
            created_at: new Date(),
            updated_by: 1,
            updated_at: new Date(),
        });
    }

    // 29 Customers
    for (let i = 1; i <= 29; i++) {
        users.push({
            role_id: roleMap.Customer,
            name: `Customer ${i}`,
            email: `customer${i}@mukurtham.com`,
            mobile: `910000${String(i).padStart(4, "0")}`,
            password: hashedPassword,
            status: i % 15 === 0 ? 0 : 1,
            created_by: 1,
            created_at: new Date(),
            updated_by: 1,
            updated_at: new Date(),
        });
    }

    await prisma.users.createMany({
        data: users,
        skipDuplicates: true,
    });

    console.log(`${users.length} Users Seeded Successfully.`);
}

export default userSeeder;