import prisma from '../../config/prisma.js';
import AppError from '../../utils/app-error.js';

const galleryRecords = async (data) => {
    const categoryServiceId = Number(data?.category_service_id);

    if (!categoryServiceId) {
        throw new AppError('Please provide a valid service ID');
    }

    const where = { status: 1 };


    if (categoryServiceId) {
        where.category_service_id = categoryServiceId;
    }

    if (data.gallery_type) {
        where.gallery_type = data.gallery_type;
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
