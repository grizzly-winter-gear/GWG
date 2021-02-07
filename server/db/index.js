//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');
const Item = require('./models/item');
const Cart = require('./models/cart');

const faker = require('faker');

// //associations could go here!
Item.belongsToMany(User, { through: Cart });
User.belongsToMany(Item, { through: Cart });
Item.hasMany(Cart);
Cart.belongsTo(Item);
//might also need to add User.hasMany(Cart) && Cart.belongsToUser // we'll see

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
  for (let i = 0; i < 50; i++) {
    await Item.create({
      name: faker.commerce.productName(),
      category: faker.commerce.productAdjective(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      rating: Math.random() * 5,
      imageURL: faker.image.imageUrl(null, null, 'sports', true),
    });
  }
  const [helmet, boot] = items;
  await cody.addItem(boot, { through: { status: 'unpurchased', quantity: 1 } });
  await murphy.addItem(helmet, {
    through: { status: 'unpurchased', quantity: 1 },
  });
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
