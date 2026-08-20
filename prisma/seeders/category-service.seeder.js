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

    const serviceDescriptions = `Experience the perfect setting for your most memorable celebrations at our beautifully designed Mahal, thoughtfully created to accommodate weddings, receptions, engagements, birthday celebrations, family functions, corporate events, and other special occasions. With its spacious and elegant interiors, comfortable seating arrangements, excellent facilities, and convenient location, our Mahal provides everything you need to host a grand and enjoyable event under one roof.

The venue features a large and well-maintained function hall with ample space for guests, along with a beautifully designed stage area that can be customized according to your event theme. The spacious dining area is suitable for serving traditional meals, buffet arrangements, and special catering requirements. The Mahal also provides comfortable rooms for guests and families, making it convenient for multi-day celebrations and wedding functions.

We understand that every celebration is unique, which is why our venue offers flexible arrangements to suit different event requirements. From traditional weddings and Muhurtham ceremonies to modern receptions and social gatherings, the spacious hall can be decorated and arranged according to your preferences. Our team is committed to maintaining a clean, welcoming, and well-organized environment throughout your event.

Guests can also enjoy convenient amenities such as ample parking facilities, air-conditioned spaces, clean restrooms, comfortable seating, power backup, dining facilities, and easy accessibility. The venue is designed to provide a comfortable experience for both hosts and guests, ensuring that every important moment can be celebrated without unnecessary inconvenience.

Whether you are planning an intimate family function or a large wedding celebration, our Mahal provides an elegant and comfortable atmosphere for creating wonderful memories. With quality facilities, spacious surroundings, convenient amenities, and a dedicated approach to customer satisfaction, we strive to make every occasion special, seamless, and truly memorable.

Choose our Mahal as the destination for your next celebration and create beautiful memories with your family, friends, and loved ones in a warm and welcoming environment.`;

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
            service_mobile: `+91-90000000${i}`,
            service_email: `service${i}@example.com`,

            service_description: serviceDescriptions,

            service_address:
                `Door No ${i}, Anna Salai, Chennai`,

            service_banner_image:
                `${UPLOAD_DIR_SERVICE}/sample-${((index) % 5) + 1}.jpg`,

            capacity: 500 + (i * 5),

            number_of_rooms: (index % 1000) + 1,

            facility_ids:
                `${wrap(index)},${wrap(index - 1)},${wrap(index - 2)},${wrap(index - 3)}`,

            latitude: `9.${1000 + i}`,
            longitude: `78.${2000 + i}`,

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