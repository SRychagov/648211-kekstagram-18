'use strict';

(function () {
  var STEP = 25;
  var MIN_VALUE = 25;
  var MAX_VALUE = 100;
  var ESC_KEYCODE = 27;
  var EFFECT_NAME = 'none';
  var IS_IN_FOCUS = false;

  var uploadFileElement = document.querySelector('#upload-file');
  var buttonCloseElement = document.querySelector('#upload-cancel');
  var imageOverlayElement = document.querySelector('.img-upload__overlay');

  uploadFileElement.addEventListener('change', function () {
    imageOverlayElement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  });

  buttonCloseElement.addEventListener('click', function () {
    closePopup();
  });

  // <-- Функция закрытия окна с фотографией -->
  var closePopup = function () {
    imageOverlayElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // <-- Функция закрытия окна по esc или потери фокуса у поля с тегами  -->
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && !IS_IN_FOCUS) {
      closePopup();
    }
  };

  var buttonSmallerElement = document.querySelector('.scale__control--smaller');
  var buttonBiggerElement = document.querySelector('.scale__control--bigger');
  var inputValueElement = document.querySelector('.scale__control--value');
  var imgUploadElement = document.querySelector('.img-upload__preview img');

  // <-- Функция изменения масштаба фотографии  -->
  var transformSizeImage = function (scale) {
    imgUploadElement.style.transform = 'scale(' + scale / 100 + ')';
  };

  buttonSmallerElement.addEventListener('click', function () {
    buttonClick(-1);
  });

  buttonBiggerElement.addEventListener('click', function () {
    buttonClick(1);
  });

  // <-- Функция получения будущего значения размера фотографии  -->
  var buttonClick = function (vector) {
    var inputValue = parseInt(inputValueElement.value, 10);
    var futureValue = inputValue + STEP * vector;

    if (futureValue >= MIN_VALUE && futureValue <= MAX_VALUE) {
      inputValueElement.value = futureValue + '%';
      transformSizeImage(futureValue);
    }
  };

  var imgUploadPinElement = document.querySelector('.img-upload__effect-level');
  var imgUploadEffectsElement = document.querySelector('.img-upload__effects');
  var effectLevelValueElement = document.querySelector('.effect-level__value');
  var effectLevelValue = effectLevelValueElement.value;

  imgUploadEffectsElement.addEventListener('change', function (evt) {
    var effect = evt.target.value;
    if (effect === 'none') {
      imgUploadPinElement.classList.add('hidden');
    } else {
      imgUploadPinElement.classList.remove('hidden');
    }

    EFFECT_NAME = effect;
    imgUploadElement.className = '';
    imgUploadElement.style = '';
    imgUploadElement.classList.add('effects__preview--' + effect);
  });

  var effectPinElement = document.querySelector('.effect-level__pin');
  effectPinElement.addEventListener('mouseup', function () {
    if (EFFECT_NAME !== 'none') {
      imgUploadElement.style.filter = getFilterStyle(EFFECT_NAME, effectLevelValue);
    }
  });

  // <--  Функция выбора эффекта  -->
  var getFilterStyle = function (name, level) {
    switch (name) {
      case 'chrome': return 'grayscale(' + level / 100 + ')';
      case 'sepia': return 'sepia(' + level / 100 + ')';
      case 'marvin': return 'invert(' + level + '%)';
      case 'phobos': return 'blur(' + level / 100 * 3 + 'px)';
      case 'heat': return 'brightness(' + (level / 100 * 2 + 1) + ')';
      default: return '';
    }
  };
  window.IS_IN_FOCUS = IS_IN_FOCUS;
})();
