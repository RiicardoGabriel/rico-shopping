require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  test('Testa se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  })
  test('Executa a função fetchProducts com o argumento computador e teste se fetch foi chamada', async () => {
    const data = await fetchProducts('computador');
    expect(data).toBe('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  })
  test('Testa se o retorno da função fetchProducts com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo', async () => {
    const data = await fetchProducts('computador');
    expect(data).toBe(computadorSearch);
  })
  test('Testa se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const data = await fetchProducts();
    try {
      data;
    } catch (error) {
      expect(error).toMatch('You must provide an url');
    }
  })
});