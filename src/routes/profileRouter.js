const express = require('express');

const router = express.Router();

const renderTemplate = require('../lib/renderTemplate');
const Profile = require('../views/Profile');

const { users } = require('../../db/models');
const { books } = require('../../db/models');
const { catalogue_items } = require('../../db/models');
const { reservations } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const { login } = req.session;
    const user = await users.findOne({ where: { login: req.session.login } });
    const items = await catalogue_items.findAll({
      where: { owner_id: user.id },
      include: [books],
    });
    const reservedItems = await reservations.findAll({
      where: { borrower_id: user.id },
      include: [
        {
          model: catalogue_items,
          where: { status: 'booked' },
          include: [books],
        },
      ],
    });
    renderTemplate(Profile, { login, items, reservedItems }, res);
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res) => {
  const { name, author } = req.body;
  console.log(name, author);
  try {
    const user = await users.findOne({ where: { login: req.session.login } });
    const newBook = await books.create({ name, author });
    const newItem = await catalogue_items.create({
      status: 'available',
      book_id: newBook.id,
      owner_id: user.id,
    });
    res.json({ newBook, newItem });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await books.destroy({ where: { id } });
    await catalogue_items.destroy({ where: { book_id: id } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
