import bcrypt from 'bcrypt';
import prisma from '../../config/prisma.js';
import AppError from '../../utils/app-error.js';

const getCategories = async () => {
    return await prisma.category.findMany();
};

const getFacilities = async (data) => {
    const categoryId = data?.category_id ? Number(data.category_id) : 1;
    return await prisma.facility.findMany({
        where: {
            category_id: categoryId,
        },
    });
};

const getLocalities = async (filters = {}) => {
    const status = filters.status ? Number(filters.status) : 1;
    const stateId = filters.state_id ? Number(filters.state_id) : undefined;
    const cityId = filters.city_id ? Number(filters.city_id) : undefined;
    const search = filters.search ? String(filters.search) : "";
    const limit = filters.limit ? Number(filters.limit) : 10;

    const localities = await prisma.$queryRaw`
        SELECT
            localities.id AS id,
            localities.name AS name,
            localities.state_id,
            localities.city_id,
            states.name AS state_name,
            cities.name AS city_name
        FROM localities
        INNER JOIN states
            ON localities.state_id = states.id
        INNER JOIN cities
            ON localities.city_id = cities.id
        WHERE
            (${status} IS NULL OR localities.status = ${status})
            AND (${stateId} IS NULL OR localities.state_id = ${stateId})
            AND (${cityId} IS NULL OR localities.city_id = ${cityId})
            AND (
                ${search} = ""
                OR localities.name LIKE ${`%${search}%`}
            )
        ORDER BY
            cities.is_popular DESC,
            localities.name ASC
        LIMIT ${limit}
    `;

    return localities;
};

const commonService = {
    getCategories,
    getFacilities,
    getLocalities,
};

export default commonService;