const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener('click', addToCartClicked);
});




/*creo arrays para guardar los menus en Json para posteriormente consultar stock con AJAX*/

const menu1 = [{ id:1,nombre :"vianda vegana",stock: 20 }]
const enJson = JSON.stringify(menu1);
localStorage.setItem("menu1",enJson)

const menu2 = [{ id:2,nombre :"vianda vegetariana",stock: 20 }]
const enJson2 = JSON.stringify(menu2);
localStorage.setItem("menu2",enJson2)

const menu3 = [{ id:3,nombre :"vianda celiaca",stock: 20 }]
const enJson3 = JSON.stringify(menu3);
localStorage.setItem("menu3",enJson3)

const menu4 = [{ id:4,nombre :"vianda baja en calorias",stock: 20 }]
const enJson4 = JSON.stringify(menu4);
localStorage.setItem("menu4",enJson4)

const menu5 = [{ id:5,nombre :"vianda dulce",stock: 20 }]
const enJson5 = JSON.stringify(menu5);
localStorage.setItem("menu5",enJson5)




/* funcion para comprar */
const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click',comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
  '.shoppingCartItemsContainer'
);


/*funcion para agregar menu con titulo precio y foto */

function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemTitle = item.querySelector('.item-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;
  const itemImage = item.querySelector('.item-image').src;

  addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}


/* funcion para que cuando se repita un menues con el mismo titulo, lo agregue en vez de crear 2 */

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
    'shoppingCartItemTitle'
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.shoppingCartItemQuantity'
      );
      elementQuantity.value++;
      updateShoppingCartTotal();
      return; /* */
    }
  }

  /* --------------------------- */

  const shoppingCartRow = document.createElement('div');/*cuando agreguemos el item al carrito va a copiar el el html donde dice title,image y precio, para colocarlo dentro del carrito*/ 
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
    <div class="col-6">
      <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
          <img src=${itemImage} class="shopping-cart-image"> 
           <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
       </div>
      </div>
  <div class="col-2">
    <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
       <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
      </div>
      </div>
    <div class="col-4">
      <div
          class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
        <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
        value="1">
      <button class="btn btn-danger buttonDelete" type="button">X</button>
        </div>
        </div>
    </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

  shoppingCartRow
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged);

  updateShoppingCartTotal();
}

/* --------------------------- */
/* funcion para modificar el total segun los menues que agreguemos */

function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('$', '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;
}

/* funcion para remover item del carrito de compras */

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();
}

/* --------------------------- */
/* funcion para cambiar la cantidad de menues, sin que se pueda bajar de 0.. si bajas no baja de 1 */
function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;  /*si la cantidad es menor a 0, que le de valor de 1, si no es menor a 0 que no haga nada*/
  updateShoppingCartTotal();
}

/* --------------------------- */


/* cada vez que le demos a comprar va a vaciar el carrito */
function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = '';
  updateShoppingCartTotal();
}
