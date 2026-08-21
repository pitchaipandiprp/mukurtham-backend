import prisma from '../../config/prisma.js';
import AppError from '../../utils/app-error.js';

const createServiceCertificate = async (data) => {
    const userId = Number(data.user_id);
    const categoryServiceId = Number(data.category_service_id);
    const serviceCertificateId = data.id ? Number(data.id) : null;
    let existing = null;

    if (serviceCertificateId) {
        existing = await prisma.serviceCertificate.findUnique({
            where: {
                id: serviceCertificateId,
            },
        });

        if (!existing) {
            throw new AppError('Record not found');
        }
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
        insertData.updated_by = userId;
        insertData.updated_at = new Date();

        return await prisma.serviceCertificate.update({
            where: {
                id: serviceCertificateId,
            },
            data: insertData,
        });
    }

    insertData.created_by = userId;
    insertData.created_at = new Date();
    insertData.updated_by = userId;
    insertData.updated_at = new Date();

    return await prisma.serviceCertificate.create({
        data: insertData,
    });
};

const getServiceCertificate = async (data) => {
    const id = Number(data?.id);

    if (!id) {
        throw new AppError('Please provide a valid service certificate ID');
    }

    return await prisma.serviceCertificate.findUnique({
        where: {
            id,
        },
    });
};


const serviceCertificateService = {
    createServiceCertificate,
    getServiceCertificate,
};

export default serviceCertificateService;
