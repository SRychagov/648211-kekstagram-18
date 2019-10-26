'use strict';

(function () {
  window.showError = function (nameError, onTryAgain) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    errorTemplate.querySelector('.error__title').textContent = nameError;
    var mainElement = document.querySelector('main');
    errorTemplate.querySelector('.error__buttons').textContent = '';
    var buttonElement = document.createElement('button');
    buttonElement.classList.add('error__button');
    buttonElement.type = 'button';
    buttonElement.textContent = 'Попробовать снова';

    buttonElement.addEventListener('click', function () {
      mainElement.removeChild(errorTemplate);
      if (typeof onTryAgain === 'function') {
        onTryAgain();
      }
    });
    errorTemplate.addEventListener('click', function (evt) {
      if (evt.target === errorTemplate) {
        mainElement.removeChild(errorTemplate);
      }
    });
    var onEscPress = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        document.removeEventListener('keydown', onEscPress);
        mainElement.removeChild(errorTemplate);
      }
    };
    document.addEventListener('keydown', onEscPress);
    errorTemplate.querySelector('.error__buttons').appendChild(buttonElement);
    mainElement.appendChild(errorTemplate);
  };
})();

