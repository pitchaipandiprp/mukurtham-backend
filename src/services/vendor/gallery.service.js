import prisma from '../../config/prisma.js';
import AppError from '../../utils/app-error.js';

const createGallery = async (data) => {
    const userId = Number(data.user_id);

    if (!userId) {
        throw new AppError('Please provide a valid user ID');
    }

    if (!data.gallery_image) {
        throw new AppError('Please provide a valid gallery image');
    }

    const categoryServiceId = Number(data.category_service_id);
    const galleryId = data.id ? Number(data.id) : null;
    let existingGallery = null;

    if (galleryId) {
        existingGallery = await prisma.gallery.findUnique({
            where: {
                id: galleryId,
            },
        });

        if (!existingGallery) {
            throw new AppError('Gallery not found');
        }
    }

    const insertData = {
        user_id: userId,
        category_service_id: categoryServiceId,
        gallery_type: data.gallery_type || 'image',
        gallery_image: data.gallery_image || null,
        gallery_video: data.gallery_video || null,
        status: Number(data.status ?? 1),
    };

    if (existingGallery) {
        insertData.updated_by = userId;
        insertData.updated_at = new Date();

        return await prisma.gallery.update({
            where: {
                id: galleryId,
            },
            data: insertData,
        });
    }

    insertData.created_by = userId;
    insertData.created_at = new Date();
    insertData.updated_by = userId;
    insertData.updated_at = new Date();

    return await prisma.gallery.create({
        data: insertData,
    });
};

const getGallery = async (data) => {
    const id = Number(data?.id);

    if (!id) {
        throw new AppError('Please provide a valid gallery ID');
    }

    return await prisma.gallery.findUnique({
        where: {
            id,
        },
    });
};

const galleryList = async (data) => {
    const userId = Number(data.user_id);

    if (!userId) {
        throw new AppError('Please provide a valid user ID');
    }

    const where = { status: { not: 2 } };

    if (data.user_id) {
        where.user_id = Number(data.user_id);
    }

    if (data.category_service_id) {
        where.category_service_id = Number(data.category_service_id);
    }

    if (data.gallery_type) {
        where.gallery_type = data.gallery_type;
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
        ];
    }

    const page = Number(data.page || 1);
    const limit = Number(data.limit || 10);
    const skip = (page - 1) * limit;

    const [rows, total] = await Promise.all([
        prisma.gallery.findMany({
            where,
            include: {
                category_service: {
                    select: {
                        service_name: true,
                    },
                },
            },
            skip,
            take: limit,
            orderBy: data.orderBy || {
                id: 'desc',
            },
        }),
        prisma.gallery.count({
            where,
        }),
    ]);

    return {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        rows,
    };
};

const galleryRecords = async (data) => {

    const userId = Number(data.user_id);

    if (!userId) {
        throw new AppError('Please provide a valid user ID');
    }

    const where = { status: { not: 2 } };

    if (data.user_id) {
        where.user_id = Number(data.user_id);
    }

    if (data.category_service_id) {
        where.category_service_id = Number(data.category_service_id);
    }

    if (data.gallery_type) {
        where.gallery_type = data.gallery_type;
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

const updateGalleryStatus = async (data) => {
    const id = Number(data?.id);

    if (!id) {
        throw new AppError('Please provide a valid gallery ID');
    }

    if (data.status === undefined || data.status === null) {
        throw new AppError('Please provide a valid status');
    }

    let statusId = 0;
    if (data.status === 'delete') {
        statusId = 2;
    } else if (data.status === 'approve') {
        statusId = 1;
    } else if (data.status === 'disapprove') {
        statusId = 0;
    }

    await prisma.gallery.update({
        where: {
            id,
        },
        data: {
            status: statusId,
        },
    });
};

const galleryService = {
    createGallery,
    getGallery,
    galleryList,
    galleryRecords,
    updateGalleryStatus,
};

export default galleryService;
