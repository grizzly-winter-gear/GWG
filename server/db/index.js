//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');

// //associations could go here!
// Items.belongsToMany(Users, { through: ManyToManyTable });
// Users.belongsToMany(Items, { through: ManyToManyTable });

const syncAndSeed = async () => {
  await db.sync({ force: true });
  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'murphy@email.com', password: '123' }),
  ]);
  const [cody, murphy] = users;

  //create some items here
  //place some items in user's carts
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
  },
};
