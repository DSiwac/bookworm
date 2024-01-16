const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const renderTemplate = require('../lib/renderTemplate');
const Signup = require('../views/Signup');

const { users } = require('../../db/models');

router.get('/', (req, res) => {
  renderTemplate(Signup, null, res);
});

router.post('/', async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await users.findOne({ where: { login } });
    if (user) {
      res.json({ err: 'Такой пользователь уже существует!' });
    } else {
      const hash = await bcrypt.hash(password, 10);
      const newUser = await users.create({ login, password: hash });
      req.session.login = newUser.login;
      req.session.save(() => {
        res.json({ msg: 'Пользователь зарегистрирован!' });
      });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
