import { Prisma as PrismaClient } from "@prisma/client";
import prisma from '../../config/prisma.js';
import AppError from '../../utils/app-error.js';

const categoryServiceSearch = async (data) => {

    const page = Number(data.page || 1);
    const limit = Number(data.limit || 10);
    const skip = (page - 1) * limit;

    const conditions = [
        PrismaClient.sql`cs.status = 1`,
    ];

    // Category
    if (data?.category_id) {
        conditions.push(
            PrismaClient.sql`cs.category_id = ${Number(data.category_id)}`
        );
    }
    if (data?.category_name) {
        conditions.push(
            PrismaClient.sql`c.name LIKE ${`%${data?.category_name}%`}`
        );
    }

    // Locality
    if (data?.locality_id) {
        conditions.push(
            PrismaClient.sql`cs.locality_id = ${Number(data.locality_id)}`
        );
    }

    // Capacity
    const hasMinCapacity = data.min_capacity !== undefined && data.min_capacity !== null && data.min_capacity !== "";
    const hasMaxCapacity = data.max_capacity !== undefined && data.max_capacity !== null && data.max_capacity !== "";

    const minCapacity = Number(data.min_capacity);
    const maxCapacity = Number(data.max_capacity);

    if (hasMinCapacity) {
        conditions.push(
            PrismaClient.sql`cs.capacity >= ${minCapacity}`
        );
    }

    if (hasMaxCapacity) {
        conditions.push(
            PrismaClient.sql`cs.capacity <= ${maxCapacity}`
        );
    }

    // Price
    const hasMinPrice = data.min_price_range !== undefined && data.min_price_range !== null && data.min_price_range !== "";
    const hasMaxPrice = data.max_price_range !== undefined && data.max_price_range !== null && data.max_price_range !== "";

    const minPrice = Number(data.min_price_range);
    const maxPrice = Number(data.max_price_range);

    if (hasMinPrice) {
        conditions.push(
            PrismaClient.sql`cs.final_amount >= ${minPrice}`
        );
    }

    if (hasMaxPrice) {
        conditions.push(
            PrismaClient.sql`cs.final_amount <= ${maxPrice}`
        );
    }

    // Facility
    if (data?.facility_ids) {
        const facilityIdArr = data.facility_ids
            .split(",")
            .map(Number)
            .filter((id) => !isNaN(id));

        const facilityConditions = facilityIdArr.map((id) =>
            PrismaClient.sql`FIND_IN_SET(${id}, cs.facility_ids)`
        );

        conditions.push(
            PrismaClient.sql`(${PrismaClient.join(facilityConditions, " OR ")})`
        );
    }

    // Locality
    if (data?.city_name) {
        conditions.push(
            PrismaClient.sql`ci.name LIKE ${`%${data?.city_name}%`}`
        );
    }

    // Search
    if (data?.search_text?.trim()) {
        const keyword = `%${data.search_text.trim()}%`;

        conditions.push(
            PrismaClient.sql`(
                c.name LIKE ${`%${keyword}%`}
                OR cs.service_name LIKE ${`%${keyword}%`}
                OR cs.service_description LIKE ${`%${keyword}%`}
                OR l.name LIKE ${`%${keyword}%`}
            )`
        );
    }

    const whereClause = PrismaClient.sql`${PrismaClient.join(conditions, " AND ")}`;

    let services = await prisma.$queryRaw`
        SELECT
            cs.*,
            c.name AS category_name,
            l.name AS locality_name,
            ci.name AS city_name
        FROM category_services cs
        LEFT JOIN categories c ON c.id = cs.category_id
        LEFT JOIN localities l ON l.id = cs.locality_id
        LEFT JOIN cities ci ON ci.id = cs.city_id
        WHERE ${whereClause}
        ORDER BY cs.id DESC
        LIMIT ${limit}
        OFFSET ${skip};
    `;

    services = JSON.parse(
        JSON.stringify(services, (_, value) =>
            typeof value === "bigint"
                ? Number(value)
                : value
        )
    );

    const totalResult = await prisma.$queryRaw`
        SELECT COUNT(cs.id) AS total
        FROM category_services cs
        LEFT JOIN categories c ON c.id = cs.category_id
        LEFT JOIN localities l ON l.id = cs.locality_id
        LEFT JOIN cities ci ON ci.id = cs.city_id
        WHERE ${whereClause};
    `;

    const total = Number(totalResult[0].total);

    return {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        rows: services,
    };
};


const categoriesService = {
    categoryServiceSearch,
};

export default categoriesService;
