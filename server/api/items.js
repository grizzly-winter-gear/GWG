const {
  models: { User, Item, Cart },
} = require('../db');

const router = require('express').Router();

module.exports = router;

//maintaining old route if admin needs it. could dry out
router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.get('/offset/:offset', async (req, res, next) => {
  try {
    console.log(req.params);
    const items = await Item.findAll({
      limit: 10,
      offset: req.params.offset,
      order: [['name', 'ASC']],
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const item = await Item.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(item);
  } catch (err) {
    next(err);
  }
});

router.post('/destroy', async (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const user = await User.findByToken(req.headers.authorization);

    console.log(user);

    if (user.privilege === 'administrator') {
      const item = await Item.findOne({
        where: {
          id: req.body.id,
        },
      });
      await item.destroy();
      res.sendStatus(204);
    }
  } catch (err) {
    console.log(err);
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
