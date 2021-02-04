const router = require('express').Router();
const {
  models: { Item },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.get('/:category', async (req, res, next) => {
  try {
    const items = await Item.findAll({
      where: {
        category: req.params.category,
      },
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
});
