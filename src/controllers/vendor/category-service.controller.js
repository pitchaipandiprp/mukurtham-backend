import categoryService from '../../services/vendor/category.service.js';
import Response from '../../utils/response.js';
import { UPLOAD_DIR } from '../../config/config.js';

const createCategoryService = async (req, res) => {
    try {
        const reqData = {
            ...req.body,
            service_banner_image: req.file ? `${UPLOAD_DIR}/${req.file.filename}` : null,
        };
        const result = await categoryService.createCategoryService(reqData);
        const msg = reqData.id ? 'Service updated successfully' : 'Service created successfully';
        return Response.success(res, msg, result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const getCategoryService = async (req, res) => {
    try {
        const result = await categoryService.getCategoryService(req.body);
        return Response.success(res, 'Service fetched successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const deleteCategoryService = async (req, res) => {
    try {
        const result = await categoryService.deleteCategoryService(req.body);
        return Response.success(res, 'Service deleted successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const categoryServiceList = async (req, res) => {
    try {
        const result = await categoryService.categoryServiceList(req.body);
        return Response.success(res, 'Service fetched successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const categoryServiceController = {
    createCategoryService,
    getCategoryService,
    categoryServiceList,
    deleteCategoryService,
};

export default categoryServiceController;
