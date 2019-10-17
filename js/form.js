'use strict';

(function () {
  var hastagsElement = document.querySelector('.text__hashtags');
  var textDescriptionElement = document.querySelector('.text__description');
  var formElement = document.querySelector('#upload-select-image');

  hastagsElement.addEventListener('focus', function () {
    setIsFieldInFocus(true);
  });

  hastagsElement.addEventListener('blur', function () {
    setIsFieldInFocus(false);
  });

  textDescriptionElement.addEventListener('focus', function () {
    setIsFieldInFocus(true);
  });

  textDescriptionElement.addEventListener('blur', function () {
    setIsFieldInFocus(false);
  });

  hastagsElement.addEventListener('input', function (evt) {
    var value = evt.target.value;
    evt.target.setCustomValidity(getValidationMessage(value));
  });

  // <--  Функция проверки каждого тега на валидность  -->
  var getValidationMessage = function (value) {
    if (value === '') {
      return '';
    }
    var hashtags = value.toLowerCase().split(' ');
    var validTags = [];
    for (var j = 0; j < hashtags.length; j++) {
      var message = getValidationTag(hashtags[j]);
      if (message === '') {
        if (validTags.indexOf(hashtags[j]) > -1) {
          return 'хэш-тег повторяется';
        }
        if (validTags.length >= 5) {
          return 'нельзя писать больше пять хэш-тегов';
        }
        validTags.push(hashtags[j]);
      } else {
        return message;
      }
    }
    return '';
  };

  // <--  Функция проверки одного тега на валидность  -->
  var getValidationTag = function (tag) {
    if (tag[0] !== '#') {
      return 'хэш-тег должен начинаться с #';
    }
    if (tag === '#') {
      return 'хэш-тег не может состоять только из одной решётки';
    }
    if (tag.length > 20) {
      return 'максимальная длинна хэш-тега 20 символов, включая решётку';
    }
    return '';
  };

  var setIsFieldInFocus = function (is) {
    window.IS_IN_FOCUS = is;
  };

  var onSuccess = function () {
    window.showSuccess();
  };

  var onError = function (nameError) {
    window.showError(nameError);
  };

  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(formElement);
    window.upload(formData, onSuccess, onError);
    formElement.reset();
    window.closePopup();
  });
})();
