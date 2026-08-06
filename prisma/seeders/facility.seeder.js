import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const facilities = [
    {
        category_id: 1,
        name: "AC Hall",
        status: 1,
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        category_id: 1,
        name: "Parking",
        status: 1,
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        category_id: 1,
        name: "Rooms Available",
        status: 1,
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        category_id: 1,
        name: "Dining Area",
        status: 1,
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        category_id: 1,
        name: "Lift",
        status: 1,
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        category_id: 1,
        name: "Power Backup",
        status: 1,
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        category_id: 1,
        name: "Lawn",
        status: 1,
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        category_id: 1,
        name: "Swimming Pool",
        status: 1,
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
    },
];

async function facilitySeeder(prisma) {
    await prisma.facility.createMany({
        data: facilities,
        skipDuplicates: true,
    });

    console.log("Facilities seeded successfully.");
}

export default facilitySeeder;

