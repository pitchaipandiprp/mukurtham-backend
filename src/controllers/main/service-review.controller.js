import reviewService from '../../services/main/review.service.js';
import Response from '../../utils/response.js';

const serviceReviewRecords = async (req, res) => {
    try {
        const result = await reviewService.serviceReviewRecords(req.body);
        return Response.success(res, 'Service reviews fetched successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const serviceReviewController = {
    serviceReviewRecords,
};

export default serviceReviewController;
