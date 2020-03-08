'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var ENTER_KEY = 'Enter';
  var mapPinMain = document.querySelector('.map__pin--main');
  var PIN_WIDTH_DIACTIVE = 65;
  var PIN_HEIGHT_DIACTIVE = 65;
  var PIN_DIACTIVE_LEFT = 570;
  var PIN_DIACTIVE_TOP = 375;
  var PIN_SHARP_END_HEIGHT = 22;
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormElement = adForm.querySelectorAll('.ad-form__element');
  var mapFilters = document.querySelectorAll('.map__filter');
  var addressInput = document.querySelector('#address');
  var filtersContainer = document.querySelector('.map__filters-container');
  var successMessage = document.querySelector('#success')
    .content
    .querySelector('.success');
  var errorMessage = document.querySelector('#error')
    .content
    .querySelector('.error');
  var errorButton = errorMessage.querySelector('.error__button');
  var main = document.querySelector('main');
  var resetFormButton = adForm.querySelector('.ad-form__reset');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var closePopup = function (popup) {
    popup.remove();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var mountedCard = function () {
    var currentCard = document.querySelector('.popup');
    var buttonPopupClose = currentCard.querySelector('.popup__close');

    // Закрытие карточки по клику на иконку крестика
    buttonPopupClose.addEventListener('click', function () {
      closePopup(currentCard);
    });

    // Закрытие карточки по клавише ESC
    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, closePopup(currentCard));
    });
  };

  var destroyedCard = function () {
    var deletedCard = document.querySelector('.popup');
    if (deletedCard) {
      deletedCard.remove();
    }
  };

  // Функция создает соответствующую карточку по клику на пин
  var showCard = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin, index) {
      pin.addEventListener('click', function () {
        // Удаляем предыдущие карточки
        destroyedCard();

        // Генерируем новую карточку
        var fragmentOfCard = document.createDocumentFragment();
        fragmentOfCard.appendChild(window.card.createdCard(window.data.apartments[index]));
        filtersContainer.before(fragmentOfCard);

        // Закрытие карточки
        mountedCard();
      });
    });
  };

  // Функция удаляет все пины
  var deleteAllPins = function () {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var l = 0; l < allPins.length; l++) {
      allPins[l].remove();
    }
  };

  // Функция устанавливает атрибут
  var setAttributForElement = function (element, attribut) {
    for (var m = 0; m < element.length; m++) {
      element[m].setAttribute(attribut, attribut);
    }
  };

  // Перевод страницы в неактивное состояние
  var deactivatePage = function () {
    setAttributForElement(adFormElement, 'disabled');
    setAttributForElement(mapFilters, 'disabled');
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    addressInput.value = ADDRESS_INPUT_X + ', ' + ADDRESS_INPUT_Y;
    mainPin.style.left = 570 + 'px';
    mainPin.style.top = 375 + 'px';
  };
  deactivatePage();

  //  Функция удаляет атрибут
  var deleteAttributOfElement = function (element, attribut) {
    for (var n = 0; n < element.length; n++) {
      element[n].removeAttribute(attribut);
    }
  };

  // Перевод страницы в активное состояние
  var SHARP_END_X = Math.floor(PIN_WIDTH_DIACTIVE / 2);
  var SHARP_END_Y = Math.floor(PIN_HEIGHT_DIACTIVE + PIN_SHARP_END_HEIGHT);
  var ADDRESS_INPUT_X = PIN_DIACTIVE_LEFT + SHARP_END_X;
  var ADDRESS_INPUT_Y = PIN_DIACTIVE_TOP + SHARP_END_Y;
  addressInput.value = Math.floor((PIN_DIACTIVE_LEFT + PIN_WIDTH_DIACTIVE / 2)) + ', ' + Math.floor((PIN_DIACTIVE_TOP + PIN_HEIGHT_DIACTIVE / 2));

  var successHandler = function () {
    window.pin.successHandler();
  };

  var errorHandler = function () {
    window.pin.errorHandler();
  };

  function pinActivateHandler(event) {
    if (event.which === 1 || event.key === ENTER_KEY) {
      window.backend.download(successHandler, errorHandler);
      deleteAttributOfElement(adFormElement, 'disabled');
      deleteAttributOfElement(mapFilters, 'disabled');
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      addressInput.value = ADDRESS_INPUT_X + ', ' + ADDRESS_INPUT_Y;
      showCard();
      //mapPinMain.removeEventListener('mousedown', pinActivateHandler);
    }
  }

  // по клику на левую кнопку мыши
  mapPinMain.addEventListener('mousedown', pinActivateHandler);

  // по клавише Enter
  mapPinMain.addEventListener('keydown', pinActivateHandler);

  document.addEventListener('click', function () {
    showCard();
  });

  var EscOnSuccess = function (evt) {
    window.util.isEscEvent(evt, closeSuccessMessage);
  };

  var EscOnError = function (evt) {
    window.util.isEscEvent(evt, closeErrorMessage);
  };

  var closeSuccessByClick = function () {
    closeSuccessMessage();
  };

  var closeErrorByClick = function () {
    closeErrorMessage();
  };

  // Функция для закрытия сообщения об успешной отправке
  var closeSuccessMessage = function () {
    successMessage.classList.add('hidden');
    document.removeEventListener('keydown', EscOnSuccess);
    successMessage.removeEventListener('click', closeSuccessByClick);

  };

  var closeErrorMessage = function () {
    errorMessage.classList.add('hidden');
    document.removeEventListener('keydown', EscOnError);
    errorMessage.removeEventListener('click', closeErrorByClick);
    document.removeEventListener('click', closeErrorByClick);
  };

  // Функция показывает сообщение об успешной отправке
  var showSuccessMessage = function () {
    successMessage.classList.remove('hidden');
    main.appendChild(successMessage);
    document.addEventListener('keydown', EscOnSuccess);
    successMessage.addEventListener('click', closeSuccessByClick);
  };

  var showErrorMessage = function () {
    errorMessage.classList.remove('hidden');
    main.appendChild(errorMessage);
    document.addEventListener('keydown', EscOnError);
    errorButton.addEventListener('click', closeErrorMessage);
    document.addEventListener('click', closeErrorByClick);
  };

  // Обработчик при успешной отправки формы
  var successSubmitHandler = function () {
    showSuccessMessage();
    adForm.reset();
    deactivatePage();
    deleteAllPins();
  };

  // Обработчик при ошибке отправки формы
  var errorSubmitHandler = function () {
    showErrorMessage();
  };

  // Отправка данных на сервер Ajax
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), successSubmitHandler, errorSubmitHandler);
  });

  // Обработчик на кнопку очистки формы
  resetFormButton.addEventListener('click', function () {
    adForm.reset();
  });

  window.map = {
    settingAttributForElement: setAttributForElement,
    addressInput: addressInput,
    SHARP_END_X: SHARP_END_X,
    SHARP_END_Y: SHARP_END_Y,
    PIN_SHARP_END_HEIGHT: PIN_SHARP_END_HEIGHT,
  };
})();
