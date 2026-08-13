import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const reviewTitles = [
    "Excellent Service",
    "Very Good Experience",
    "Highly Recommended",
    "Amazing Service",
    "Good Experience",
    "Excellent Venue",
    "Worth the Money",
    "Professional Service",
    "Nice Experience",
    "Great Service",
];

const reviewDescriptions = [
    "Excellent service and very friendly staff. Everything was well organized.",
    "Had a very good experience. The service was professional and satisfactory.",
    "Highly recommended. The team was helpful and arrangements were excellent.",
    "Amazing experience from start to finish. Everything was handled professionally.",
    "Good service and a nice overall experience. Would definitely consider using them again.",
    "The venue was clean, spacious and well maintained. Overall a great experience.",
    "Good quality service for the price. The arrangements were handled properly.",
    "Very professional team and excellent coordination throughout the event.",
    "Nice experience with good service and comfortable arrangements.",
    "Great service and very responsive staff. We were happy with the overall experience.",
];

async function serviceReviewSeeder(prisma) {
    try {
        // Get existing services
        const services = await prisma.categoryService.findMany({
            select: {
                id: true,
                user_id: true,
            },
            where: {
                status: {
                    not: 2,
                },
            },
        });

        if (!services.length) {
            console.log("No CategoryService records found.");
            return;
        }

        // Get existing users
        const users = await prisma.users.findMany({
            select: {
                id: true,
            },
        });

        if (!users.length) {
            console.log("No User records found.");
            return;
        }

        const reviews = [];

        for (let i = 0; i < 50; i++) {
            const service = services[Math.floor(Math.random() * services.length)];

            const user = users[Math.floor(Math.random() * users.length)];

            const rating = Math.floor(Math.random() * 5) + 1;

            const title = reviewTitles[Math.floor(Math.random() * reviewTitles.length)];

            const description = reviewDescriptions[Math.floor(Math.random() * reviewDescriptions.length)];

            reviews.push({
                user_id: user.id,
                category_service_id: service.id,

                rating,
                review_title: title,
                review_description: description,

                status: 1,

                created_by: user.id,
                updated_by: user.id,

                created_at: new Date(),
                updated_at: new Date(),
            });
        }

        await prisma.serviceReview.createMany({
            data: reviews,
        });

        console.log(
            `Successfully created ${reviews.length} service reviews.`
        );
    } catch (error) {
        console.error("Failed to seed service reviews:", error);
    }

    console.log("Service reviews seeded successfully.");
}

export default serviceReviewSeeder;

