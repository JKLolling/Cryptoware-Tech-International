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

const restoreUser = async(req, res, next) => {
    if (req.session.auth) {
        const { userId } = req.session.auth
        try {
            const user = await db.User.findByPk(userId)
            if (user) {
                res.locals.authenticated = true
                res.locals.user = user
                next()
            }
        } catch (err) {
            res.locals.authenticated = false
            next(err)
        }
    } else {
        res.locals.authenticated = false
        next()
    }
}

const requireAuth = (req, res, next) => {
    if (!res.locals.authenticated) {
        res.redirect('/users/login')
    } else {
        next()
    }
}

module.exports = { requireAuth, restoreUser, loginUser, logoutUser }