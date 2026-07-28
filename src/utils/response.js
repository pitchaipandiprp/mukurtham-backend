class Response {
    static success(res, message, data = null, statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            statusCode,
            message,
            data,
        });
    }

    static error(res, message, statusCode = 500, errors = null) {
        return res.status(statusCode).json({
            success: false,
            statusCode,
            message,
            errors,
        });
    }

    static created(res, message, data = null) {
        return this.success(res, message, data, 201);
    }

    static badRequest(res, message, errors = null) {
        return this.error(res, message, 400, errors);
    }

    static unauthorized(res, message = 'Unauthorized') {
        return this.error(res, message, 401, null);
    }

    static forbidden(res, message = 'Forbidden') {
        return this.error(res, message, 403, null);
    }

    static notFound(res, message = 'Resource not found') {
        return this.error(res, message, 404, null);
    }

    static validation(res, errors) {
        return this.error(res, 'Validation failed', 422, errors);
    }
}

export default Response;