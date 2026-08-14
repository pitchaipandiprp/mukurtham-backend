import reviewService from '../../services/main/review.service.js';
import Response from '../../utils/response.js';

const createServiceReview = async (req, res) => {
    try {
        const result = await reviewService.createServiceReview(req.body);
        return Response.success(res, 'Feedback submitted successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const serviceReviewList = async (req, res) => {
    try {
        const result = await reviewService.serviceReviewList(req.body);
        return Response.success(res, 'Service reviews fetched successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const serviceReviewRecords = async (req, res) => {
    try {
        const result = await reviewService.serviceReviewRecords(req.body);
        return Response.success(res, 'Service reviews fetched successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const serviceReviewController = {
    createServiceReview,
    serviceReviewList,
    serviceReviewRecords,
};

export default serviceReviewController;
