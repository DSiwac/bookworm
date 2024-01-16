const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const { users } = require('../../db/models');

const renderTemplate = require('../lib/renderTemplate');
const Login = require('../views/Login');

router.get('/', (req, res) => {
  renderTemplate(Login, null, res);
});

router.post('/', async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await users.findOne({ where: { login } });
    if (user) {
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        req.session.login = user.login;
        req.session.save(() => {
          res.json({ msg: 'log in successful' });
        });
      } else {
        res.json({ err: 'wrong password' });
      }
    } else {
      res.json({ err: 'user not found' });
    }
  } catch (error) {
    console.log('Ошибка авторизации!', error);
    res.json({ err: 'Ошибка при авторизации' });
  }
});

module.exports = router;
