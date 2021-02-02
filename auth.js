const db = require('./db/models');


const loginUser = (req, res, user) => {
    // console.log(req.session)
    req.session.auth = {
        userId: user.id,
    };
};

const logoutUser = (req, res) => {
    delete req.session.auth
}




module.exports = { loginUser }
