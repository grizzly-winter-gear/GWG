//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');
const Item = require('./models/item');
const Cart = require('./models/cart');
const Purchases = require('./models/purchases');

const faker = require('faker');

// //associations could go here!
Item.belongsToMany(Cart, { through: Purchases });
Cart.belongsToMany(Item, { through: Purchases });
Purchases.belongsTo(Cart);
Cart.hasMany(Purchases); //new line
Cart.belongsTo(User);
User.hasMany(Cart);
Purchases.belongsTo(Item);
Item.hasMany(Purchases);

const syncAndSeed = async () => {
  await db.sync({ force: true });
  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'murphy@email.com', password: '123' }),
    User.create({
      email: 'admin',
      password: 'admin',
      privilege: 'administrator',
    }),
  ]);
  const [cody, murphy] = users;

  const itemSeed = [
    {
      name: "Arc'teryx Hoody Men's",
      description:
        'The lightest, most breathable Arc’teryx GORE-TEX trail running jacket.',
      imageURL: '/images/arc_hoody.png',
      price: 325,
      stock: 52,
      rating: 4,
      category: 'Clothes',
    },
    {
      name: "Arc'teryx Aerios FL Mid GTX Shoe",
      description:
        'Supportive, light and agile GORE-TEX footwear for hiking technical terrain.',
      imageURL: '/images/arc_shoe.png',
      price: 185,
      stock: 25,
      rating: 5,
      category: 'Gear',
    },
    {
      name: "Arc'teryx GAMMA AR PANT WOMEN'S",
      description:
        'Versatile weather-resistant softshell pant with performance stretch. Gamma Series: Softshell outerwear with stretch | AR: All Round.',
      imageURL: '/images/arc_pants.png',
      price: 199,
      stock: 10,
      rating: 3.4,
      category: 'Clothes',
    },
  ];

  //create some items here
  await Promise.all([itemSeed.map((item) => Item.create(item))]);
  const categories = ['Clothes', 'Gear', 'Accessories'];
  // for (let i = 0; i < 100; i++) {
  //   await Item.create({
  //     name: faker.commerce.productName(),
  //     category: categories[i % 3],
  //     description: faker.commerce.productDescription(),
  //     price: faker.commerce.price(),
  //     rating: Math.random() * 5,
  //     imageURL: faker.image.imageUrl(null, null, 'sports', true),
  //   });
  // }
  // const [helmet, boot] = items;
  // await cody.addItem(boot, { through: { status: 'unpurchased', quantity: 1 } });
  // await murphy.addItem(helmet, {
  //   through: { status: 'unpurchased', quantity: 1 },
  // });
  // const tempcart = await Cart.create({
  //   status: 'unpurchased',
  //   userId: murphy.id,
  // });
  // await tempcart.addItem(boot);

  // const tempcart2 = await Cart.create({
  //   status: 'unpurchased',
  //   userId: cody.id,
  // });
  // await tempcart2.addItem(helmet);

  return {
    users: {
      cody,
      murphy,
    },
    // items,
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
