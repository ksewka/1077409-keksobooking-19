'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var limitCoords = {
    minY: '130',
    maxY: '630',
    minX: '0',
    maxX: '1200'
  };

  var limits = {
    top: limitCoords.minY - mainPin.offsetHeight - window.map.PIN_SHARP_END_HEIGHT,
    bottom: limitCoords.maxY - mainPin.offsetHeight - window.map.PIN_SHARP_END_HEIGHT,
    left: limitCoords.minX - mainPin.offsetWidth / 2,
    right: limitCoords.maxX - mainPin.offsetWidth / 2,
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mainPinX = mainPin.offsetLeft - shift.x;
      var mainPinY = mainPin.offsetTop - shift.y;

      // Присваиваем метке новые значения координат в заданных пределах
      if ((mainPinX >= limits.left) && (mainPinX <= limits.right)) {
        mainPin.style.left = mainPinX + 'px';
      }

      if ((mainPinY >= limits.top) && (mainPinY <= limits.bottom)) {
        mainPin.style.top = mainPinY + 'px';
      }

      // Записываем координаты сдвига в поле адреса с поправкой на острый конец метки
      window.map.addressInput.value = (mainPinX + window.map.SHARP_END_X) + ', ' + (mainPinY + window.map.SHARP_END_Y);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

})();
