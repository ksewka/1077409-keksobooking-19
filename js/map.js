'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  // var ESC_KEY = 'Escape';
  var mapPinMain = document.querySelector('.map__pin--main');
  var PIN_WIDTH_DIACTIVE = mapPinMain.offsetWidth;
  var PIN_HEIGHT_DIACTIVE = mapPinMain.offsetHeight;
  var PIN_DIACTIVE_LEFT = 570;
  var PIN_DIACTIVE_TOP = 375;
  var PIN_SHARP_END_HEIGHT = 22;
  var map = document.querySelector('.map');

  var similarListElement = document.querySelector('.map__pins');
  var popupTemplate = document.querySelector('#card')
      .content
      .querySelector('.popup');
  var adForm = document.querySelector('.ad-form');
  var adFormElement = adForm.querySelectorAll('.ad-form__element');
  var mapFilters = document.querySelectorAll('.map__filter');
  var addressInput = document.querySelector('#address');
  var filtersContainer = document.querySelector('.map__filters-container');
  var closePopup = function () {
    popupTemplate.classList.add('hidden');
  };

  // Функция создает соответствующую карточку по клику на пин
  var showCard = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin, index) {
      pin.addEventListener('click', function () {
        var deletedPopup = document.querySelector('.popup');
        if (deletedPopup) {
          deletedPopup.remove();
        }
        var fragmentOfCard = document.createDocumentFragment();
        fragmentOfCard.appendChild(window.card.createdCard(window.data.apartments[index]));
        filtersContainer.before(fragmentOfCard);

        var buttonPopupClose = document.querySelector('.popup__close');
        buttonPopupClose.addEventListener('click', function () {
          closePopup();
        });
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
  addressInput.value = Math.floor((PIN_DIACTIVE_LEFT + PIN_WIDTH_DIACTIVE / 2)) + ', ' + Math.floor((PIN_DIACTIVE_TOP + PIN_HEIGHT_DIACTIVE / 2));

  function pinActivateHandler(event) {
    if (event.which === 1 || event.key === ENTER_KEY) {
      similarListElement.appendChild(window.pin.fragment);
      deleteAttributOfElement(adFormElement, 'disabled');
      deleteAttributOfElement(mapFilters, 'disabled');
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      addressInput.value = Math.floor((PIN_DIACTIVE_LEFT + PIN_WIDTH_DIACTIVE / 2)) + ', ' + Math.floor((PIN_DIACTIVE_TOP + PIN_HEIGHT_DIACTIVE / 2 + PIN_SHARP_END_HEIGHT));
      showCard();
    }
  }

  // по клику на левую кнопку мыши
  mapPinMain.addEventListener('mousedown', pinActivateHandler);

  // по клавише Enter
  mapPinMain.addEventListener('keydown', pinActivateHandler);

  window.map = {
    settingAttributForElement: setAttributForElement,
  };
})();
