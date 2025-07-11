/**
 * Formata uma mensagem de saudação.
 * Retorna uma saudação personalizada se um nome for fornecido,
 * ou uma saudação genérica caso contrário.
 * @param {string | null} name - O nome para saudar.
 * @returns {string} A mensagem de saudação formatada.
 */
function formatMessage(name) {
  if (name) {
    return `Olá, ${name}!`;
  } else {
    return 'Olá, visitante!';
  }
}

module.exports = { formatMessage };