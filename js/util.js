'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var WAIT = 500;

  var debounce = function (func) {
    var timeout;
    return function () {
      var args = arguments;
      var callLater = function () {
        timeout = null;
        func.apply(null, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(callLater, WAIT);
    };
  };

  // <--  Функция получения случайного значения  -->
  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    getRandom: getRandom,
    debounce: debounce,
  };
})();
