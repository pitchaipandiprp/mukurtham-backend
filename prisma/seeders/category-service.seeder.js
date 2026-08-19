import { PrismaClient } from "@prisma/client";
import { UPLOAD_DIR_SERVICE } from '../../src/config/constant.js';

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

    // Get all vendors
    const vendors = await prisma.users.findMany({
        where: {
            role_id: 2,
        },
        orderBy: {
            id: "asc",
        },
    });

    if (!vendors.length) {
        console.log("No vendors found.");
        return;
    }

    const wrap = (n) => ((n % 5) + 5) % 5 + 1;

    vendors.forEach((vendor, index) => {
        const i = index + 1;

        // Category will rotate between 1 - 8
        const categoryId = ((index) % 8) + 1;

        const serviceType = serviceTypes[categoryId - 1];

        const amount = 10000 + (i * 500);
        const discount = Math.floor(amount * 0.10);
        const tax = 18;

        const finalAmount =
            (amount - discount) +
            ((amount - discount) * tax / 100);

        services.push({
            // Vendor ID from users table
            user_id: vendor.id,

            category_id: categoryId,

            state_id: 1,
            city_id: 1,
            locality_id: ((index) % 20) + 1,

            service_name: `${serviceType} ${i}`,

            service_description:
                `Premium ${serviceType} service with excellent facilities.`,

            service_address:
                `Door No ${i}, Anna Salai, Chennai`,

            service_banner_image:
                `${UPLOAD_DIR_SERVICE}/sample-${((index) % 5) + 1}.jpg`,

            capacity: 500 + (i * 5),

            number_of_rooms: (index % 1000) + 1,

            facility_ids:
                `${wrap(index)},${wrap(index - 1)},${wrap(index - 2)},${wrap(index - 3)}`,

            car_parking: index % 2 === 0 ? "Yes" : "No",

            ac_available: index % 3 === 0 ? "No" : "Yes",

            latitude: `13.${1000 + i}`,
            longitude: `80.${2000 + i}`,

            pricing_type:
                index % 2 === 0 ? "Fixed" : "Starting From",

            amount,
            discount,
            tax_percentage: tax,

            final_amount:
                Number(finalAmount.toFixed(2)),

            status: index % 10 === 0 ? 0 : 1,
        });
    });

    await prisma.categoryService.createMany({
        data: services,
        skipDuplicates: true,
    });

    console.log(
        `${services.length} Category Services seeded successfully.`
    );
}

export default categoryServiceSeeder;