import reviewsService from '../../services/vendor/reviews.service.js';
import Response from '../../utils/response.js';


const serviceReviewList = async (req, res) => {
    try {
        const result = await reviewsService.serviceReviewList(req.body);
        return Response.success(res, 'Review fetched successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const serviceReviewRecords = async (req, res) => {
    try {
        const result = await reviewsService.serviceReviewRecords(req.body);
        return Response.success(res, 'Review fetched successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const updateServiceReviewStatus = async (req, res) => {
    try {
        const result = await reviewsService.updateServiceReviewStatus(req.body);
        return Response.success(res, 'Review status updated successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const serviceReviewsController = {
    serviceReviewList,
    serviceReviewRecords,
    updateServiceReviewStatus,
};

export default serviceReviewsController;
