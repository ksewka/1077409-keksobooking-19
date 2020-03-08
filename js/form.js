'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var roomNumber = adForm.querySelector('#room_number');
  var guestNumber = adForm.querySelector('#capacity');
  var guests = guestNumber.querySelectorAll('option');
  var titleInput = adForm.querySelector('input[name = "title"]');
  var elementTime = document.querySelector('.ad-form__element--time');
  var priceInput = adForm.querySelector('input[name = "price"]');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  guests[2].setAttribute('selected', 'selected');
  // валидация на количество гостей
  roomNumber.onclick = function () {
    window.map.settingAttributForElement(guests, 'disabled');
    guestNumber.removeAttribute('disabled', 'disabled');
    switch (roomNumber.value) {
      case '1':
        guests[2].removeAttribute('disabled');
        break;
      case '2':
        guests[2].removeAttribute('disabled');
        guests[1].removeAttribute('disabled');
        break;
      case '3':
        guests[2].removeAttribute('disabled');
        guests[1].removeAttribute('disabled');
        guests[0].removeAttribute('disabled');
        break;
      case '100':
        guests[3].removeAttribute('disabled');
        break;
    }
  };

  // Валидация на текстовое поле заголовка
  titleInput.setAttribute('required', 'required');

  // Синхронизация времени заселения
  elementTime.addEventListener('click', function (evt) {
    timeOut.value = evt.target.value;
    timeIn.value = evt.target.value;
  });

  // Валидация поля с ценой
  priceInput.setAttribute('required', 'required');
  priceInput.setAttribute('pattern', '[0 - 1000000]');

  // Синхронизация цены и вида жилья
  var selectOfTypes = adForm.querySelector('#type');
  selectOfTypes.addEventListener('click', function () {
    switch (selectOfTypes.value) {
      case 'palace':
        selectOfTypes[3].setAttribute('min', '10000');
        priceInput.placeholder = '10000';
        break;
      case 'house':
        selectOfTypes[2].setAttribute('min', '5000');
        priceInput.placeholder = '5000';
        break;
      case 'flat':
        selectOfTypes[1].setAttribute('min', '1000');
        priceInput.placeholder = '1000';
        break;
      case 'bungalo':
        selectOfTypes[0].setAttribute('min', '0');
        priceInput.placeholder = '0';
        break;
    }
  });

})();
