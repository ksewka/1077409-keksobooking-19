'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
  var similarListElement = document.querySelector('.map__pins');

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


  var successHandler = function () {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < window.data.apartments.length; j++) {
      fragment.appendChild(renderPin(window.data.apartments[j]));
    }
    similarListElement.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white; margin-top: 150px; width: 400px';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.pin = {
    successHandler: successHandler,
    errorHandler: errorHandler,
  };

})();

