'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var isEscEvent = function (evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  };
  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  window.util = {
    ESC_KEY: 'ESC_KEY',
    ENTER_KEY: 'ENTER_KEY',
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
