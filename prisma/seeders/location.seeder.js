import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cities = [
    {
        name: "Chennai",
        is_popular: 1,
        localities: [
            { name: "Anna Nagar" },
            { name: "T. Nagar" },
            { name: "Adyar" },
            { name: "Velachery" },
            { name: "Tambaram" },
            { name: "Porur" },
            { name: "Guindy" },
            { name: "Nungambakkam" },
        ],
    },
    {
        name: "Madurai",
        is_popular: 1,
        localities: [
            { name: "Anna Nagar" },
            { name: "KK Nagar" },
            { name: "Tallakulam" },
            { name: "Simmakkal" },
            { name: "Goripalayam" },
            { name: "Thiruppalai" },
            { name: "Mattuthavani" },
        ],
    },
    {
        name: "Trichy",
        localities: [
            { name: "Srirangam" },
            { name: "Thillai Nagar" },
            { name: "Cantonment" },
            { name: "Woraiyur" },
            { name: "Tennur" },
            { name: "K.K. Nagar" },
            { name: "Thuvakudi" },
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
                    is_popular: cityData.is_popular || 0,
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