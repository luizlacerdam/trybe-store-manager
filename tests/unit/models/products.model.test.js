const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models')
const { productsList } = require('../mocks/products.model.mock')

describe('1. Testes de unidade do model de products.', function () {
  it('1.1. Recuperando todos os produtos.', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([productsList]);
    // Act
    const result = await productsModel.getAllProducts();
    // Assert
    expect(result).to.be.deep.equal(productsList);
  })
  it('1.2. Recuperando produto por id.', async function () {
    const productId = 1;
    // Arrange
    sinon.stub(connection, 'execute').resolves([[productsList[0]]]);
    // Act
    const result = await productsModel.getProductById(productId);
    // Assert
    expect(result).to.be.deep.equal(productsList[0]);
  })
  afterEach(function () {
    sinon.restore();
  });
})