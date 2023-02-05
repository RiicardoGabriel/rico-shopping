require('../mocks/fetchSimulator'); 
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('Teste se fetchItem é uma função;', () => {
    expect(typeof fetchItem).toBe('function')
  })
  test('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async () => {
    const data = await fetchItem('MLB1615760527');
    expect(data).toBeCall()
  })
  test('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async () => {
    const data = await fetchItem('MLB1615760527');
    expect(data).toBe("https://api.mercadolibre.com/items/MLB1615760527")
  })
  test('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async () => {
    const data = await fetchItem('MLB1615760527');
    expect(data).toBe(item)
  })
  test('Testa se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const data = await fetchItem();
    try {
      data;
    } catch (error) {
      expect(error).toMatch('You must provide an url');
    }
})
});
