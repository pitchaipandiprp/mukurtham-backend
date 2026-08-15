import prisma from '../../config/prisma.js';
import AppError from '../../utils/app-error.js';
import { statusMap } from '../../config/common.js';


const createServiceDate = async (data) => {
    const userId = Number(data.user_id);
    const serviceDateId = data.id ? Number(data.id) : null;

    const insertData = {
        user_id: Number(data.user_id),
        category_service_id: Number(data.category_service_id) || 0,
        date_type: data.date_type || null,
        service_date: data.service_date || null,
        status: Number(data.status ?? 0),
    };

    if (serviceDateId) {
        const existing = await prisma.serviceDate.findUnique({ where: { id: serviceDateId } });

        if (!existing) {
            throw new AppError('Service date not found');
        }

        return prisma.serviceDate.update({
            where: { id: serviceDateId },
            data: {
                ...insertData,
                updated_by: userId,
                updated_at: new Date(),
            },
        });
    }

    return prisma.serviceDate.create({
        data: {
            ...insertData,
            created_by: userId,
            updated_by: userId,
            created_at: new Date(),
            updated_at: new Date(),
        },
    });
};

const getServiceDate = async (data) => {
    const serviceDateId = Number(data?.id);

    if (!serviceDateId) {
        throw new AppError('Please provide a valid service date ID');
    }

    return await prisma.serviceDate.findUnique({ where: { id: serviceDateId } });
};

const buildWhere = (data) => {
    const userId = Number(data.user_id);
    if (!userId) {
        throw new AppError('Please provide a valid user ID');
    }

    const where = { status: { not: 2 } };

    if (data.user_id) {
        where.user_id = Number(data.user_id);
    }

    if (data.category_service_id !== undefined && data.category_service_id !== '') {
        where.category_service_id = Number(data.category_service_id);
    }

    if (data.date_type?.trim()) {
        where.date_type = data.date_type.trim();
    }

    if (data.service_date) {
        where.service_date = data.service_date;
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
                date_type: {
                    contains: search,
                },
            },
        ];
    }

    return where;
};

const serviceDateList = async (data) => {
    const where = buildWhere(data);
    const page = Number(data.page || 1);
    const limit = Number(data.limit || 10);
    const skip = (page - 1) * limit;
    const orderBy = data.orderBy || { id: 'desc' };

    const include = {
        category_service: {
            select: {
                service_name: true,
            },
        },
    };

    const [rows, total] = await Promise.all([
        prisma.serviceDate.findMany({ where, include, skip, take: limit, orderBy }),
        prisma.serviceDate.count({ where }),
    ]);

    return {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        rows,
    };
};

const serviceDateRecords = async (data) => {
    const include = {
        category_service: {
            select: {
                service_name: true,
            },
        },
    };
    return await prisma.serviceDate.findMany({
        where: buildWhere(data),
        include,
        orderBy: data.orderBy || { id: 'desc' },
    });
};

const updateServiceDateStatus = async (data) => {
    const id = Number(data?.id);

    if (!id) {
        throw new AppError('Please provide a valid service date ID');
    }

    if (!Object.hasOwn(statusMap, data.status)) {
        throw new AppError('Please provide a valid status');
    }

    return prisma.serviceDate.update({
        where: { id },
        data: {
            status: statusMap[data.status],
            updated_by: Number(data.user_id),
            updated_at: new Date(),
        },
    });
};

export default {
    createServiceDate,
    getServiceDate,
    updateServiceDateStatus,
    serviceDateList,
    serviceDateRecords,
};