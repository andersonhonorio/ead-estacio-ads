const { expect } = require('chai');
const { formatMessage } = require('../src/utils');

describe('Testes para formatMessage', () => {

  it('deve retornar uma saudação personalizada quando um nome é fornecido', () => {
    // Arrange
    const name = 'Maria';

    // Act
    const result = formatMessage(name);

    // Assert
    expect(result).to.equal('Olá, Maria!');
  });

  it('deve retornar uma saudação genérica quando nenhum nome é fornecido', () => {
    // Arrange
    const name = null;

    // Act
    const result = formatMessage(name);

    // Assert
    expect(result).to.equal('Olá, visitante!');
  });

});