const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const btncClose = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
btncClose.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

new WOW().init();

// ? Authorization users
const btnAuth = document.querySelector('.button-auth'),
  modalAuth = document.querySelector('.modal-auth'),
  closeAuth = document.querySelector('.close-auth'),
  logInForm = document.querySelector('#logInForm'),
  loginInput = document.querySelector('#login'),
  userName = document.querySelector('.user-name'),
  btnOut = document.querySelector('.button-out');

let login = localStorage.getItem('user-name');

// * toggle function - close and open block
const toogleModalAuth = () => {
  modalAuth.classList.toggle('is-open');
};

// * authorized function
const authorized = () => {
  console.log('access open');

  const logOut = () => {
    login = null;

    btnAuth.style.display = '';
    userName.style.display = '';
    btnOut.style.display = '';
    btnOut.removeEventListener('click', logOut);
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

  const logIn = () => {
    event.preventDefault();
    login = loginInput.value;

    localStorage.setItem('user-name', login);

    toogleModalAuth();
    btnAuth.removeEventListener('click', toogleModalAuth);
    closeAuth.removeEventListener('click', toogleModalAuth);
    logInForm.removeEventListener('submit', logIn);
    logInForm.reset();
    checkAuth();
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

checkAuth();