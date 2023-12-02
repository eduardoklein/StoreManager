const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsModels = require('../../../src/models/products.models');
const productsController = require('../../../src/controllers/products.controllers');

chai.use(sinonChai);

const { expect } = chai;

describe('Testando Products', function () {
  const request = {};
  const response = {};
 
  beforeEach(function () {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });

  afterEach(function () { return sinon.restore(); });

  it('Se não existir products retorna um array vazio', async function () {
    const mockData = [];
    sinon.stub(productsModels, 'findAll').resolves([]);
    await productsController.getProducts(request, response);
    expect(response.json).to.have.been.calledWith(mockData);
    expect(response.status).to.have.been.calledWith(200);
  });

  it('Testa o retorno do GET quando existem products no DB', async function () {
    const mockData = [
      {
        id: 1,
        name: 'Martelo de Thor',
      },
      {
        id: 2,
        name: 'Traje de encolhimento',
      },
      {
        id: 3,
        name: 'Escudo do Capitão América',
      },
    ];
    sinon.stub(productsModels, 'findAll').resolves(mockData);
    await productsController.getProducts(request, response);
    expect(response.json).to.have.been.calledWith(mockData);
    expect(response.status).to.have.been.calledWith(200);
  });

  it('Testa o retorno do GET/:id', async function () {
    request.params = { id: 1 };
    const mockData = {
      id: 1,
      name: 'Martelo de Thor',
    };
    sinon.stub(productsModels, 'findById').resolves([mockData]);
    await productsController.getProductById(request, response);
    expect(response.json).to.have.been.calledWith(mockData);
    expect(response.status).to.have.been.calledWith(200);
  });

  it('Testa o retorno do POST', async function () {
    request.body = {
      name: 'ProdutoX',
    };
    const mockData = {
      id: 4,
      name: 'ProdutoX',
    };
    sinon.stub(productsModels, 'createProduct').resolves(4);
    await productsController.createProduct(request, response);
    expect(response.json).to.have.been.calledWith(mockData);
    expect(response.status).to.have.been.calledWith(201);
  });

  it('Testa o retorno do PUT', async function () {
    request.params = { id: 1 };
    request.body = {
      name: 'Martelo do Batman',
    };
    const mockData = {
      id: 1,
      name: 'Martelo do Batman',
    };

    sinon.stub(productsModels, 'editProduct').resolves(mockData);
    await productsController.editProduct(request, response);
    expect(response.json).to.have.been.calledWith(mockData);
    expect(response.status).to.have.been.calledWith(200);
  });
});