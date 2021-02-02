const db = require('./db/models');


// what does this do?
const loginUser = (req, res, user) => {
    req.session.auth = {
        userId: user.id,
    };
};






module.exports = { loginUser }
