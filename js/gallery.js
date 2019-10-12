'use strict';

(function () {
  var pictureContainer = document.querySelector('.pictures');
  var picturesFragment = document.createDocumentFragment();
  var pictures = window.getPhoto(25);
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
})();
