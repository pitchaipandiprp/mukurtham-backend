import prisma from '../../config/prisma.js';
import AppError from '../../utils/app-error.js';

const galleryRecords = async (data) => {

    const where = { status: { not: 2 } };


    if (data.category_service_id) {
        where.category_service_id = Number(data.category_service_id);
    }

    if (data.gallery_type) {
        where.gallery_type = data.gallery_type;
    }

    if (data.occasion_type !== undefined && data.occasion_type !== '') {
        where.occasion_type = Number(data.occasion_type);
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
                occasion_type: {
                    contains: search,
                },
            },
        ];
    }

    const gallery = await prisma.gallery.findMany({
        where,
        include: {
            category_service: {
                select: {
                    service_name: true,
                },
            },
        },
        orderBy: data.orderBy || {
            id: 'desc',
        },
    });

    return gallery;
};


const galleryService = {
    galleryRecords,
};

export default galleryService;
