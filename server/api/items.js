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
