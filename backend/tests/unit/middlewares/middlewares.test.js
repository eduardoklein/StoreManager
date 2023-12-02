const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { nameHasFiveChars, nameExists } = require('../../../src/middlewares/validateName');
const { quantityExists, quantityGreaterThanZero } = require('../../../src/middlewares/validateSale');

chai.use(sinonChai);

const { expect } = chai;

describe('Testando Middlewares', function () {
  const request = {};
  const response = {};
  let next;
   
  beforeEach(function () {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub();
  });
  
  afterEach(function () { sinon.restore(); });

  it('Testando ValidateName.nameHasFiveChars se o name tiver 5 caracteres', function () {
    request.body = {
      name: '12345',
    };

    nameHasFiveChars(request, response, next);
    expect(next).to.have.been.calledWith();
  });

  it('Testando ValidateName.nameHasFiveChars se o name não tiver 5 caracteres', function () {
    request.body = {
      name: '1234',
    };
    const mockData = {
      message: '"name" length must be at least 5 characters long',
    };

    nameHasFiveChars(request, response, next);
    expect(response.json).to.have.been.calledWith(mockData);
    expect(response.status).to.have.been.calledWith(422);
  });

  it('Testando ValidateName.nameExists se há name', function () {
    request.body = {
      name: '12345',
    };

    nameExists(request, response, next);
    expect(next).to.have.been.calledWith();
  });

  it('Testando ValidateName.nameExists se não há name', function () {
    request.body = { };
    const mockData = {
      message: '"name" is required',
    };

    nameExists(request, response, next);
    expect(response.json).to.have.been.calledWith(mockData);
    expect(response.status).to.have.been.calledWith(400);
  });

  it('Testando quantityExists quando a quantidade existe de fato', function () {
    request.body = [
      {
        productId: 1,
        quantity: 5,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    quantityExists(request, response, next);
    expect(next).to.have.been.calledWith();
  });

  it('Testando quantityExists quando a quantidade não existe', function () {
    request.body = [
      {
        productId: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    const mockData = {
      message: '"quantity" is required',
    };

    quantityExists(request, response, next);
    expect(response.json).to.have.been.calledWith(mockData);
    expect(response.status).to.have.been.calledWith(400);
  });

  it('Testando quantityGreaterThanZero quando a quantidade é maior que 0', function () {
    request.body = [
      {
        productId: 1,
        quantity: 5,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    quantityGreaterThanZero(request, response, next);
    expect(next).to.have.been.calledWith();
  });

  it('Testando quantityGreaterThanZero quando a quantidade é menor que 0', function () {
    request.body = [
      {
        productId: 1,
        quantity: 0,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    const mockData = {
      message: '"quantity" must be greater than or equal to 1',
    };

    quantityGreaterThanZero(request, response, next);
    expect(response.json).to.have.been.calledWith(mockData);
    expect(response.status).to.have.been.calledWith(422);
  });
}); 