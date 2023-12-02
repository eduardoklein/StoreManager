const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsModels = require('../../../src/models/products.models');
const connection = require('../../../src/models/connection');

chai.use(sinonChai);

const { expect } = chai;

describe('Testando camada Models de Products', function () {
//   const request = {};
  const response = {};
   
  beforeEach(function () {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });
  
  afterEach(function () { return sinon.restore(); });

  it('Testando função findAll', async function () {
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

    const executeStub = sinon.stub(connection, 'execute').resolves(mockData);

    const result = await productsModels.findAll();

    expect(executeStub).to.have.been.calledWith('SELECT * FROM products');
    expect(result).to.be.an('object');
  });

  it('Testando função findById', async function () {
    const mockData = {
      id: 1,
      name: 'Martelo de Thor',
    };

    const executeStub = sinon.stub(connection, 'execute').resolves([mockData]);

    const result = await productsModels.findAll(1);

    expect(executeStub).to.have.been.calledWith('SELECT * FROM products');
    expect(result).to.be.an('object');
    expect(result).to.deep.equal(mockData);
  });
});