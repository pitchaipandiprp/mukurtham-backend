import prisma from '../../config/prisma.js';
import AppError from '../../utils/app-error.js';
import { statusMap } from '../../config/common.js';

const parseDate = (value) => value ? new Date(`${value}T00:00:00.000Z`) : null;

const createServiceDate = async (data) => {
    const userId = Number(data.user_id);
    const serviceDateId = data.id ? Number(data.id) : null;
    const fromDate = parseDate(data.from_date);
    const toDate = fromDate;

    const insertData = {
        user_id: Number(data.user_id),
        category_service_id: null,
        date_type: data.date_type || null,
        event_name: data.event_name || null,
        from_date: fromDate,
        to_date: toDate,
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
    const where = { status: { not: 2 } };

    where.date_type = {
        in: ['Waxing', 'Waning', 'Holiday'],
    };

    if (data.search) {
        where.event_name = {
            contains: data.search,
        };
    }

    if (data.from_date) {
        where.from_date = parseDate(data.from_date);
    }

    if (data.status !== undefined && data.status !== '') {
        where.status = Number(data.status);
    }

    return where;
};

const serviceDateList = async (data) => {
    const where = buildWhere(data);
    const page = Number(data.page || 1);
    const limit = Number(data.limit || 10);
    const skip = (page - 1) * limit;
    const orderBy = data.orderBy || { id: 'desc' };

    const [rows, total] = await Promise.all([
        prisma.serviceDate.findMany({ where, skip, take: limit, orderBy }),
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
    return await prisma.serviceDate.findMany({
        where: buildWhere(data),
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