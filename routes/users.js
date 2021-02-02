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