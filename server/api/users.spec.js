/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const {
  db,
  syncAndSeed,
  models: { User },
} = require('../db');
const app = require('../app');

describe('User routes', () => {
  beforeEach(async () => {
    await syncAndSeed();
    const auth = (
      await axios.post(`/auth/login`, { email: 'admin', password: 'admin' })
    ).data;
  });

  describe('/api/users/', () => {
    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users', {
          headers: {
            authorization: token,
          },
        })
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(2);
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
