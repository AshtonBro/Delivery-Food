'use strict';

const cardBtnBasket = document.getElementById('card-button-basket');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.modal-close');


console.log(closeBtn);
console.log(cardBtnBasket);
console.log(modal);

const toggleModal = () => {
    modal.classList.toggle("modal-active");
};

cardBtnBasket.addEventListener('click', toggleModal);
closeBtn.addEventListener('click', toggleModal);