import prisma from '../../config/prisma.js';
import AppError from '../../utils/app-error.js';
import { statusMap } from '../../config/common.js';


const buildWhere = (data) => {
    const where = { status: 1 };

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