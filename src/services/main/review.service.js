import prisma from '../../config/prisma.js';
import AppError from '../../utils/app-error.js';

const serviceReviewsRecords = async (data) => {

    const where = { status: { not: 2 } };

    if (data.category_service_id) {
        where.category_service_id = Number(data.category_service_id);
    }

    if (data.rating) {
        where.rating = Number(data.rating);
    }

    if (data.review_title?.trim()) {
        where.review_title = {
            contains: data.review_title.trim(),
        };
    }

    const limit = Number(data.limit || 10);

    //Get total review count
    const total = await prisma.serviceReview.count({
        where,
    });

    //Get average rating
    const averageResult = await prisma.serviceReview.aggregate({
        where,
        _avg: {
            rating: true,
        },
    });

    //Get rating counts
    const ratingRecords = await prisma.serviceReview.groupBy({
        by: ["rating"],
        where,
        _count: {
            rating: true,
        },
    });

    const ratingCounts = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
    };

    ratingRecords.forEach((item) => {
        if (
            item.rating >= 1 &&
            item.rating <= 5
        ) {
            ratingCounts[item.rating] =
                item._count.rating;
        }
    });

    //Get reviews
    const reviews = await prisma.serviceReview.findMany({
        where,

        include: {
            category_service: {
                select: {
                    service_name: true,
                },
            },

            user: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },

        orderBy: data.orderBy || {
            id: "desc",
        },
        take: limit,
    });

    return {
        total,

        averageRating: Number(
            (averageResult._avg.rating || 0).toFixed(1)
        ),

        ratingCounts,

        rows: reviews,
    };
};

const reviewService = {
    serviceReviewsRecords,
};

export default reviewService;
