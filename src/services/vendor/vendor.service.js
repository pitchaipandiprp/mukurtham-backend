import prisma from '../../config/prisma.js';
import AppError from '../../utils/app-error.js';

const createIndividualService = async (data) => {
    const categoryId = Number(data.category_id);
    const stateId = Number(data.state_id);
    const cityId = Number(data.city_id);
    const localityId = Number(data.locality_id);

    const [category, locality] = await Promise.all([
        prisma.category.findUnique({ where: { id: categoryId } }),
        prisma.locality.findUnique({ where: { id: localityId } }),
    ]);

    if (!category) {
        throw new AppError('Category not found', 404);
    }

    if (!locality) {
        throw new AppError('Locality not found', 404);
    }

    if (locality.state_id !== stateId || locality.city_id !== cityId) {
        throw new AppError('Selected locality does not match state and city');
    }

    const amount = Number(data.amount || 0);
    const discount = Number(data.discount || 0);
    const taxPercentage = Number(data.tax_percentage || 0);
    const discountedAmount = amount - discount;
    const taxAmount = (discountedAmount * taxPercentage) / 100;
    const finalAmount = discountedAmount + taxAmount;

    return await prisma.categoryService.create({
        data: {
            category_id: categoryId,
            state_id: stateId,
            city_id: cityId,
            locality_id: localityId,
            service_name: data.service_name,
            service_description: data.service_description || null,
            service_address: data.service_address || null,
            service_banner_image: data.service_banner_image || null,
            capacity: data.capacity || null,
            number_of_rooms: Number(data.number_of_rooms || 0),
            car_parking: data.car_parking || null,
            ac_available: data.ac_available || null,
            latitude: String(data.latitude),
            longitude: String(data.longitude),
            pricing_type: data.pricing_type || null,
            amount,
            discount,
            tax_percentage: taxPercentage,
            final_amount: finalAmount,
            status: Number(data.status ?? 1),
        },
    });
};

const vendorService = {
    createIndividualService,
};

export default vendorService;
