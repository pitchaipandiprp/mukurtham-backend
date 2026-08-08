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

const getCities = async (filters = {}) => {
    const status = filters.status ? Number(filters.status) : 1;
    const stateId = filters.state_id ? Number(filters.state_id) : undefined;
    const limit = filters.limit ? Number(filters.limit) : 10;
    const search = filters.search ? String(filters.search) : "";

    const cities = await prisma.$queryRaw`
        SELECT
            cities.id AS id,
            cities.name AS name,
            cities.state_id,
            states.name AS state_name
        FROM cities
        INNER JOIN states
            ON cities.state_id = states.id
        WHERE
            (${status} IS NULL OR cities.status = ${status})
            AND (${stateId} IS NULL OR cities.state_id = ${stateId})
            AND (
                ${search ? String(search) : ""} = ""
                OR cities.name LIKE ${`%${search ? String(search) : ""}%`}
            )
        ORDER BY
            cities.is_popular DESC,
            cities.id ASC
        LIMIT ${limit}
    `;

    const result = cities.map((item) => ({
        ...item,
        id: Number(item.id),
        state_id: Number(item.state_id),
    }));

    return result;
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

    const result = localities.map((item) => ({
        ...item,
        id: Number(item.id),
        state_id: Number(item.state_id),
        city_id: Number(item.city_id),
    }));


    return result;
};

const commonService = {
    getCategories,
    getFacilities,
    getLocalities,
    getCities,
};

export default commonService;