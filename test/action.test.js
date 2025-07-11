const { expect } = require('chai');
const sinon = require('sinon');
const { processData } = require('../src/action');

describe('Testes para processData', () => {

  let fakeApi;
  let fakeCore;

  beforeEach(() => {
    // Resetamos os mocks antes de cada teste
    fakeApi = {
      fetchData: sinon.stub(),
    };
    fakeCore = {
      info: sinon.spy(),
      warning: sinon.spy(),
      setFailed: sinon.spy(),
    };
  });

  it('deve processar os dados com sucesso e retornar o valor correto', async () => {
    // Arrange: Configuramos o mock para retornar um valor de sucesso
    const mockData = { status: 'success', value: 'dados_importantes' };
    fakeApi.fetchData.resolves(mockData);

    // Act: Executamos a função
    const result = await processData(fakeApi, fakeCore);

    // Assert: Verificamos os resultados
    expect(result).to.equal('Resultado: dados_importantes');
    expect(fakeCore.info.calledOnceWith('Dados recebidos com sucesso!')).to.be.true;
    expect(fakeCore.warning.called).to.be.false;
  });

  it('deve retornar "Nenhum dado processado" quando a API não retorna dados', async () => {
    // Arrange: Configuramos o mock para retornar null
    fakeApi.fetchData.resolves(null);

    // Act
    const result = await processData(fakeApi, fakeCore);

    // Assert
    expect(result).to.equal('Nenhum dado processado');
    expect(fakeCore.warning.calledOnceWith('Nenhum dado ou falha no recebimento.')).to.be.true;
    expect(fakeCore.info.called).to.be.false;
  });

  it('deve lançar um erro e chamar setFailed em caso de exceção da API', async () => {
    // Arrange: Configuramos o mock para rejeitar a promise com um erro
    const errorMessage = 'Erro de API';
    fakeApi.fetchData.rejects(new Error(errorMessage));

    // Act & Assert
    try {
      await processData(fakeApi, fakeCore);
      // Se chegar aqui, o teste falhou porque um erro era esperado
      expect.fail('A função deveria ter lançado um erro');
    } catch (error) {
      expect(error.message).to.equal(errorMessage);
      expect(fakeCore.setFailed.calledOnceWith(`Falha ao processar dados: ${errorMessage}`)).to.be.true;
    }
  });
});