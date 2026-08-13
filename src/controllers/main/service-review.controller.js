import reviewService from '../../services/main/review.service.js';
import Response from '../../utils/response.js';

const serviceReviewsRecords = async (req, res) => {
    try {
        const result = await reviewService.serviceReviewsRecords(req.body);
        return Response.success(res, 'Service reviews fetched successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const serviceReviewController = {
    serviceReviewsRecords,
};

export default serviceReviewController;
