import prisma from '../../config/prisma.js';
import AppError from '../../utils/app-error.js';

const createServiceCertificate = async (data) => {
    const userId = Number(data.user_id);
    const categoryServiceId = Number(data.category_service_id);
    let existing = null;

    if (categoryServiceId) {
        existing = await prisma.serviceCertificate.findFirst({
            where: {
                category_service_id: categoryServiceId,
            },
        });
    }

    const insertData = {
        user_id: userId,
        category_service_id: categoryServiceId,
        aadhar_number: data.aadhar_number || null,
        pan_number: data.pan_number || null,
        gst_number: data.gst_number || null,
        bank_details: data.bank_details || null,
        aadhar_doc: data.aadhar_doc || null,
        pan_doc: data.pan_doc || null,
        gst_doc: data.gst_doc || null,
        bank_doc: data.bank_doc || null,
        status: Number(data.status ?? 1),
    };

    if (existing) {
        return await prisma.serviceCertificate.update({
            where: {
                id: existing.id,
            },
            data: {
                ...insertData,
                updated_by: userId,
                updated_at: new Date(),
            },
        });
    }

    return await prisma.serviceCertificate.create({
        data: {
            ...insertData,
            created_by: userId,
            created_at: new Date(),
            updated_by: userId,
            updated_at: new Date(),
        },
    });
};

const getServiceCertificate = async (data) => {
    const categoryServiceId = Number(data?.category_service_id);

    if (!categoryServiceId) {
        throw new AppError('Please provide a valid category service ID');
    }
    const where = { status: { not: 2 } };

    if (categoryServiceId) {
        where.category_service_id = categoryServiceId;
    }

    return await prisma.serviceCertificate.findFirst({
        where,
    });
};


const serviceCertificateService = {
    createServiceCertificate,
    getServiceCertificate,
};

export default serviceCertificateService;
