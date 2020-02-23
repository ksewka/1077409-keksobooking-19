'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  // Функция клонирует элемент и заполняет данными из массива объектов
  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = pin.location.x + PIN_WIDTH / 2 + 'px';
    pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;
    return pinElement;
  };

  var fragment = document.createDocumentFragment();
  for (var j = 0; j < window.data.apartments.length; j++) {
    fragment.appendChild(renderPin(window.data.apartments[j]));
  }

  window.pin = {
    fragment: fragment,
  };
})();

