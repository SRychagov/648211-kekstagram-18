'use strict';

(function () {
  // <--  Функция получения случайного элемента из массива  -->
  // var getRandomItem = function (arr) {
  //   return arr[getRandom(0, arr.length - 1)];
  // };
  var WAIT = 500;
  var debounce = function (func) {
    var timeout;
    return function () {
      var args = arguments;
      var later = function () {
        timeout = null;
        func.apply(null, args);
        // console.log('Я дождался');
      };
      clearTimeout(timeout);
      // console.log('Меня убили');
      timeout = setTimeout(later, WAIT);
    };
  };

  // <--  Функция получения случайного значения  -->
  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  window.util = {
    getRandom: getRandom,
    debounce: debounce,
  };
})();
