//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');
const Item = require('./models/item');
const Cart = require('./models/cart');

// //associations could go here!
Item.belongsToMany(User, { through: Cart });
User.belongsToMany(Item, { through: Cart });

const syncAndSeed = async () => {
  await db.sync({ force: true });
  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'murphy@email.com', password: '123' }),
  ]);
  const [cody, murphy] = users;

  //create some items here
  const items = await Promise.all([
    Item.create({ name: 'helmet a ', category: 'helmets' }),
    Item.create({ name: 'cool boots', category: 'footwear' }),
  ]);
  const [helmet, boot] = items;
  await cody.addItem(boot, { through: { status: 'unpurchased' } });
  await murphy.addItem(helmet, { through: { status: 'unpurchased' } });
  return {
    users: {
      cody,
      murphy,
    },
    items,
  };
};

module.exports = {
  db,
  syncAndSeed,
  models: {
    User,
    Item,
    Cart,
  },
};
