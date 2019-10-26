'use strict';

(function () {
  window.showSuccess = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    successTemplate.addEventListener('click', function (evt) {
      if (evt.target === successTemplate) {
        mainElement.removeChild(successTemplate);
      }
    });
    var onEscPress = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        document.removeEventListener('keydown', onEscPress);
        mainElement.removeChild(successTemplate);
      }
    };
    document.addEventListener('keydown', onEscPress);

    var mainElement = document.querySelector('main');
    var buttonSuccess = successTemplate.querySelector('.success__button');

    buttonSuccess.addEventListener('click', function () {
      mainElement.removeChild(successTemplate);
    });
    mainElement.appendChild(successTemplate);
  };
})();
