import vendorCategoryService from '../../services/vendor/vendor-category.service.js';
import Response from '../../utils/response.js';
import { UPLOAD_DIR } from '../../config/config.js';

const createIndividualService = async (req, res) => {
    try {
        const reqData = {
            ...req.body,
            service_banner_image: req.file ? `${UPLOAD_DIR}/${req.file.filename}` : null,
        };
        const result = await vendorCategoryService.createIndividualService(reqData);
        const msg = reqData.id ? 'Service updated successfully' : 'Service created successfully';
        return Response.success(res, msg, result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const getIndividualService = async (req, res) => {
    try {
        const result = await vendorCategoryService.getIndividualService(req.body);
        return Response.success(res, 'Service fetched successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const categoryServiceController = {
    createIndividualService,
    getIndividualService,
};

export default categoryServiceController;
