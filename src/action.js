// src/action.js

/**
 * processData é uma função de exemplo que processa alguns dados
 * e usa uma dependência externa (api).
 * @param {object} api - Um objeto com um método `fetchData`.
 * @param {object} core - O objeto core do @actions/core para logging.
 * @returns {Promise<string>} Uma string com o resultado.
 */
async function processData(api, core) {
  try {
    const data = await api.fetchData();
    if (data && data.status === 'success') {
      core.info('Dados recebidos com sucesso!');
      return `Resultado: ${data.value}`;
    } else {
      core.warning('Nenhum dado ou falha no recebimento.');
      return 'Nenhum dado processado';
    }
  } catch (error) {
    core.setFailed(`Falha ao processar dados: ${error.message}`);
    throw error;
  }
}

module.exports = { processData };