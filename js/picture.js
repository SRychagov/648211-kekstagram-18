'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var getPictureElement = function (picture, id) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.setAttribute('data-id', id);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').setAttribute('data-id', id);
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.querySelector('.picture__info').textContent = picture.description;
    return pictureElement;
  };
  window.getPictureElement = getPictureElement;
})();
