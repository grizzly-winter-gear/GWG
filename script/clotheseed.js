#!/usr/bin/env node

const fs = require('fs');
let clothes = JSON.parse(
  fs.readFileSync('./script/winter-clothes.json', 'utf8')
);

//https://www.kaggle.com/paramaggarwal/fashion-product-images-small
const Item = require('../server/db/models/item');
const faker = require('faker');

module.exports = {
  async clotheseed() {
    console.log('seeding big ass json now');
    console.log(clothes.length);

    // const categories = ['Clothes', 'Gear', 'Accessories'];

    await Promise.all(
      clothes.map((clothe) =>
        Item.create({
          imageURL: `/images/GWGImages/${clothe.id}.jpg`,
          name: clothe.productDisplayName,
          category: clothe.MasterCategory,
          //     category: categories[i % 3],

          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          rating: Math.random() * 5,
        })
      )
    );
  },
};
