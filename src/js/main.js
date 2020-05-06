'use strict';

const cartButton = document.querySelector("#cart-button"),
  modal = document.querySelector(".modal"),
  btncClose = document.querySelector(".close"),
  btnAuth = document.querySelector('.button-auth'),
  modalAuth = document.querySelector('.modal-auth'),
  closeAuth = document.querySelector('.close-auth'),
  logInForm = document.querySelector('#logInForm'),
  loginInput = document.querySelector('#login'),
  userName = document.querySelector('.user-name'),
  btnOut = document.querySelector('.button-out'),
  labelAuth = document.querySelector('.label-auth'),
  cardsRestaurants = document.querySelector('.cards-restaurants'),
  containerPromo = document.querySelector('.container-promo'),
  restaurants = document.querySelector('.restaurants'),
  menu = document.querySelector('.menu'),
  logo = document.querySelectorAll('.logo'),
  cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('user-name');

// * toggle function - close and open block
const toggleModal = () => {
  modal.classList.toggle("is-open");
};

const toogleModalAuth = () => {
  modalAuth.classList.toggle('is-open');
  logInForm.reset();
  if (document.querySelectorAll('.warnings-msg').length == 1) {
    document.querySelector('.warnings-msg').remove();
  }
};

// * User authorized function
const authorized = () => {
  console.log('access open');
  // * We clear the login field, local storage and hide the buttons
  const logOut = () => {
    login = null;

    btnAuth.style.display = '';
    userName.style.display = '';
    btnOut.style.display = '';
    btnOut.removeEventListener('click', logOut);
    userName.innerText = '';
    localStorage.removeItem('user-name');
    checkAuth();
  };

  userName.textContent = login;

  btnAuth.style.display = 'none';
  userName.style.display = 'inline';
  btnOut.style.display = 'block';
  btnOut.addEventListener('click', logOut);
};

// * not authorized function
const notAuthorized = () => {
  console.log('access denied');

  // * login function
  const logIn = () => {
    event.preventDefault();
    login = loginInput.value;

    localStorage.setItem('user-name', login);
    // * check if login == '' then show to error msg
    if (login === '') {
      let warningsMsg = document.createElement('div');
      warningsMsg.textContent = 'Пожалуйста введите логин';
      warningsMsg.classList.add('warnings-msg');
      let arrMsq = document.querySelectorAll('.warnings-msg');
      if (!arrMsq.length == 1) {
        labelAuth.insertAdjacentElement('beforeBegin', warningsMsg);
        setTimeout(() => {
          warningsMsg.remove();
        }, 3000);
      }
      // * Check if there is text in the login, if so then continue to work
    } else {
      toogleModalAuth();
      btnAuth.removeEventListener('click', toogleModalAuth);
      closeAuth.removeEventListener('click', toogleModalAuth);
      logInForm.removeEventListener('submit', logIn);
      logInForm.reset();
      checkAuth();
    }

  };

  btnAuth.addEventListener('click', toogleModalAuth);
  closeAuth.addEventListener('click', toogleModalAuth);
  logInForm.addEventListener('submit', logIn);
};

// * check authorized 
const checkAuth = () => {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
};

// * Create a restaurant card and a description of it
const createCardRestaurant = () => {

  const card = `
    <a class="card card-restaurant wow fadeInUp" data-wow-delay="0.4s"">
        <img src=" img/tanuki/preview.jpg" alt="image" class="card-image" />
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title">Тануки</h3>
            <span class="card-tag tag">60 мин</span>
          </div>
          <div class="card-info">
            <div class="rating">
              4.5
            </div>
            <div class="price">От 1 200 ₽</div>
            <div class="category">Суши, роллы</div>
          </div>
        </div>
    </a>
  `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card);

};

// * Create a menu card

const createCardMenu = () => {
  const card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML('beforeend', `
          <img src="img/pizza-plus/pizza-girls.jpg" alt="image" class="card-image" />
          <div class="card-text">
            <div class="card-heading">
              <h3 class="card-title card-title-reg">Пицца Девичник</h3>
            </div>
            <div class="card-info">
              <div class="ingredients">
                Соус томатный, постное тесто, нежирный сыр, кукуруза, лук,
                маслины, грибы, помидоры, болгарский перец.
              </div>
            </div>
            <div class="card-buttons">
              <button class="button button-primary button-add-cart">
                <span class="button-card-text">В корзину</span>
                <span class="button-cart-svg"></span>
              </button>
              <strong class="card-price-bold">450 ₽</strong>
            </div>
          </div>
  `);

  cardsMenu.insertAdjacentElement('beforeend', card);
};

// * Opens the menu of the selected restaurant and hides the prom and the list of other restaurants
const openCurCard = () => {
  const targer = event.target;

  const restaurant = targer.closest('.card-restaurant');

  if (restaurant) {
    console.log(userName.textContent);

    // * Check if logged in then open the menu, if not then no
    if (!userName.innerText == '') {
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');

      cardsMenu.textContent = '';

      createCardMenu();
      createCardMenu();
      createCardMenu();

    } else {
      toogleModalAuth();
    }
  }
};

// * The event handlers ------------------------------------------ addEventListener
cartButton.addEventListener("click", toggleModal);
btncClose.addEventListener("click", toggleModal);
cardsRestaurants.addEventListener('click', openCurCard);
// * The event handler on the logo, hides the restaurant menu returns promos and other restaurants
logo.forEach(elem => {
  elem.addEventListener('click', () => {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
  });
});
// * if logged out throws to the main menu
btnOut.addEventListener('click', () => {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
});

checkAuth();
createCardRestaurant();

new WOW().init();