'use strict';

const { db, syncAndSeed } = require('../server/db');
const { clotheseed } = require('./clotheseed');
async function seed() {
  console.log('seeding...');
  try {
    await syncAndSeed();
    if (process.env.seed === 'REAL') {
      await clotheseed();
    }
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

seed();
