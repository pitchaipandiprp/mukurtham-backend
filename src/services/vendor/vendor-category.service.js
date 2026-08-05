import prisma from '../../config/prisma.js';
import AppError from '../../utils/app-error.js';

const createIndividualService = async (data) => {
    const userId = Number(data.user_id);
    const categoryId = Number(data.category_id);
    const stateId = Number(data.state_id);
    const cityId = Number(data.city_id);
    const localityId = Number(data.locality_id);

    const amount = Number(data.amount || 0);
    const discount = Number(data.discount || 0);
    const taxPercentage = Number(data.tax_percentage || 0);
    const discountedAmount = amount - discount;
    const taxAmount = (discountedAmount * taxPercentage) / 100;
    const finalAmount = discountedAmount + taxAmount;

    const categoryServiceId = data.id ? Number(data.id) : null;
    let existingService = null;

    if (categoryServiceId) {
        existingService = await prisma.categoryService.findUnique({
            where: {
                id: Number(categoryServiceId),
            },
        });

        if (!existingService) {
            throw new AppError("Individual service not found");
        }
    }

    const insertData = {
        user_id: userId,
        category_id: categoryId,
        state_id: stateId,
        city_id: cityId,
        locality_id: localityId,
        service_name: data.service_name,
        service_description: data.service_description || null,
        service_address: data.service_address || null,
        service_banner_image: data.service_banner_image || existingService?.service_banner_image || null,
        capacity: data.capacity || null,
        number_of_rooms: Number(data.number_of_rooms || 0),
        car_parking: data.car_parking || null,
        ac_available: data.ac_available || null,
        latitude: String(data.latitude),
        longitude: String(data.longitude),
        pricing_type: data.pricing_type || null,
        amount,
        discount,
        tax_percentage: taxPercentage,
        final_amount: finalAmount,
        status: Number(data.status ?? 1),
    };

    if (existingService) {
        return await prisma.categoryService.update({
            where: {
                id: categoryServiceId,
            },
            data: insertData,
        });
    } else {
        return await prisma.categoryService.create({
            data: insertData,
        });
    }

};

const getIndividualService = async (data) => {
    const id = Number(data?.id);

    if (!id) {
        throw new AppError('Someting went wrong. Please provide a valid service ID');
    }

    const service = await prisma.categoryService.findUnique({
        where: {
            id: id,
        },
        include: {
            state: {
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
            locality: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    return service;
};


const individualServiceList = async (data) => {
    const where = { status: { not: 2 } }; //Except deleted records

    if (data.user_id) {
        where.user_id = Number(data.user_id);
    }

    if (data.search?.trim()) {
        where.service_name = {
            contains: data.search.trim(),
        };
    }

    if (data.status !== undefined && data.status !== "") {
        where.status = Number(data.status);
    }

    if (data.category_id) {
        where.category_id = Number(data.category_id);
    }

    if (data.state_id) {
        where.state_id = Number(data.state_id);
    }

    if (data.city_id) {
        where.city_id = Number(data.city_id);
    }

    if (data.locality_id) {
        where.locality_id = Number(data.locality_id);
    }

    const page = Number(data.page || 1);
    const limit = Number(data.limit || 10);

    const skip = (page - 1) * limit;

    const [services, total] = await Promise.all([
        prisma.categoryService.findMany({
            where,
            include: {
                category: {
                    select: {
                        name: true,
                    },
                },
                state: {
                    select: {
                        name: true,
                    },
                },
                city: {
                    select: {
                        name: true,
                    },
                },
                locality: {
                    select: {
                        name: true,
                    },
                },
            },
            skip,
            take: limit,
            orderBy: data.orderBy || {
                id: "desc",
            },
        }),

        prisma.categoryService.count({
            where,
        }),
    ]);

    return {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        rows: services,
    };
};

const deleteIndividualService = async (data) => {
    const id = Number(data?.id);

    if (!id) {
        throw new AppError('Someting went wrong. Please provide a valid service ID');
    }

    const service = await prisma.categoryService.update({
        where: {
            id: id,
        },
        data: {
            status: 2,
        },
    });

    return;
};

const vendorCategoryService = {
    createIndividualService,
    getIndividualService,
    individualServiceList,
    deleteIndividualService,
};

export default vendorCategoryService;
