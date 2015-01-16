module.exports = function (path) {
    var returnPath = (process.env.APP_DIR_FOR_CODE_COVERAGE || '../app/') + path
    return require(returnPath)
};