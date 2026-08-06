import { PrismaClient } from "@prisma/client";
import { UPLOAD_DIR } from '../../src/config/config.js';

const prisma = new PrismaClient();

async function categoryServiceSeeder(prisma) {
    const services = [];

    const serviceTypes = [
        "Wedding Hall",
        "Photography",
        "Catering",
        "Decoration",
        "Beautician",
        "Transport",
        "DJ & Music",
        "Invitation",
    ];

    for (let i = 1; i <= 100; i++) {
        const userId = Math.floor(Math.random() * 5) + 1;
        const categoryId = ((i - 1) % 8) + 1;

        const amount = 10000 + (i * 500);
        const discount = Math.floor(amount * 0.10);
        const tax = 18;
        const finalAmount = (amount - discount) + ((amount - discount) * tax / 100);

        services.push({
            user_id: userId,
            category_id: categoryId,

            state_id: 1,
            city_id: 1,
            locality_id: ((i - 1) % 20) + 1,

            service_name: `${serviceTypes[categoryId - 1]} ${i}`,

            service_description: `Premium ${serviceTypes[categoryId - 1]} service with excellent facilities.`,

            service_address: `Door No ${i}, Anna Salai, Chennai`,

            service_banner_image: `${UPLOAD_DIR}/sample-${((i - 1) % 5) + 1}.jpg`,

            capacity: 500 + (i * 5),

            number_of_rooms: (i % 1000) + 1,

            car_parking: i % 2 === 0 ? "Yes" : "No",

            ac_available: i % 3 === 0 ? "No" : "Yes",

            latitude: `13.${1000 + i}`,
            longitude: `80.${2000 + i}`,

            pricing_type: i % 2 === 0 ? "Fixed" : "Starting From",

            amount,
            discount,
            tax_percentage: tax,
            final_amount: Number(finalAmount.toFixed(2)),

            status: i % 10 === 0 ? 0 : 1,
        });
    }

    await prisma.categoryService.createMany({
        data: services,
        skipDuplicates: true,
    });

    console.log("100 Category Services seeded successfully.");
}

export default categoryServiceSeeder;