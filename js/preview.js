'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var bigPictureElement = document.querySelector('.big-picture');
  var pictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');

  pictureCancelElement.addEventListener('click', function () {
    bigPictureElement.classList.add('hidden');
  });

  // <--  Функция создания каждого комментария  -->
  var getCommentElement = function (comment) {
    var liElement = document.createElement('li');
    liElement.classList.add('social__comment');
    var pElement = document.createElement('p');
    pElement.classList.add('social__text');
    pElement.textContent = comment.message;
    var imgElement = document.createElement('img');
    imgElement.classList.add('social__picture');
    imgElement.src = comment.avatar;
    imgElement.alt = comment.name;
    imgElement.width = 35;
    imgElement.height = 35;
    liElement.appendChild(imgElement);
    liElement.appendChild(pElement);

    return liElement;
  };

  // <--  Функция формирования всех комментариев  -->
  var getCommentsFragment = function (comments) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < comments.length; j++) {
      fragment.appendChild(getCommentElement(comments[j]));
    }
    return fragment;
  };

  // <-- Функция заполнения большого фото данными  -->
  var showBigPicture = function (photo) {

    bigPictureElement.querySelector('.big-picture__img img').src = photo.url;
    bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
    bigPictureElement.querySelector('.comments-count').textContent = photo.comments.length; // ?
    bigPictureElement.querySelector('.social__comments').innerHTML = ''; // ?
    bigPictureElement.querySelector('.social__comments').appendChild(getCommentsFragment(photo.comments));
    bigPictureElement.querySelector('.social__caption').textContent = photo.description;
    bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPictureElement.querySelector('.comments-loader').classList.add('visually-hidden');

    bigPictureElement.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  // <-- Функция закрытия окна с фотографией по кнопке esc  -->
  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      bigPictureElement.classList.add('hidden');
      document.removeEventListener('keydown', onBigPictureEscPress);
    }
  };

  window.showBigPicture = showBigPicture;
})();