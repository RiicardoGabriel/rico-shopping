const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const ol = document.querySelector('.cart__items');

const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(ol.innerHTML);
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  ol.appendChild(li);
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  saveCartItems(ol.innerHTML);
  return li;
};

ol.addEventListener('click', cartItemClickListener);

const getSkuFromProductItem = (item) => {
  const sku = item.querySelector('span.item__sku').innerText;
  fetchItem(sku).then((itens) => createCartItemElement(itens));
};

const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  document.querySelector('.items').appendChild(section);
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const btn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btn.addEventListener('click', (event) => {
    const clik = event.target.parentNode;
    getSkuFromProductItem(clik);
  });
  section.appendChild(btn);
  
  return section;
};

function closeBigImgAndContainer() {
}

function exibeDados(item) {
  fetchProducts(item).then((itens) =>
  itens.results.forEach((items) => createProductItemElement(items)));
}

function guardaLista() {
  const geral = getSavedCartItems();
  ol.innerHTML = geral;
}

window.onload = () => { 
  exibeDados('computador');
  guardaLista();
 };
