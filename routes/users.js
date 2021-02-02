const express = require('express');
const router = express.Router();
const { loginUser } = require('../auth');
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
    .withMessage("password must be between 8 and 30 characters")

]

router.post('/signup', csrfProtection, asyncHandler(async(req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body
    if (password === confirmPassword) {

    }
    res.redirect('/')
    const hashedPassword = await bcrypt.hash(password, 8);
}))



/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});




module.exports = router;