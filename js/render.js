'use strict';

(function () {
  var renderPictures = function (pictures) {
    var pictureContainer = document.querySelector('.pictures');
    var pics = pictureContainer.querySelectorAll('.picture');
    Array.from(pics).forEach(function (pic) {
      pictureContainer.removeChild(pic);
    });

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
  window.renderPictures = renderPictures;
})();
