const express = require('express');
const router = express.Router();
const { loginUser, logoutUser } = require('../auth');
const { csrfProtection, asyncHandler } = require('./utils')
const db = require('../db/models');
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator');

router.get('/signup', csrfProtection, (req, res) => {
    const user = db.User.build()
    res.render('signup', { csrfToken: req.csrfToken(), user, title: "Sign Up!" })
})

const userValidators = [
    check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("first name must exist")
    .isLength({ max: 50 })
    .withMessage("first name must not be longer than 50 characters"),
    check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("last name must exist")
    .isLength({ max: 50 })
    .withMessage("last name must not be longer than 50 characters"),
    check("email")
    .exists({ checkFalsy: true })
    .withMessage("Email must exist")
    .isLength({ max: 100 })
    .withMessage("Email must not be longer than 100 characters")
    .isEmail()
    .withMessage("must be a valid email address")
    .custom(async(value) => {
        const matchingEmail = await db.User.findOne({
            where: {
                email: value
            }
        })
        if (matchingEmail) {
            throw Error("Email already exists")
        }
        return true;
    }),
    check("password")
    .exists({ checkFalsy: true })
    .withMessage("password must exist")
    .isLength({ min: 8, max: 30 })
    .withMessage("password must be between 8 and 30 characters"),
    check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Confirm password must exist")
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw Error("Confirm password must match password!")
        }
        return true
    }),
]

router.post('/signup', csrfProtection, userValidators, asyncHandler(async(req, res) => {

    const { firstName, lastName, email, password } = req.body
    const user = db.User.build({ email, firstName, lastName })
    const validatorErrors = validationResult(req)

    if (validatorErrors.isEmpty()) {
        const hashedPassword = await bcrypt.hash(password, 8);
        user.hashedPassword = hashedPassword
        await user.save()
        loginUser(req, res, user)
        return req.session.save(() => {
            res.redirect('/')
        })
    } else {
        const errors = validatorErrors.array().map(err => err.msg)
        res.render('signup', { title: "Sign Up!", user, errors, csrfToken: req.csrfToken() })
    }
}))

const loginValidators = [
    check('email')
    .exists({ checkFalsy: true })
    .withMessage('Email must exist'),
    check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password'),
]

router.get('/login', csrfProtection, (req, res) => {
    const user = db.User.build()
    res.render('login', { csrfToken: req.csrfToken(), title: 'Login!', user })
})

router.post('/login', csrfProtection, loginValidators, asyncHandler(async(req, res) => {
    const { email, password } = req.body
    const validatorErrors = validationResult(req)
    const user = db.User.build({ email })

    let errors = []
    if (validatorErrors.isEmpty()) {
        const user = await db.User.findOne({ where: { email } })

        if (user) {
            console.log(user)
            const isPassword = await bcrypt.compare(password, user.hashedPassword.toString())

            if (isPassword) {
                loginUser(req, res, user)
                return req.session.save(() => {
                    res.redirect('/')
                })
            }
        }
        errors.push('Invalid credentials')
    } else {
        errors = validatorErrors.array().map(err => err.msg)
    }

    res.render('login', { title: 'Login!', errors, user, csrfToken: req.csrfToken() })
}))



router.post('/logout', (req, res) => {
    logoutUser(req, res)
    res.redirect('/')
})



/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});




module.exports = router;