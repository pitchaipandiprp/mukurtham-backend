import bcrypt from 'bcrypt';
import prisma from '../../config/prisma.js';
import AppError from '../../utils/app-error.js';

const getCategories = async () => {
    return await prisma.category.findMany();
};
const getLocalities = async (filters = {}) => {
    const where = {};

    if (filters.status !== undefined) {
        where.status = Number(filters.status);
    }

    if (filters.state_id) {
        where.state_id = Number(filters.state_id);
    }

    if (filters.city_id) {
        where.city_id = Number(filters.city_id);
    }

    if (filters.search) {
        where.name = {
            contains: String(filters.search),
        };
    }

    const limit = filters.limit ? Number(filters.limit) : undefined;

    return await prisma.locality.findMany({
        where,
        ...(Number.isFinite(limit) && limit > 0 ? { take: limit } : {}),
        orderBy: [
            { is_popular: 'desc' },
            { name: 'asc' },
        ],
    });
};

const commonService = {
    getCategories,
    getLocalities,
};

export default commonService;