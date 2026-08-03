import vendorService from '../../services/vendor/vendor.service.js';
import Response from '../../utils/response.js';

const createIndividualService = async (req, res) => {
    try {
        const result = await vendorService.createIndividualService(req.body);
        return Response.success(res, 'Service created successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const categoryServiceController = {
    createIndividualService,
};

export default categoryServiceController;
