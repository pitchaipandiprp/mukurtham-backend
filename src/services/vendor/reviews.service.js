import prisma from '../../config/prisma.js';
import AppError from '../../utils/app-error.js';

const serviceReviewList = async (data) => {

    const userId = Number(data.user_id);

    if (!userId) {
        throw new AppError('Please provide a valid user ID');
    }

    const categoryServiceId = Number(data.category_service_id);

    if (!categoryServiceId) {
        throw new AppError('Please provide a valid category service ID');
    }

    const where = { status: { not: 2 } };

    if (userId) {
        where.category_service = {
            user_id: Number(userId),
        };
    }

    if (categoryServiceId) {
        where.category_service_id = categoryServiceId;
    }

    if (data.rating) {
        where.rating = Number(data.rating);
    }

    if (data.status !== undefined && data.status !== '') {
        where.status = Number(data.status);
    }

    if (data.search?.trim()) {
        const search = data.search.trim();
        where.OR = [
            {
                category_service: {
                    service_name: {
                        contains: search,
                    },
                },
            },
            {
                review_title: {
                    contains: search,
                },
            },
        ];
    }

    const page = Number(data.page || 1);
    const limit = Number(data.limit || 10);
    const skip = (page - 1) * limit;

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

        skip,
        take: limit,
        orderBy: data.orderBy || {
            id: 'desc',
        },
    });

    return {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),

        averageRating: Number(
            (averageResult._avg.rating || 0).toFixed(1)
        ),
        ratingCounts,

        rows: reviews,
    };
};


const serviceReviewRecords = async (data) => {

    const userId = Number(data.user_id);

    if (!userId) {
        throw new AppError('Please provide a valid user ID');
    }

    const categoryServiceId = Number(data.category_service_id);

    if (!categoryServiceId) {
        throw new AppError('Please provide a valid category service ID');
    }

    const where = { status: { not: 2 } };


    if (userId) {
        where.category_service = {
            user_id: userId,
        };
    }

    if (categoryServiceId) {
        where.category_service_id = categoryServiceId;
    }

    if (data.rating) {
        where.rating = Number(data.rating);
    }

    if (data.status !== undefined && data.status !== '') {
        where.status = Number(data.status);
    }

    if (data.search?.trim()) {
        const search = data.search.trim();
        where.OR = [
            {
                category_service: {
                    service_name: {
                        contains: search,
                    },
                },
            },
            {
                review_title: {
                    contains: search,
                },
            },
        ];
    }

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
            id: 'desc',
        },
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

const updateServiceReviewStatus = async (data) => {
    const id = Number(data?.id);

    if (!id) {
        throw new AppError('Please provide a valid review ID');
    }

    if (data.status === undefined || data.status === null) {
        throw new AppError('Please provide a valid status');
    }

    let statusId = 0;
    if (data.status === 'delete') {
        statusId = 2;
    } else if (data.status === 'approve') {
        statusId = 1;
    } else if (data.status === 'disapprove') {
        statusId = 0;
    }

    await prisma.serviceReview.update({
        where: {
            id,
        },
        data: {
            status: statusId,
        },
    });
};


const reviewsService = {
    serviceReviewList,
    serviceReviewRecords,
    updateServiceReviewStatus,
};

export default reviewsService;
