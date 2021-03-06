const {
  models: { User, Item },
} = require('../db');

const router = require('express').Router();

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user.privilege === 'administrator') {
      const items = await Item.findAll();
      res.json(items);
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:category/:offset', async (req, res, next) => {
  try {
    const categoryName = await toUpperCase(String(req.params.category));
    let offset = parseInt(req.params.offset);
    let result;
    if (categoryName === 'All') {
      const count = await Item.count();
      let num = 10;
      if (count < 10) num = count;
      if (offset > count) {
        offset = 0;
      } else if (offset < 0) {
        offset = count - num;
      }
      if (offset < 0) offset = 0;
      result = await Item.findAll({
        limit: 10,
        offset: offset,
        order: [['name', 'ASC']],
      });
    } else {
      const count = await Item.count({
        where: {
          category: categoryName,
        },
      });
      let num = 10;

      if (count < 10) num = count;
      if (offset > count) {
        offset = 0;
      } else if (offset < 0) {
        offset = count - num;
      }
      if (offset < 0) offset = 0;
      result = await Item.findAll({
        where: {
          category: categoryName,
        },
        limit: 10,
        offset: offset,
        order: [['name', 'ASC']],
      });
    }
    console.log(offset);

    res.send({ items: result, offset: offset });
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

//helper function
const toUpperCase = (string) => {
  let firstLetter = string[0];
  let firstLetterUpper = firstLetter.toUpperCase();
  let result = firstLetterUpper;
  for (let i = 1; i < string.length; i++) {
    let currentLetterLower = string[i].toLowerCase();
    result += currentLetterLower;
  }
  console.log(result);
  return result;
};
