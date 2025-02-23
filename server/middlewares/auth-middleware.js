const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token-service');

module.exports = function(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        if(!authorization) {
            throw next(ApiError.UnauthorizedException());
        }

        const accessToken = authorization.split(' ')[1];
        if(!accessToken) {
            throw next(ApiError.UnauthorizedException());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData) {
            throw next(ApiError.UnauthorizedException());
        }

        req.user = userData;
        next();
    } catch(e) {
        throw next(ApiError.UnauthorizedException());
    }
}