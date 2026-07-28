import Response from '../utils/response.js';

const notFoundHandler = (req, res) => {
    return Response.notFound(res, 'Route not found');
};

export default notFoundHandler;
