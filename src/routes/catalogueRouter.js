const express = require('express');

const router = express.Router();

const renderTemplate = require('../lib/renderTemplate');
const Catalogue = require('../views/Catalogue');

const { users } = require('../../db/models');
const { books } = require('../../db/models');
const { catalogue_items } = require('../../db/models');
const { reservations } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const { login } = req.session;
    const items = await catalogue_items.findAll({ where: {}, include: [books] });
    renderTemplate(Catalogue, { login, items }, res);
  } catch (error) {
    console.log(error);
  }
});

router.get('/search', async (req, res) => {
  try {
    const { login } = req.session;
    const items = await catalogue_items.findAll({
      include: {
        model: books,
        where: { name: req.query.name },
      },
    });
    renderTemplate(Catalogue, { login, items }, res);
  } catch (error) {
    console.log(error);
  }
});

router.post('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await users.findOne({ where: { login: req.session.login } });
    const item = await catalogue_items.findOne({ where: { id } });
    await reservations.create({ catalog_item_id: id, borrower_id: user.id });
    await item.update({ status: 'booked' });
    // res.json({ msg: 'booked' });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
