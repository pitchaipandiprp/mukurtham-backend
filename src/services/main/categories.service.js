import prisma from '../../config/prisma.js';
import AppError from '../../utils/app-error.js';

const categoryServiceSearch = async (data) => {

    const where = {
        status: 1,
    };

    // Category
    if (data?.category?.trim()) {
        where.category = {
            status: 1,
            name: {
                contains: data.category.trim(),
            },
        };
    }

    // Location
    if (data?.location?.trim()) {
        where.locality = {
            status: 1,
            name: {
                contains: data.location.trim(),
            },
        };
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
    if (data?.search?.trim()) {
        const search = data.search.trim();

        where.OR = [
            {
                category: {
                    name: {
                        contains: search,
                    },
                },
            },
            {
                service_name: {
                    contains: search,
                },
            },
            {
                service_description: {
                    contains: search,
                },
            },
            {
                locality: {
                    name: {
                        contains: search,
                    },
                },
            },
        ];
    }

    const services = await prisma.CategoryService.findMany({
        where,
        include: {
            category: true,
            locality: true,
        },
        orderBy: [
            {
                locality: {
                    is_popular: "desc",
                },
            },
            {
                service_name: "asc",
            },
        ],
    });
    return services;
};


const categoriesService = {
    categoryServiceSearch,
};

export default categoriesService;
