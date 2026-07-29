import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cities = [
    {
        name: "Chennai",
        localities: [
            { name: "Anna Nagar", is_popular: 1 },
            { name: "T. Nagar", is_popular: 1 },
            { name: "Adyar", is_popular: 1 },
            { name: "Velachery", is_popular: 1 },
            { name: "Tambaram", is_popular: 0 },
            { name: "Porur", is_popular: 0 },
            { name: "Guindy", is_popular: 0 },
            { name: "Nungambakkam", is_popular: 1 },
        ],
    },
    {
        name: "Madurai",
        localities: [
            { name: "Anna Nagar", is_popular: 1 },
            { name: "KK Nagar", is_popular: 1 },
            { name: "Tallakulam", is_popular: 1 },
            { name: "Simmakkal", is_popular: 0 },
            { name: "Goripalayam", is_popular: 0 },
            { name: "Thiruppalai", is_popular: 0 },
            { name: "Mattuthavani", is_popular: 1 },
        ],
    },
    {
        name: "Trichy",
        localities: [
            { name: "Srirangam", is_popular: 1 },
            { name: "Thillai Nagar", is_popular: 1 },
            { name: "Cantonment", is_popular: 1 },
            { name: "Woraiyur", is_popular: 0 },
            { name: "Tennur", is_popular: 0 },
            { name: "K.K. Nagar", is_popular: 1 },
            { name: "Thuvakudi", is_popular: 0 },
        ],
    },
];

async function locationSeeder(prisma) {

    const tamilNadu = await prisma.state.upsert({
        where: {
            id: 1,
        },
        update: {
            name: "Tamil Nadu",
            status: 1,
            created_by: 1,
            updated_by: 1,
            created_at: new Date(),
            updated_at: new Date(),
        },
        create: {
            name: "Tamil Nadu",
            status: 1,
            created_by: 1,
            updated_by: 1,
            created_at: new Date(),
            updated_at: new Date(),
        },
    });


    for (const cityData of cities) {
        const city = await prisma.city.findFirst({
            where: {
                state_id: tamilNadu.id,
                name: cityData.name,
            },
        });

        const savedCity =
            city ||
            (await prisma.city.create({
                data: {
                    state_id: tamilNadu.id,
                    name: cityData.name,
                    status: 1,
                    created_by: 1,
                    updated_by: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            }));


        for (const localityData of cityData.localities) {
            const existingLocality = await prisma.locality.findFirst({
                where: {
                    state_id: tamilNadu.id,
                    city_id: savedCity.id,
                    name: localityData.name,
                },
            });

            if (!existingLocality) {
                await prisma.locality.create({
                    data: {
                        state_id: tamilNadu.id,
                        city_id: savedCity.id,
                        name: localityData.name,
                        is_popular: localityData.is_popular,
                        status: 1,
                        created_by: 1,
                        updated_by: 1,
                        created_at: new Date(),
                        updated_at: new Date(),
                    },
                });
            }
        }
    }

    console.log("States, cities and localities seeded successfully.");
}

export default locationSeeder;