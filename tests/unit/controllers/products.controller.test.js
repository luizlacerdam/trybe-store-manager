const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { productsList, newProduct } = require('../mocks/products.mock');

describe('Teste de unidade do productsController:', function () {
  describe('1 Listando produtos.', function () {
    it('1.1 Deve retornar o status 200 e a lista', async function () {
      // arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getAllProducts')
        .resolves({ type: null, message: productsList });

      // act
      await productsController.getAllProducts(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsList);
    });
  });

  describe('2. Buscando um produto.', function () {
    it('2.1 Deve responder com 200 e os dados do banco quando existir.', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getProductById')
        .resolves({ type: null, message: productsList[0] });

      // Act
      await productsController.getProductById(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsList[0]);
    });

    it('2.3 Ao passar um id que não existe no banco deve retornar um erro.', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 9999 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getProductById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      // Act
      await productsController.getProductById(req, res);

      // Assert  
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
  describe('3. Testa cadastrar novo produto.', function () {
    it('3.1 Deve retornar o status 201 e o produto.', async function () {
      // arrange
      const res = {};
      const req = { body: newProduct };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'addProduct')
        .resolves({ type: null, message: { "id": 4, ...newProduct } });

      // act
      await productsController.addProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ "id": 4, ...newProduct });
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});