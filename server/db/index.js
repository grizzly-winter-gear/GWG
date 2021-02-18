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
      imageURL: '/images/Sklon.jpg',
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
      name: 'Meowntain Shirt',
      description:
        "If you're a skier or snowboarder you'll love this cool cat wearing ski / snowboard goggles.",
      imageURL: '/images/meowntain.jpg',
      price: 18,
      stock: 10,
      rating: 5.0,
      category: 'Clothes',
    },
    {
      name: 'Yeti Socks',
      description: '85% Cotton, 10% Polyester, 5% Spandex',
      imageURL: '/images/yetisock.jpg',
      price: 10,
      stock: 10,
      rating: 5.0,
      category: 'Clothes',
    },
    {
      name: 'Cat Balaclava',
      description:
        'Vivid animal pattern and unique ear sewing process, The ears stand up perfectly and are very stable ( no flopping or adjustments needed). Ears maintain a 3D shape, looks more real, more interesting, more lovely, very cool, suitable for any occasion',
      imageURL: '/images/cat_balaclava.jpg',
      price: 19,
      stock: 10,
      rating: 3.2,
      category: 'Clothes',
    },
    {
      name: 'Skeletal Gloves',
      description:
        'SKELETON PRINT GLOWS IN THE DARK! Your child will never want come inside this winter because the skeleton print glows in the dark! For the best results, place the gloves in a brightly lit room or under a light fixture prior to use, the light charges it up. The gloves also have a grippers throughout the palms, fingers and thumbs, and nubuck reinforced thumbs, making them well suited for playing in the snow.',
      imageURL: '/images/glow_gloves.jpg',
      price: 18,
      stock: 10,
      rating: 4.1,
      category: 'Gear',
    },
    {
      name: 'Boot Dryer',
      description:
        'Portable boot dryer and shoe dryer combines traditional convection drying with forced air',
      imageURL: '/images/boot_dryer.jpg',
      price: 37,
      stock: 10,
      rating: 4.1,
      category: 'Accessories',
    },
    {
      name: "Arc'teryx Backpack",
      description:
        'Exceptionally durable and weather-resistant pack for rock, ice or alpine climbing. Alpha Series: Climbing and alpine focused systems. | FL: Fast and light.',
      imageURL: '/images/arc_pack.png',
      price: 200,
      stock: 12,
      rating: 4.5,
      category: 'Accessories',
    },
    {
      name: 'GRANVILLE 16 ZIP BACKPACK',
      description:
        'Slim profile urban backpack with weather protection and smart organization.',
      imageURL: '/images/arc_small_pack.png',
      price: 180,
      stock: 200,
      rating: 3.0,
      category: 'Accessories',
    },
    {
      name: 'CONVEYOR BELT',
      description:
        "Heavy duty, textured webbing belt with contrasting colour stitch detail and a metal buckle with the Arc'teryx logo. Ideal for keeping your pants up.",
      imageURL: '/images/arc_belt.png',
      price: 39,
      stock: 100,
      rating: 3.5,
      category: 'Accessories',
    },
    {
      name: "COVERT HOODY MEN'S",
      description:
        'Clean, casual technical fleece hoody with versatile wool sweater styling.',
      imageURL: '/images/arc_fleece.png',
      price: 199,
      stock: 125,
      rating: 4.7,
      category: 'Clothes',
    },
    {
      name: "PHELIX SHORT 9.5 MEN'S",
      description:
        'Trim performance shorts with versatile everyday style and cotton comfort.',
      imageURL: '/images/arc_shorts.png',
      price: 99,
      stock: 24,
      rating: 4.0,
      category: 'Clothes',
    },
    {
      name: 'KONSEAL FL 2 SHOE WOMEN',
      description:
        'Stable, supportive precision-fit approach shoe for fast, light mountain travel.',
      imageURL: '/images/arc_shoes.png',
      price: 145,
      stock: 65,
      rating: 3.0,
      category: 'Clothes',
    },
    {
      name: 'C-QUENCE HARNESS MEN',
      description:
        'Exceptionally comfortable harness leveraging vanguard Warp Strength Technology',
      imageURL: '/images/arc_harness.png',
      price: 145,
      stock: 650,
      rating: 3.7,
      category: 'Gear',
    },
    {
      name: 'Unicorn Helmet Cover',
      description:
        'One size fits most. Good for multi-sport helmets. Sparkling fabric! Makes a GREAT Gift!',
      imageURL: '/images/unicorn_helmet.jpg',
      price: 37,
      stock: 15,
      rating: 3.2,
      category: 'Gear',
    },
    {
      name: 'Beard Helmet',
      description:
        'Super cool crotcheted beard helmet that is soft and gentle to the skin.',
      imageURL: '/images/beard_helmet.jpg',
      price: 18,
      stock: 12,
      rating: 3.0,
      category: 'Gear',
    },
    {
      name: 'C-QUENCE HARNESS MEN',
      description:
        'Exceptionally comfortable harness leveraging vanguard Warp Strength Technology',
      imageURL: '/images/arc_harness.png',
      price: 145,
      stock: 650,
      rating: 3.7,
      category: 'Gear',
    },
    {
      name: 'C-QUENCE HARNESS MEN',
      description:
        'Exceptionally comfortable harness leveraging vanguard Warp Strength Technology',
      imageURL: '/images/arc_harness.png',
      price: 145,
      stock: 650,
      rating: 3.7,
      category: 'Gear',
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
