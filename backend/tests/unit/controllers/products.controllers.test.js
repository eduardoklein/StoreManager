const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = require('chai');
const { describe, it } = require('mocha');
const productsModels = require('../../../src/models/products.models');
const productsController = require('../../../src/controllers/products.controllers');

chai.use(chaiHttp);

describe('Testando Products', () => {
  const request = {};
  const response = {};
 
  beforeEach(function () {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });

  afterEach(function () { return sinon.restore(); });

  it('Se não existir products retorna um array vazio', async () => {
    const mockData = [];
    sinon.stub(productsModels, 'findAll').resolves(mockData);
    await productsController.getProducts(request, response);
    expect(response.json.calledWith(mockData)).to.be.equal(true);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('Testa o retorno do GET quando existem products no DB', async () => {
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
    console.log(response.json.args);
    expect(response.json.calledWith(mockData)).to.be.equal(true);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  // it('Testa o retorno do GET/:id', async () => {
  //   request.params = { id: 1 };
  //   const mockData = {
  //     id: 1,
  //     name: 'Martelo de Thor',
  //   };
  //   sinon.stub(productsModels, 'findById').resolves(mockData);
  //   await productsController.getProductById(request, response);
  //   expect(response.json.calledWithExactly(mockData)).to.be.equal(true);
  //   expect(response.status.calledWithExactly(200)).to.be.equal(true);
  // });

  it('Testa o retorno do POST', async () => {
    request.body = {
      name: 'ProdutoX',
    };
    const mockData = {
      id: 4,
      name: 'ProdutoX',
    };
    sinon.stub(productsModels, 'createProduct').resolves(mockData);
    await productsController.createProduct(request, response);
    expect(response.status.calledWith(201)).to.be.equal(true);
  });

  it('Testa o retorno do PUT', async () => {
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
    expect(response.json.calledWith(mockData)).to.be.equal(true);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });
});