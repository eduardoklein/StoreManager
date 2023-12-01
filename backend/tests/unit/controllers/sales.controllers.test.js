const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = require('chai');
const { describe, it } = require('mocha');
const salesModels = require('../../../src/models/sales.models');
const salesController = require('../../../src/controllers/sales.controllers');

chai.use(chaiHttp);

describe('Testando Sales', () => {
  const request = {};
  const response = {};
 
  beforeEach(function () {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });

  afterEach(function () { return sinon.restore(); });

  it('Se não existir sales retorna um array vazio', async () => {
    const mockData = [];
    sinon.stub(salesModels, 'findAll').resolves(mockData);
    await salesController.getSales(request, response);
    expect(response.json.calledWith(mockData)).to.be.equal(true);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('Testa o retorno do GET quando existem sales no DB', async () => {
    const mockData = [
      {
        saleId: 1,
        date: '2023-12-01T03:53:20.000Z',
        productId: 2,
        quantity: 10,
      },
      {
        saleId: 2,
        date: '2023-12-01T03:53:20.000Z',
        productId: 3,
        quantity: 15,
      },
    ];
    sinon.stub(salesModels, 'findAll').resolves(mockData);
    await salesController.getSales(request, response);
    console.log(response.json.args);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('Testa o retorno do GET/:id', async () => {
    request.params = { id: 1 };
    const mockData = [
      {
        date: '2023-12-01T03:53:20.000Z',
        productId: 1,
        quantity: 5,
      },
      {
        date: '2023-12-01T03:53:20.000Z',
        productId: 2,
        quantity: 10,
      },
    ];
    sinon.stub(salesModels, 'findById').resolves(mockData);
    await salesController.getSalesById(request, response);
    expect(response.json.calledWith(mockData)).to.be.equal(true);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('Testa o retorno do POST', async () => {
    request.body = [
      {
        productId: 1,
        quantity: 1,
      },
    ];
    const mockData = {
      id: 4,
      itemsSold: [
        {
          productId: 1,
          quantity: 1,
        },
      ],
    };
    sinon.stub(salesModels, 'createSale').resolves(mockData);
    await salesController.createSale(request, response);
    // expect(response.json.calledWith(mockData)).to.be.equal(true);
    expect(response.status.calledWith(201)).to.be.equal(true);
  });
});