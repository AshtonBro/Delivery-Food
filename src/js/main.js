'use strict';

const cardBtnBasket = document.getElementById('card-button-basket');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.modal-close');
// const buttonActive = document.getElementsByClassName('button-active');

const toggleModal = () => {
    modal.classList.toggle("modal-active");
};

new WOW().init();

cardBtnBasket.addEventListener('click', toggleModal);
closeBtn.addEventListener('click', toggleModal);

// buttonActive.forEach(elem => elem.addEventListener('click', toggleModal));

