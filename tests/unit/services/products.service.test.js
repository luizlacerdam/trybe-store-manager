const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models')
const { productsService } = require('../../../src/services')
const { productsList, newProduct } = require('../mocks/products.mock')

describe(' Testes de unidade do Service de products.', function () {
  describe('1. Listagem de produtos.', function () {
    it('1.1. Recuperando todos os produtos.', async function () {
      // Arrange
      sinon.stub(productsModel, 'getAllProducts').resolves(productsList);
      // Act
      const result = await productsService.getAllProducts();
      // Assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(productsList);
    })
  })
  describe('2. Busca um produto por id.', function () {
    it('2.1 Retorna um erro caso receba um ID inválido.', async function () {
      // act
      const result = await productsService.getProductById('a');

      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('2.2 Retorna um erro caso produto não existir.', async function () {
      // arrange
      sinon.stub(productsModel, 'getProductById').resolves(undefined);

      // act
      const result = await productsService.getProductById(1);

      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });

    it('2.3 Retorna um produto caso ID existente.', async function () {
      // arrange
      sinon.stub(productsModel, 'getProductById').resolves(productsList[0]);

      // act
      const result = await productsService.getProductById(1);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(productsList[0]);
    });
  });
  describe('3. Cadastro de um novo produto.', function () {
    it('3.1. Retorna o ID do produto cadastrado.', async function () {
      // arrange
      sinon.stub(productsModel, 'addProduct').resolves(4);
      sinon.stub(productsModel, 'getProductById').resolves(productsList[3]);

      // act
      const result = await productsService.addProduct(newProduct["name"]);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal({ "id": 4, ...newProduct });
    });
  });

  afterEach(function () {
    sinon.restore();
  });

})