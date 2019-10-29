'use strict';

(function () {
  var onError = function (nameError) {
    window.showError(nameError, function () {
      window.load(onSuccess, onError);
    });
  };

  var onSuccess = function (pictures) {
    window.renderPictures(pictures);
    window.showFilters(pictures);
  };
  window.load(onSuccess, onError);
})();
