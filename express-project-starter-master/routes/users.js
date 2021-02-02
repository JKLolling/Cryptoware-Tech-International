const express = require('express');
const router = express.Router();
const { loginUser } = require('../auth');
const { csrfProtection, asyncHandler } = require('./utils')
const db = require('../db/models');
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator');

router.get('/signup', csrfProtection, (req, res) => {
    res.render('signup', { csrfToken: req.csrfToken() })
})


router.post('/signup', csrfProtection, asyncHandler(async(req, res) => {
    const { fullName, email, password, confirmPassword } = req.body

    const hashedPassword = await bcrypt.hash(password, 8);
    await db.User.create({
        fullName,
        email,
        password: hashedPassword,
        confirmPassword,
    });


    loginUser(req, res, user);
    res.redirect('/')
}))



router.get('/login', csrfProtection, (req, res) => {
    res.render('login', { csrfToken: req.csrfToken() })

})


router.post('/login', csrfProtection, asyncHandler(async(req, res) => {
        const { email, password } = req.body
        const user = await db.User.findOne({ where: { email } })
        const matchingPassword = await bcrypt.compare(password, user.hashedPassword)

        if (matchingPassword) {
            loginUser(req, res, user)
        }
        res.redirect('/users')
    }))
    /* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});




module.exports = router;