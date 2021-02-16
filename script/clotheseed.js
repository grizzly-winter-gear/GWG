#!/usr/bin/env node

const fs = require('fs');
const clothes = JSON.parse(fs.readFileSync('./script/clothes.json', 'utf8'));
//https://www.kaggle.com/paramaggarwal/fashion-product-images-small
const Item = require('../server/db/models/item');
module.exports = {
  async clotheseed() {
    console.log('seeding big ass json now');
    console.log(clothes.length);
    await Promise.all(
      clothes.map((clothe) =>
        Item.create({
          imageURL: clothe.id,
          name: clothe.productDisplayName,
          category: clothe.MasterCategory,
        })
      )
    );
  },
};
