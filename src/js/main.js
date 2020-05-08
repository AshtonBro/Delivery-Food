'use strict';

const cartButton = document.querySelector('#cart-button'),
  modal = document.querySelector('.modal'),
  btncClose = document.querySelector('.close'),
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
  headerLogo = document.querySelector('.header-logo'),
  cardsMenu = document.querySelector('.cards-menu'),
  restaurantTitle = document.querySelector('.restaurant-title'),
  rating = document.querySelector('.rating'),
  minPrice = document.querySelector('.price'),
  category = document.querySelector('.category'),
  inputSearch = document.querySelector('.input-search');

let login = localStorage.getItem('user-name');

// * asynchronous function, server request and work with JSON bd
const getData = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Ошибка по адресу ${url}, статус ошибки ${response.status}!`
    );
  }
  return await response.json();
};

// * Regular expressions for login
const valid = (str) => {
  const reqLogin = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
  // if(!reqLogin.test(str)) {
  //   if (str.length < 20) {console.log('длинная строка');
  // }
  return reqLogin.test(str);
};

// * toggle function - close and open block
const toggleModal = () => {
  modal.classList.toggle('is-open');
};

// * add/remove class for autarization block, reset login form, remowe warning msg
const toogleModalAuth = () => {
  modalAuth.classList.toggle('is-open');
  logInForm.reset();
  if (document.querySelectorAll('.warnings-msg').length == 1) {
    document.querySelector('.warnings-msg').remove();
    loginInput.style.borderColor = '';
    localStorage.removeItem('user-name');
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

    // * Check if there is text in the login, if so then continue to work
    if (valid(loginInput.value)) {
      loginInput.style.borderColor = '';
      login = loginInput.value;
      localStorage.setItem('user-name', login);
      toogleModalAuth();
      btnAuth.removeEventListener('click', toogleModalAuth);
      closeAuth.removeEventListener('click', toogleModalAuth);
      logInForm.removeEventListener('submit', logIn);
      logInForm.reset();
      checkAuth();
    } else {
      // * check if login == '' then show to error msg
      let warningsMsg = document.createElement('div');
      warningsMsg.textContent = 'Пожалуйста правильный логин';
      warningsMsg.classList.add('warnings-msg');
      let arrMsq = document.querySelectorAll('.warnings-msg');
      if (!arrMsq.length == 1) {
        labelAuth.insertAdjacentElement('beforeBegin', warningsMsg);
        setTimeout(() => {
          warningsMsg.remove();
          loginInput.style.borderColor = '';
          localStorage.removeItem('user-name');
        }, 3000);
      }
      loginInput.style.borderColor = 'tomato';
    }
  };

  btnAuth.addEventListener('click', toogleModalAuth);
  closeAuth.addEventListener('click', toogleModalAuth);
  logInForm.addEventListener('submit', logIn);
};

// * exit to the main menu
const returnMain = () => {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
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
const createCardRestaurant = (restaurant) => {

  // * Destructured object
  const {
    image,
    kitchen,
    name,
    price,
    products,
    stars,
    time_of_delivery: timeOfDelivery
  } = restaurant;

  const card = document.createElement('a');
  card.className = 'card card-restaurant wow fadeInUp';
  card.setAttribute('data-delay', '4s');
  card.dataset.products = products;
  card.info = [name, price, stars, kitchen];

  // data-info='${[name, price, stars, kitchen]}

  card.insertAdjacentHTML('beforeend', `
        <img src="${image}" alt="image" class="card-image" />
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title">${name}</h3>
            <span class="card-tag tag">${timeOfDelivery} мин</span>
          </div>
          <div class="card-info">
            <div class="rating">
            ${stars}
            </div>
            <div class="price">От ${price} ₽</div>
            <div class="category">${kitchen}</div>
          </div>
        </div>
  `);

  cardsRestaurants.insertAdjacentElement('beforeend', card);
};

// * Create a menu card, Destructured object in receiving parameters
const createCardMenu = ({
  description,
  id,
  image,
  name,
  price
}) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML(
    'beforeend',
    `
      <img src="${image}" alt="${name}" class="card-image" />
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg">${name}</h3>
        </div>
        <div class="card-info">
          <div class="ingredients">${description}.
          </div>
        </div>
        <div class="card-buttons">
          <button class="button button-primary button-add-cart">
            <span class="button-card-text">В корзину</span>
            <span class="button-cart-svg"></span>
          </button>
          <strong class="card-price-bold">${price} ₽</strong>
        </div>
      </div>
  `
  );

  cardsMenu.insertAdjacentElement('beforeend', card);
};

// * Opens the menu of the selected restaurant and hides the prom and the list of other restaurants
const openCurCard = () => {
  const targer = event.target;

  const restaurant = targer.closest('.card-restaurant');

  if (restaurant) {
    // * Check if logged in then open the menu, if not then no
    if (!userName.innerText == '') {

      const [name, price, stars, kitchen] = restaurant.info;

      cardsMenu.textContent = '';
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');

      restaurantTitle.textContent = name;
      rating.textContent = stars;
      minPrice.textContent = `От ${price} ₽`;
      category.textContent = kitchen;

      // * handles the url, start creating the card as many times as there is in the database
      getData(`db/${restaurant.dataset.products}`).then((data) => {
        data.forEach(createCardMenu);
      });
    } else {
      toogleModalAuth();
    }
  }
};

// * Function for finding food and restaurants
const search = (event) => {

  if (!userName.innerText == '') {
    // * keyCode = 13 it is Enter
    if (event.keyCode === 13) {
      const target = event.target;
      const targetValue = target.value.toLowerCase().trim();
      target.value = '';

      if (!targetValue || targetValue.length < 3) {
        target.style.backgroundColor = 'tomato';
        setTimeout(() => {
          target.style.backgroundColor = '';
        }, 2000);
        return;
      }

      const arrayOfProducts = [];

      getData('db/partners.json').then((data) => {
        const products = data.map((item) => {
          return item.products;
        });
        products.forEach((productJson) => {
          getData(`db/${productJson}`).then((data) => {
              arrayOfProducts.push(...data);

              const searchMenu = arrayOfProducts.filter((item) => {
                return item.name.toLowerCase().includes(targetValue);
              });

              console.log(searchMenu);

              cardsMenu.textContent = '';

              containerPromo.classList.add('hide');
              restaurants.classList.add('hide');
              menu.classList.remove('hide');

              restaurantTitle.textContent = `Результат поиска:  ${targetValue}`;
              rating.textContent = '';
              minPrice.textContent = `найдено cовпадений: ${searchMenu.length}`;
              category.textContent = '';

              return searchMenu;
            })
            .then((data) => {
              if (data.length == 0) {
                console.log('по данному запросу ничего не найдено');
              } else {
                data.forEach(createCardMenu);
              }
            });
        });
      });
    }
  } else {
    toogleModalAuth();
    console.log('inputSearch: ', inputSearch.value);
    inputSearch.value = '';
    modalAuth.setAttribute("tabindex", "1");
    modalAuth.focus();
  }
};

// * Calls up all the necessary functions.
const init = () => {
  // * handles the url, start creating the card as many times as there is in the database
  getData('db/partners.json').then((data) => {
    data.forEach(createCardRestaurant);
  });

  // * The event handlers ------------------------------------------ addEventListener
  cartButton.addEventListener('click', toggleModal);
  btncClose.addEventListener('click', toggleModal);
  cardsRestaurants.addEventListener('click', openCurCard);
  inputSearch.addEventListener('keydown', search);

  // * The event handler on the logo, hides the restaurant menu returns promos and other restaurants
  logo.forEach((elem) => {
    elem.addEventListener('click', returnMain);
  });

  // * if logged out throws to the main menu
  btnOut.addEventListener('click', returnMain);

  // * initialization functions
  checkAuth();

  // * Swiper slider init
  new Swiper('.swiper-container', {
    loop: true,
    speed: 2000,
    autoplay: {
      delay: 3000,
    },
  });

  // * initialization wow animated method
  new WOW().init();
};

init();