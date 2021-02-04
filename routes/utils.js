const csrf = require('csurf');

csrfProtection = csrf({ cookie: true });

const asyncHandler = handler => {
    return (req, res, next) => {
        handler(req, res, next).catch(next);
    }
}



module.exports = {
    csrfProtection,
    asyncHandler
}