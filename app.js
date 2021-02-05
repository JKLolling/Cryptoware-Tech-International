const createError = require('http-errors'); // what is this?
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store); // what does this do
const { sequelize } = require('./db/models');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const apiRouter = require('./routes/api')

const { restoreUser } = require('./auth');

const app = express();

// view engine setup
app.set('view engine', 'pug');

app.use(logger('dev')); // what does this do
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // what does this do?

// set up session middleware
const store = new SequelizeStore({ db: sequelize }); // what does this do?


// What does this do/
app.use(
    session({
        secret: 'superSecret',
        store,
        saveUninitialized: false,
        resave: false,
    })
);

// create Session table if it doesn't already exist
store.sync(); // what does this do/
app.use(restoreUser)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/api', apiRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404)); // what  does this do
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message; // what does this do?
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
