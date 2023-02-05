const fetchProducts = async (computador) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${computador}`;
    const resp = await fetch(url);
    const data = resp.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}


