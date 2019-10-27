'use strict';

(function () {
  var STEP = 25;
  var MIN_VALUE = 25;
  var MAX_VALUE = 100;
  var MAX_PIN_POS = 450;
  var MIN_PIN_POS = 0;
  var MAX_PERCENT = 100;
  var DEFAULT_EFFECT_NAME = 'none';

  var isInFocus = false;
  var effectName = DEFAULT_EFFECT_NAME;

  var buttonCloseElement = document.querySelector('#upload-cancel');
  var imageOverlayElement = document.querySelector('.img-upload__overlay');
  var imageFormElement = document.querySelector('.img-upload__form');

  window.choose(function (dataURL) {
    imageOverlayElement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    imgUploadElement.src = dataURL;
  });

  buttonCloseElement.addEventListener('click', function () {
    closePopup();
  });

  var setDefault = function () {
    effectName = DEFAULT_EFFECT_NAME;
    imgUploadElement.className = '';
    imgUploadPinElement.classList.add('hidden');
    setEffectDepth(MAX_PERCENT);
    transformSizeImage(MAX_PERCENT);
    imageFormElement.reset();
  };

  // <-- Функция закрытия окна с фотографией -->
  var closePopup = function () {
    imageOverlayElement.classList.add('hidden');
    setDefault();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // <-- Функция закрытия окна по esc или потери фокуса у поля с тегами  -->
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE && !isInFocus) {
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

  imgUploadEffectsElement.addEventListener('change', function (evt) {
    var effect = evt.target.value;
    if (effect === 'none') {
      imgUploadPinElement.classList.add('hidden');
    } else {
      imgUploadPinElement.classList.remove('hidden');
    }

    effectName = effect;
    imgUploadElement.className = '';
    imgUploadElement.style = '';
    imgUploadElement.classList.add('effects__preview--' + effect);
    setPinPosition(MAX_PERCENT);
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

  var effectPinElement = imageOverlayElement.querySelector('.effect-level__pin');
  var effectDepthElement = imageOverlayElement.querySelector('.effect-level__depth');

  effectPinElement.addEventListener('mousedown', function (evt) {
    var pinX = effectPinElement.offsetLeft;
    var startX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      var shiftX = moveEvt.clientX - startX;
      startX = moveEvt.clientX;
      var futureX = pinX + shiftX;
      if (futureX >= MIN_PIN_POS && futureX <= MAX_PIN_POS) {
        pinX = futureX;
        setEffectDepth(futureX / MAX_PIN_POS * 100);
      }
    };
    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var setPinPosition = function (pos) {
    var x = MAX_PIN_POS / 100 * pos;
    effectPinElement.style.left = x + 'px';
    effectDepthElement.style.width = x + 'px';
  };

  var setEffectDepth = function (depth) {
    imgUploadElement.style.filter = getFilterStyle(effectName, depth);
    setPinPosition(depth);
  };

  var setFocus = function (isSet) {
    isInFocus = isSet;
  };

  window.newPhoto = {
    closePopup: closePopup,
    setFocus: setFocus,
  };
})();
