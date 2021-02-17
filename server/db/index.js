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
    {
      name: 'Sklon Ski Strap and Pole Carrier',
      description:
        'Forget awkwardly lugging around those heavy skis and enjoy the relief + comfort of owning the #1 solution for transporting ski equipment. FINALLY! - After a long and physically exhausting day of skiing, the Ski Strap & Pole Carrier by Sklon will allow you to comfortably carry your skis and poles to and from the mountain WITHOUT the usual STRUGGLE and FRUSTRATION.',
      imageURL: '/images/sklon.jpg',
      price: 17,
      stock: 10,
      rating: 3.3,
      category: 'Accessories',
    },
    {
      name: 'Snow skis for Kids',
      description:
        'Our snow skis build perfect technique whether you’re a learner of downhill skiing, CC or ski jumping. Thanks to the 26 in/65cm length the beginner instinctively hones core balance.',
      imageURL: '/images/SnowSkisForKids.jpg',
      price: 46,
      stock: 10,
      rating: 4.1,
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
  // await Promise.all([itemSeed.map((item) => Item.create(item))]);
  for (let i = 0; i < itemSeed.length; i++) {
    await Item.create(itemSeed[i]);
  }
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

  return {
    users: {
      cody,
      murphy,
    },
  };
};

module.exports = {
  db,
  syncAndSeed,
  models: {
    User,
    Item,
    Cart,
    Purchases,
  },
};
