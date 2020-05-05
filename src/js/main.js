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
  btnOut = document.querySelector('.button-out'),
  labelAuth = document.querySelector('.label-auth'),
  modalBody = document.querySelector('.modal-body');

let login = localStorage.getItem('user-name');

// * toggle function - close and open block
const toogleModalAuth = () => {
  modalAuth.classList.toggle('is-open');
  logInForm.reset();
  if (document.querySelectorAll('.warnings-msg').length == 1) {
    document.querySelector('.warnings-msg').remove();
  }
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

checkAuth();