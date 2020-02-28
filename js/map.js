'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var mapPinMain = document.querySelector('.map__pin--main');
  var PIN_WIDTH_DIACTIVE = 65;
  var PIN_HEIGHT_DIACTIVE = 65;
  var PIN_DIACTIVE_LEFT = 570;
  var PIN_DIACTIVE_TOP = 375;
  var PIN_SHARP_END_HEIGHT = 22;
  var map = document.querySelector('.map');
  var similarListElement = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var adFormElement = adForm.querySelectorAll('.ad-form__element');
  var mapFilters = document.querySelectorAll('.map__filter');
  var addressInput = document.querySelector('#address');
  var filtersContainer = document.querySelector('.map__filters-container');

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

  // Функция устанавливает атрибут
  var setAttributForElement = function (element, attribut) {
    for (var m = 0; m < element.length; m++) {
      element[m].setAttribute(attribut, attribut);
    }
  };

  // Перевод страницы в неактивное состояние
  setAttributForElement(adFormElement, 'disabled');
  setAttributForElement(mapFilters, 'disabled');

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

  function pinActivateHandler(event) {
    if (event.which === 1 || event.key === ENTER_KEY) {
      similarListElement.appendChild(window.pin.fragment);
      deleteAttributOfElement(adFormElement, 'disabled');
      deleteAttributOfElement(mapFilters, 'disabled');
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      addressInput.value = ADDRESS_INPUT_X + ', ' + ADDRESS_INPUT_Y;
      showCard();
      mapPinMain.removeEventListener('mousedown', pinActivateHandler);
    }
  }

  // по клику на левую кнопку мыши
  mapPinMain.addEventListener('mousedown', pinActivateHandler);

  // по клавише Enter
  mapPinMain.addEventListener('keydown', pinActivateHandler);

  window.map = {
    settingAttributForElement: setAttributForElement,
    addressInput: addressInput,
    SHARP_END_X: SHARP_END_X,
    SHARP_END_Y: SHARP_END_Y,
    PIN_SHARP_END_HEIGHT: PIN_SHARP_END_HEIGHT,
  };
})();
