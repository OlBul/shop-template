const contentContainer = document.querySelector('#content-container');
const cartCounterLabel = document.querySelector('#cart-counter-label');

let cartCounter = 0;
let cartPrice = 0;

const incrementCounter = (label, cn) => {
  const counter = cn + 1;
  cartCounterLabel.innerHTML = `${counter}`;

  if (cartCounter === 1) {
    cartCounterLabel.style.display = 'block';
  }
  return counter;
}

const getMockData = (target) => +target.parentElement.previousElementSibling.innerHTML
  .replace(/^\$(\d+)\s\D+(\d+).*$/, '$1.$2');

const getPrice = (target, price) => Math.round((price + getMockData(target)) * 100) / 100;

const disabledControls = (target, elem, fn) => {
  target.disabled = true;
  elem.removeEventListener('click', fn);
}

const enableControls = (target, elem, fn) => {
  target.disabled = false;
  elem.addEventListener('click', fn);
}

const btnClickHandler = (e) => {
  const target = e.target;
  const interval = 2000;
  let restoreHTML = null;

  if (typeof target !== 'object') {
    return;
  }

  if (target.matches('.item-actions__cart')) {
    cartCounter = incrementCounter(cartCounterLabel, cartCounter);
    const mock = getMockData(target);

    if (isNaN(mock)) {
      console.error('Не число!');
      return
    }

    cartPrice = getPrice(target, cartPrice);
    restoreHTML = target.innerHTML;
    target.innerHTML = `ADDED ${cartPrice.toFixed(2)} $`;
    disabledControls(target, contentContainer, btnClickHandler);

    setTimeout(() => {
      target.innerHTML = restoreHTML;
      enableControls(target, contentContainer, btnClickHandler);
    }, interval);
  }
}

contentContainer.addEventListener('click', btnClickHandler);