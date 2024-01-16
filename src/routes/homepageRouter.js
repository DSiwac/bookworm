const express = require('express');

const renderTemplate = require('../lib/renderTemplate');
const Homepage = require('../views/Homepage');

const router = express.Router();

router.get('/', (req, res) => {
  const { login } = req.session;
  renderTemplate(Homepage, { login }, res);
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('bookcrossing cookie');
    res.redirect('/');
  });
});

module.exports = router;
