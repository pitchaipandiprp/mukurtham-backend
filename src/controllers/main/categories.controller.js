import categoriesService from '../../services/main/categories.service.js';
import Response from '../../utils/response.js';

const categoryServiceSearch = async (req, res) => {
    const categorySearch = await categoriesService.categoryServiceSearch(req.body);
    Response.success(res, 'Success', categorySearch);
};

const getCategoryService = async (req, res) => {
    try {
        const result = await categoriesService.getCategoryService(req.body);
        return Response.success(res, 'Service fetched successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const categoriesController = {
    categoryServiceSearch,
    getCategoryService,
};

export default categoriesController;

