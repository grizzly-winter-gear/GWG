const {
  models: { User, Item },
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

router.get('/:category', async (req, res, next) => {
  try {
    const categoryName = String(req.params.category);
    console.log('!!!!!!!!!!!!!! this is the category name', categoryName);
    const category = await Item.findOne({
      where: {
        category: categoryName,
      },
    });
    res.send(category);
  } catch (err) {
    next(err);
  }
});

router.post('/destroy', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
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

router.put('/create', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user.privilege === 'administrator') {
      const item = await Item.create(req.body);
      res.send(item);
    }
  } catch (err) {
    next(err);
  }
});

router.put('/update', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user.privilege === 'administrator') {
      const item = await Item.findByPk(req.body.id);
      item.update({
        name: req.body.name,
        category: req.body.category,
        stock: req.body.stock,
      });
      await item.save();
      res.send(item);
    }
  } catch (err) {
    next(err);
  }
});
