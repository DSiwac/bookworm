require('dotenv').config();
require('@babel/register');

const express = require('express');
const logger = require('morgan');

const path = require('path');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const { secureRoute } = require('./middlewares/common');

const homepageRouter = require('./routes/homepageRouter');
const loginRouter = require('./routes/loginRouter');
const signupRouter = require('./routes/signupRouter');
const profileRouter = require('./routes/profileRouter');
const catalogueRouter = require('./routes/catalogueRouter');

const app = express();

const { PORT } = process.env;

const sessionConfig = {
  name: 'bookcrossing cookie',
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 9999999,
    httpOnly: true,
  },
};

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(session(sessionConfig));

app.use('/catalogue', catalogueRouter);
app.use('/profile', profileRouter);
app.use('/login', secureRoute, loginRouter);
app.use('/signup', secureRoute, signupRouter);
app.use('/', homepageRouter);

app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
