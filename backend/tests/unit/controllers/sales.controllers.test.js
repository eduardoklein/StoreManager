const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesModels = require('../../../src/models/sales.models');
const salesController = require('../../../src/controllers/sales.controllers');

chai.use(sinonChai);

const { expect } = chai;

describe('Testando Sales', function () {
  const request = {};
  const response = {};
 
  beforeEach(function () {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });

  afterEach(function () { return sinon.restore(); });

  it('Se não existir sales retorna um array vazio', async function () {
    const mockData = [];
    sinon.stub(salesModels, 'findAll').resolves([]);
    await salesController.getSales(request, response);
    expect(response.json).to.have.been.calledWith(mockData);
    expect(response.status).to.have.been.calledWith(200);
  });

  it('Testa o retorno do GET quando existem sales no DB', async function () {
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

  it('Testa o retorno do GET/:id', async function () {
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
    expect(response.json).to.have.been.calledWith(mockData);
    expect(response.status).to.have.been.calledWith(200);
  });

  it('Testa o retorno do POST', async function () {
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
    sinon.stub(salesModels, 'createSale').resolves(4);
    await salesController.createSale(request, response);
    expect(response.json).to.have.been.calledWith(mockData);
    expect(response.status.calledWith(201)).to.be.equal(true);
  });
});