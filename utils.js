const StatusCodes = {

    // 2xx Success
    ok: 200,
    created: 201,
    noContent: 204,

    // 4xx Client Error
    badRequest:400,
    unAuthorized: 401,
    forbidden: 403,

    // 5xx Server Error
    internalServerError: 500,
}

class Response {
    static ok(res, data = null) {
        data ? res.status(StatusCodes.ok).send(data)
            : res.status(StatusCodes.ok).end();
    }

    static created(res, data = null) {
        data ? res.status(StatusCodes.created).send(data)
            : res.status(StatusCodes.created).end();
    }

    static noContent(res) {
        res.status(StatusCodes.noContent).end();
    }

    static badRequest(res, data) {
        res.status(StatusCodes.badRequest).send(data);
    }

    static internalServerErr(res, data) {
        res.status(StatusCodes.internalServerError).send(data);
    }

    static accessForbidden(res, data = null) {
        data ? res.status(StatusCodes.forbidden).send(data)
            : res.status(StatusCodes.forbidden).end();
    }

    static unAuthorized(res, data = null) {
        data ? res.status(StatusCodes.unAuthorized).send(data)
            : res.status(StatusCodes.unAuthorized).end();
    }
}

module.exports = {
    Response
};
