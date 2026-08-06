import prisma from '../../config/prisma.js';
import AppError from '../../utils/app-error.js';

const categoryServiceSearch = async (data) => {

    const where = {
        status: 1,
    };

    // Category
    if (data?.category_name?.trim()) {
        where.category = {
            status: 1,
            name: {
                contains: data.category_name?.trim(),
            },
        };
    }
    if (data?.category_id) {
        where.category = {
            id: Number(data.category_id),
        };
    }

    // Location
    if (data?.location_name?.trim()) {
        where.locality = {
            status: 1,
            name: {
                contains: data.location_name.trim(),
            },
        };
    }

    if (data?.locality_id) {
        where.locality = {
            id: Number(data.locality_id),
        };
    }

    const minCapacity = Number(data.min_capacity || 0);
    const maxCapacity = Number(data.max_capacity || 0);

    if (minCapacity > 0 || maxCapacity > 0) {
        if (minCapacity === maxCapacity) {
            // Example: 500+
            where.capacity = {
                gte: minCapacity,
            };
        } else {
            // Example: 50 - 100
            where.capacity = {
                gte: minCapacity,
                lte: maxCapacity,
            };
        }
    }

    const minPriceRange = Number(data.min_price_range || 0);
    const maxPriceRange = Number(data.max_price_range || 0);

    if (minPriceRange > 0 || maxPriceRange > 0) {
        if (minPriceRange === maxPriceRange) {
            // Example: 500+
            where.final_amount = {
                gte: minPriceRange,
            };
        } else {
            // Example: 50 - 100
            where.final_amount = {
                gte: minPriceRange,
                lte: maxPriceRange,
            };
        }
    }

    // Latitude
    if (data?.latitude?.trim()) {
        where.latitude = data.latitude.trim();
    }

    // Longitude
    if (data?.longitude?.trim()) {
        where.longitude = data.longitude.trim();
    }

    // Search
    if (data?.search_text?.trim()) {
        const search_text = data.search_text.trim();

        where.OR = [
            {
                category: {
                    name: {
                        contains: search_text,
                    },
                },
            },
            {
                service_name: {
                    contains: search_text,
                },
            },
            {
                service_description: {
                    contains: search_text,
                },
            },
            {
                locality: {
                    name: {
                        contains: search_text,
                    },
                },
            },
        ];
    }

    const page = Number(data.page || 1);
    const limit = Number(data.limit || 10);

    const skip = (page - 1) * limit;

    const services = await prisma.CategoryService.findMany({
        where,
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                },
            },
            locality: {
                select: {
                    id: true,
                    name: true,
                },
            },
            city: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        orderBy: [
            {
                city: {
                    is_popular: "desc",
                },
            },
            {
                service_name: "asc",
            },
        ],
        skip,
        take: limit,
        orderBy: data.orderBy || {
            id: "desc",
        },
    });

    const total = await prisma.CategoryService.count({
        where,
    });

    return {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        rows: services,
    };
};


const categoriesService = {
    categoryServiceSearch,
};

export default categoriesService;
