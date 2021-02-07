const express = require('express');
const router = express.Router();
const { loginUser, logoutUser } = require('../auth');
const { csrfProtection, asyncHandler } = require('./utils')
const db = require('../db/models');
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator');
const { profile } = require('console');

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
    .custom(async (value) => {
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

router.post('/signup', csrfProtection, userValidators, asyncHandler(async (req, res) => {

  const picture = '../../images/Generic-person.svg.png'
  const biography = 'Generic Bio'
  const { firstName, lastName, email, password } = req.body
  const user = db.User.build({ email, firstName, lastName, picture, biography })
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

router.post('/login', csrfProtection, loginValidators, asyncHandler(async (req, res) => {
  const { email, password, guest_login } = req.body

  if (guest_login === 'true') {
    let guest_user = await db.User.findOne({
      where: { email: 'demo@demo.com' }
    })
    if (!guest_user) {
      const biography = 'Demoman is merely a demo. But one day he will be a real boy.'
      const picture = '../../images/Generic-person.svg.png'
      guest_user = db.User.build({ email: 'demo@demo.com', firstName: 'Demo', lastName: 'Demoman', picture, biography })
      const hashedPassword = await bcrypt.hash('password', 8);
      guest_user.hashedPassword = hashedPassword
      console.log('hello')
      await guest_user.save()
    }
    loginUser(req, res, guest_user)
    return req.session.save(() => {
      res.redirect('/')
    })
  }

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
  req.session.save(() => {
    res.redirect('/')
  })
})


/* GET users listing. */

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const userSignedIn = req.session.auth;
  const userId = req.params.id
  const user = await db.User.findByPk(userId, {
    include: [
      db.Product,
      db.Comment
    ]
  })

  res.render('profile', {
    productslength: (user.Products).length,
    pictures: user.picture,
    title: "Profile Page",
    firstName: user.firstName,
    lastName: user.lastName,
    biography: user.biography,
    userSignedIn,
    products: user.Products,
    userId
  })
}));




module.exports = router;
