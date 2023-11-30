const chai = require('chai');
const chaiHttp = require('chai-http');
// const sinon = require('sinon');
const { describe, it, done } = require('mocha');
const app = require('../../../src/app');
// const productModels = require('../../../src/models/products.models');

chai.use(chaiHttp);

describe('Testando o Controller', () => {
  it('retorna uma lista de todos os produtos', async () => {
    chai.request(app).get('/products').end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      done();
    });
  });
});