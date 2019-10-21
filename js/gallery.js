'use strict';

(function () {
  var onError = function (nameError) {
    window.showError(nameError, function () {
      window.load(onSuccess, onError);
    });
  };

  var onSuccess = function (pictures) {
    // console.log('Картинки получнены');
    window.renderPictures(pictures);
    window.showFilters(pictures);
  };
  // console.log('Делаем запрос на сервер');
  window.load(onSuccess, onError);
})();
