import categoriesService from '../../services/main/categories.service.js';
import Response from '../../utils/response.js';

const categoryServiceSearch = async (req, res) => {
    const categorySearch = await categoriesService.categoryServiceSearch(req.body);
    Response.success(res, 'Success', categorySearch);
};


const categoriesController = {
    categoryServiceSearch,
};

export default categoriesController;

