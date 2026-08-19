import prisma from '../../config/prisma.js';
import AppError from '../../utils/app-error.js';
import { statusMap } from '../../config/common.js';


//Used for Available Calendar in Main Side
const serviceDateForcalendar = async (data) => {
    const categoryServiceId = Number(data?.category_service_id);

    if (!categoryServiceId) {
        throw new AppError('Please provide a valid category service ID');
    }

    const where = { status: 1 };

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

    return await prisma.serviceDate.findMany({
        where,
        orderBy: data.orderBy || { id: 'desc' },
    });
};


export default {
    serviceDateForcalendar,
};