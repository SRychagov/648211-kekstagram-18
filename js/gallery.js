'use strict';

(function () {
  var onError = function (nameError) {
    window.showError(nameError, function () {
      window.load(onSuccess, onError);
    });
  };

  var onSuccess = function (pictures) {
    // console.log('Картинки получнены');
    var pictureContainer = document.querySelector('.pictures');
    var picturesFragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
      picturesFragment.appendChild(window.getPictureElement(pictures[i], i));
    }
    pictureContainer.appendChild(picturesFragment);

    pictureContainer.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target.classList.contains('picture__img') || target.classList.contains('picture')) {
        var photoID = target.getAttribute('data-id');
        window.showBigPicture(pictures[photoID]);
      }
    });
  };
  // console.log('Делаем запрос на сервер');
  window.load(onSuccess, onError);
})();
