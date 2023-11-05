const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Error", mesage: err.message, stackTrace: err.stack });
            break;

        case constants.NOT_FOUND:
            res.json({ title: "Page Not Found", mesage: err.message, stackTrace: err.stack });
            break;

        case constants.UNAUTHORIZED:
            res.json({ title: "Unauthorized", mesage: err.message, stackTrace: err.stack });
            break;

        case constants.FORBIDDEN:
            res.json({ title: "Forbiden", mesage: err.message, stackTrace: err.stack });
            break;

        case constants.SERVER_ERROR:
            res.json({ title: "Server Error", mesage: err.message, stackTrace: err.stack });
            break;

        default:
            console.log("No Error, All Good");
            break;
    }
};
module.exports = errorHandler;