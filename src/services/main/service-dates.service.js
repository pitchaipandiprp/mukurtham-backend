import prisma from '../../config/prisma.js';
import AppError from '../../utils/app-error.js';
import { statusMap } from '../../config/common.js';


const buildWhere = (data) => {
    const categoryServiceId = Number(data?.category_service_id);

    if (!categoryServiceId) {
        throw new AppError('Please provide a valid service ID');
    }

    const where = { status: 1 };

    if (categoryServiceId !== undefined && categoryServiceId !== '') {
        where.OR = [
            {
                category_service_id: categoryServiceId,
            },
            {
                category_service_id: null,
            },
            {
                category_service_id: 0,
            },
        ];
    }

    if (data.date_type?.trim()) {
        where.date_type = data.date_type.trim();
    }

    if (data.service_date) {
        where.service_date = data.service_date;
    }

    return where;
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


export default {
    serviceDateRecords,
};