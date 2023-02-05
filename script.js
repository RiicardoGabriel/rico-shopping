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

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

let totalPrice = localStorage.getItem('price') ? localStorage.getItem('price') : 0;

const displayPrice = async () => {
  if (!localStorage.getItem('price')) totalPrice = 0;
  else {
    totalPrice = Number(localStorage.getItem('price'));
  }
  document.querySelector('.total-price').innerText = `R$ ${totalPrice.toFixed(2)}`;
};

const cartItemClickListener = (event) => {
  const ol = event.target.parentElement;
  event.target.remove();
  saveCartItems(ol.innerHTML);
  const $index = event.target.innerText.indexOf('$');
  const price = event.target.innerText.slice($index + 1);
  if (totalPrice > 0) totalPrice -= price;
  localStorage.setItem('price', totalPrice);
  displayPrice();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerHTML = `SKU: ${sku} | NAME: ${name} | <span id="prices">PRICE: $${salePrice}</span>`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const cartItemsList = document.querySelector('.cart__items');

const addItemToShoppingCart = async (event) => {
  const itemID = event.target.parentElement.firstElementChild.innerText;
  const itemInfo = await fetchItem(itemID);
  const cartItemObject = {
    sku: itemID,
    name: itemInfo.title,
    salePrice: itemInfo.price,
  };
  const newCartElement = createCartItemElement(cartItemObject);
  cartItemsList.appendChild(newCartElement);
  saveCartItems(cartItemsList.innerHTML);
  totalPrice += itemInfo.price;
  localStorage.setItem('price', totalPrice);
  displayPrice();
};

const addClickEventToAddButtons = () => {
  const addButtons = document.querySelectorAll('.item__add');
  addButtons.forEach((button) => button.addEventListener('click', addItemToShoppingCart));
};

const displayComputersList = async () => {
  const data = await fetchProducts('computador');
  document.querySelector('.loading').remove();
  data.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const newElement = createProductItemElement(itemObject);
    document.querySelector('.items').appendChild(newElement);
  });
  addClickEventToAddButtons();
};

const displayPreviousItems = () => {
  cartItemsList.innerHTML = getSavedCartItems();
  document.querySelectorAll('.cart__item').forEach((item) => item
    .addEventListener('click', cartItemClickListener));
};

const emptyCartButton = document.querySelector('.empty-cart');
emptyCartButton.addEventListener('click', () => {
  totalPrice = 0;
  localStorage.setItem('price', 0);
  displayPrice();
  document.querySelectorAll('.cart__item').forEach((item) => item.remove());
  saveCartItems(cartItemsList.innerHTML);
});

window.onload = () => {
  displayComputersList();
  displayPreviousItems();
  displayPrice();
};