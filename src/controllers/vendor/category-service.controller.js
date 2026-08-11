import categoryService from '../../services/vendor/category.service.js';
import Response from '../../utils/response.js';
import { UPLOAD_DIR_SERVICE } from '../../config/constant.js';

const createCategoryService = async (req, res) => {
    try {
        const reqData = {
            ...req.body,
            service_banner_image: req.file ? `${UPLOAD_DIR_SERVICE}/${req.file.filename}` : null,
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

const updateCategoryServiceStatus = async (req, res) => {
    try {
        const result = await categoryService.updateCategoryServiceStatus(req.body);
        return Response.success(res, 'Service status updated successfully', result);
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

const categoryServiceRecords = async (req, res) => {
    try {
        const result = await categoryService.categoryServiceRecords(req.body);
        return Response.success(res, 'Service fetched successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const categoryServiceController = {
    createCategoryService,
    getCategoryService,
    categoryServiceList,
    categoryServiceRecords,
    updateCategoryServiceStatus,
};

export default categoryServiceController;
