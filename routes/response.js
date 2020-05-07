/**
 * Response successfully
 * only first paramneter is required others can be optional
 * @param {Response} res 
 * @param {String} message 
 * @param {any} data 
 * @param {Number} status 
 */
const success = (res, message='successful request', data={}, status=200) => {
    res.status(status).json({
        error: false,
        status,
        message,
        body: data
    });
}

const unsuccess = (res, message='unsuccessful request', data={}, status=500) => {
    res.status(status).json({
        error: true,
        status,
        message,
        body: data
    });
}

module.exports = {
    success,
    unsuccess,
};
