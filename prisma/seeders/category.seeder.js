import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
    {
        name: "Wedding Halls",
        slug_url: "wedding-halls",
        icon: "FaBuilding",
        image: "wedding-halls.jpg",
        color: "rose-100/60",
        status: 1,
        sort_order: 1,
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        name: "Photography",
        slug_url: "photography",
        icon: "FaCamera",
        image: "photography.jpg",
        color: "blue-100/60",
        status: 1,
        sort_order: 2,
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        name: "Catering",
        slug_url: "catering",
        icon: "FaUtensils",
        image: "catering.jpg",
        color: "orange-100/60",
        status: 1,
        sort_order: 3,
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        name: "Decoration",
        slug_url: "decoration",
        icon: "FaPaintBrush",
        image: "decoration.jpg",
        color: "pink-100/60",
        status: 1,
        sort_order: 4,
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        name: "Beautician",
        slug_url: "beautician",
        icon: "FaSpa",
        image: "beautician.jpg",
        color: "green-100/60",
        status: 1,
        sort_order: 5,
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        name: "Transport",
        slug_url: "transport",
        icon: "FaCar",
        image: "transport.jpg",
        color: "indigo-100/60",
        status: 1,
        sort_order: 6,
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        name: "DJ & Music",
        slug_url: "dj-music",
        icon: "FaMusic",
        image: "dj-music.jpg",
        color: "emerald-100/60",
        status: 1,
        sort_order: 7,
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        name: "Invitations",
        slug_url: "invitations",
        icon: "FaEnvelopeOpenText",
        image: "invitations.jpg",
        color: "red-100/60",
        status: 1,
        sort_order: 8,
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
    },
];

async function categorySeeder(prisma) {

    await prisma.category.createMany({
        data: categories,
        skipDuplicates: true,
    });

    console.log("Categories seeded successfully.");
}

export default categorySeeder;