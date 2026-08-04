import vendorService from '../../services/vendor/vendor.service.js';
import Response from '../../utils/response.js';
import { UPLOAD_DIR } from '../../config/config.js';

const createIndividualService = async (req, res) => {
    try {
        const reqData = {
            ...req.body,
            service_banner_image: req.file ? `${UPLOAD_DIR}/${req.file.filename}` : null,
        };
        const result = await vendorService.createIndividualService(reqData);
        return Response.success(res, 'Service created successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const categoryServiceController = {
    createIndividualService,
};

export default categoryServiceController;
