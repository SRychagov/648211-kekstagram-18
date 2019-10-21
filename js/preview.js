'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var MAX_COMMENTS = 5;
  var bigPictureElement = document.querySelector('.big-picture');
  var pictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');
  var commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

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
    var loaderClickCount = 0;

    var renderComments = function () {
      var start = loaderClickCount * MAX_COMMENTS;
      var end = start + MAX_COMMENTS;
      var comments = photo.comments.slice(start, end);
      var commentsElement = getCommentsFragment(comments);
      bigPictureElement.querySelector('.social__comments').appendChild(commentsElement);
      loaderClickCount++;
      if (photo.comments.length <= end) {
        commentsLoaderElement.classList.add('visually-hidden');
      } else {
        commentsLoaderElement.classList.remove('visually-hidden');
      }
    };

    bigPictureElement.querySelector('.big-picture__img img').src = photo.url;
    bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
    bigPictureElement.querySelector('.comments-count').textContent = photo.comments.length;
    bigPictureElement.querySelector('.social__comments').innerHTML = '';
    renderComments();
    bigPictureElement.querySelector('.social__caption').textContent = photo.description;
    bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');

    commentsLoaderElement.addEventListener('click', renderComments);

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
